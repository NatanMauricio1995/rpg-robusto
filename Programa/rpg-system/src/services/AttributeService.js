import BaseService from './BaseService';
import racaRepository from '../repositories/RacaRepository';
import subRacaRepository from '../repositories/SubRacaRepository';
import classeRepository from '../repositories/ClasseRepository';
import itemRepository from '../repositories/ItemRepository';
import armaRepository from '../repositories/ArmaRepository';
import armaduraRepository from '../repositories/ArmaduraRepository';
import magiaRepository from '../repositories/MagiaRepository';
import encantamentoRepository from '../repositories/EncantamentoRepository';
import fichaRepo from '../repositories/CampanhaPersonagemRepository';
import inventoryRepo from '../repositories/FichaInventarioRepository';
import activeEffectsRepo from '../repositories/CombateEfeitosAtivosRepository';
import combatRepo from '../repositories/CombatRepository';
import personagemRepo from '../repositories/PersonagemRepository';

/**
 * AttributeService - Responsável por calcular atributos e CA
 * Conforme Capítulo 8 da Arquitetura BackEnd
 */
class AttributeService extends BaseService {
  constructor() {
    super(null);
  }

  /**
   * Calcula um atributo específico baseado em base, modificadores e bônus
   * DD-017 / DD-018 / DD-023 / DD-024
   */
  calculateAttribute(attributeName, baseValue, sourceData = {}) {
    const { raca, subRaca, classe, equipamentos = [], magias = [], temporario = 0 } = sourceData;

    const modificadores = [];

    // RN-014: Modificadores de Raça
    const racialBonus = raca ? (raca[attributeName] || 0) : 0;
    if (racialBonus !== 0) {
      modificadores.push({ origem: 'Racial', valor: racialBonus });
    }

    // RN-015: Modificadores de Sub-Raça
    const subRacialBonus = subRaca?.atributos ? (subRaca.atributos[attributeName] || 0) : 0;
    if (subRacialBonus !== 0) {
      modificadores.push({ origem: 'SubRacial', valor: subRacialBonus });
    }

    // Modificadores de Classe
    const classeBonus = classe ? (classe[attributeName] || 0) : 0;
    if (classeBonus !== 0) {
      modificadores.push({ origem: 'Classe', valor: classeBonus });
    }

    // Modificadores de Equipamento
    const equipamentoBonus = equipamentos.reduce((acc, eq) => acc + (eq.modificadores?.[attributeName] || 0), 0);
    if (equipamentoBonus !== 0) {
      modificadores.push({ origem: 'Equipamento', valor: equipamentoBonus });
    }

    // Modificadores de Magia
    const magiaBonus = magias.reduce((acc, mg) => acc + (mg.modificadores?.[attributeName] || 0), 0);
    if (magiaBonus !== 0) {
      modificadores.push({ origem: 'Magia', valor: magiaBonus });
    }

    // Modificadores Temporários
    if (temporario !== 0) {
      modificadores.push({ origem: 'Temporário', valor: temporario });
    }

    const total = baseValue + racialBonus + subRacialBonus + classeBonus + equipamentoBonus + magiaBonus + temporario;

    return {
      base: baseValue,
      modificadores,
      total
    };
  }

  /**
   * Calcula o modificador de um atributo (ex: 18 -> +4)
   * DD-016: (Atributo - 10) / 2 arredondado para baixo.
   */
  calculateModifier(value) {
    return Math.floor((value - 10) / 2);
  }

  /**
   * Calcula todos os atributos de um personagem
   */
  async calculateAllAttributes(characterData) {
    const { 
      atributosBase = {}, 
      racaId, 
      subRacaId, 
      classeId, 
      equipamentosIds = [], 
      magiasIds = [],
      temporarios = {} 
    } = characterData;

    const [raca, subRaca, classe] = await Promise.all([
      racaId ? racaRepository.findById(racaId) : null,
      subRacaId ? subRacaRepository.findById(subRacaId) : null,
      classeId ? classeRepository.findById(classeId) : null
    ]);
    
    const equipamentos = await Promise.all(equipamentosIds.map(async (id) => {
      let item = null;
      if (id.startsWith('ARM')) item = await armaRepository.findById(id);
      else if (id.startsWith('ARD')) item = await armaduraRepository.findById(id);
      else if (id.startsWith('ITM')) item = await itemRepository.findById(id);

      if (item) {
        const encModificadores = {};
        if (item.encantamentosIds && item.encantamentosIds.length > 0) {
          const encantamentos = await Promise.all(
            item.encantamentosIds.map(eId => encantamentoRepository.findById(eId))
          );
          
          encantamentos.forEach(enc => {
            if (enc && enc.modificadores && typeof enc.modificadores === 'object') {
              Object.keys(enc.modificadores).forEach(attr => {
                encModificadores[attr] = (encModificadores[attr] || 0) + enc.modificadores[attr];
              });
            }
          });
        }
        return { ...item, modificadores: encModificadores };
      }
      return null;
    })).then(list => list.filter(item => item !== null));

    const magias = await Promise.all(
      magiasIds.map(id => magiaRepository.findById(id))
    ).then(list => list.filter(mg => mg !== null));

    const listaAtributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
    const resultado = {};

    listaAtributos.forEach(attr => {
      resultado[attr] = this.calculateAttribute(
        attr, 
        atributosBase[attr] || 10, 
        { raca, subRaca, classe, equipamentos, magias, temporario: temporarios[attr] || 0 }
      );
    });

    return resultado;
  }

