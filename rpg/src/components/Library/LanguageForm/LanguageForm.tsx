"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Language } from "@/types/library";
import styles from "./LanguageForm.module.css";

const languageSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  script: z.string().min(2, "O sistema de escrita deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  status: z.enum(["Ativo", "Inativo", "Rascunho"]),
});

export type LanguageFormData = z.infer<typeof languageSchema>;

interface LanguageFormProps {
  initialData?: Partial<Language>;
  onSubmit: (data: LanguageFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function LanguageForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading 
}: LanguageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LanguageFormData>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      name: initialData?.name || "",
      script: initialData?.script || "",
      description: initialData?.description || "",
      status: initialData?.status || "Ativo",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nome do Idioma</label>
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
        <label htmlFor="script" className={styles.label}>Sistema de Escrita (Script)</label>
        <input
          id="script"
          type="text"
          {...register("script")}
          className={styles.input}
          aria-invalid={!!errors.script}
          aria-describedby={errors.script ? "script-error" : undefined}
        />
        {errors.script && (
          <span id="script-error" className={styles.error}>{errors.script.message}</span>
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
          {loading ? "Salvando..." : "Salvar Idioma"}
        </button>
      </div>
    </form>
  );
}
