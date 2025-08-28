declare class MyFileSystem {
    readonly name: string;
    readonly root: DirectoryEntry;
}

declare class Entry {
    readonly filesystem: FileSystem;
    readonly fullPath: string;
    readonly isDirectory: boolean;
    readonly isFile: boolean;
    readonly name: string;
}

declare type GetEntryOptions = {
    create?: boolean;
    exclusive?: boolean;
};

declare class DirectoryEntry extends Entry {
    getDirectory(
        path: string,
        options?: GetEntryOptions,
        successCallback?: (entry: DirectoryEntry) => void,
        errorCallback?: (error: Error) => void
    ): void;
    getFile(
        path: string,
        options?: GetEntryOptions,
        successCallback?: (entry: FileEntry) => void,
        errorCallback?: (error: Error) => void
    ): void;
    toURL(): string;
    remove(successCallback: () => void, errorCallback?: (error: FileError) => void): void;
    removeRecursively(
        successCallback: () => void,
        errorCallback?: (error: FileError) => void
    ): void;
}

declare class FileEntry extends Entry {
    createWriter(
        successCallback: (writer: FileWriter) => void,
        errorCallback?: (error: FileError) => void
    ): void;
    toURL(): string;
    remove(successCallback: () => void, errorCallback?: (error: FileError) => void);
}

declare class FileWriter {
    error: FileError;
    length: number;
    onabort: (event: ProgressEvent) => void;
    onerror: (event: ProgressEvent) => void;
    onprogress: (event: ProgressEvent) => void;
    onwrite: (event: ProgressEvent) => void;
    onwriteend: (event: ProgressEvent) => void;
    onwritestart: (event: ProgressEvent) => void;
    position: number;
    readyState: number;

    write(data: Blob): void;
}
