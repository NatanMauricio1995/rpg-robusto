import repo from '../repositories/CampanhaPersonagemRepository';
import val from '../validations/CampanhaPersonagemValidation';
import personagemRepository from '../repositories/PersonagemRepository';
import inventoryService from './InventoryService';

/**
 * CampanhaPersonagemService - Regras de negócio para fichas em campanhas
 * RN-025 a RN-029 | PROIBIÇÃO: Dados de campanha nunca ficam no personagem base.
 */
class CampanhaPersonagemService {
  async createSheet(d) {
    try {
      const exists = await repo.findByCampanhaAndPersonagem(d.campanhaId, d.personagemId);
      if (exists) return { success: false, data: null, error: { message: "Personagem já possui ficha nesta campanha." } };

      const v = val.validate(d);
      if (!v.isValid) return { success: false, data: null, error: { message: "Dados inválidos", details: v.errors } };

      const res = await repo.create(d);

      // RN-016: Injetar equipamentos iniciais da classe
      const personagem = await personagemRepository.findById(d.personagemId);
      if (personagem && personagem.classeId) {
        await inventoryService.initializeInitialEquipment(res, personagem.classeId);
      }

      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async updateSheet(id, d) {
    try {
      const res = await repo.update(id, d);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async getSheet(id) {
    try {
      const res = await repo.findById(id);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async getByCampaign(cId) {
    try {
      const res = await repo.findByCampanha(cId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async getByCharacter(pId) {
    try {
      const res = await repo.findByPersonagem(pId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async getByUser(uId) {
    try {
      const res = await repo.findByUsuario(uId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * RN-027: Gestão de moedas
   */
  async addCoins(id, amt) {
    const sheet = await repo.findById(id);
    if (!sheet) return { success: false, data: null, error: { message: "Ficha não encontrada" } };
    
    const newMoedas = { ...sheet.moedas };
    Object.keys(amt).forEach(k => {
      newMoedas[k] = (newMoedas[k] || 0) + amt[k];
    });

    return this.updateSheet(id, { moedas: newMoedas });
  }

  async removeCoins(id, amt) {
    const sheet = await repo.findById(id);
    if (!sheet) return { success: false, data: null, error: { message: "Ficha não encontrada" } };
    
    const newMoedas = { ...sheet.moedas };
    for (const k of Object.keys(amt)) {
      if ((newMoedas[k] || 0) < amt[k]) return { success: false, data: null, error: { message: `Moedas de ${k} insuficientes.` } };
      newMoedas[k] -= amt[k];
    }

    return this.updateSheet(id, { moedas: newMoedas });
  }

  async updateHP(id, hp) {
    return this.updateSheet(id, { hpAtual: hp });
  }

  async updateCA(id, ca) {
    return this.updateSheet(id, { ca });
  }
}

export default new CampanhaPersonagemService();
