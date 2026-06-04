import React, { useState } from 'react';

export function WorldForm({ onSave, parentId, levelName }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <div style={{ background: '#fff', border: '1px solid #D4AF37', padding: '15px', marginTop: '10px' }}>
      <h4>Adicionar Novo Nó: {levelName}</h4>
      <input type="text" placeholder="Nome Geográfico" value={nome} onChange={e => setNome(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
      <textarea placeholder="Descrição ou Lore" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
      <button onClick={() => onSave({ nome, descricao, parentId })} style={{ background: '#58111A', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold' }}>
        💾 Salvar Estrutura
      </button>
    </div>
  );
}
