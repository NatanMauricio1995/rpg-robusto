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

    const equipamentosIds = classe.equipamentosIniciaisIds || [];
    
    const equipamentos = [];
    for (const id of equipamentosIds) {
      const item = await itemRepository.findById(id) || 
                   await armaRepository.findById(id) || 
                   await armaduraRepository.findById(id);
      if (item) equipamentos.push(item);
    }

    return equipamentos;
  }

  /**
   * Valida requisitos para equipar o item (RN-093)
   * @param {Object} personagem - Objeto do personagem com atributos e dados base
   * @param {Object} equipamento - Objeto do equipamento (Arma ou Armadura) com requisitos
   * @param {number} nivel - Nível atual do personagem na ficha de campanha
   */
  validateRequirements(personagem, equipamento, nivel = 1) {
    const requisitos = equipamento.requisitos;
    if (!requisitos) return { isValid: true, errors: [] };

    const errors = [];

    // 1. Validar Nível Mínimo
    if (nivel < (requisitos.nivelMinimo || 1)) {
      errors.push(`Nível insuficiente. Exigido: ${requisitos.nivelMinimo}.`);
    }

    // 2. Validar Classe
    if (requisitos.classesIds?.length > 0 && !requisitos.classesIds.includes(personagem.classeId)) {
      errors.push("Classe não permitida para este equipamento.");
    }

    // 3. Validar Raça
    if (requisitos.racasIds?.length > 0 && !requisitos.racasIds.includes(personagem.racaId)) {
      errors.push("Raça não permitida para este equipamento.");
    }

    // 4. Validar Atributos Mínimos (RN-093)
    if (requisitos.atributos) {
      const attrs = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
      attrs.forEach(attr => {
        const reqValue = requisitos.atributos[attr];
        const charValue = personagem[attr]?.total || personagem[attr] || 10;
        if (reqValue && charValue < reqValue) {
          errors.push(`Atributo ${attr} insuficiente. Exigido: ${reqValue}.`);
        }
      });
    }

    // 5. Validar Proficiências (RN-093)
    // Assume-se que o personagem possui um array proficienciasIds (DD-170+ ext)
    if (requisitos.proficienciasIds?.length > 0) {
      const charProfs = personagem.proficienciasIds || [];
      const missingProfs = requisitos.proficienciasIds.filter(pId => !charProfs.includes(pId));
      if (missingProfs.length > 0) {
        errors.push("Proficiência necessária ausente.");
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default new EquipmentService();
