'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import { useCapitulos } from '../../../../../hooks/useCapitulos';
import { useCampaigns } from '../../../../../hooks/useCampaigns';

export default function GestaoCapitulosPage() {
  const { id: campanhaId } = useParams();
  const { user, isMestre } = useAuth();
  const { loadCapitulos, createCapitulo, updateCapitulo, deleteCapitulo, loading } = useCapitulos();
  const { getCampaign } = useCampaigns();

  const [campanha, setCampanha] = useState(null);
  const [capitulos, setCapitulos] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nome: '', ordem: 1, descricao: '', imagem: '' });

  const fetchData = async () => {
    const campRes = await getCampaign(campanhaId);
    if (campRes.success) setCampanha(campRes.data);

    const capsRes = await loadCapitulos(campanhaId);
    if (capsRes.success) setCapitulos(capsRes.data);
  };

  useEffect(() => {
    if (campanhaId) fetchData();
  }, [campanhaId]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ nome: '', ordem: capitulos.length + 1, descricao: '', imagem: '' });
    setFormOpen(true);
  };

  const handleOpenEdit = (cap) => {
    setEditingId(cap.id);
    setFormData({ nome: cap.nome, ordem: cap.ordem, descricao: cap.descricao, imagem: cap.imagem });
    setFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isMestre) return alert('Apenas o mestre pode realizar esta ação.');

    const res = editingId 
      ? await updateCapitulo(user, editingId, { ...formData, campanhaId })
      : await createCapitulo(user, { ...formData, campanhaId });

    if (res.success) {
      setFormOpen(false);
      fetchData();
    } else {
      alert(res.error.message || 'Erro ao salvar capítulo.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este capítulo?')) return;
    const res = await deleteCapitulo(user, id);
    if (res.success) fetchData();
    else alert(res.error.message);
  };

  if (!isMestre) return <div style={{ padding: '20px' }}>Acesso Negado.</div>;

  return (
    <div style={{ padding: '20px', background: '#F5F2EB', minHeight: '100vh', color: '#1a1a1a' }}>
      <header style={{ borderBottom: '3px solid #D4AF37', marginBottom: '20px' }}>
        <h1 style={{ color: '#58111A' }}>📜 Gestão de Capítulos: {campanha?.nome}</h1>
      </header>

      <button 
        onClick={handleOpenCreate}
        style={{ background: '#58111A', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}
      >
        ➕ Novo Capítulo
      </button>

      {formOpen && (
        <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', marginBottom: '20px', borderRadius: '4px' }}>
          <h3>{editingId ? 'Editar Capítulo' : 'Novo Capítulo'}</h3>
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '10px' }}>
              <label>Nome:</label><br />
              <input type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Ordem:</label><br />
              <input type="number" value={formData.ordem} onChange={e => setFormData({...formData, ordem: Number(e.target.value)})} style={{ width: '100%', padding: '8px' }} min="1" required />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Descrição:</label><br />
              <textarea value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} style={{ width: '100%', padding: '8px', minHeight: '80px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ background: '#58111A', color: '#fff', padding: '8px 15px', border: 'none', cursor: 'pointer' }}>Salvar</button>
              <button type="button" onClick={() => setFormOpen(false)} style={{ background: '#ccc', padding: '8px 15px', border: 'none', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p>Carregando crônicas...</p> : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {capitulos.map(cap => (
            <div key={cap.id} style={{ border: '1px solid #D4AF37', padding: '15px', background: '#fff', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 'bold', color: '#58111A' }}>Capítulo {cap.ordem}:</span> {cap.nome}
                <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>{cap.descricao}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleOpenEdit(cap)} style={{ background: 'none', border: '1px solid #58111A', color: '#58111A', padding: '5px 10px', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => handleDelete(cap.id)} style={{ background: 'none', border: '1px solid #58111A', color: '#58111A', padding: '5px 10px', cursor: 'pointer' }}>Excluir</button>
              </div>
            </div>
          ))}
          {capitulos.length === 0 && <p>Nenhum capítulo fundado para esta campanha.</p>}
        </div>
      )}
    </div>
  );
}
