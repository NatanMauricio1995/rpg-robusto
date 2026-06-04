import ContentContainer from "@/components/layout/ContentContainer";
import StatCard from "@/components/rpg/StatCard";
import ProgressBar from "@/components/rpg/ProgressBar";

import {
  Users,
  ScrollText,
  Swords,
  BookOpen,
} from "lucide-react";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <ContentContainer>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <h1 className={styles.title}>
              Bem-vindo ao RPG Robusto
            </h1>

            <p className={styles.subtitle}>
              Gerencie mundos, personagens,
              campanhas e combates em um único sistema.
            </p>
          </div>
        </section>

        <section className={styles.stats}>
          <StatCard
            label="Personagens"
            value="0"
            icon={Users}
            color="gold"
          />

          <StatCard
            label="Campanhas"
            value="0"
            icon={BookOpen}
            color="gold"
          />

          <StatCard
            label="Combates"
            value="0"
            icon={Swords}
            color="gold"
          />

          <StatCard
            label="Missões"
            value="0"
            icon={ScrollText}
            color="gold"
          />
        </section>

        <section className={styles.progressSection}>
          <h2>Progresso do Projeto</h2>

          <div className={styles.progressGrid}>
            <ProgressBar
              label="Biblioteca RPG"
              value={25}
              max={100}
              showValue
              color="gold"
            />

            <ProgressBar
              label="Personagens"
              value={0}
              max={100}
              showValue
              color="gold"
            />

            <ProgressBar
              label="Campanhas"
              value={0}
              max={100}
              showValue
              color="gold"
            />

            <ProgressBar
              label="Combates"
              value={0}
              max={100}
              showValue
              color="gold"
            />
          </div>
        </section>

        <section className={styles.activity}>
          <h2>Últimas Atividades</h2>

          <div className={styles.activityCard}>
            <p>Nenhuma atividade registrada.</p>
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}