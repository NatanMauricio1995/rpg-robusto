"use client";

import React from 'react';
import Link from 'next/link';
import { Bell, Search, Menu } from 'lucide-react';
import CharacterAvatar from '../../components/rpg/CharacterAvatar';
import { ROUTES } from '../../utils/routesRegistry';
import styles from './Header.module.css';

/**
 * Header component for RPG Robusto
 * Atualizado via Auditoria de Rotas (ETAPA 6)
 */
const Header = ({ onMenuClick, user = { name: 'Mestre' } }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <Link href={ROUTES.home} className={styles.logo}>
          <span className={styles.logoText}>RPG</span>
          <span className={styles.logoHighlight}>ROBUSTO</span>
        </Link>
      </div>

      <div className={styles.center}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Buscar no sistema..." className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Notificações">
          <Bell size={20} />
          <span className={styles.badge} />
        </button>
        
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>Dungeon Master</span>
          </div>
          <CharacterAvatar size="sm" name={user.name} status="online" />
        </div>
      </div>
    </header>
  );
};

export default Header;
