import type { PiniaPluginContext, StateTree } from 'pinia';

const KEY_PREFIX = 'PINIA:STATE';

const saveState = (key: string, state: StateTree): void => {
    localStorage.setItem(key, JSON.stringify(state));
};

const loadState = (key: string): object | undefined => {
    const state = localStorage.getItem(key);

    if (state) {
        return JSON.parse(state);
    }
    return undefined;
};

const piniaPersist = (context: PiniaPluginContext) => {
    const { store } = context;
    const key = `${KEY_PREFIX}:${store.$id}`;

    const state = loadState(key);
    if (state) {
        store.$patch(state);
    }

    store.$subscribe((mutation, state) => {
        saveState(key, state);
    });
};

export default piniaPersist;
