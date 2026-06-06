import styles from "./CharacterTable.module.css";
import { Character } from "@/types/character";

interface CharacterTableProps {
  characters: Character[];
}

export default function CharacterTable({ characters }: CharacterTableProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Ativo': return 'badge-success';
      case 'Inativo': return 'badge-warning';
      case 'Morto': return 'badge-error';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Raça / Classe</th>
            <th>Nível</th>
            <th>Campanha</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => (
            <tr key={char.id} className={styles.row}>
              <td>
                <div className={styles.nameCell}>
                  <div className={styles.avatarPlaceholder}>
                    {char.name.charAt(0)}
                  </div>
                  <span className={styles.name}>{char.name}</span>
                </div>
              </td>
              <td>
                <span className={styles.subtext}>{char.race} {char.class}</span>
              </td>
              <td>
                <span className={styles.level}>Nível {char.level}</span>
              </td>
              <td>
                <span className={styles.campaign}>{char.campaign}</span>
              </td>
              <td>
                <span className={`badge ${getStatusBadgeClass(char.status)}`}>
                  {char.status}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button title="Visualizar" className={styles.actionBtn}>👁️</button>
                  <button title="Editar" className={styles.actionBtn}>✍️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
