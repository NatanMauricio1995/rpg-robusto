import { worldRepo, continentRepo, kingdomRepo, cityRepo, envRepo, locRepo } from '../repositories/WorldRepositories';
import { WorldValidation } from '../validations/WorldValidation';
import auditService from './AuditService';

class WorldService {
  _checkPermission(user) {
    const role = user?.role || user?.userRole || '';
    return ['MESTRE', 'ADMINISTRADOR'].includes(role.toUpperCase());
  }
  // --- MUNDO ---
  async createWorld(user, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const val = WorldValidation.validateNode(data);
      if (!val.isValid) return { success: false, data: null, error: { code: 'VALIDATION_ERR', message: val.error } };

      const payload = { ...data, status: data.status || 'ATIVO', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      const id = await worldRepo.create(payload);
      const res = { id, ...payload };
      await auditService.createLog({ userId: user.id, userName: user.nome, userRole: user.role, action: 'WORLD_CREATED', entityType: 'WORLD', entityId: id, entityName: res.nome, afterData: res });
      return { success: true, data: res, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async updateWorld(user, id, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const old = await worldRepo.findById(id);
      if (!old) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Mundo não encontrado.' } };

      const payload = { ...data, updatedAt: new Date().toISOString() };
      await worldRepo.update(id, payload);
      const res = { ...old, ...payload };
      await auditService.createLog({ userId: user.id, userName: user.nome, userRole: user.role, action: 'WORLD_UPDATED', entityType: 'WORLD', entityId: id, entityName: res.nome, beforeData: old, afterData: res });
      return { success: true, data: res, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async deleteWorld(user, id) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const deps = await continentRepo.findAll() || [];
      if (deps.some(c => c.worldId === id)) return { success: false, data: null, error: { code: 'DEPENDENCY_RESTRICTION', message: 'Não é possível excluir um mundo contendo continentes ativos.' } };
      
      const old = await worldRepo.findById(id);
      if (!old) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Mundo inexistente.' } };
      await worldRepo.delete(id);
      await auditService.createLog({ userId: user.id, userName: user.nome, userRole: user.role, action: 'WORLD_DELETED', entityType: 'WORLD', entityId: id, entityName: old.nome, beforeData: old });
      return { success: true, data: id, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async getWorld(id) {
    try { const r = await worldRepo.findById(id); return { success: !!r, data: r, error: r ? null : { code: 'NOT_FOUND', message: 'Mundo não encontrado' } }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async listWorlds() {
    try { const r = await worldRepo.findAll(); return { success: true, data: r || [], error: null }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  // --- CONTINENTE ---
  async createContinent(user, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      if (!data.worldId) return { success: false, data: null, error: { code: 'MISSING_PARENT', message: 'worldId obrigatório.' } };
      const id = await continentRepo.create(data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async updateContinent(user, id, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      await continentRepo.update(id, data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async deleteContinent(user, id) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const deps = await kingdomRepo.findAll() || [];
      if (deps.some(k => k.continentId === id)) return { success: false, data: null, error: { code: 'DEPENDENCY_RESTRICTION', message: 'Não é possível excluir continente com reinos vinculados.' } };
      await continentRepo.delete(id);
      return { success: true, data: id, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async getContinent(id) {
    try { const r = await continentRepo.findById(id); return { success: !!r, data: r, error: r ? null : { code: 'NOT_FOUND', message: 'Não encontrado' } }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async listContinents() {
    try { const r = await continentRepo.findAll(); return { success: true, data: r || [], error: null }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  // --- REINO ---
  async createKingdom(user, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      if (!data.continentId) return { success: false, data: null, error: { code: 'MISSING_PARENT', message: 'continentId obrigatório.' } };
      const id = await kingdomRepo.create(data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async updateKingdom(user, id, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      await kingdomRepo.update(id, data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async deleteKingdom(user, id) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const deps = await cityRepo.findAll() || [];
      if (deps.some(c => c.kingdomId === id)) return { success: false, data: null, error: { code: 'DEPENDENCY_RESTRICTION', message: 'Não é possível excluir um reino contendo cidades.' } };
      await kingdomRepo.delete(id);
      return { success: true, data: id, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async getKingdom(id) {
    try { const r = await kingdomRepo.findById(id); return { success: !!r, data: r, error: r ? null : { code: 'NOT_FOUND', message: 'Não encontrado' } }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async listKingdoms() {
    try { const r = await kingdomRepo.findAll(); return { success: true, data: r || [], error: null }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  // --- CIDADE ---
  async createCity(user, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      if (!data.kingdomId) return { success: false, data: null, error: { code: 'MISSING_PARENT', message: 'kingdomId obrigatório.' } };
      const id = await cityRepo.create(data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async updateCity(user, id, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      await cityRepo.update(id, data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async deleteCity(user, id) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const deps = await envRepo.findAll() || [];
      if (deps.some(e => e.cityId === id)) return { success: false, data: null, error: { code: 'DEPENDENCY_RESTRICTION', message: 'Cidade possui ambientes vinculados.' } };
      await cityRepo.delete(id);
      return { success: true, data: id, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async getCity(id) {
    try { const r = await cityRepo.findById(id); return { success: !!r, data: r, error: r ? null : { code: 'NOT_FOUND', message: 'Não encontrado' } }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async listCities() {
    try { const r = await cityRepo.findAll(); return { success: true, data: r || [], error: null }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  // --- AMBIENTE ---
  async createEnvironment(user, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      if (!data.cityId) return { success: false, data: null, error: { code: 'MISSING_PARENT', message: 'cityId obrigatório.' } };
      const id = await envRepo.create(data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async updateEnvironment(user, id, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      await envRepo.update(id, data);
      return { success: true, data: { id, ...data }, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async deleteEnvironment(user, id) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const deps = await locRepo.findAll() || [];
      if (deps.some(l => l.environmentId === id)) return { success: false, data: null, error: { code: 'DEPENDENCY_RESTRICTION', message: 'Ambiente possui locais filhos ativos.' } };
      await envRepo.delete(id);
      return { success: true, data: id, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async getEnvironment(id) {
    try { const r = await envRepo.findById(id); return { success: !!r, data: r, error: r ? null : { code: 'NOT_FOUND', message: 'Não encontrado' } }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async listEnvironments() {
    try { const r = await envRepo.findAll(); return { success: true, data: r || [], error: null }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  // --- LOCAL ---
  async createLocation(user, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      if (!data.environmentId) return { success: false, data: null, error: { code: 'MISSING_PARENT', message: 'environmentId obrigatório.' } };
      const id = await locRepo.create(data);
      const res = { id, ...data };
      await auditService.createLog({ userId: user.id, userName: user.nome, userRole: user.role, action: 'LOCATION_CREATED', entityType: 'LOCATION', entityId: id, entityName: res.nome, afterData: res });
      return { success: true, data: res, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async updateLocation(user, id, data) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const old = await locRepo.findById(id);
      await locRepo.update(id, data);
      const res = { ...old, ...data, id };
      await auditService.createLog({ userId: user.id, userName: user.nome, userRole: user.role, action: 'LOCATION_UPDATED', entityType: 'LOCATION', entityId: id, entityName: res.nome, beforeData: old, afterData: res });
      return { success: true, data: res, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async deleteLocation(user, id) {
    try {
      if (!this._checkPermission(user)) return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acesso negado.' } };
      const old = await locRepo.findById(id);
      if (!old) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Local não encontrado.' } };
      await locRepo.delete(id);
      await auditService.createLog({ userId: user.id, userName: user.nome, userRole: user.role, action: 'LOCATION_DELETED', entityType: 'LOCATION', entityId: id, entityName: old.nome, beforeData: old });
      return { success: true, data: id, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async getLocation(id) {
    try { const r = await locRepo.findById(id); return { success: !!r, data: r, error: r ? null : { code: 'NOT_FOUND', message: 'Não encontrado' } }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  async listLocations() {
    try { const r = await locRepo.findAll(); return { success: true, data: r || [], error: null }; }
    catch (e) { return { success: false, data: null, error: { code: 'ERR', message: e.message } }; }
  }

  // --- ÁRVORE GEOGRÁFICA COMPLETA ---
  async getWorldTree() {
    try {
      const ms = await worldRepo.findAll() || [];
      const cs = await continentRepo.findAll() || [];
      const ks = await kingdomRepo.findAll() || [];
      const ds = await cityRepo.findAll() || [];
      const es = await envRepo.findAll() || [];
      const ls = await locRepo.findAll() || [];

      const arvore = ms.map(m => {
        const continentesMundo = cs.filter(c => c.worldId === m.id).map(c => {
          const reinosContinente = ks.filter(k => k.continentId === c.id).map(k => {
            const cidadesReino = ds.filter(d => d.kingdomId === k.id).map(d => {
              const ambientesCidade = es.filter(e => e.cityId === d.id).map(e => {
                return { ...e, locais: ls.filter(l => l.environmentId === e.id) };
              });
              return { ...d, ambientes: ambientesCidade };
            });
            return { ...k, cidades: cidadesReino };
          });
          return { ...c, reinos: reinosContinente };
        });
        return { ...m, continentes: continentesMundo };
      });

      return { success: true, data: arvore, error: null };
    } catch (e) { return { success: false, data: null, error: { code: 'TREE_COMPILATION_FAILED', message: e.message } }; }
  }
}

const worldService = new WorldService();
export default worldService;
