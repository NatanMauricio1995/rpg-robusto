import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: string;
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="card">
      <div className={styles.container}>
        <div className={styles.info}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
          {trend && <span className={styles.trend}>{trend}</span>}
        </div>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
    </div>
  );
}
