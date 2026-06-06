type HeaderProps = {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header
      style={{
        height: "60px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <h2>{title ?? "RPG Robusto"}</h2>

      <div>
        Pesquisa | Notificações | Perfil
      </div>
    </header>
  );
}