'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import { useCampanhaMissoes } from '../../../../../hooks/useCampanhaMissoes';
import campaignSrv from '../../../../../services/CampaignService';
import missionSrv from '../../../../../services/MissaoService';
import chapterSrv from '../../../../../services/CapituloService';
import {
  Header, Sidebar, ContentContainer, SectionTitle,
  Button, Loading, Toast, Modal, Select, ConfirmDialog
} from '../../../../../components';

/**
 * CampanhaMissoesPage - Gerenciamento de missões de uma campanha (FC-004)
 */
export default function CampanhaMissoesPage() {
  const params = useParams();
  const router = useRouter();
  const campanhaId = params.id;
  const { user, userType, isMestre } = useAuth();
  const { 
    fetchCampaignMissions, 
    assignMission, 
    updateMissionStatus, 
    removeMission, 
    loading: hookLoading, 
    error, 
    setError 
  } = useCampanhaMissoes();

  const [campaign, setCampaign] = useState(null);
  const [associações, setAssociações] = useState([]);
  const [missoesGlobais, setMissoesGlobais] = useState([]);
  const [capitulos, setCapitulos] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedAssoc, setSelectedAssoc] = useState(null);
  
  const [formData, setFormData] = useState({ missaoId: '', capituloId: '' });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [campRes, assocRes, missRes, capRes] = await Promise.all([
        campaignSrv.getCampaign(campanhaId),
        fetchCampaignMissions(campanhaId),
        missionSrv.findAll(),
        chapterSrv.findAll()
      ]);

      if (campRes.success) setCampaign(campRes.data);
      if (assocRes.success) setAssociações(assocRes.data);
      setMissoesGlobais(missRes || []);
      setCapitulos(capRes || []);
    } catch (e) {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campanhaId) loadData();
  }, [campanhaId]);

  const handleAddMission = async (e) => {
    e.preventDefault();
    const res = await assignMission({
      campanhaId,
      missaoId: formData.missaoId,
      capituloId: formData.capituloId || null
    }, { role: userType });

    if (res.success) {
      setIsModalOpen(false);
      setFormData({ missaoId: '', capituloId: '' });
      loadData();
    }
  };

  const handleUpdateStatus = async (assocId, newStatus) => {
    const res = await updateMissionStatus(assocId, newStatus, { role: userType });
    if (res.success) loadData();
  };

  const handleRemoveClick = (assoc) => {
    setSelectedAssoc(assoc);
    setIsConfirmOpen(true);
  };

  const handleConfirmRemove = async () => {
    const res = await removeMission(selectedAssoc.id, { role: userType });
    if (res.success) {
      setIsConfirmOpen(false);
      loadData();
    }
  };

  const getMissionName = (id) => missoesGlobais.find(m => m.id === id)?.nome || id;
  const getChapterName = (id) => capitulos.find(c => c.id === id)?.nome || 'Nenhum';

  if (!isMestre) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar activeModule="campanhas" />
          <ContentContainer>
            <SectionTitle title="Acesso Negado" subtitle="Apenas mestres podem gerenciar missões de campanha." />
            <Button onClick={() => router.back()}>Voltar</Button>
          </ContentContainer>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <SectionTitle 
            title={`Missões: ${campaign?.nome || 'Carregando...'}`} 
            subtitle="Gerencie as missões globais ativas nesta campanha." 
          />

          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>Adicionar Missão Global</Button>
            <Button variant="ghost" onClick={() => router.back()}>Voltar</Button>
          </div>

          {(loading || hookLoading) && <Loading />}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px' }}>Missão Global</th>
                <th style={{ padding: '15px' }}>Capítulo</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {associações.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{getMissionName(a.missaoId)}</td>
                  <td style={{ padding: '15px' }}>{getChapterName(a.capituloId)}</td>
                  <td style={{ padding: '15px' }}>
                    <select 
                      value={a.status} 
                      onChange={(e) => handleUpdateStatus(a.id, e.target.value)}
                      style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                      <option value="DISPONIVEL">DISPONÍVEL</option>
                      <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
                      <option value="CONCLUIDA">CONCLUÍDA</option>
                      <option value="FALHADA">FALHADA</option>
                    </select>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveClick(a)}>Remover</Button>
                  </td>
                </tr>
              ))}
              {associações.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
                    Nenhuma missão associada a esta campanha.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Missão à Campanha">
            <form onSubmit={handleAddMission} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Select 
                label="Selecionar Missão Global"
                value={formData.missaoId}
                onChange={e => setFormData({ ...formData, missaoId: e.target.value })}
                options={missoesGlobais.map(m => ({ value: m.id, label: m.nome }))}
                required
              />
              <Select 
                label="Capítulo (Opcional)"
                value={formData.capituloId}
                onChange={e => setFormData({ ...formData, capituloId: e.target.value })}
                options={[
                  { value: '', label: 'Nenhum' },
                  ...capitulos.map(c => ({ value: c.id, label: c.nome }))
                ]}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button variant="primary" type="submit" loading={hookLoading}>Associar</Button>
              </div>
            </form>
          </Modal>

          <ConfirmDialog 
            isOpen={isConfirmOpen} 
            onClose={() => setIsConfirmOpen(false)} 
            onConfirm={handleConfirmRemove}
            title="Remover Missão"
            message={`Tem certeza que deseja remover a missão "${getMissionName(selectedAssoc?.missaoId)}" desta campanha?`}
            loading={hookLoading}
          />
        </ContentContainer>
      </div>
    </div>
  );
}
