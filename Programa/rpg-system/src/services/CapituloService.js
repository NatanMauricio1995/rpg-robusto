import repo from '../repositories/CapituloRepository';
import val from '../validations/CapituloValidation';
import campaignRepo from '../repositories/CampaignRepository';

/**
 * CapituloService - Regras de negócio para capítulos
 * Conforme RN-051 e Dicionário de Dados DD-240 a DD-243
 */
class CapituloService {
  _checkPermission(user) {
    const role = user?.role || user?.userRole || '';
    return ['MESTRE', 'ADMINISTRADOR'].includes(role.toUpperCase());
  }

  async createCapitulo(user, data) {
    if (!this._checkPermission(user)) {
      return { success: false, data: null, error: { message: 'Acesso negado. Apenas o mestre pode criar capítulos.' } };
    }

    const v = val.validate(data);
    if (!v.isValid) return { success: false, data: null, error: v.errors };

    try {
      // Validar existência da campanha
      const campanha = await campaignRepo.findById(data.campanhaId);
      if (!campanha) {
        return { success: false, data: null, error: { message: 'Campanha não encontrada.' } };
      }

      // Validar duplicidade de ordem (DD-243: cronologia obrigatória)
      const exists = await repo.findByOrder(data.campanhaId, data.ordem);
      if (exists && exists.length > 0) {
        return { success: false, data: null, error: { message: `Já existe um capítulo com a ordem ${data.ordem} nesta campanha.` } };
      }

      const resId = await repo.create({
        nome: data.nome,
        campanhaId: data.campanhaId,
        ordem: Number(data.ordem),
        descricao: data.descricao || '',
        imagem: data.imagem || ''
      });

      return { success: true, data: { id: resId, ...data }, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async updateCapitulo(user, id, data) {
    if (!this._checkPermission(user)) {
      return { success: false, data: null, error: { message: 'Acesso negado. Apenas o mestre pode editar capítulos.' } };
    }

    const v = val.validate(data);
    if (!v.isValid) return { success: false, data: null, error: v.errors };

    try {
      const old = await repo.findById(id);
      if (!old) return { success: false, data: null, error: { message: 'Capítulo não encontrado.' } };

      // Validar duplicidade de ordem se mudou
      if (data.ordem !== old.ordem) {
        const exists = await repo.findByOrder(data.campanhaId, data.ordem);
        if (exists && exists.length > 0) {
          return { success: false, data: null, error: { message: `Já existe um capítulo com a ordem ${data.ordem} nesta campanha.` } };
        }
      }

      await repo.update(id, {
        nome: data.nome,
        ordem: Number(data.ordem),
        descricao: data.descricao || '',
        imagem: data.imagem || ''
      });

      return { success: true, data: { id, ...data }, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async deleteCapitulo(user, id) {
    if (!this._checkPermission(user)) {
      return { success: false, data: null, error: { message: 'Acesso negado. Apenas o mestre pode excluir capítulos.' } };
    }

    try {
      const old = await repo.findById(id);
      if (!old) return { success: false, data: null, error: { message: 'Capítulo não encontrado.' } };

      await repo.delete(id);
      return { success: true, data: id, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async getCapitulo(id) {
    try {
      const res = await repo.findById(id);
      return { success: !!res, data: res, error: res ? null : { message: 'Capítulo não encontrado.' } };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async listCapitulosByCampaign(campanhaId) {
    try {
      const res = await repo.findByCampaignId(campanhaId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }
}

export default new CapituloService();
