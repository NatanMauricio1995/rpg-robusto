import classeRepository from '../repositories/ClasseRepository';
import itemRepository from '../repositories/ItemRepository';
import armaRepository from '../repositories/ArmaRepository';
import armaduraRepository from '../repositories/ArmaduraRepository';

/**
 * EquipmentService - Responsável por gerenciar equipamentos
 * Conforme Capítulo 10 da Arquitetura BackEnd e RN-016
 */
class EquipmentService {
  /**
   * Retorna equipamentos iniciais da Classe (RN-016)
   */
  async getInitialEquipment(classeId) {
    const classe = await classeRepository.findById(classeId);
    if (!classe) throw new Error('Classe não encontrada.');

    // TODO: CONTEXTO_INSUFICIENTE_PARA_MAPEAMENTO_EQUIPAMENTOS_INICIAIS_NA_CLASSE
    // Assume-se que a classe possui um array de ids ou objetos de equipamentos iniciais
    const equipamentosIds = classe.equipamentosIniciaisIds || [];
    
    const equipamentos = [];
    for (const id of equipamentosIds) {
      // Busca em todos os repositórios de itens/armas/armaduras
      const item = await itemRepository.findById(id) || 
                   await armaRepository.findById(id) || 
                   await armaduraRepository.findById(id);
      if (item) equipamentos.push(item);
    }

    return equipamentos;
  }

  /**
   * Valida requisitos para equipar o item (RN-096 adaptada para equipamentos)
   */
  async validateRequirements(personagemId, itemId) {
    return "CONTEXTO_INSUFICIENTE_NA_DOCUMENTACAO";
  }
}

export default new EquipmentService();
