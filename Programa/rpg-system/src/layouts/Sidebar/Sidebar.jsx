"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  BookOpen, 
  Shield, 
  Settings,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

/**
 * Sidebar component for RPG Robusto
 */
const Sidebar = ({ activeModule = 'dashboard', collapsed = false, onToggle }) => {
  const menuGroups = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'campanhas', label: 'Campanhas', icon: Map },
        { id: 'personagens', label: 'Personagens', icon: Users },
      ]
    },
    {
      title: 'Recursos',
      items: [
        { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen },
        { id: 'bestiario', label: 'Bestiário', icon: Shield },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { id: 'configuracoes', label: 'Configurações', icon: Settings },
      ]
    }
  ];

  return (
    <aside className={clsx(styles.sidebar, collapsed && styles.collapsed)}>
      <div className={styles.toggleWrapper}>
        <button className={styles.toggleBtn} onClick={onToggle}>
          <ChevronLeft className={clsx(styles.toggleIcon, collapsed && styles.rotated)} />
        </button>
      </div>

      <nav className={styles.nav}>
        {menuGroups.map((group, idx) => (
          <div key={idx} className={styles.group}>
            {!collapsed && <h3 className={styles.groupTitle}>{group.title}</h3>}
            <div className={styles.items}>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={clsx(
                    styles.item,
                    activeModule === item.id && styles.active
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={20} className={styles.icon} />
                  {!collapsed && <span className={styles.label}>{item.label}</span>}
                  {activeModule === item.id && <div className={styles.activeIndicator} />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn}>
          <LogOut size={20} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
