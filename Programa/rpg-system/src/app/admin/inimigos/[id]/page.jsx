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
import InimigoService from '../../../../services/InimigoService';
import HabilidadeService from '../../../../services/HabilidadeService';
import MagiaService from '../../../../services/MagiaService';
import ArmaService from '../../../../services/ArmaService';
import ItemService from '../../../../services/ItemService';
import EfeitosCombateService from '../../../../services/EfeitosCombateService';
import styles from '../page.module.css';

export default function EnemyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [enemy, setEnemy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [enrichedData, setEnrichedData] = useState({
    resistencias: [],
    fraquezas: [],
    imunidades: [],
    habilidades: [],
    magias: [],
    armas: [],
    lootFixo: [],
    lootRolagem: []
  });

  useEffect(() => {
    const loadEnemy = async () => {
      try {
        setLoading(true);
        const data = await InimigoService.findById(params.id);
        if (!data) {
          setToast({ message: 'Inimigo não encontrado.', type: 'error' });
          return;
        }
        setEnemy(data);

        // Fetch all dependencies to enrich IDs
        const [eff, hab, mag, arm, itm] = await Promise.all([
          EfeitosCombateService.findAll(),
          HabilidadeService.findAll(),
          MagiaService.findAll(),
          ArmaService.findAll(),
          ItemService.findAll()
        ]);

        const findName = (list, id) => list.find(x => x.id === id)?.nome || id;

        setEnrichedData({
          resistencias: data.resistenciasIds.map(id => findName(eff, id)),
          fraquezas: data.fraquezasIds.map(id => findName(eff, id)),
          imunidades: data.imunidadesIds.map(id => findName(eff, id)),
          habilidades: data.habilidadesIds.map(id => findName(hab, id)),
          magias: data.magiasIds.map(id => findName(mag, id)),
          armas: data.armasIds.map(id => findName(arm, id)),
          lootFixo: data.lootFixo.map(l => ({ ...l, nome: findName(itm, l.itemId) })),
          lootRolagem: data.lootRolagem.map(l => ({ ...l, nome: findName(itm, l.itemId) }))
        });

      } catch (error) {
        setToast({ message: 'Erro ao carregar detalhes: ' + error.message, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadEnemy();
    }
  }, [params.id]);

  if (loading) return <Loading type="full" label="Carregando detalhes do inimigo..." />;
  if (!enemy) return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="bestiario" />
        <ContentContainer>
          <SectionTitle title="Erro" subtitle="Inimigo não encontrado." />
          <Button onClick={() => router.push('/admin/inimigos')}>Voltar</Button>
        </ContentContainer>
      </div>
    </div>
  );

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="bestiario" />
        <ContentContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <SectionTitle title={enemy.nome} subtitle={`Nível ${enemy.nivel} • XP: ${enemy.xpConcedida}`} />
            <Button variant="ghost" onClick={() => router.push('/admin/inimigos')}>Voltar</Button>
          </div>

          <div className={styles.viewContent} style={{ maxWidth: '900px' }}>
            {enemy.imagem && (
              <img src={enemy.imagem} alt={enemy.nome} style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', marginBottom: '2rem' }} />
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <Stat label="FOR" value={enemy.forca} />
              <Stat label="DES" value={enemy.destreza} />
              <Stat label="CON" value={enemy.constituicao} />
              <Stat label="INT" value={enemy.inteligencia} />
              <Stat label="SAB" value={enemy.sabedoria} />
              <Stat label="CAR" value={enemy.carisma} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className={styles.viewRow}>
                <strong>HP Base</strong>
                <span>{enemy.hpBase}</span>
              </div>
              <div className={styles.viewRow}>
                <strong>CA Base</strong>
                <span>{enemy.caBase}</span>
              </div>
              <div className={styles.viewRow}>
                <strong>Deslocamento</strong>
                <span>{enemy.deslocamento}m</span>
              </div>
            </div>

            <div className={styles.viewRow}>
              <strong>Descrição</strong>
              <p>{enemy.descricao}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <TraitList label="Resistências" items={enrichedData.resistencias} />
              <TraitList label="Fraquezas" items={enrichedData.fraquezas} />
              <TraitList label="Imunidades" items={enrichedData.imunidades} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <TraitList label="Habilidades" items={enrichedData.habilidades} />
              <TraitList label="Magias" items={enrichedData.magias} />
              <TraitList label="Armas" items={enrichedData.armas} />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Loot Garantido</h3>
              <div className={styles.viewRow}>
                {enrichedData.lootFixo.length > 0 ? (
                  <ul>
                    {enrichedData.lootFixo.map((l, i) => <li key={i}>{l.quantidade}x {l.nome}</li>)}
                  </ul>
                ) : <span>Nenhum loot fixo.</span>}
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Loot por Rolagem</h3>
              <div className={styles.viewRow}>
                {enrichedData.lootRolagem.length > 0 ? (
                  <ul>
                    {enrichedData.lootRolagem.map((l, i) => <li key={i}>[{l.valorMinimo}-{l.valorMaximo}] {l.quantidade}x {l.nome}</li>)}
                  </ul>
                ) : <span>Nenhum loot por rolagem.</span>}
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div style={{ textAlign: 'center', backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px' }}>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 'bold' }}>{label}</div>
    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</div>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
      {Math.floor((value - 10) / 2) >= 0 ? `+${Math.floor((value - 10) / 2)}` : Math.floor((value - 10) / 2)}
    </div>
  </div>
);

const TraitList = ({ label, items }) => (
  <div className={styles.viewRow}>
    <strong>{label}</strong>
    <span>{items.length > 0 ? items.join(', ') : 'Nenhum'}</span>
  </div>
);
