import combatRepo from '../repositories/CombatRepository';
import combatVal from '../validations/CombatValidation';
import fichaService from './CampanhaPersonagemService';

/**
 * CombatService - Responsável pela lógica de combate
 * Conforme Capítulo 17 da Arquitetura BackEnd e RN-042, RN-043
 */
class CombatService {
  async createCombat({ campanhaId, nome, descricao }) {
    try {
      const d = { 
        campanhaId, 
        nome, 
        descricao, 
        status: 'PREPARACAO', 
        rodadaAtual: 0, 
        turnoAtual: 0, 
        participantes: [], 
        inimigos: [], 
        combatLog: [], 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      };

      const v = combatVal.validate(d);
      if (!v.isValid) return { success: false, data: null, error: v.errors };

      const res = await combatRepo.create(d);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async addParticipant(combatId, fichaId) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'PREPARACAO') {
        return { success: false, data: null, error: { message: "Combate fora de preparação" } };
      }

      if (c.participantes.some(p => p.campanhaPersonagemId === fichaId)) {
        return { success: false, data: null, error: { message: "Participante duplicado" } };
      }

      const fRes = await fichaService.getSheet(fichaId);
      if (!fRes.success) return fRes;
      
      const pNode = { 
        campanhaPersonagemId: fichaId, 
        nome: fRes.data.nome, 
        hpAtual: fRes.data.hpAtual, 
        hpMaximo: fRes.data.hpMaximo, 
        ca: fRes.data.ca, 
        modDestreza: fRes.data.atributos?.destreza ? Math.floor((fRes.data.atributos.destreza - 10) / 2) : 0, 
        iniciativa: 0, 
        tipo: 'HEROI' 
      };

      const updatedParticipantes = [...c.participantes, pNode];
      const updatedLog = [...c.combatLog, { t: new Date().toISOString(), m: `${pNode.nome} entrou no combate.` }];
      
      await combatRepo.update(combatId, { 
        participantes: updatedParticipantes, 
        combatLog: updatedLog, 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: combatId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async removeParticipant(combatId, fichaId) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'PREPARACAO') {
        return { success: false, data: null, error: { message: "Combate fora de preparação" } };
      }

      const updatedParticipantes = c.participantes.filter(p => p.campanhaPersonagemId !== fichaId);
      await combatRepo.update(combatId, { 
        participantes: updatedParticipantes, 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: combatId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async addEnemy(combatId, inimigoBase) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'PREPARACAO') {
        return { success: false, data: null, error: { message: "Combate fora de preparação" } };
      }

      const snap = { 
        snapshotId: `enemy_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, 
        id: inimigoBase.id, 
        nome: inimigoBase.nome, 
        nivel: inimigoBase.nivel || 1, 
        hpAtual: inimigoBase.hp || 10, 
        hpMaximo: inimigoBase.hp || 10, 
        ca: inimigoBase.ca || 10, 
        modDestreza: inimigoBase.modDestreza || 0, 
        iniciativa: 0, 
        tipo: 'INIMIGO' 
      };

      const updatedInimigos = [...c.inimigos, snap];
      const updatedLog = [...c.combatLog, { t: new Date().toISOString(), m: `Inimigo ${snap.nome} adicionado.` }];

      await combatRepo.update(combatId, { 
        inimigos: updatedInimigos, 
        combatLog: updatedLog, 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: snap.snapshotId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async removeEnemy(combatId, snapshotId) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'PREPARACAO') {
        return { success: false, data: null, error: { message: "Combate fora de preparação" } };
      }

      const updatedInimigos = c.inimigos.filter(e => e.snapshotId !== snapshotId);
      await combatRepo.update(combatId, { 
        inimigos: updatedInimigos, 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: combatId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async startCombat(combatId) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'PREPARACAO') {
        return { success: false, data: null, error: { message: "Combate já iniciado ou encerrado" } };
      }
      
      const rolar = (mod) => Math.floor(Math.random() * 20) + 1 + mod;
      
      c.participantes.forEach(p => p.iniciativa = rolar(p.modDestreza));
      c.inimigos.forEach(e => e.iniciativa = rolar(e.modDestreza));
      
      const ordem = [...c.participantes, ...c.inimigos].sort((a, b) => b.iniciativa - a.iniciativa);
      
      const updatedStatus = 'ATIVO'; 
      const updatedRodada = 1; 
      const updatedTurno = 0;
      const updatedLog = [...c.combatLog, { 
        t: new Date().toISOString(), 
        m: `Combate iniciado! Ordem: ${ordem.map(o => `${o.nome} (${o.iniciativa})`).join(', ')}` 
      }];
      
      await combatRepo.update(combatId, { 
        status: updatedStatus, 
        rodadaAtual: updatedRodada, 
        turnoAtual: updatedTurno, 
        participantes: c.participantes, 
        inimigos: c.inimigos, 
        combatLog: updatedLog, 
        orderMap: ordem.map(o => o.campanhaPersonagemId || o.snapshotId), 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: combatId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async applyDamage(combatId, { targetId, damage, sourceId, description }) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'ATIVO') return { success: false, data: null, error: { message: "Combate inativo" } };
      
      let pIdx = c.participantes.findIndex(p => p.campanhaPersonagemId === targetId);
      let eIdx = c.inimigos.findIndex(e => e.snapshotId === targetId);
      let alvoNome = "";

      if (pIdx !== -1) {
        c.participantes[pIdx].hpAtual = Math.max(0, c.participantes[pIdx].hpAtual - damage);
        alvoNome = c.participantes[pIdx].nome;
        // Modificação de HP na ficha de campanha (RN-042)
        await fichaService.updateHP(targetId, c.participantes[pIdx].hpAtual);
      } else if (eIdx !== -1) {
        c.inimigos[eIdx].hpAtual = Math.max(0, c.inimigos[eIdx].hpAtual - damage);
        alvoNome = c.inimigos[eIdx].nome;
      } else { 
        return { success: false, data: null, error: { message: "Alvo não localizado no combate" } }; 
      }

      const updatedLog = [...c.combatLog, { 
        t: new Date().toISOString(), 
        m: `DANO: ${alvoNome} sofreu ${damage} de dano por [${sourceId}]. ${description || ""}` 
      }];

      await combatRepo.update(combatId, { 
        participantes: c.participantes, 
        inimigos: c.inimigos, 
        combatLog: updatedLog, 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: combatId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async applyHealing(combatId, { targetId, healing, sourceId, description }) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'ATIVO') return { success: false, data: null, error: { message: "Combate inativo" } };
      
      let pIdx = c.participantes.findIndex(p => p.campanhaPersonagemId === targetId);
      let eIdx = c.inimigos.findIndex(e => e.snapshotId === targetId);
      let alvoNome = "";

      if (pIdx !== -1) {
        c.participantes[pIdx].hpAtual = Math.min(c.participantes[pIdx].hpMaximo, c.participantes[pIdx].hpAtual + healing);
        alvoNome = c.participantes[pIdx].nome;
        // Modificação de HP na ficha de campanha (RN-042)
        await fichaService.updateHP(targetId, c.participantes[pIdx].hpAtual);
      } else if (eIdx !== -1) {
        c.inimigos[eIdx].hpAtual = Math.min(c.inimigos[eIdx].hpMaximo, c.inimigos[eIdx].hpAtual + healing);
        alvoNome = c.inimigos[eIdx].nome;
      } else { 
        return { success: false, data: null, error: { message: "Alvo não localizado no combate" } }; 
      }

      const updatedLog = [...c.combatLog, { 
        t: new Date().toISOString(), 
        m: `CURA: ${alvoNome} curou ${healing} HP por [${sourceId}]. ${description || ""}` 
      }];

      await combatRepo.update(combatId, { 
        participantes: c.participantes, 
        inimigos: c.inimigos, 
        combatLog: updatedLog, 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: combatId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async endCombat(combatId) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c || c.status !== 'ATIVO') return { success: false, data: null, error: { message: "Combate não está ativo" } };
      
      const updatedStatus = 'ENCERRADO';
      const updatedLog = [...c.combatLog, { t: new Date().toISOString(), m: "Combate encerrado pelo Mestre." }];
      
      await combatRepo.update(combatId, { 
        status: updatedStatus, 
        combatLog: updatedLog, 
        dataFim: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: combatId, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async getCombat(id) { 
    try {
      const data = await combatRepo.findById(id); 
      return { success: !!data, data, error: data ? null : { message: "Combate não encontrado" } }; 
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async listCombats(campanhaId) { 
    try {
      const data = await combatRepo.findByCampaign(campanhaId);
      return { success: true, data, error: null }; 
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }
}

export default new CombatService();
