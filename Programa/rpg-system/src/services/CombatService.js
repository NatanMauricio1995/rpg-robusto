import combatRepository from '../repositories/CombatRepository';
import campanhaPersonagemRepository from '../repositories/CampanhaPersonagemRepository';
import inimigoRepository from '../repositories/InimigoRepository'; 

/**
 * CombatService - Implementação de Produção
 * Gerencia o ciclo de vida completo do combate tático.
 * Regra: Modificações de HP afetam exclusivamente a Ficha de Campanha.
 */
class CombatService {
  /**
   * Cria a estrutura inicial de um combate na campanha.
   */
  async createCombat({ campanhaId, nome, descricao }) {
    try {
      if (!campanhaId || !nome) {
        return { success: false, data: null, error: { code: 'INVALID_INPUT', message: 'Campanha ID e Nome são obrigatórios.' } };
      }
      
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

  /**
   * Adiciona uma Ficha de Campanha de um personagem ao combate em preparação.
   */
  async addParticipant(combatId, campanhaPersonagemId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      if (combate.status !== 'PREPARACAO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Só é possível adicionar participantes na fase de PREPARACAO.' } };
      
      const ficha = await campanhaPersonagemRepository.findById(campanhaPersonagemId);
      if (!ficha) return { success: false, data: null, error: { code: 'SHEET_NOT_FOUND', message: 'Ficha de campanha não encontrada.' } };

      if (combate.participantes.some(p => p.id === campanhaPersonagemId)) {
        return { success: false, data: null, error: { code: 'DUPLICATE_PARTICIPANT', message: 'Este personagem já está inserido no combate.' } };
      }

      const snapshotParticipante = {
        id: ficha.id,
        nome: ficha.nome,
        nivel: ficha.nivel,
        hpAtual: ficha.hpAtual,
        hpMaximo: ficha.hpMaximo,
        ca: ficha.ca,
        modDestreza: ficha.atributos?.destreza ? Math.floor((ficha.atributos.destreza - 10) / 2) : 0
      };

      combate.participantes.push(snapshotParticipante);
      
      combate.combatLog.push({
        timestamp: new Date().toISOString(),
        type: 'ENTRADA',
        actorId: campanhaPersonagemId,
        targetId: null,
        value: null,
        description: `Participante ${ficha.nome} entrou na preparação do combate.`
      });

      const atualizado = await combatRepository.update(combatId, {
        participantes: combate.participantes,
        combatLog: combate.combatLog,
        updatedAt: new Date().toISOString()
      });

      return { success: true, data: atualizado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'ADD_PARTICIPANT_FAILED', message: err.message } };
    }
  }

  /**
   * Adiciona um snapshot independente de um inimigo à preparação do combate.
   */
  async addEnemy(combatId, inimigoId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      if (combate.status !== 'PREPARACAO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Só é possível adicionar inimigos na fase de PREPARACAO.' } };

      const inimigoBase = await inimigoRepository.findById(inimigoId);
      if (!inimigoBase) return { success: false, data: null, error: { code: 'ENEMY_NOT_FOUND', message: 'Inimigo base não localizado no banco.' } };

      const snapshotId = `enemy_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      const snapshotInimigo = {
        snapshotId,
        inimigoId,
        nome: inimigoBase.nome,
        hpAtual: inimigoBase.hp || inimigoBase.hpMaximo || 10,
        hpMaximo: inimigoBase.hp || inimigoBase.hpMaximo || 10,
        ca: inimigoBase.ca || 10,
        xp: inimigoBase.xp || 0,
        loot: inimigoBase.loot || [],
        modDestreza: inimigoBase.modDestreza || 0
      };

      combate.inimigos.push(snapshotInimigo);

      combate.combatLog.push({
        timestamp: new Date().toISOString(),
        type: 'ENTRADA',
        actorId: snapshotId,
        targetId: null,
        value: null,
        description: `Inimigo ${inimigoBase.nome} inserido na arena.`
      });

      const atualizado = await combatRepository.update(combatId, {
        inimigos: combate.inimigos,
        combatLog: combate.combatLog,
        updatedAt: new Date().toISOString()
      });

      return { success: true, data: atualizado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'ADD_ENEMY_FAILED', message: err.message } };
    }
  }

  /**
   * Rola iniciativas, ordena os combatentes e inicia o combate (Status ATIVO).
   */
  async startCombat(combatId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      if (combate.status !== 'PREPARACAO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Combate não está em fase de preparação.' } };
      if (combate.participantes.length === 0) return { success: false, data: null, error: { code: 'NO_PARTICIPANTS', message: 'Impossível iniciar combate sem participantes.' } };
      if (combate.inimigos.length === 0) return { success: false, data: null, error: { code: 'NO_ENEMIES', message: 'Impossível iniciar combate sem inimigos.' } };

      const rolarD20 = () => Math.floor(Math.random() * 20) + 1;
      const listaIniciativa = [];

      combate.participantes.forEach(p => {
        const total = rolarD20() + (p.modDestreza || 0);
        listaIniciativa.push({ id: p.id, nome: p.nome, iniciativa: total, tipo: 'PARTICIPANTE' });
      });

      combate.inimigos.forEach(e => {
        const total = rolarD20() + (e.modDestreza || 0);
        listaIniciativa.push({ id: e.snapshotId, nome: e.nome, iniciativa: total, tipo: 'INIMIGO' });
      });

      listaIniciativa.sort((a, b) => b.iniciativa - a.iniciativa);
      const ordemIds = listaIniciativa.map(item => item.id);

      combate.status = 'ATIVO';
      combate.rodadaAtual = 1;
      combate.turnoAtual = 0;
      combate.ordemIniciativa = ordemIds;

      combate.combatLog.push({
        timestamp: new Date().toISOString(),
        type: 'COMBATE_INICIADO',
        actorId: 'SISTEMA',
        targetId: null,
        value: null,
        description: `Combate Iniciado! Ordem gerada: ${listaIniciativa.map(i => `${i.nome} [${i.iniciativa}]`).join(', ')}`
      });

      const atualizado = await combatRepository.update(combatId, {
        status: combate.status,
        rodadaAtual: combate.rodadaAtual,
        turnoAtual: combate.turnoAtual,
        ordemIniciativa: combate.ordemIniciativa,
        combatLog: combate.combatLog,
        updatedAt: new Date().toISOString()
      });

      return { success: true, data: atualizado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'START_COMBAT_FAILED', message: err.message } };
    }
  }

  /**
   * Passa para o próximo turno da ordem de iniciativa, avançando a rodada se necessário.
   */
  async nextTurn(combatId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      if (combate.status !== 'ATIVO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'O combate não está ativo.' } };

      let novoTurno = combate.turnoAtual + 1;
      let novaRodada = combate.rodadaAtual;

      if (novoTurno >= combate.ordemIniciativa.length) {
        novoTurno = 0;
        novaRodada += 1;
        combate.combatLog.push({
          timestamp: new Date().toISOString(),
          type: 'NOVA_RODADA',
          actorId: 'SISTEMA',
          targetId: null,
          value: novaRodada,
          description: `Rodada número ${novaRodada} iniciada.`
        });
      }

      const atualAtorId = combate.ordemIniciativa[novoTurno];

      combate.combatLog.push({
        timestamp: new Date().toISOString(),
        type: 'NOVO_TURNO',
        actorId: atualAtorId,
        targetId: null,
        value: novoTurno,
        description: `Turno avançado para o combatente ID: ${atualAtorId}`
      });

      const atualizado = await combatRepository.update(combatId, {
        turnoAtual: novoTurno,
        rodadaAtual: novaRodada,
        combatLog: combate.combatLog,
        updatedAt: new Date().toISOString()
      });

      return { success: true, data: atualizado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'NEXT_TURN_FAILED', message: err.message } };
    }
  }

  /**
   * Aplica dano a um alvo (participante ou inimigo), atualizando a ficha real se for herói.
   */
  async applyDamage(combatId, { targetId, damage, sourceId, description }) {
    try {
      if (damage <= 0) return { success: false, data: null, error: { code: 'INVALID_VALUE', message: 'O valor de dano deve ser maior que zero.' } };

      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      if (combate.status !== 'ATIVO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Ações de dano só podem ser aplicadas em combates ATIVOS.' } };

      let pIdx = combate.participantes.findIndex(p => p.id === targetId);
      let eIdx = combate.inimigos.findIndex(e => e.snapshotId === targetId);
      let nomeAlvo = '';
      let morreu = false;

      if (pIdx !== -1) {
        const antigoHp = combate.participantes[pIdx].hpAtual;
        const novoHp = Math.max(0, antigoHp - damage);
        combate.participantes[pIdx].hpAtual = novoHp;
        nomeAlvo = combate.participantes[pIdx].nome;
        if (novoHp === 0 && antigoHp > 0) morreu = true;

        await campanhaPersonagemRepository.update(targetId, { hpAtual: novoHp, updatedAt: new Date().toISOString() });
      } else if (eIdx !== -1) {
        const antigoHp = combate.inimigos[eIdx].hpAtual;
        const novoHp = Math.max(0, antigoHp - damage);
        combate.inimigos[eIdx].hpAtual = novoHp;
        nomeAlvo = combate.inimigos[eIdx].nome;
        if (novoHp === 0 && antigoHp > 0) morreu = true;
      } else {
        return { success: false, data: null, error: { code: 'TARGET_NOT_FOUND', message: 'Alvo não localizado na lista de combatentes.' } };
      }

      combate.combatLog.push({
        timestamp: new Date().toISOString(),
        type: 'DANO',
        actorId: sourceId,
        targetId,
        value: damage,
        description: `${nomeAlvo} sofreu ${damage} pontos de dano. ${description || ''}`
      });

      if (morreu) {
        combate.combatLog.push({
          timestamp: new Date().toISOString(),
          type: 'MORTE',
          actorId: targetId,
          targetId: null,
          value: null,
          description: `${nomeAlvo} caiu inconsciente ou foi derrotado!`
        });
      }

      await combatRepository.update(combatId, {
        participantes: combate.participantes,
        inimigos: combate.inimigos,
        combatLog: combate.combatLog,
        updatedAt: new Date().toISOString()
      });

      const fimCheck = this.checkCombatEnd(combate);
      if (fimCheck.fim) {
        return await this.endCombat(combatId, fimCheck.resultado);
      }

      return { success: true, data: combate, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'APPLY_DAMAGE_FAILED', message: err.message } };
    }
  }

  /**
   * Aplica cura a um alvo, respeitando o teto do HP Máximo.
   */
  async applyHealing(combatId, { targetId, healing, sourceId, description }) {
    try {
      if (healing <= 0) return { success: false, data: null, error: { code: 'INVALID_VALUE', message: 'O valor de cura deve ser maior que zero.' } };

      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      if (combate.status !== 'ATIVO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Ações de cura só podem ser aplicadas em combates ATIVOS.' } };

      let pIdx = combate.participantes.findIndex(p => p.id === targetId);
      let eIdx = combate.inimigos.findIndex(e => e.snapshotId === targetId);
      let nomeAlvo = '';

      if (pIdx !== -1) {
        const novoHp = Math.min(combate.participantes[pIdx].hpMaximo, combate.participantes[pIdx].hpAtual + healing);
        combate.participantes[pIdx].hpAtual = novoHp;
        nomeAlvo = combate.participantes[pIdx].nome;

        await campanhaPersonagemRepository.update(targetId, { hpAtual: novoHp, updatedAt: new Date().toISOString() });
      } else if (eIdx !== -1) {
        const novoHp = Math.min(combate.inimigos[eIdx].hpMaximo, combate.inimigos[eIdx].hpAtual + healing);
        combate.inimigos[eIdx].hpAtual = novoHp;
        nomeAlvo = combate.inimigos[eIdx].nome;
      } else {
        return { success: false, data: null, error: { code: 'TARGET_NOT_FOUND', message: 'Alvo não localizado na lista de combatentes.' } };
      }

      combate.combatLog.push({
        timestamp: new Date().toISOString(),
        type: 'CURA',
        actorId: sourceId,
        targetId,
        value: healing,
        description: `${nomeAlvo} foi curado em ${healing} HP. ${description || ''}`
      });

      const atualizado = await combatRepository.update(combatId, {
        participantes: combate.participantes,
        inimigos: combate.inimigos,
        combatLog: combate.combatLog,
        updatedAt: new Date().toISOString()
      });

      return { success: true, data: atualizado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'APPLY_HEALING_FAILED', message: err.message } };
    }
  }

  /**
   * Avalia as condições de vida das duas facções para decretar término.
   */
  checkCombatEnd(combate) {
    const todosInimigosMortos = combate.inimigos.every(e => e.hpAtual <= 0);
    if (todosInimigosMortos && combate.inimigos.length > 0) return { fim: true, resultado: 'VITORIA' };

    const todosJogadoresMortos = combate.participantes.every(p => p.hpAtual <= 0);
    if (todosJogadoresMortos && combate.participantes.length > 0) return { fim: true, resultado: 'DERROTA' };

    return { fim: false, resultado: null };
  }

  /**
   * Força o encerramento do combate salvando metadados e fechando o ciclo.
   */
  async endCombat(combatId, resultado) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      
      combate.status = 'ENCERRADO';
      
      combate.combatLog.push({
        timestamp: new Date().toISOString(),
        type: 'COMBATE_FINALIZADO',
        actorId: 'SISTEMA',
        targetId: null,
        value: null,
        description: `Combate encerrado oficialmente. Resultado da mesa: ${resultado}`
      });

      const atualizado = await combatRepository.update(combatId, {
        status: combate.status,
        resultado: resultado, // VITORIA, DERROTA, FUGA
        dataFim: new Date().toISOString(),
        combatLog: combate.combatLog,
        updatedAt: new Date().toISOString()
      });

      return { success: true, data: atualizado, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'END_COMBAT_FAILED', message: err.message } };
    }
  }

  /**
   * Retorna um combate específico.
   */
  async getCombat(id) {
    try {
      const data = await combatRepository.findById(id);
      if (!data) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Combate não localizado.' } };
      return { success: true, data, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'FETCH_FAILED', message: err.message } };
    }
  }

  /**
   * Lista combates associados a uma campanha específica.
   */
  async listCombats(campanhaId) {
    try {
      const data = await combatRepository.findByCampaign(campanhaId);
      return { success: true, data, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'LIST_FAILED', message: err.message } };
    }
  }
}

export default new CombatService();
