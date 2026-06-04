import classeRepository from '../repositories/ClasseRepository';
import subclassRepository from '../repositories/SubclasseRepository';
import habilidadeRepository from '../repositories/HabilidadeRepository';
import magiaRepository from '../repositories/MagiaRepository';
import campanhaPersonagemRepository from '../repositories/CampanhaPersonagemRepository';

/**
 * UnlockService - Responsável pelo desbloqueio dinâmico de habilidades e magias.
 * Regras: RN-023 e RN-024 | Consulta coleções globais para atualizar a Ficha de Campanha.
 */
class UnlockService {
  /**
   * Varre e filtra as habilidades globais elegíveis à classe/subclasse e nível atual
   */
  async unlockAbilities(classeNome, subclasseNome, nivelAtual, habilidadesExistentes = []) {
    try {
      const todasAbilidades = await habilidadeRepository.findAll() || [];
      const jaDesbloqueadas = new Set(habilidadesExistentes.map(h => h.id));

      const elegiveis = todasAbilidades.filter(ab => {
        const porClasse = ab.classe?.toLowerCase() === classeNome?.toLowerCase();
        const porSubclasse = subclasseNome && ab.subclasse 
          ? ab.subclasse?.toLowerCase() === subclasseNome?.toLowerCase() 
          : !ab.subclasse; // Se não tem subclasse no herói, só pega habs de classe pura
        
        const nivelReq = Number(ab.nivelDesbloqueio || ab.nivel || 1);
        const porNivel = nivelReq <= Number(nivelAtual);
        
        return (porClasse || (subclasseNome && porSubclasse)) && porNivel && !jaDesbloqueadas.has(ab.id);
      });

      return elegiveis.map(ab => ({ 
        id: ab.id, 
        nome: ab.nome, 
        descricao: ab.descricao || '', 
        nivelDesbloqueio: ab.nivelDesbloqueio || ab.nivel || 1 
      }));
    } catch (e) {
      console.error("Erro ao desbloquear habilidades:", e);
      return [];
    }
  }

  /**
   * Varre e filtra as magias globais elegíveis à classe/subclasse e nível atual
   */
  async unlockSpells(classeNome, subclasseNome, nivelAtual, magiasExistentes = []) {
    try {
      const todasMagias = await magiaRepository.findAll() || [];
      const jaDesbloqueadas = new Set(magiasExistentes.map(m => m.id));

      const elegiveis = todasMagias.filter(mg => {
        const porClasse = mg.classe?.toLowerCase() === classeNome?.toLowerCase();
        const porSubclasse = subclasseNome && mg.subclasse 
          ? mg.subclasse?.toLowerCase() === subclasseNome?.toLowerCase() 
          : !mg.subclasse;
        
        const nivelReq = Number(mg.nivelDesbloqueio || mg.nivel || 1);
        const porNivel = nivelReq <= Number(nivelAtual);
        
        return (porClasse || (subclasseNome && porSubclasse)) && porNivel && !jaDesbloqueadas.has(mg.id);
      });

      return elegiveis.map(mg => ({ 
        id: mg.id, 
        nome: mg.nome, 
        descricao: mg.descricao || '', 
        nivelDesbloqueio: mg.nivelDesbloqueio || mg.nivel || 1 
      }));
    } catch (e) {
      console.error("Erro ao desbloquear magias:", e);
      return [];
    }
  }

  /**
   * Centraliza a verificação de novos conteúdos da classe/subclasse para acoplamento na Ficha de Campanha
   */
  async unlockLevelContent(campanhaPersonagemId, novoNivel) {
    try {
      const ficha = await campanhaPersonagemRepository.findById(campanhaPersonagemId);
      if (!ficha) {
        return { success: false, data: null, error: { code: 'SHEET_NOT_FOUND', message: 'Ficha de campanha não localizada.' } };
      }

      const habsAtuais = Array.isArray(ficha.habilidadesDesbloqueadas) ? ficha.habilidadesDesbloqueadas : [];
      const magsAtuais = Array.isArray(ficha.magiasDesbloqueadas) ? ficha.magiasDesbloqueadas : [];

      // Executa os filtros de elegibilidade estrita
      const novasHabs = await this.unlockAbilities(ficha.classe, ficha.subclasse, novoNivel, habsAtuais);
      const novasMags = await this.unlockSpells(ficha.classe, ficha.subclasse, novoNivel, magsAtuais);

      if (novasHabs.length === 0 && novasMags.length === 0) {
        return { success: true, data: { novasHabilidades: [], novasMagias: [], totalHabilidades: habsAtuais.length, totalMagias: magsAtuais.length }, error: null };
      }

      const habilidadesDesbloqueadas = [...habsAtuais, ...novasHabs];
      const magiasDesbloqueadas = [...magsAtuais, ...novasMags];

      const logsEvolucao = Array.isArray(ficha.progressionLog) ? ficha.progressionLog : [];
      const novaEntradaLog = {
        timestamp: new Date().toISOString(),
        nivelNovo: Number(novoNivel),
        habilidadesAdquiridas: novasHabs.map(h => h.nome),
        magiasAdquiridas: novasMags.map(m => m.nome)
      };
      logsEvolucao.push(novaEntradaLog);

      const dadosAtualizados = {
        habilidadesDesbloqueadas,
        magiasDesbloqueadas,
        progressionLog: logsEvolucao,
        ultimaProgressao: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await campanhaPersonagemRepository.update(campanhaPersonagemId, dadosAtualizados);

      return {
        success: true,
        data: {
          campanhaPersonagemId,
          novasHabilidades: novasHabs,
          novasMagias: novasMags,
          totalHabilidades: habilidadesDesbloqueadas.length,
          totalMagias: magiasDesbloqueadas.length
        },
        error: null
      };
    } catch (err) {
      return { success: false, data: null, error: { code: 'UNLOCK_CONTENT_FAILED', message: err.message } };
    }
  }
}

export default new UnlockService();
