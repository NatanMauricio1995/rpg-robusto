import React, { useState } from 'react';

export function WorldNode({ node, label, onDelete, onAddChild, user, childLabel }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginLeft: '20px', borderLeft: '1px dashed #D4AF37', paddingLeft: '10px', marginTop: '5px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '6px', border: '1px solid #eee' }}>
        <span onClick={() => setOpen(!open)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>{open ? '▼' : '▶'} {label}: {node.nome}</span>
        <button onClick={() => onDelete(node.id)} style={{ color: '#c62828', background: 'none', border: 'none', cursor: 'pointer' }}>[Excluir]</button>
        {childLabel && <button onClick={() => onAddChild(node.id, childLabel)} style={{ color: '#2e7d32', background: 'none', border: 'none', cursor: 'pointer' }}>[+ {childLabel}]</button>}
      </div>
      {open && (
        <div style={{ padding: '5px', fontSize: '0.9rem', color: '#555' }}>
          <p style={{ margin: '2px 0 8px 0' }}>{node.descricao}</p>
        </div>
      )}
    </div>
  );
}
