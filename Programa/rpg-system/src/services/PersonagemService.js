import personagemRepository from '../repositories/PersonagemRepository';
import personagemValidation from '../validations/PersonagemValidation';

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

    const finalData = {
      ...data,
      userId,
      status: 'Pendente', // RN-031: Todo personagem criado inicia como Pendente
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

    const finalData = {
      ...data,
      updatedAt: new Date()
    };

    /**
     * RN-031: Se um personagem aprovado for editado, volta para status Pendente.
     * Exceto se a edição for apenas de campos não-estruturais (conforme Arq. BackEnd).
     */
    if (currentCharacter.status === 'Aprovado') {
      finalData.status = 'Pendente';
    }

    return await personagemRepository.update(id, finalData);
  }

  /**
   * Aprova um personagem (Fluxo FP-002)
   * @param {string} id 
   */
  async approveCharacter(id) {
    const character = await personagemRepository.findById(id);
    if (!character) {
      throw new Error('Personagem não encontrado.');
    }

    if (character.status === 'Aprovado') {
      throw new Error('Personagem já está aprovado.');
    }

    return await personagemRepository.update(id, {
      status: 'Aprovado',
      approvedAt: new Date(),
      rejectionReason: null
    });
  }

  /**
   * Rejeita um personagem (Fluxo FP-003)
   * @param {string} id 
   * @param {string} motivo 
   */
  async rejectCharacter(id, motivo) {
    if (!motivo || motivo.trim() === '') {
      throw new Error('É necessário informar um motivo para a rejeição.');
    }

    const character = await personagemRepository.findById(id);
    if (!character) {
      throw new Error('Personagem não encontrado.');
    }

    return await personagemRepository.update(id, {
      status: 'Reprovado',
      rejectionReason: motivo,
      rejectedAt: new Date()
    });
  }

  /**
   * Solicita ajustes em um personagem
   * @param {string} id 
   * @param {string} observacao 
   */
  async requestAdjustments(id, observacao) {
    return await personagemRepository.update(id, {
      status: 'Em Ajuste',
      rejectionReason: observacao,
      updatedAt: new Date()
    });
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
