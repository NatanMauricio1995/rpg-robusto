"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Background, Skill, Language, Proficiency } from "@/types/library";
import { useEffect, useState } from "react";
import { SkillService } from "@/services/SkillService";
import { LanguageService } from "@/services/LanguageService";
import { ProficiencyService } from "@/services/ProficiencyService";
import styles from "./BackgroundForm.module.css";

const backgroundSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  status: z.enum(["Ativo", "Inativo", "Rascunho"]),
  skillProficiencies: z.array(z.string()).default([]),
  languageProficiencies: z.array(z.string()).default([]),
  toolProficiencies: z.array(z.string()).default([]),
  featureName: z.string().min(2, "O nome da característica é obrigatório"),
  featureDescription: z.string().min(10, "A descrição da característica deve ter pelo menos 10 caracteres"),
  equipmentDescription: z.string().optional(),
});

export type BackgroundFormData = z.infer<typeof backgroundSchema>;

interface BackgroundFormProps {
  initialData?: Partial<Background>;
  onSubmit: (data: BackgroundFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function BackgroundForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading 
}: BackgroundFormProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [tools, setTools] = useState<Proficiency[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [s, l, p] = await Promise.all([
        SkillService.listSkills(),
        LanguageService.listLanguages(),
        ProficiencyService.listProficiencies()
      ]);
      setSkills(s);
      setLanguages(l);
      setTools(p.filter(t => t.type === 'Ferramenta'));
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BackgroundFormData>({
    resolver: zodResolver(backgroundSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status || "Ativo",
      skillProficiencies: initialData?.skillProficiencies || [],
      languageProficiencies: initialData?.languageProficiencies || [],
      toolProficiencies: initialData?.toolProficiencies || [],
      featureName: initialData?.featureName || "",
      featureDescription: initialData?.featureDescription || "",
      equipmentDescription: initialData?.equipmentDescription || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.section}>
        <h3>Informações Básicas</h3>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Nome do Antecedente</label>
          <input id="name" type="text" {...register("name")} className={styles.input} />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <select id="status" {...register("status")} className={styles.select}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Rascunho">Rascunho</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Descrição Geral</label>
          <textarea id="description" {...register("description")} className={styles.textarea} />
        </div>
      </div>

      <div className={styles.section}>
        <h3>Proficiências e Idiomas</h3>
        <div className={styles.formGroup}>
          <label className={styles.label}>Perícias (Múltiplas)</label>
          <div className={styles.checkboxGrid}>
            {skills.map(skill => (
              <label key={skill.id} className={styles.checkboxLabel}>
                <input type="checkbox" value={skill.id} {...register("skillProficiencies")} />
                {skill.name}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Idiomas (Múltiplos)</label>
          <div className={styles.checkboxGrid}>
            {languages.map(lang => (
              <label key={lang.id} className={styles.checkboxLabel}>
                <input type="checkbox" value={lang.id} {...register("languageProficiencies")} />
                {lang.name}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ferramentas (Múltiplas)</label>
          <div className={styles.checkboxGrid}>
            {tools.map(tool => (
              <label key={tool.id} className={styles.checkboxLabel}>
                <input type="checkbox" value={tool.id} {...register("toolProficiencies")} />
                {tool.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Característica Principal</h3>
        <div className={styles.formGroup}>
          <label htmlFor="featureName" className={styles.label}>Nome da Característica</label>
          <input id="featureName" type="text" {...register("featureName")} className={styles.input} />
          {errors.featureName && <span className={styles.error}>{errors.featureName.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="featureDescription" className={styles.label}>Descrição da Característica</label>
          <textarea id="featureDescription" {...register("featureDescription")} className={styles.textarea} />
          {errors.featureDescription && <span className={styles.error}>{errors.featureDescription.message}</span>}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Equipamento</h3>
        <div className={styles.formGroup}>
          <label htmlFor="equipmentDescription" className={styles.label}>Descrição do Equipamento Inicial</label>
          <textarea id="equipmentDescription" {...register("equipmentDescription")} className={styles.textarea} />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Antecedente"}
        </button>
      </div>
    </form>
  );
}
