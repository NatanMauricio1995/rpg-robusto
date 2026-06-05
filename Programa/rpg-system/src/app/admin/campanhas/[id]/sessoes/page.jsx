'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import { useSessoes } from '../../../../../hooks/useSessoes';
import campaignSrv from '../../../../../services/CampaignService';
import chapterSrv from '../../../../../services/CapituloService';
import {
  Header, Sidebar, ContentContainer, SectionTitle,
  Button, Loading, Toast, Modal, TextBox, TextArea, Select, ConfirmDialog
} from '../../../../../components';

export default function SessaoAdminPage() {
  const params = useParams();
  const router = useRouter();
  const { userType, isMestre } = useAuth();
  const { createSessao, updateSessao, deleteSessao, loadCampaignSessions, loading: hookLoading, error, setError } = useSessoes();

  const [campaign, setCampaign] = useState(null);
  const [capitulos, setCapitulos] = useState([]);
  const [sessoes, setSessoes] = useState([]);
  const [filterCapitulo, setFilterCapitulo] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    numeroSessao: '', titulo: '', descricao: '', dataSessao: '', xpSessao: 0, capituloId: '', observacoesMestre: ''
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [campRes, sessRes, capRes] = await Promise.all([
        campaignSrv.getCampaign(params.id),
        loadCampaignSessions(params.id, { role: userType }),
        chapterSrv.findAll()
      ]);
      if (campRes.success) setCampaign(campRes.data);
      if (sessRes.success) setSessoes(sessRes.data);
      setCapitulos(capRes || []);
    } catch (e) { setError("Erro ao carregar dados."); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (params.id) loadData(); }, [params.id]);

  const handleNew = () => {
    setSelected(null);
    setFormData({ numeroSessao: sessoes.length + 1, titulo: '', descricao: '', dataSessao: new Date().toISOString().split('T')[0], xpSessao: 0, capituloId: '', observacoesMestre: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (s) => {
    setSelected(s);
    setFormData({ ...s });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const res = selected 
      ? await updateSessao(selected.id, formData, { role: userType })
      : await createSessao({ ...formData, campanhaId: params.id }, { role: userType });
    
    if (res.success) { setIsModalOpen(false); loadData(); }
  };

  const handleDelete = async () => {
    const res = await deleteSessao(selected.id, { role: userType });
    if (res.success) { setIsConfirmOpen(false); loadData(); }
  };

  const filteredSessoes = filterCapitulo 
    ? sessoes.filter(s => s.capituloId === filterCapitulo)
    : sessoes;

  if (!isMestre) return <ContentContainer><SectionTitle title="Acesso Negado" /><Button onClick={() => router.back()}>Voltar</Button></ContentContainer>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <SectionTitle title={`Sessões: ${campaign?.nome || '...'}`} subtitle="Gerencie as sessões de jogo e diários de mestre." />
          
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <Button variant="primary" onClick={handleNew}>Nova Sessão</Button>
            <div style={{ width: '250px' }}>
              <Select label="Filtrar por Capítulo" value={filterCapitulo} onChange={e => setFilterCapitulo(e.target.value)} options={[{ value: '', label: 'Todos' }, ...capitulos.map(c => ({ value: c.id, label: c.nome }))]} />
            </div>
          </div>

          {(loading || hookLoading) && <Loading />}

          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px' }}>Nº</th>
                <th style={{ padding: '15px' }}>Título</th>
                <th style={{ padding: '15px' }}>Data</th>
                <th style={{ padding: '15px' }}>Capítulo</th>
                <th style={{ padding: '15px' }}>XP</th>
                <th style={{ padding: '15px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessoes.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{s.numeroSessao}</td>
                  <td style={{ padding: '15px' }}>{s.titulo}</td>
                  <td style={{ padding: '15px' }}>{new Date(s.dataSessao).toLocaleDateString()}</td>
                  <td style={{ padding: '15px' }}>{capitulos.find(c => c.id === s.capituloId)?.nome || '-'}</td>
                  <td style={{ padding: '15px' }}>{s.xpSessao}</td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(s)}>Editar</Button>
                      <Button variant="ghost" size="sm" onClick={() => { setSelected(s); setIsConfirmOpen(true); }}>Excluir</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? "Editar Sessão" : "Nova Sessão"} size="lg">
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '15px' }}>
                <TextBox label="Número" type="number" value={formData.numeroSessao} onChange={e => setFormData({...formData, numeroSessao: e.target.value})} required />
                <TextBox label="Título" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <TextBox label="Data" type="date" value={formData.dataSessao} onChange={e => setFormData({...formData, dataSessao: e.target.value})} required />
                <TextBox label="XP da Sessão" type="number" value={formData.xpSessao} onChange={e => setFormData({...formData, xpSessao: e.target.value})} />
                <Select label="Capítulo" value={formData.capituloId} onChange={e => setFormData({...formData, capituloId: e.target.value})} options={[{ value: '', label: 'Nenhum' }, ...capitulos.map(c => ({ value: c.id, label: c.nome }))]} />
              </div>
              <TextArea label="Descrição Pública" value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} />
              <TextArea label="Observações do Mestre (Privado)" value={formData.observacoesMestre} onChange={e => setFormData({...formData, observacoesMestre: e.target.value})} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button variant="primary" type="submit" loading={hookLoading}>Salvar</Button>
              </div>
            </form>
          </Modal>

          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete} title="Excluir Sessão" message={`Tem certeza que deseja excluir a sessão "${selected?.titulo}"?`} loading={hookLoading} />
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
