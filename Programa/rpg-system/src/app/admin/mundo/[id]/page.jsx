'use client';

import React, { useEffect, useState } from 'react';
import { worldRepo } from '../../../../repositories/WorldRepositories';

export default function DetalhesMundoGeografiaPage({ params }) {
  const [mundo, setMundo] = useState(null);

  useEffect(() => {
    worldRepo.findById(params.id).then(res => setMundo(res));
  }, [params.id]);

  if (!mundo) return <div style={{ padding: '20px', background: '#F5F2EB' }}>Consultando tomos cartográficos...</div>;

  return (
    <div style={{ padding: '20px', background: '#F5F2EB', color: '#1a1a1a', minHeight: '100vh' }}>
      <h2 style={{ color: '#58111A', borderBottom: '2px solid #D4AF37' }}>Ficha Macrogeográfica: {mundo.nome}</h2>
      <p>ID do Sistema: <code>{mundo.id}</code></p>
      <p>Status Operacional: <strong>{mundo.status}</strong></p>
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: '20px', marginTop: '15px' }}>
        <h3>Crônicas e Lore do Mundo</h3>
        <p>{mundo.descricao}</p>
      </div>
    </div>
  );
}
