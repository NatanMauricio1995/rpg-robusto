import React from 'react';
import { WorldNode } from './WorldNode';

export function WorldTree({ tree, onDeleteNode, onTriggerForm, user }) {
  return (
    <div>
      {tree.map(m => (
        <div key={m.id} style={{ background: '#fdfbfa', border: '1px solid #D4AF37', padding: '10px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#58111A', color: '#fff', padding: '8px' }}>
            <strong>🌍 Mundo: {m.nome}</strong>
            <button onClick={() => onDeleteNode('Mundo', m.id)} style={{ color: '#ff8a80', background: 'none', border: 'none', cursor: 'pointer' }}>[Remover]</button>
            <button onClick={() => onTriggerForm('Continente', m.id)} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>[+ Adicionar Continente]</button>
          </div>
          
          {m.continentes?.map(c => (
            <WorldNode key={c.id} node={c} label="🌌 Continente" childLabel="Reino" onDelete={id => onDeleteNode('Continente', id)} onAddChild={(id, lbl) => onTriggerForm(lbl, id)}>
              {c.reinos?.map(k => (
                <WorldNode key={k.id} node={k} label="👑 Reino" childLabel="Cidade" onDelete={id => onDeleteNode('Reino', id)} onAddChild={(id, lbl) => onTriggerForm(lbl, id)}>
                  {k.cidades?.map(d => (
                    <WorldNode key={d.id} node={d} label="🏙️ Cidade" childLabel="Ambiente" onDelete={id => onDeleteNode('Cidade', id)} onAddChild={(id, lbl) => onTriggerForm(lbl, id)}>
                      {d.ambientes?.map(e => (
                        <WorldNode key={e.id} node={e} label="🌲 Ambiente" childLabel="Local" onDelete={id => onDeleteNode('Ambiente', id)} onAddChild={(id, lbl) => onTriggerForm(lbl, id)}>
                          {e.locais?.map(l => (
                            <WorldNode key={l.id} node={l} label="📍 Local" onDelete={id => onDeleteNode('Local', id)} />
                          ))}
                        </WorldNode>
                      ))}
                    </WorldNode>
                  ))}
                </WorldNode>
              ))}
            </WorldNode>
          ))}
        </div>
      ))}
    </div>
  );
}
