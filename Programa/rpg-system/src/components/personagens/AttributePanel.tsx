"use client";

import React from 'react';
import { Attributes } from '../../models/Character';
import AttributeService from '../../services/AttributeService';

interface AttributePanelProps {
  attributes: Attributes;
}

export const AttributePanel: React.FC<AttributePanelProps> = ({ attributes }) => {
  const attributeList = [
    { key: 'forca', label: 'Força' },
    { key: 'destreza', label: 'Destreza' },
    { key: 'constituicao', label: 'Constituição' },
    { key: 'inteligencia', label: 'Inteligência' },
    { key: 'sabedoria', label: 'Sabedoria' },
    { key: 'carisma', label: 'Carisma' },
  ];

  return (
    <div className="bg-surface p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-primary">Atributos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {attributeList.map(({ key, label }) => {
          const attr = attributes[key as keyof Attributes];
          const modifier = AttributeService.calculateModifier(attr.total);
          const modDisplay = modifier >= 0 ? `+${modifier}` : modifier;

          return (
            <div key={key} className="flex flex-col items-center p-3 border border-border rounded-lg bg-background/50">
              <span className="text-xs uppercase font-semibold text-muted-foreground">{label}</span>
              <span className="text-2xl font-bold my-1">{attr.total}</span>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                {modDisplay}
              </div>
              <div className="mt-2 text-[10px] text-muted-foreground text-center">
                Base: {attr.base} <br />
                Mods: {attr.modificadores.reduce((acc, m) => acc + m.valor, 0)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttributePanel;
