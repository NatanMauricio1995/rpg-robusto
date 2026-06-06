'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Personagens', href: '/personagens' },
  { name: 'Campanhas', href: '/em-construcao' },
  { name: 'Biblioteca RPG', href: '/em-construcao' },
  { name: 'Combates', href: '/em-construcao' },
  { name: 'Mundo', href: '/em-construcao' },
  { name: 'Relatórios', href: '/em-construcao' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col gap-2">
      <div className="text-xl font-bold mb-8 px-2">RPG Robusto</div>
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.href + item.name}
            href={item.href}
            className={`px-4 py-2 rounded-md transition-colors ${
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
