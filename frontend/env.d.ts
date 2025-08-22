/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

declare const __APP_VERSION__: string;
declare const __APP_NAME__: string;

interface Cordova {
    file: {
        applicationDirectory: string;
        applicationStorageDirectory: string;
        dataDirectory: string;
        cacheDirectory: string;
    };
}

declare const cordova: Cordova | undefined;
