"use client";

import { CharacterSpell } from "@/types/character";
import StatusPill from "@/components/Common/StatusPill/StatusPill";
import styles from "./SpellsTab.module.css";

interface SpellsTabProps {
  spells: CharacterSpell[];
}

export default function SpellsTab({ spells }: SpellsTabProps) {
  const spellsByLevel = spells.reduce((acc, spell) => {
    const level = spell.level;
    if (!acc[level]) acc[level] = [];
    acc[level].push(spell);
    return acc;
  }, {} as Record<number, CharacterSpell[]>);

  const levels = Object.keys(spellsByLevel).map(Number).sort((a, b) => a - b);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Livro de Magias</h3>

      <div className={styles.spellbook}>
        {levels.length === 0 ? (
          <div className={styles.empty}>Nenhuma magia conhecida.</div>
        ) : (
          levels.map((level) => (
            <section key={level} className={styles.levelGroup}>
              <div className={styles.levelHeader}>
                {level === 0 ? 'Truques' : `${level}º Círculo`}
              </div>
              <div className={styles.grid}>
                {spellsByLevel[level].map((spell) => (
                  <div key={spell.id} className={styles.spellCard}>
                    <div className={styles.spellMain}>
                      <span className={styles.spellName}>{spell.name}</span>
                      <span className={styles.spellSchool}>{spell.school}</span>
                    </div>
                    <div className={styles.spellMeta}>
                      <span>⏳ {spell.castingTime}</span>
                      <span>📏 {spell.range}</span>
                    </div>
                    {spell.isPrepared && (
                      <div className={styles.preparedBadge}>
                        <StatusPill status="Preparada" type="info" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
