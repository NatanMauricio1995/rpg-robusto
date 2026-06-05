import personagemRepository from '../repositories/PersonagemRepository';
import personagemValidation from '../validations/PersonagemValidation';
import classeRepository from '../repositories/ClasseRepository';

/**
 * PersonagemService - Responsável por regras de negócio de personagens
 * Conforme Capítulo 7 da Arquitetura BackEnd, RN-025 a RN-031 e Fluxos FP-001 a FP-003
 */
class PersonagemService {
  /**
   * Cria um novo personagem (Fluxo FP-001)
   * @param {Object} data 
   * @param {string} userId - ID do usuário dono
   */
  async createCharacter(data, userId) {
    const validation = this.validateCharacter(data);
    if (!validation.isValid) {
      throw { message: 'Dados inválidos', errors: validation.errors };
    }

    // RN-017: Validação de nível mínimo para Subclasse
    if (data.subclasseId) {
      await this.validateSubclassLevel(data.classeId, data.nivel || 1);
    }

    const finalData = {
      ...data,
      usuarioId: userId, // Corrigido de userId para usuarioId conforme DD-170
      status: 'PENDENTE', // DD-180: Corrigido para uppercase
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return await personagemRepository.create(finalData);
  }

  /**
   * Atualiza dados do personagem
   * @param {string} id 
   * @param {Object} data 
   */
  async updateCharacter(id, data) {
    const validation = this.validateCharacter(data);
    if (!validation.isValid) {
      throw { message: 'Dados inválidos', errors: validation.errors };
    }

    const currentCharacter = await personagemRepository.findById(id);
    if (!currentCharacter) {
      throw new Error('Personagem não encontrado.');
    }

    // RN-017: Validação de nível mínimo para Subclasse
    if (data.subclasseId) {
      await this.validateSubclassLevel(data.classeId, data.nivel || currentCharacter.nivel || 1);
    }

    const finalData = {
      ...data,
      updatedAt: new Date()
    };

    /**
     * RN-074: Se um personagem aprovado for editado, volta para status PENDENTE.
     */
    if (currentCharacter.status === 'APROVADO') {
      finalData.status = 'PENDENTE';
    }

    return await personagemRepository.update(id, finalData);
  }

  /**
   * RN-017: Valida se o nível permite escolha de subclasse
   */
  async validateSubclassLevel(classeId, nivel) {
    const classe = await classeRepository.findById(classeId);
    if (!classe) throw new Error('Classe não encontrada.');

    // TODO: CONTEXTO_INSUFICIENTE_PARA_NIVEL_DESBLOQUEIO_SUBCLASSE
    // Assume-se nivelMinimoSubclasse no objeto classe ou padrão nível 3
    const nivelMinimo = classe.nivelMinimoSubclasse || 3;
    if (nivel < nivelMinimo) {
      throw new Error(`A subclasse só pode ser escolhida a partir do nível ${nivelMinimo}.`);
    }
  }

  /**
   * Valida dados via PersonagemValidation
   * @param {Object} data 
   */
  validateCharacter(data) {
    return personagemValidation.validate(data);
  }

  /**
   * Busca um personagem por ID
   * @param {string} id 
   */
  async getCharacter(id) {
    try {
      const res = await personagemRepository.findById(id);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Lista personagens de um usuário
   * @param {string} userId 
   */
  async listUserCharacters(userId) {
    return await personagemRepository.findByUserId(userId);
  }
}

export default new PersonagemService();
