'use client';

import React, { useEffect, useState } from 'react';
import { useWorld } from '../../../hooks/useWorld';
import { WorldTree } from '../../../components/WorldTree';
import { WorldForm } from '../../../components/WorldForm';
import { LocationForm } from '../../../components/LocationForm';

export default function CartografiaPainelMundoPage() {
  const { getWorldTree, createWorld, createContinent, createKingdom, createCity, createEnvironment, createLocation, deleteWorld, deleteContinent, deleteKingdom, deleteCity, deleteEnvironment, deleteLocation, loading } = useWorld();
  const [tree, setTree] = useState([]);
  const [formCtx, setFormCtx] = useState(null); // { levelName, parentId }

  const mockUser = { id: 'usr_mestre_01', nome: 'Mestre Cartógrafo', role: 'MESTRE' };

  const load = () => getWorldTree().then(res => res.success && setTree(res.data));
  useEffect(() => { load(); }, []);

  const handleSaveNode = async (fields) => {
    let r;
    if (formCtx.levelName === 'Mundo') r = await createWorld(mockUser, fields);
    if (formCtx.levelName === 'Continente') r = await createContinent(mockUser, { ...fields, worldId: formCtx.parentId });
    if (formCtx.levelName === 'Reino') r = await createKingdom(mockUser, { ...fields, continentId: formCtx.parentId });
    if (formCtx.levelName === 'Cidade') r = await createCity(mockUser, { ...fields, kingdomId: formCtx.parentId });
    if (formCtx.levelName === 'Ambiente') r = await createEnvironment(mockUser, { ...fields, cityId: formCtx.parentId });
    if (formCtx.levelName === 'Local') r = await createLocation(mockUser, { ...fields, environmentId: formCtx.parentId });

    if (r?.success) { setFormCtx(null); load(); } else { alert(`Erro: ${r?.error?.message}`); }
  };

  const handleDeleteNode = async (level, id) => {
    let r;
    if (level === 'Mundo') r = await deleteWorld(mockUser, id);
    if (level === 'Continente') r = await deleteContinent(mockUser, id);
    if (level === 'Reino') r = await deleteKingdom(mockUser, id);
    if (level === 'Cidade') r = await deleteCity(mockUser, id);
    if (level === 'Ambiente') r = await deleteEnvironment(mockUser, id);
    if (level === 'Local') r = await deleteLocation(mockUser, id);

    if (r?.success) { load(); } else { alert(`Restrição de Exclusão: ${r?.error?.message}`); }
  };

  return (
    <div style={{ padding: '20px', background: '#F5F2EB', color: '#1a1a1a', minHeight: '100vh' }}>
      <h1 style={{ color: '#58111A', borderBottom: '3px solid #D4AF37' }}>🗺️ Atlas Geográfico e Árvore de Províncias</h1>
      
      <button onClick={() => setFormCtx({ levelName: 'Mundo', parentId: null })} style={{ background: '#58111A', color: '#fff', border: 'none', padding: '10px 15px', fontWeight: 'bold', cursor: 'pointer', margin: '15px 0' }}>
        ➕ Fundar Novo Mundo Genuíno
      </button>

      {formCtx && (
        formCtx.levelName === 'Local' 
          ? <LocationForm environmentId={formCtx.parentId} onSave={handleSaveNode} />
          : <WorldForm levelName={formCtx.levelName} parentId={formCtx.parentId} onSave={handleSaveNode} />
      )}

      {loading ? <p>Mapeando topografia...</p> : (
        <WorldTree tree={tree} onDeleteNode={handleDeleteNode} onTriggerForm={(lvl, pId) => setFormCtx({ levelName: lvl, parentId: pId })} user={mockUser} />
      )}
    </div>
  );
}
