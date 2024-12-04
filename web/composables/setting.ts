import {createGlobalState, useStorage} from '@vueuse/core'

interface GlobalState {
    token_type: string;
    access_token: string;
    locale: string;
}

export const useGlobalState = createGlobalState(() =>
    useStorage<GlobalState>('app-setting', {
        token_type: '',
        access_token: '',
        locale: '',
    })
);
