"use client";

import styles from "./CombatTimeline.module.css";

interface TimelineEvent {
  id: string;
  round: number;
  timestamp: string;
  description: string;
  type: 'damage' | 'heal' | 'status' | 'turn' | 'system';
}

interface CombatTimelineProps {
  events: TimelineEvent[];
}

export default function CombatTimeline({ events }: CombatTimelineProps) {
  return (
    <div className={styles.timeline}>
      <h3 className={styles.title}>Crônica do Encontro</h3>
      <div className={styles.list}>
        {events.map((event) => (
          <div key={event.id} className={styles.item} data-type={event.type}>
            <div className={styles.meta}>
              <span className={styles.round}>R{event.round}</span>
              <span className={styles.time}>{event.timestamp}</span>
            </div>
            <p className={styles.desc}>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
