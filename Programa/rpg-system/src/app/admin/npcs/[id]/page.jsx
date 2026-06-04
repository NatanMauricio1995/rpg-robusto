'use client';
   261 import React, { useEffect, useState } from 'react';
   262 import { useNpcs } from '../../../../hooks/useNpcs';
   263 import { ContentContainer, Header, Sidebar, Loading, SectionTitle } from '../../../../components';
   264
   265 export default function NpcAdminDetailPage({ params }) {
   266   const { getNpc, loading } = useNpcs();
   267   const [npc, setNpc] = useState(null);
   268
   269   useEffect(() => {
   270     getNpc(params.id).then(r => r.success && setNpc(r.data));
   271   }, [params.id]);
   272
   273   if (loading || !npc) return <Loading full label="Consultando registros de habitantes..." />;
   274
   275   return (
   276     <div className="flex flex-col min-h-screen bg-parchment">
   277       <Header />
   278       <div className="flex flex-1">
   279         <Sidebar activeModule="npcs" />
   280         <ContentContainer>
   281           <SectionTitle title={`Ficha de NPC: ${npc.nome}`} subtitle={npc.titulo || 'Habitante do Mundo'} />
   282           
   283           <div className="mt-6 bg-white p-8 rounded border-2 border-red-900 shadow-lg">
   284             <div className="mb-8">
   285               <h4 className="text-red-900 font-medieval text-lg border-b-2 border-red-900 mb-2">📍 Localização Atual</h4>
   286               <p className="text-lg italic font-serif">{npc.locationPath}</p>
   287             </div>
   288
   289             <div className="mb-8">
   290               <h4 className="text-red-900 font-medieval text-lg border-b-2 border-red-900 mb-2">📜 Biografia e Lore</h4>
   291               <p className="whitespace-pre-wrap leading-relaxed font-serif text-gray-800">
   292                 {npc.descricao || "Nenhum relato histórico registrado para este indivíduo nos anais da cartografia."}
   293               </p>
   294             </div>
   295
   296             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-6 border-t">
   297               <div><strong>Vínculo do Sistema:</strong> {npc.id}</div>
   298               <div><strong>Data de Registro:</strong> {new Date(npc.createdAt).toLocaleDateString()}</div>
   299             </div>
   300           </div>
   301         </ContentContainer>
   302       </div>
   303     </div>
   304   );
   305 }