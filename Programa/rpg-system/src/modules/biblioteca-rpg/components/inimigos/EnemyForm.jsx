import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Button,
  MultiSelect,
  Loading,
  Checkbox
} from '../../../../components';
import InimigoService from '../../../../services/InimigoService';
import HabilidadeService from '../../../../services/HabilidadeService';
import MagiaService from '../../../../services/MagiaService';
import ArmaService from '../../../../services/ArmaService';
import ItemService from '../../../../services/ItemService';
import EfeitosCombateService from '../../../../services/EfeitosCombateService';
import StorageService from '../../../../services/StorageService';
import styles from './EnemyForm.module.css';

const EnemyForm = ({ initialData, onSave, onCancel, loading: parentLoading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    imagem: '',
    descricao: '',
    nivel: 1,
    forca: 10,
    destreza: 10,
    constituicao: 10,
    inteligencia: 10,
    sabedoria: 10,
    carisma: 10,
    hpBase: 10,
    caBase: 10,
    deslocamento: 9,
    resistenciasIds: [],
    fraquezasIds: [],
    imunidadesIds: [],
    habilidadesIds: [],
    magiasIds: [],
    armasIds: [],
    xpConcedida: 0,
    lootFixo: [],
    lootRolagem: []
  });

  const [dependencies, setDependencies] = useState({
    habilidades: [],
    magias: [],
    armas: [],
    itens: [],
    efeitos: []
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const loadDependencies = async () => {
      setLoading(true);
      try {
        const [hab, mag, arm, itm, eff] = await Promise.all([
          HabilidadeService.findAll(),
          MagiaService.findAll(),
          ArmaService.findAll(),
          ItemService.findAll(),
          EfeitosCombateService.findAll()
        ]);
        
        setDependencies({
          habilidades: hab.map(h => ({ value: h.id, label: h.nome })),
          magias: mag.map(m => ({ value: m.id, label: m.nome })),
          armas: arm.map(a => ({ value: a.id, label: a.nome })),
          itens: itm.map(i => ({ value: i.id, label: i.nome })),
          efeitos: eff.map(e => ({ value: e.id, label: e.nome }))
        });
      } catch (error) {
        console.error('Erro ao carregar dependências:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDependencies();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const path = `inimigos/${Date.now()}_${file.name}`;
      const url = await StorageService.uploadFile(file, path);
      setFormData(prev => ({ ...prev, imagem: url }));
    } catch (error) {
      alert('Erro ao fazer upload da imagem.');
    } finally {
      setUploading(false);
    }
  };

  const addLootFixo = () => {
    setFormData(prev => ({
      ...prev,
      lootFixo: [...prev.lootFixo, { itemId: '', quantidade: 1 }]
    }));
  };

  const removeLootFixo = (index) => {
    setFormData(prev => ({
      ...prev,
      lootFixo: prev.lootFixo.filter((_, i) => i !== index)
    }));
  };

  const updateLootFixo = (index, field, value) => {
    const newList = [...formData.lootFixo];
    newList[index][field] = field === 'quantidade' ? Number(value) : value;
    setFormData(prev => ({ ...prev, lootFixo: newList }));
  };

  const addLootRolagem = () => {
    setFormData(prev => ({
      ...prev,
      lootRolagem: [...prev.lootRolagem, { itemId: '', quantidade: 1, valorMinimo: 1, valorMaximo: 20 }]
    }));
  };

  const removeLootRolagem = (index) => {
    setFormData(prev => ({
      ...prev,
      lootRolagem: prev.lootRolagem.filter((_, i) => i !== index)
    }));
  };

  const updateLootRolagem = (index, field, value) => {
    const newList = [...formData.lootRolagem];
    newList[index][field] = field === 'itemId' ? value : Number(value);
    setFormData(prev => ({ ...prev, lootRolagem: newList }));
  };

  if (loading) return <Loading label="Carregando dependências..." />;

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.tabs}>
        <button type="button" className={activeTab === 'basic' ? styles.activeTab : ''} onClick={() => setActiveTab('basic')}>Básico</button>
        <button type="button" className={activeTab === 'stats' ? styles.activeTab : ''} onClick={() => setActiveTab('stats')}>Atributos & Combate</button>
        <button type="button" className={activeTab === 'traits' ? styles.activeTab : ''} onClick={() => setActiveTab('traits')}>Características</button>
        <button type="button" className={activeTab === 'loot' ? styles.activeTab : ''} onClick={() => setActiveTab('loot')}>Loot</button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'basic' && (
          <div className={styles.section}>
            <div className={styles.row}>
              <div className={styles.imageSection}>
                <div className={styles.imagePreview}>
                  {formData.imagem ? <img src={formData.imagem} alt="Enemy" /> : <div className={styles.placeholder}>Sem Imagem</div>}
                </div>
                <input type="file" id="enemy-image" accept="image/*" onChange={handleImageUpload} className={styles.fileInput} />
                <label htmlFor="enemy-image" className={styles.uploadButton}>{uploading ? 'Enviando...' : 'Upload'}</label>
              </div>
              <div className={styles.mainFields}>
                <TextBox label="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
                <TextBox label="Nível" name="nivel" type="number" value={formData.nivel} onChange={handleChange} required />
                <TextBox label="XP Concedida" name="xpConcedida" type="number" value={formData.xpConcedida} onChange={handleChange} required />
              </div>
            </div>
            <TextArea label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} required />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className={styles.section}>
            <h3>Atributos</h3>
            <div className={styles.grid6}>
              <TextBox label="FOR" name="forca" type="number" value={formData.forca} onChange={handleChange} />
              <TextBox label="DES" name="destreza" type="number" value={formData.destreza} onChange={handleChange} />
              <TextBox label="CON" name="constituicao" type="number" value={formData.constituicao} onChange={handleChange} />
              <TextBox label="INT" name="inteligencia" type="number" value={formData.inteligencia} onChange={handleChange} />
              <TextBox label="SAB" name="sabedoria" type="number" value={formData.sabedoria} onChange={handleChange} />
              <TextBox label="CAR" name="carisma" type="number" value={formData.carisma} onChange={handleChange} />
            </div>
            <h3>Combate</h3>
            <div className={styles.row}>
              <TextBox label="HP Base" name="hpBase" type="number" value={formData.hpBase} onChange={handleChange} required />
              <TextBox label="CA Base" name="caBase" type="number" value={formData.caBase} onChange={handleChange} required />
              <TextBox label="Deslocamento (m)" name="deslocamento" type="number" value={formData.deslocamento} onChange={handleChange} required />
            </div>
          </div>
        )}

        {activeTab === 'traits' && (
          <div className={styles.section}>
            <div className={styles.row}>
              <MultiSelect label="Resistências" options={dependencies.efeitos} value={formData.resistenciasIds} onChange={(v) => setFormData(p => ({ ...p, resistenciasIds: v }))} />
              <MultiSelect label="Fraquezas" options={dependencies.efeitos} value={formData.fraquezasIds} onChange={(v) => setFormData(p => ({ ...p, fraquezasIds: v }))} />
              <MultiSelect label="Imunidades" options={dependencies.efeitos} value={formData.imunidadesIds} onChange={(v) => setFormData(p => ({ ...p, imunidadesIds: v }))} />
            </div>
            <div className={styles.row}>
              <MultiSelect label="Habilidades" options={dependencies.habilidades} value={formData.habilidadesIds} onChange={(v) => setFormData(p => ({ ...p, habilidadesIds: v }))} />
              <MultiSelect label="Magias" options={dependencies.magias} value={formData.magiasIds} onChange={(v) => setFormData(p => ({ ...p, magiasIds: v }))} />
              <MultiSelect label="Armas" options={dependencies.armas} value={formData.armasIds} onChange={(v) => setFormData(p => ({ ...p, armasIds: v }))} />
            </div>
          </div>
        )}

        {activeTab === 'loot' && (
          <div className={styles.section}>
            <div className={styles.lootHeader}>
              <h3>Loot Fixo (Garantido)</h3>
              <Button type="button" variant="ghost" onClick={addLootFixo}>+ Adicionar</Button>
            </div>
            {formData.lootFixo.map((item, index) => (
              <div key={index} className={styles.lootRow}>
                <Select label="Item" options={dependencies.itens} value={item.itemId} onChange={(e) => updateLootFixo(index, 'itemId', e.target.value)} />
                <TextBox label="Qtd" type="number" value={item.quantidade} onChange={(e) => updateLootFixo(index, 'quantidade', e.target.value)} />
                <Button type="button" variant="danger" onClick={() => removeLootFixo(index)}>Excluir</Button>
              </div>
            ))}

            <div className={styles.lootHeader} style={{ marginTop: '2rem' }}>
              <h3>Loot por Rolagem (Opcional)</h3>
              <Button type="button" variant="ghost" onClick={addLootRolagem}>+ Adicionar</Button>
            </div>
            {formData.lootRolagem.map((item, index) => (
              <div key={index} className={styles.lootRow}>
                <Select label="Item" options={dependencies.itens} value={item.itemId} onChange={(e) => updateLootRolagem(index, 'itemId', e.target.value)} />
                <TextBox label="Mín" type="number" value={item.valorMinimo} onChange={(e) => updateLootRolagem(index, 'valorMinimo', e.target.value)} />
                <TextBox label="Máx" type="number" value={item.valorMaximo} onChange={(e) => updateLootRolagem(index, 'valorMaximo', e.target.value)} />
                <TextBox label="Qtd" type="number" value={item.quantidade} onChange={(e) => updateLootRolagem(index, 'quantidade', e.target.value)} />
                <Button type="button" variant="danger" onClick={() => removeLootRolagem(index)}>Excluir</Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={parentLoading || uploading}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={parentLoading || uploading}>Salvar Inimigo</Button>
      </div>
    </form>
  );
};

export default EnemyForm;
