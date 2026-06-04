import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import CharacterAvatar from '../../rpg/CharacterAvatar';
import styles from './Header.module.css';

/**
 * Header component for RPG Robusto
 */
const Header = ({ onMenuClick, user = { name: 'Mestre' } }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className={styles.logo}>
          <span className={styles.logoText}>RPG</span>
          <span className={styles.logoHighlight}>ROBUSTO</span>
        </div>
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
