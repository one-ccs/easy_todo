interface Cordova {
    file: {
        applicationDirectory: string;
        applicationStorageDirectory: string;
        dataDirectory: string;
        cacheDirectory: string;
    };
}

declare const cordova: Cordova | undefined;
