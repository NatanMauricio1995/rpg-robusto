import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button,
  MultiSelect,
  Loading
} from '../../../../components';
import LocalService from '../../../../services/LocalService';
import FaccaoService from '../../../../services/FaccaoService';
import OrganizacaoService from '../../../../services/OrganizacaoService';
import MissaoService from '../../../../services/MissaoService';
import LojaService from '../../../../services/LojaService';
import StorageService from '../../../../services/StorageService';
import styles from './NpcForm.module.css';

const NpcForm = ({ initialData, onSave, onCancel, loading: parentLoading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    personalidade: '',
    historia: '',
    imagem: '',
    localId: '',
    faccaoId: null,
    organizacaoId: null,
    missoesIds: [],
    lojasIds: [],
    ativo: true
  });

  const [dependencies, setDependencies] = useState({
    locais: [],
    faccoes: [],
    organizacoes: [],
    missoes: [],
    lojas: []
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadDependencies = async () => {
      setLoading(true);
      try {
        const [locais, faccoes, organizacoes, missoes, lojas] = await Promise.all([
          LocalService.findAll(),
          FaccaoService.findAll(),
          OrganizacaoService.findAll(),
          MissaoService.findAll(),
          LojaService.findAll()
        ]);
        
        setDependencies({
          locais: locais.map(l => ({ value: l.id, label: l.nome })),
          faccoes: faccoes.map(f => ({ value: f.id, label: f.nome })),
          organizacoes: organizacoes.map(o => ({ value: o.id, label: o.nome })),
          missoes: missoes.map(m => ({ value: m.id, label: m.nome })),
          lojas: lojas.map(l => ({ value: l.id, label: l.nome }))
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const path = `npcs/${Date.now()}_${file.name}`;
      const url = await StorageService.uploadFile(file, path);
      setFormData(prev => ({ ...prev, imagem: url }));
    } catch (error) {
      alert('Erro ao fazer upload da imagem.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Loading label="Carregando opções..." />;

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <div className={styles.imageSection}>
          <div className={styles.imagePreview}>
            {formData.imagem ? (
              <img src={formData.imagem} alt="NPC Portrait" />
            ) : (
              <div className={styles.placeholder}>Sem Imagem</div>
            )}
          </div>
          <input 
            type="file" 
            id="npc-image-upload" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className={styles.fileInput} 
          />
          <label htmlFor="npc-image-upload" className={styles.uploadButton}>
            {uploading ? 'Enviando...' : 'Upload de Imagem'}
          </label>
        </div>
        
        <div className={styles.mainFields}>
          <TextBox label="Nome do NPC" name="nome" value={formData.nome} onChange={handleChange} required />
          <Select label="Localização Principal" name="localId" options={dependencies.locais} value={formData.localId} onChange={handleChange} required />
        </div>
      </div>

      <div className={styles.row}>
        <Select label="Facção" name="faccaoId" options={[{ value: '', label: 'Nenhuma' }, ...dependencies.faccoes]} value={formData.faccaoId || ''} onChange={handleChange} />
        <Select label="Organização" name="organizacaoId" options={[{ value: '', label: 'Nenhuma' }, ...dependencies.organizacoes]} value={formData.organizacaoId || ''} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <MultiSelect label="Missões Relacionadas" options={dependencies.missoes} value={formData.missoesIds} onChange={(val) => setFormData(p => ({ ...p, missoesIds: val }))} />
        <MultiSelect label="Lojas Relacionadas" options={dependencies.lojas} value={formData.lojasIds} onChange={(val) => setFormData(p => ({ ...p, lojasIds: val }))} />
      </div>

      <TextArea label="Personalidade" name="personalidade" value={formData.personalidade} onChange={handleChange} />
      <TextArea label="História" name="historia" value={formData.historia} onChange={handleChange} />
      <TextArea label="Descrição Geral" name="descricao" value={formData.descricao} onChange={handleChange} required />
      
      <div className={styles.row}>
        <Checkbox label="NPC Ativo no Sistema" name="ativo" checked={formData.ativo} onChange={handleChange} />
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={parentLoading || uploading}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={parentLoading || uploading}>Salvar NPC</Button>
      </div>
    </form>
  );
};

export default NpcForm;
