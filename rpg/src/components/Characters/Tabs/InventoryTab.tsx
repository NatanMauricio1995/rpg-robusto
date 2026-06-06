"use client";

import { InventoryItem } from "@/types/character";
import StatusPill from "@/components/Common/StatusPill/StatusPill";
import styles from "./InventoryTab.module.css";

interface InventoryTabProps {
  items: InventoryItem[];
}

export default function InventoryTab({ items }: InventoryTabProps) {
  const totalWeight = items.reduce((acc, item) => acc + (item.weight * item.quantity), 0);

  const getRarityType = (rarity: string): any => {
    switch (rarity) {
      case 'Comum': return 'default';
      case 'Incomum': return 'success';
      case 'Raro': return 'info';
      case 'Muito Raro': return 'warning';
      case 'Lendário': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Mochila e Equipamentos</h3>
        <div className={styles.weightBadge}>
          Carga: <strong>{totalWeight.toFixed(1)} lb</strong>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtd</th>
              <th>Peso (Un)</th>
              <th>Raridade</th>
              <th>Custo</th>
              <th className={styles.actions}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>Nenhum item no inventário.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className={styles.row}>
                  <td>
                    <span className={styles.itemName}>{item.name}</span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.weight} lb</td>
                  <td>
                    <StatusPill status={item.rarity} type={getRarityType(item.rarity)} />
                  </td>
                  <td>{item.cost}</td>
                  <td className={styles.actions}>
                    <button className={styles.actionBtn} title="Remover">🗑️</button>
                    <button className={styles.actionBtn} title="Usar/Equipar">⚔️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
