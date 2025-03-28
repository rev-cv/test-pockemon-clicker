import { Middleware } from '@reduxjs/toolkit';
import db from './db';

export const saveToIndexedDB: Middleware = (store) => (next) => async (action) => {
    const result = next(action);
    const state = store.getState();

    try {
        await db.appState.put({ id: 1, data: state });
    } catch (error) {
        console.error('Ошибка сохранения store в IndexedDB:', error);
    }

    return result;
};

export const loadFromIndexedDB = async (dispatch: any) => {
    try {
        const record = await db.appState.get(1);
        if (record && record.data) {
            dispatch({ type: 'account/setData', payload: record.data.account });
            dispatch({ type: 'inventory/setData', payload: record.data.inventory });
            dispatch({ type: 'garden/setData', payload: record.data.garden });
            dispatch({ type: 'goods/setData', payload: record.data.goods }); // Исправлено
            dispatch({ type: 'pokemons/setData', payload: record.data.pokemons });
        }
    } catch (error) {
        console.error('Ошибка загрузки данных из IndexedDB:', error);
    }
};