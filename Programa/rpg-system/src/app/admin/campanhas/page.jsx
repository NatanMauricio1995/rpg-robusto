'use client';

import React, { useEffect, useState } from 'react';
import { useCampaigns } from '../../../hooks/useCampaigns';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Button, Loading, Toast, Modal, TextBox, TextArea, ConfirmDialog 
} from '../../../components';

/**
 * CampanhasPage - Interface CRUD para o Módulo de Campanhas
 */
export default function CampanhasPage() {
  const { fetchCampaigns, createCampaign, updateCampaign, closeCampaign, archiveCampaign, loading, error, setError } = useCampaigns();
  const [campanhas, setCampanhas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({ nome: '', descricao: '', mestreId: 'SISTEMA', mundoId: '' });

  const loadData = async () => {
    const res = await fetchCampaigns();
    if (res.success) setCampanhas(res.data);
  };

  useEffect(() => { loadData(); }, []);

  const handleNew = () => {
    setSelected(null);
    setFormData({ nome: '', descricao: '', mestreId: 'SISTEMA', mundoId: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (c) => {
    setSelected(c);
    setFormData({ nome: c.nome, descricao: c.descricao || '', mestreId: c.mestreId, mundoId: c.mundoId || '' });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const res = selected 
      ? await updateCampaign(selected.id, formData)
      : await createCampaign(formData);
    
    if (res.success) {
      setIsModalOpen(false);
      loadData();
    }
  };

  const triggerConfirm = (c, action) => {
    setSelected(c);
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    let res;
    if (confirmAction === 'close') res = await closeCampaign(selected.id);
    else if (confirmAction === 'archive') res = await archiveCampaign(selected.id);
    
    if (res?.success) {
      setIsConfirmOpen(false);
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <SectionTitle title="Módulo de Campanhas" subtitle="Organize e gerencie suas jornadas e sessões de jogo." />
          
          <div style={{ marginBottom: '20px' }}>
            <Button variant="primary" onClick={handleNew}>Nova Campanha</Button>
          </div>

          {loading && !isModalOpen && <Loading />}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px' }}>Campanha</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Mundo</th>
                <th style={{ padding: '15px' }}>Início</th>
                <th style={{ padding: '15px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {campanhas.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>
                    <strong>{c.nome}</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>Mestre: {c.mestreId}</div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                      backgroundColor: c.status === 'ATIVA' ? '#C6F6D5' : '#E2E8F0',
                      color: c.status === 'ATIVA' ? '#22543D' : '#4A5568'
                    }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '15px' }}>{c.mundoId || 'Nenhum'}</td>
                  <td style={{ padding: '15px' }}>{new Date(c.dataInicio).toLocaleDateString()}</td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(c)}>Editar</Button>
                      {c.status === 'ATIVA' && (
                        <Button variant="ghost" size="sm" onClick={() => triggerConfirm(c, 'close')}>Encerrar</Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => triggerConfirm(c, 'archive')}>Arquivar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? "Editar Campanha" : "Nova Campanha"}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <TextBox label="Nome da Campanha" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} required />
              <TextArea label="Descrição" value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} />
              <TextBox label="ID do Mundo (Opcional)" value={formData.mundoId} onChange={e => setFormData({...formData, mundoId: e.target.value})} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button variant="primary" type="submit" loading={loading}>Salvar</Button>
              </div>
            </form>
          </Modal>

          <ConfirmDialog 
            isOpen={isConfirmOpen} 
            onClose={() => setIsConfirmOpen(false)} 
            onConfirm={handleConfirmAction}
            title={confirmAction === 'close' ? "Encerrar Campanha" : "Arquivar Campanha"}
            message={`Tem certeza que deseja ${confirmAction === 'close' ? 'encerrar' : 'arquivar'} a campanha "${selected?.nome}"?`}
            loading={loading}
          />
        </ContentContainer>
      </div>
    </div>
  );
}
