import BaseRepository from './BaseRepository';

export class WorldRepository extends BaseRepository { constructor() { super('mundos'); } }
export class ContinentRepository extends BaseRepository { constructor() { super('continentes'); } }
export class KingdomRepository extends BaseRepository { constructor() { super('reinos'); } }
export class CityRepository extends BaseRepository { constructor() { super('cidades'); } }
export class EnvironmentRepository extends BaseRepository { constructor() { super('ambientes'); } }
export class LocationRepository extends BaseRepository { constructor() { super('locais'); } }

const worldRepo = new WorldRepository();
const continentRepo = new ContinentRepository();
const kingdomRepo = new KingdomRepository();
const cityRepo = new CityRepository();
const envRepo = new EnvironmentRepository();
const locRepo = new LocationRepository();

export { worldRepo, continentRepo, kingdomRepo, cityRepo, envRepo, locRepo };
