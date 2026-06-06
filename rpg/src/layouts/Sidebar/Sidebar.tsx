import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        borderRight: "1px solid #ddd",
        padding: "16px",
      }}
    >
      <nav>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            listStyle: "none",
          }}
        >
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/mundo">Mundo</Link></li>
          <li><Link href="/biblioteca">Biblioteca RPG</Link></li>
          <li><Link href="/personagens">Personagens</Link></li>
          <li><Link href="/campanhas">Campanhas</Link></li>
          <li><Link href="/combates">Combates</Link></li>
          <li><Link href="/relatorios">Relatórios</Link></li>
          <li><Link href="/configuracoes">Configurações</Link></li>
        </ul>
      </nav>
    </aside>
  );
}