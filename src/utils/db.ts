import Dexie, { Table } from 'dexie';

export interface MyAppDatabase extends Dexie {
    appState: Table<{ id: number; data: any }>;
}

const db: MyAppDatabase = new Dexie('PokemonClickerDataBase') as MyAppDatabase;

db.version(1).stores({
    appState: 'id',
});

export default db;