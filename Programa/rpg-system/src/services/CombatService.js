import combatRepository from '../repositories/CombatRepository';
import campanhaPersonagemRepository from '../repositories/CampanhaPersonagemRepository';
import inimigoRepository from '../repositories/InimigoRepository';

/**
 * CombatService - Gerenciamento de combates táticos.
 * Atualizado com suporte a flags de XP para distribuição pós-encontro.
 */
class CombatService {
  async createCombat({ campanhaId, nome, descricao }) {
    try {
      const novoCombate = {
        campanhaId,
        nome,
        descricao: descricao || '',
        status: 'PREPARACAO',
        rodadaAtual: 0,
        turnoAtual: 0,
        participantes: [],
        inimigos: [],
        ordemIniciativa: [],
        combatLog: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const resultado = await combatRepository.create(novoCombate);
      return { success: true, data: resultado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'CREATE_COMBAT_FAILED', message: err.message } };
    }
  }

  async addParticipant(combatId, campanhaPersonagemId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate || combate.status !== 'PREPARACAO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Combate inválido ou fora de preparação.' } };
      const ficha = await campanhaPersonagemRepository.findById(campanhaPersonagemId);
      if (!ficha) return { success: false, data: null, error: { code: 'SHEET_NOT_FOUND', message: 'Ficha não encontrada.' } };
      if (combate.participantes.some(p => p.id === campanhaPersonagemId)) return { success: false, data: null, error: { code: 'DUPLICATE', message: 'Já inserido.' } };

      combate.participantes.push({ id: ficha.id, nome: ficha.nome, nivel: ficha.nivel, hpAtual: ficha.hpAtual, hpMaximo: ficha.hpMaximo, ca: ficha.ca, modDestreza: ficha.atributos?.destreza ? Math.floor((ficha.atributos.destreza - 10) / 2) : 0 });
      const atualizado = await combatRepository.update(combatId, { participantes: combate.participantes, updatedAt: new Date().toISOString() });
      return { success: true, data: atualizado, error: null };
    } catch(e) { return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; }
  }

  async addEnemy(combatId, inimigoId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate || combate.status !== 'PREPARACAO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Combate inválido ou fora de preparação.' } };
      const inimigoBase = await inimigoRepository.findById(inimigoId);
      if (!inimigoBase) return { success: false, data: null, error: { code: 'ENEMY_NOT_FOUND', message: 'Inimigo não encontrado.' } };

      const snapshotId = `enemy_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      combate.inimigos.push({ snapshotId, inimigoId, nome: inimigoBase.nome, hpAtual: inimigoBase.hp || 10, hpMaximo: inimigoBase.hp || 10, ca: inimigoBase.ca || 10, xp: inimigoBase.xp || 0, loot: inimigoBase.loot || [], modDestreza: inimigoBase.modDestreza || 0 });
      
      const atualizado = await combatRepository.update(combatId, { inimigos: combate.inimigos, updatedAt: new Date().toISOString() });
      return { success: true, data: atualizado, error: null };
    } catch(e) { return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; }
  }

  async startCombat(combatId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate || combate.status !== 'PREPARACAO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Preparação necessária.' } };
      const r = () => Math.floor(Math.random() * 20) + 1;
      const list = [];
      combate.participantes.forEach(p=>list.push({id: p.id, nome: p.nome, v: r()+(p.modDestreza||0)}));
      combate.inimigos.forEach(e=>list.push({id: e.snapshotId, nome: e.nome, v: r()+(e.modDestreza||0)}));
      list.sort((a,b)=>b.v - a.v);
      
      const res = await combatRepository.update(combatId, { status: 'ATIVO', rodadaAtual: 1, turnoAtual: 0, ordemIniciativa: list.map(i=>i.id), updatedAt: new Date().toISOString() });
      return { success: true, data: res, error: null };
    } catch(e) { return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; }
  }

  async nextTurn(combatId) {
    try {
      const c = await combatRepository.findById(combatId);
      let t = c.turnoAtual + 1; let r = c.rodadaAtual;
      if (t >= c.ordemIniciativa.length) { t = 0; r += 1; }
      const res = await combatRepository.update(combatId, { turnoAtual: t, rodadaAtual: r, updatedAt: new Date().toISOString() });
      return { success: true, data: res, error: null };
    } catch(e) { return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; }
  }

  async applyDamage(combatId, { targetId, damage, sourceId, description }) {
    try {
      const c = await combatRepository.findById(combatId);
      let pIdx = c.participantes.findIndex(p => p.id === targetId);
      let eIdx = c.inimigos.findIndex(e => e.snapshotId === targetId);
      if (pIdx !== -1) {
        c.participantes[pIdx].hpAtual = Math.max(0, c.participantes[pIdx].hpAtual - damage);
        await campanhaPersonagemRepository.update(targetId, { hpAtual: c.participantes[pIdx].hpAtual });
      } else if (eIdx !== -1) {
        c.inimigos[eIdx].hpAtual = Math.max(0, c.inimigos[eIdx].hpAtual - damage);
      }
      await combatRepository.update(combatId, { participantes: c.participantes, inimigos: c.inimigos });
      const f = this.checkCombatEnd(c);
      if(f.fim) return await this.endCombat(combatId, f.resultado);
      return { success: true, data: await combatRepository.findById(combatId), error: null };
    } catch(e) { return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; }
  }

  async applyHealing(combatId, { targetId, healing, sourceId, description }) {
    try {
      const c = await combatRepository.findById(combatId);
      let pIdx = c.participantes.findIndex(p => p.id === targetId);
      if (pIdx !== -1) {
        c.participantes[pIdx].hpAtual = Math.min(c.participantes[pIdx].hpMaximo, c.participantes[pIdx].hpAtual + healing);
        await campanhaPersonagemRepository.update(targetId, { hpAtual: c.participantes[pIdx].hpAtual });
      }
      return { success: true, data: await combatRepository.update(combatId, { participantes: c.participantes }), error: null };
    } catch(e) { return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; }
  }

  checkCombatEnd(combate) {
    if (combate.inimigos.length > 0 && combate.inimigos.every(e => e.hpAtual <= 0)) return { fim: true, resultado: 'VITORIA' };
    if (combate.participantes.length > 0 && combate.participantes.every(p => p.hpAtual <= 0)) return { fim: true, resultado: 'DERROTA' };
    return { fim: false, resultado: null };
  }

  /**
   * Finaliza o combate e prepara os flags obrigatórios de XPDisponivel e XPDistribuida
   */
  async endCombat(combatId, resultado) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Não encontrado' } };

      const atualizado = await combatRepository.update(combatId, {
        status: 'ENCERRADO',
        resultado: resultado || 'VITORIA',
        xpDisponivel: true,
        xpDistribuida: false,
        dataFim: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      return { success: true, data: atualizado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'END_COMBAT_FAILED', message: err.message } };
    }
  }

  async getCombat(id) { const d = await combatRepository.findById(id); return { success: !!d, data: d, error: null }; }
  async listCombats(campanhaId) { return { success: true, data: await combatRepository.findByCampaign(campanhaId), error: null }; }
}

export default new CombatService();
