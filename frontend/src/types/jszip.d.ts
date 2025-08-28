declare class JSZip {
    constructor();
    static loadAsync(
        data: JSZip.InputType,
        options?: JSZip.JSZipLoadOptions
    ): Promise<JSZip>;
    loadAsync(data: JSZip.InputType, options?: JSZip.JSZipLoadOptions): Promise<JSZip>;

    clone(): JSZip;
    comment?: string;
    root: string;
    files: { [path: string]: JSZip.JSZipFile };
}

declare namespace JSZip {
    type InputType = string | ArrayBuffer | Uint8Array | Blob | Buffer;

    interface JSZipLoadOptions {
        base64?: boolean;
        checkCRC32?: boolean;
        optimizedBinaryString?: boolean;
        createFolders?: boolean;
        decodeFileName?(bytes: Uint8Array): string;
    }

    interface JSZipFile {
        comment?: string;
        date: Date;
        dir: boolean;
        dosPermissions?: number;
        name: string;
        options: {
            compression?: string;
            compressionOptions?: any;
        };
        unixPermissions?: number;
        _data: Promise<Buffer | string>;
        _dataBinary: boolean;

        async(type: 'string'): Promise<string>;
        async(type: 'blob'): Promise<Blob>;
        async(type: 'string' | 'blob', onUpdate?: Function): Promise<string | Blob>;
    }
}
