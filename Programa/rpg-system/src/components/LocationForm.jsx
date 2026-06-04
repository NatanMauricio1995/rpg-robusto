import React, { useState } from 'react';

export function LocationForm({ onSave, environmentId }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('PONTO_INTERESSE');

  return (
    <div style={{ background: '#fff', border: '1px solid #2e7d32', padding: '15px', marginTop: '10px' }}>
      <h4>📍 Adicionar Ponto de Interesse Final (Local)</h4>
      <input type="text" placeholder="Nome do Estabelecimento / Masmorra" value={nome} onChange={e => setNome(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
      <input type="text" placeholder="Tipo (ex: Taberna, Altar, Ruínas)" value={tipo} onChange={e => setTipo(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
      <textarea placeholder="Aspectos narrativos" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
      <button onClick={() => onSave({ nome, descricao, tipo, environmentId })} style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold' }}>
        ➕ Fixar Local no Ambiente
      </button>
    </div>
  );
}
