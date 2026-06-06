import styles from "./MetricCard.module.css";

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: string;
}

export default function MetricCard({ label, value, subValue, icon }: MetricCardProps) {
  return (
    <div className="card">
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.info}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
          {subValue && <span className={styles.subValue}>{subValue}</span>}
        </div>
      </div>
    </div>
  );
}
