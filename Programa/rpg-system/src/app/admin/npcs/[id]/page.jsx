'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Header, 
  Sidebar, 
  ContentContainer, 
  SectionTitle, 
  Button,
  Loading,
  Toast
} from '../../../components';
import NpcService from '../../../../services/NpcService';
import LocalService from '../../../../services/LocalService';
import FaccaoService from '../../../../services/FaccaoService';
import OrganizacaoService from '../../../../services/OrganizacaoService';
import styles from '../page.module.css';

export default function NpcDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [npc, setNpc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadNpc = async () => {
      try {
        setLoading(true);
        const data = await NpcService.findById(params.id);
        if (!data) {
          setToast({ message: 'NPC não encontrado.', type: 'error' });
          return;
        }

        // Fetch related names
        const [local, faccao, organizacao] = await Promise.all([
          data.localId ? LocalService.findById(data.localId) : Promise.resolve(null),
          data.faccaoId ? FaccaoService.findById(data.faccaoId) : Promise.resolve(null),
          data.organizacaoId ? OrganizacaoService.findById(data.organizacaoId) : Promise.resolve(null)
        ]);

        setNpc({
          ...data,
          localNome: local?.nome || 'Local desconhecido',
          faccaoNome: faccao?.nome || 'Independente',
          organizacaoNome: organizacao?.nome || 'Nenhuma'
        });
      } catch (error) {
        setToast({ message: 'Erro ao carregar detalhes: ' + error.message, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadNpc();
    }
  }, [params.id]);

  if (loading) return <Loading type="full" label="Carregando detalhes do NPC..." />;
  if (!npc) return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Erro" subtitle="NPC não encontrado." />
          <Button onClick={() => router.push('/admin/npcs')}>Voltar para Lista</Button>
        </ContentContainer>
      </div>
    </div>
  );

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <SectionTitle 
              title={npc.nome} 
              subtitle={`NPC de ${npc.localNome}`}
            />
            <Button variant="ghost" onClick={() => router.push('/admin/npcs')}>Voltar</Button>
          </div>

          <div className={styles.viewContent} style={{ maxWidth: '800px' }}>
            {npc.imagem && (
              <img src={npc.imagem} alt={npc.nome} className={styles.portrait} style={{ maxWidth: '400px' }} />
            )}
            
            <div className={styles.viewRow}>
              <strong>Nome Completo</strong> 
              <span>{npc.nome}</span>
            </div>
            
            <div className={styles.viewRow}>
              <strong>Localização</strong> 
              <span>{npc.localNome}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className={styles.viewRow}>
                <strong>Facção</strong> 
                <span>{npc.faccaoNome}</span>
              </div>
              <div className={styles.viewRow}>
                <strong>Organização</strong> 
                <span>{npc.organizacaoNome}</span>
              </div>
            </div>

            <div className={styles.viewRow}>
              <strong>Descrição Geral</strong> 
              <p>{npc.descricao}</p>
            </div>

            <div className={styles.viewRow}>
              <strong>Personalidade</strong> 
              <p>{npc.personalidade || 'Não detalhada.'}</p>
            </div>

            <div className={styles.viewRow}>
              <strong>História e Background</strong> 
              <p>{npc.historia || 'História não registrada.'}</p>
            </div>

            <div className={styles.viewRow}>
              <strong>Status</strong> 
              <span className={`${styles.statusBadge} ${npc.ativo ? styles.statusActive : styles.statusInactive}`}>
                {npc.ativo ? 'NPC Ativo' : 'NPC Inativo'}
              </span>
            </div>
          </div>
        </ContentContainer>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
