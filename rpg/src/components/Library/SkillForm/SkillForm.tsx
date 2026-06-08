"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Skill } from "@/types/library";
import styles from "./SkillForm.module.css";

const skillSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  attribute: z.enum(['FOR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'], {
    errorMap: () => ({ message: "Selecione um atributo válido" })
  }),
  description: z.string().optional(),
  status: z.enum(["Ativo", "Inativo", "Rascunho"]),
});

export type SkillFormData = z.infer<typeof skillSchema>;

interface SkillFormProps {
  initialData?: Partial<Skill>;
  onSubmit: (data: SkillFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function SkillForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading 
}: SkillFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initialData?.name || "",
      attribute: initialData?.attribute || "DEX",
      description: initialData?.description || "",
      status: initialData?.status || "Ativo",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nome da Perícia</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={styles.input}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="attribute" className={styles.label}>Atributo Base</label>
        <select id="attribute" {...register("attribute")} className={styles.select}>
          <option value="FOR">Força (FOR)</option>
          <option value="DEX">Destreza (DEX)</option>
          <option value="CON">Constituição (CON)</option>
          <option value="INT">Inteligência (INT)</option>
          <option value="WIS">Sabedoria (WIS)</option>
          <option value="CHA">Carisma (CHA)</option>
        </select>
        {errors.attribute && (
          <span id="attribute-error" className={styles.error}>{errors.attribute.message}</span>
        )}
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
        <label htmlFor="description" className={styles.label}>Descrição</label>
        <textarea
          id="description"
          {...register("description")}
          className={styles.textarea}
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Perícia"}
        </button>
      </div>
    </form>
  );
}
