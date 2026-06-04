import React from 'react';
   227 import { StatusBadge } from '../ui';
   228
   229 export default function NpcList({ npcs, onEdit }) {
   230   return (
   231     <div className="w-full bg-white rounded border overflow-hidden">
   232       <table className="w-full text-left">
   233         <thead className="bg-red-900 text-white font-medieval">
   234           <tr>
   235             <th className="p-3">Nome / Título</th>
   236             <th className="p-3">Geografia Completa</th>
   237             <th className="p-3">Ações</th>
   238           </tr>
   239         </thead>
   240         <tbody>
   241           {npcs.map(n => (
   242             <tr key={n.id} className="border-b hover:bg-gray-50">
   243               <td className="p-3">
   244                 <div className="font-bold">{n.nome}</div>
   245                 <div className="text-xs text-gray-500">{n.titulo}</div>
   246               </td>
   247               <td className="p-3 text-sm italic text-red-800">{n.locationPath}</td>
   248               <td className="p-3">
   249                 <button onClick={() => onEdit(n)} className="text-blue-600 hover:underline">Ver Detalhes</button>
   250               </td>
   251             </tr>
   252           ))}
   253         </tbody>
   254       </table>
   255     </div>
   256   );
   257 }