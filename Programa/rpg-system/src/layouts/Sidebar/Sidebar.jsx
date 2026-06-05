"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  BookOpen, 
  Shield, 
  Settings,
  ChevronLeft,
  LogOut,
  Sword,
  BarChart
} from 'lucide-react';
import clsx from 'clsx';
import { ROUTES } from '../../utils/routesRegistry';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Sidebar.module.css';

/**
 * Sidebar component for RPG Robusto
 * Adaptada para perfis de Mestre e Jogador
 */
const Sidebar = ({ activeModule = 'dashboard', collapsed = false, onToggle }) => {
  const { isMestre } = useAuth();

  const mestreMenu = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.home },
        { id: 'mundo', label: 'Mundo', icon: Map, href: ROUTES.mundo },
        { id: 'biblioteca', label: 'Biblioteca RPG', icon: BookOpen, href: ROUTES.idiomas },
      ]
    },
    {
      title: 'Gerenciamento',
      items: [
        { id: 'personagens', label: 'Personagens', icon: Users, href: ROUTES.personagens },
        { id: 'campanhas', label: 'Campanhas', icon: Shield, href: ROUTES.campanhas },
        { id: 'combates', label: 'Combates', icon: Sword, href: ROUTES.combates },
        { id: 'relatorios', label: 'Relatórios', icon: BarChart, href: ROUTES.relatorios },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { id: 'configuracoes', label: 'Configurações', icon: Settings, href: null },
      ]
    }
  ];

  const jogadorMenu = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.home },
        { id: 'personagens', label: 'Meus Personagens', icon: Users, href: ROUTES.personagens },
        { id: 'campanhas', label: 'Minhas Campanhas', icon: Shield, href: ROUTES.campanhas },
        { id: 'combates', label: 'Combates', icon: Sword, href: ROUTES.combates },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { id: 'configuracoes', label: 'Configurações', icon: Settings, href: null },
      ]
    }
  ];

  const menuGroups = isMestre ? mestreMenu : jogadorMenu;

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
              {group.items.map((item) => {
                const isDisabled = !item.href;
                const Component = isDisabled ? 'div' : Link;

                return (
                  <Component
                    key={item.id}
                    href={item.href || '#'}
                    className={clsx(
                      styles.item,
                      activeModule === item.id && styles.active,
                      isDisabled && styles.disabled
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon size={20} className={styles.icon} />
                    {!collapsed && <span className={styles.label}>{item.label}</span>}
                    {isDisabled && !collapsed && <span className={styles.badge}>Breve</span>}
                    {activeModule === item.id && <div className={styles.activeIndicator} />}
                  </Component>
                );
              })}
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
