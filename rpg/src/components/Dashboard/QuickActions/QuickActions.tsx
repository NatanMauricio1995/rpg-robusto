import styles from "./QuickActions.module.css";

export default function QuickActions() {
  return (
    <div className="card">
      <h3 className={styles.title}>Ações Rápidas</h3>
      <div className={styles.grid}>
        <button className="btn btn-primary">
          <span>⚔️</span> Criar Personagem
        </button>
        <button className="btn btn-secondary">
          <span>📜</span> Nova Campanha
        </button>
        <button className="btn btn-secondary">
          <span>🎲</span> Iniciar Sessão
        </button>
        <button className="btn btn-secondary">
          <span>📚</span> Adicionar ao Mundo
        </button>
      </div>
    </div>
  );
}