  /**
   * Recalcula a Classe de Armadura (CA) automaticamente (RN-068)
   * Estrutura Composta conforme DD-023 / DD-024
   * @param {string} fichaCampanhaId 
   */
  async calculateArmorClass(fichaCampanhaId) {
    try {
      const ficha = await fichaRepo.findById(fichaCampanhaId);
      if (!ficha) throw new Error("Ficha de campanha não encontrada.");

      const personagem = await personagemRepo.findById(ficha.personagemId);
      if (!personagem) throw new Error("Personagem base não encontrado.");

      // 1. Calcular atributos atuais para obter Destreza real
      const inventoryItems = await inventoryRepo.findByFichaId(fichaCampanhaId);
      const fullAttrData = {
        atributosBase: {
          forca: personagem.forca?.base || 10,
          destreza: personagem.destreza?.base || 10,
          constituicao: personagem.constituicao?.base || 10,
          inteligencia: personagem.inteligencia?.base || 10,
          sabedoria: personagem.sabedoria?.base || 10,
          carisma: personagem.carisma?.base || 10
        },
        racaId: personagem.racaId,
        subRacaId: personagem.subRacaId,
        classeId: personagem.classeId,
        equipamentosIds: inventoryItems
          .filter(i => i.equipado)
          .map(i => i.itemId)
      };
      
      const attrs = await this.calculateAllAttributes(fullAttrData);
      const modDestreza = this.calculateModifier(attrs.destreza.total);

      // 2. Coletar Bônus de Equipamentos (Armadura e Escudo)
      const equippedItems = inventoryItems.filter(i => i.equipado);
      
      let bonusArmadura = 0;
      let bonusEscudo = 0;

      for (const item of equippedItems) {
        const detail = await armaduraRepository.findById(item.itemId);
        if (detail) {
          if (detail.nome?.toLowerCase().includes('escudo')) {
            bonusEscudo += detail.caBase || 0;
          } else {
            bonusArmadura += detail.caBase || 0;
          }
        }
      }

      // 3. Coletar Efeitos Temporários / Magia (RN-068)
      const activeEffects = await activeEffectsRepo.findByTarget(fichaCampanhaId);
      const activeOnly = activeEffects.filter(e => e.ativo);
      
      const bonusMagia = activeOnly
        .filter(e => e.tipoEfeito === 'MAGIA_CA')
        .reduce((acc, e) => acc + (e.valorEfeito || 0), 0);
        
      const bonusTemp = activeOnly
        .filter(e => e.tipoEfeito === 'STATUS_CA')
        .reduce((acc, e) => acc + (e.valorEfeito || 0), 0);

      // 4. Aplicar Fórmula Obrigatória (DD-024): 
      // Total = Base (10) + Armadura + Escudo + Destreza + Magia + Temporário
      const caData = {
        base: 10,
        armadura: bonusArmadura,
        escudo: bonusEscudo,
        destreza: modDestreza,
        magia: bonusMagia,
        temporario: bonusTemp,
        total: 10 + bonusArmadura + bonusEscudo + modDestreza + bonusMagia + bonusTemp
      };

      // 5. Persistência de Estado (RN-069)
      await fichaRepo.update(fichaCampanhaId, { 
        caAtual: caData.total,
        caComposta: caData 
      });

      const activeCombat = await combatRepo.findActiveCombat(ficha.campanhaId);
      if (activeCombat) {
        const updatedParticipants = activeCombat.participantes.map(p => {
          if (p.id === fichaCampanhaId) {
            return { ...p, ca: caData.total };
          }
          return p;
        });
        await combatRepo.update(activeCombat.id, { participantes: updatedParticipants });
      }

      return { success: true, data: caData };
    } catch (e) {
      console.error("Erro ao recalcular CA:", e);
      return { success: false, error: { message: e.message } };
    }
  }
}

export default new AttributeService();
