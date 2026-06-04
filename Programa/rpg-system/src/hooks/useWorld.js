import { useState } from 'react';
import worldService from '../services/WorldService';

export function useWorld() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const exec = async (fn) => {
    setLoading(true); setError(null);
    const r = await fn();
    setLoading(false);
    if (!r.success) setError(r.error);
    return r;
  };

  return {
    createWorld: (user, d) => exec(() => worldService.createWorld(user, d)),
    updateWorld: (user, id, d) => exec(() => worldService.updateWorld(user, id, d)),
    deleteWorld: (user, id) => exec(() => worldService.deleteWorld(user, id)),
    
    createContinent: (user, d) => exec(() => worldService.createContinent(user, d)),
    deleteContinent: (user, id) => exec(() => worldService.deleteContinent(user, id)),
    
    createKingdom: (user, d) => exec(() => worldService.createKingdom(user, d)),
    deleteKingdom: (user, id) => exec(() => worldService.deleteKingdom(user, id)),

    createCity: (user, d) => exec(() => worldService.createCity(user, d)),
    deleteCity: (user, id) => exec(() => worldService.deleteCity(user, id)),

    createEnvironment: (user, d) => exec(() => worldService.createEnvironment(user, d)),
    deleteEnvironment: (user, id) => exec(() => worldService.deleteEnvironment(user, id)),

    createLocation: (user, d) => exec(() => worldService.createLocation(user, d)),
    deleteLocation: (user, id) => exec(() => worldService.deleteLocation(user, id)),

    getWorldTree: () => exec(() => worldService.getWorldTree()),
    loading,
    error
  };
}
