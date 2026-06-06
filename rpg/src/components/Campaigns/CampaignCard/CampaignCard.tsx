import styles from "./CampaignCard.module.css";
import { Campaign } from "@/types/campaign";

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ativa': return 'badge-success';
      case 'Pausada': return 'badge-warning';
      case 'Finalizada': return 'badge-secondary';
      case 'Recrutando': return 'badge-error'; // Usando error para destaque
      default: return '';
    }
  };

  return (
    <div className={`${styles.card} card`}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={`badge ${getStatusBadge(campaign.status)} ${styles.status}`}>
            {campaign.status}
          </span>
          <h3 className={styles.name}>{campaign.name}</h3>
          <span className={styles.system}>{campaign.system} • {campaign.world}</span>
        </div>
      </div>

      <p className={styles.description}>{campaign.description}</p>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Mestre</span>
          <span className={styles.infoValue}>{campaign.dm}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Jogadores</span>
          <span className={styles.infoValue}>{campaign.playerCount}/{campaign.maxPlayers}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Frequência</span>
          <span className={styles.infoValue}>{campaign.frequency}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Próxima Sessão</span>
          <span className={`${styles.infoValue} ${campaign.nextSession ? styles.highlight : ''}`}>
            {campaign.nextSession || 'Não agendada'}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <button className="btn btn-secondary btn-sm">Ver Detalhes</button>
        <button className="btn btn-primary btn-sm">Gerenciar Sessões</button>
      </div>
    </div>
  );
}
