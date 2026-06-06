import { ActivityItem } from "@/types/dashboard";
import styles from "./RecentActivity.module.css";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="card">
      <h3 className={styles.title}>Atividades Recentes</h3>
      <div className={styles.list}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.item}>
            <div className={styles.dot} data-type={activity.type}></div>
            <div className={styles.content}>
              <p className={styles.description}>{activity.description}</p>
              <span className={styles.meta}>
                {activity.user} • {activity.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
