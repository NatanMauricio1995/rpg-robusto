import BaseService from './BaseService';
import racaRepository from '../repositories/RacaRepository';
import subRacaRepository from '../repositories/SubRacaRepository';
import classeRepository from '../repositories/ClasseRepository';

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
    const subRacialBonus = subRaca ? (subRaca[attributeName] || 0) : 0;
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
    const raca = racaId ? await racaRepository.findById(racaId) : null;
    const subRaca = subRacaId ? await subRacaRepository.findById(subRacaId) : null;
    const classe = classeId ? await classeRepository.findById(classeId) : null;
    
    // TODO: CONTEXTO_INSUFICIENTE_PARA_BUSCA_BATCH_EQUIPAMENTOS_E_MAGIAS
    const equipamentos = []; 
    const magias = [];

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
