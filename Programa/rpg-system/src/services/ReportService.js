import campaignRepository from '../repositories/CampaignRepository';
import combatRepository from '../repositories/CombatRepository';
import lootRepository from '../repositories/LootRepository';
import cpRepository from '../repositories/CampanhaPersonagemRepository';

/**
 * ReportService - Responsável pela agregação de dados analíticos do sistema.
 * Regras: Consolidação de múltiplas coleções | DTO de retorno padronizado.
 */
class ReportService {
  async getCampaignReport() {
    try {
      const campanhas = await campaignRepository.findAll() || [];
      const ativas = campanhas.filter(c => c.status === 'ATIVA' || c.status === 'ATIVO' || !c.status).length;
      const encerradas = campanhas.filter(c => c.status === 'ENCERRADA' || c.status === 'ENCERRADO').length;
      
      let totalParticipantes = 0;
      let totalConvites = 0;
      let convitesAceitos = 0;

      campanhas.forEach(c => {
        if (Array.isArray(c.participantes)) totalParticipantes += c.participantes.length;
        // Se houver uma coleção ou subcoleção de convites, aqui seria a agregação
      });

      return {
        success: true,
        data: { totalCampanhas: campanhas.length, ativas, encerradas, totalParticipantes },
        error: null
      };
    } catch (e) {
      return { success: false, data: null, error: { code: 'CAMPAIGN_REPORT_ERR', message: e.message } };
    }
  }

  async getCharacterReport() {
    try {
      const fichas = await cpRepository.findAll() || [];
      const total = fichas.length;
      
      const ativos = fichas.filter(f => f.status === 'ATIVO').length;
      const inativos = fichas.filter(f => f.status === 'INATIVO').length;
      const mortos = fichas.filter(f => f.status === 'MORTO').length;

      const somaNivel = fichas.reduce((acc, f) => acc + (f.nivel || 1), 0);
      const somaXp = fichas.reduce((acc, f) => acc + (f.xp || 0), 0);

      const nivelMedio = total > 0 ? Number((somaNivel / total).toFixed(1)) : 1;
      const xpMedia = total > 0 ? Math.round(somaXp / total) : 0;

      return {
        success: true,
        data: { totalPersonagens: total, ativos, inativos, mortos, nivelMedio, xpMedia },
        error: null
      };
    } catch (e) {
      return { success: false, data: null, error: { code: 'CHARACTER_REPORT_ERR', message: e.message } };
    }
  }

  async getCombatReport() {
    try {
      const combates = await combatRepository.findAll() || [];
      const total = combates.length;

      const vitorias = combates.filter(c => c.resultado === 'VITORIA').length;
      const derrotas = combates.filter(c => c.resultado === 'DERROTA').length;
      const preparacao = combates.filter(c => c.status === 'PREPARACAO').length;

      let totalDanoCausado = 0;

      combates.forEach(c => {
        if (Array.isArray(c.combatLog)) {
          c.combatLog.forEach(log => {
            if (log.type === 'DANO' || log.action === 'DANO') {
              totalDanoCausado += (log.value || 0);
            }
          });
        }
      });

      return {
        success: true,
        data: { totalCombates: total, vitorias, derrotas, preparacao, totalDanoCausado },
        error: null
      };
    } catch (e) {
      return { success: false, data: null, error: { code: 'COMBAT_REPORT_ERR', message: e.message } };
    }
  }

  async getLootReport() {
    try {
      const loots = await lootRepository.findAll() || [];
      const total = loots.length;

      const pendentes = loots.filter(l => l.status === 'PENDENTE').length;
      const encerrados = loots.filter(l => l.status === 'ENCERRADO').length;

      let totalItensGerados = 0;
      const contagemItens = {};

      loots.forEach(l => {
        if (Array.isArray(l.generatedLoot)) {
          l.generatedLoot.forEach(item => {
            totalItensGerados += (item.quantidade || 0);
            const nome = item.nome || item.itemId;
            contagemItens[nome] = (contagemItens[nome] || 0) + (item.quantidade || 0);
          });
        }
      });

      const maisObtidos = Object.entries(contagemItens)
        .map(([nome, quantidade]) => ({ nome, quantidade }))
        .sort((a, b) => b.quantidade - a.quantidade)
        .slice(0, 5);

      return {
        success: true,
        data: { totalLotes: total, lootPendente: pendentes, lootDistribuido: encerrados, totalItensGerados, itensMaisObtidos: maisObtidos },
        error: null
      };
    } catch (e) {
      return { success: false, data: null, error: { code: 'LOOT_REPORT_ERR', message: e.message } };
    }
  }

  async getProgressionReport() {
    try {
      const fichas = await cpRepository.findAll() || [];
      
      let totalXpDistribuida = 0;
      let totalNiveisGanhos = 0;
      let totalHabilidadesDesbloqueadas = 0;

      fichas.forEach(f => {
        totalXpDistribuida += (f.xp || 0);
        totalNiveisGanhos += Math.max(0, (f.nivel || 1) - 1);
        totalHabilidadesDesbloqueadas += Array.isArray(f.habilidadesDesbloqueadas) ? f.habilidadesDesbloqueadas.length : 0;
      });

      return {
        success: true,
        data: { totalXpDistribuida, totalNiveisGanhos, totalHabilidadesDesbloqueadas },
        error: null
      };
    } catch (e) {
      return { success: false, data: null, error: { code: 'PROGRESSION_REPORT_ERR', message: e.message } };
    }
  }

  async getGlobalDashboard() {
    try {
      const [camp, char, comb, loot, prog] = await Promise.all([
        this.getCampaignReport(),
        this.getCharacterReport(),
        this.getCombatReport(),
        this.getLootReport(),
        this.getProgressionReport()
      ]);

      return {
        success: true,
        data: {
          cards: {
            personagens: char.data?.totalPersonagens || 0,
            campanhas: camp.data?.totalCampanhas || 0,
            combates: comb.data?.totalCombates || 0,
            lotesLoot: loot.data?.totalLotes || 0,
            itensGerados: loot.data?.totalItensGerados || 0
          },
          analytics: {
            campanhaReport: camp.data,
            personagemReport: char.data,
            combateReport: comb.data,
            lootReport: loot.data,
            progressionReport: prog.data
          }
        },
        error: null
      };
    } catch (e) {
      return { success: false, data: null, error: { code: 'DASHBOARD_ERR', message: e.message } };
    }
  }
}

export default new ReportService();
