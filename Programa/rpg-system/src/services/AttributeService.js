import BaseService from './BaseService';
import racaRepository from '../repositories/RacaRepository';
import subRacaRepository from '../repositories/SubRacaRepository';
import classeRepository from '../repositories/ClasseRepository';
import itemRepository from '../repositories/ItemRepository';
import armaRepository from '../repositories/ArmaRepository';
import armaduraRepository from '../repositories/ArmaduraRepository';
import magiaRepository from '../repositories/MagiaRepository';
import encantamentoRepository from '../repositories/EncantamentoRepository';

/**
 * AttributeService - Responsável por calcular atributos
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
    // Corrigido: SubRaca possui atributos aninhados conforme SubRacaService.transform
    const subRacialBonus = subRaca?.atributos ? (subRaca.atributos[attributeName] || 0) : 0;
    if (subRacialBonus !== 0) {
      modificadores.push({ origem: 'SubRacial', valor: subRacialBonus });
    }

    // Modificadores de Classe (Se existirem no modelo de classe, embora DD-018 cite, o modelo core foca em Raças)
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

    // Busca dados das fontes (RN-087: Toda regra passa por Service, mas aqui usamos Repositories para eficiência de cálculo)
    const [raca, subRaca, classe] = await Promise.all([
      racaId ? racaRepository.findById(racaId) : null,
      subRacaId ? subRacaRepository.findById(subRacaId) : null,
      classeId ? classeRepository.findById(classeId) : null
    ]);
    
    // Carregamento real de equipamentos e seus encantamentos
    const equipamentos = await Promise.all(equipamentosIds.map(async (id) => {
      let item = null;
      if (id.startsWith('ARM')) item = await armaRepository.findById(id);
      else if (id.startsWith('ARD')) item = await armaduraRepository.findById(id);
      else if (id.startsWith('ITM')) item = await itemRepository.findById(id);

      if (item) {
        // Agrega modificadores de encantamentos ao item para cálculo simplificado
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

    // Carregamento real de magias
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
}

export default new AttributeService();
