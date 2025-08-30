/**
 * 请求文件系统 API
 * @param type Window.PERSISTENT (1) 或 Window.TEMPORARY (0)
 * @param size 单位为字节
 * @returns
 */
function requestFileSystem(type: number, size: number): Promise<MyFileSystem> {
    return new Promise((resolve, reject) => {
        const fileSystemAPI =
            (window as any).requestFileSystem ?? (window as any).webkitRequestFileSystem;

        if (!fileSystemAPI) {
            reject('文件系统 API "requestFileSystem" 不可用');
        }

        fileSystemAPI(type, size, resolve, reject);
    });
}

/**
 * 获取文件或目录访问权限
 * @param url 路径
 * @returns
 */
function resolveLocalFileSystemURL(url: string): Promise<DirectoryEntry | FileEntry> {
    return new Promise((resolve, reject) => {
        const fileSystemAPI =
            (window as any).resolveLocalFileSystemURL ??
            (window as any).webkitResolveLocalFileSystemURL;

        if (!fileSystemAPI) {
            reject('文件系统 API "resolveLocalFileSystemURL" 不可用');
        }

        fileSystemAPI(url, resolve, reject);
    });
}

/**
 * 判断文件或目录是否存在
 * @param fs 文件系统
 * @param path 相对于文件系统的路径
 * @returns
 */
function isExists(fs: MyFileSystem, path: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        resolveLocalFileSystemURL(fs.root.toURL() + path)
            .then(() => resolve(true))
            .catch(() => reject(false));
    });
}

/**
 * 创建目录
 * @param fs 文件系统
 * @param path 目录路径
 * @param options 配置
 * @returns
 */
function mkdir(
    fs: MyFileSystem,
    path: string,
    options?: GetEntryOptions
): Promise<DirectoryEntry> {
    return new Promise((resolve, reject) => {
        fs.root.getDirectory(path, options ?? {}, resolve, reject);
    });
}

/**
 * 递归创建目录
 * @param fs 文件系统
 * @param path 目录路径
 * @param options 配置
 * @returns
 */
const mkdirRecursive: (
    fs: MyFileSystem,
    path: string,
    options?: GetEntryOptions
) => Promise<DirectoryEntry> = (() => {
    const directoryEntries: { [path: string]: DirectoryEntry } = {};

    return (
        fs: MyFileSystem,
        path: string,
        options?: GetEntryOptions
    ): Promise<DirectoryEntry> => {
        if (!directoryEntries['/']) {
            directoryEntries['/'] = fs.root;
        }
        return new Promise(async (resolve, reject) => {
            const parts = path.split('/').filter(Boolean);
            let currentPath = '/';

            try {
                for (let i = 0; i < parts.length; i++) {
                    const nextPath = currentPath + parts[i] + '/';

                    if (!directoryEntries[nextPath]) {
                        directoryEntries[nextPath] = await mkdir(
                            fs,
                            nextPath,
                            options ?? {}
                        );
                    }

                    currentPath = nextPath;
                }
                resolve(directoryEntries[path]);
            } catch (err) {
                reject(err);
            }
        });
    };
})();

/**
 * 获取 FileEntry 对象
 * @param fs 文件系统
 * @param path 文件路径
 * @param options 配置
 * @returns
 */
function getFile(
    fs: MyFileSystem,
    path: string,
    options?: GetEntryOptions
): Promise<FileEntry> {
    return new Promise((resolve, reject) => {
        fs.root.getFile(path, options ?? {}, resolve, reject);
    });
}

/**
 * 写入文件
 * @param fs 文件系统
 * @param path 路径
 * @param data 要写入的数据
 * @param options 配置
 */
function writeFile(
    fs: MyFileSystem,
    path: string,
    data: Blob,
    options?: GetEntryOptions
): Promise<ProgressEvent> {
    return new Promise(async (resolve, reject) => {
        const fileEntry = await getFile(fs, path, options ?? {});

        fileEntry.createWriter((writer) => {
            writer.onwriteend = (evt) => {
                console.log(`[写入文件] ${fileEntry.toURL()}`);
                resolve(evt);
            };
            writer.onerror = (evt) => {
                console.error(`[写入文件] ${fileEntry.toURL()} 失败`, evt);
                reject(evt);
            };
            writer.write(data);
        }, reject);
    });
}

/**
 * 批量写入文件
 * @param fs 文件系统
 * @param files 文件列表
 * @param options 配置
 * @returns
 */
async function writeFiles(
    fs: MyFileSystem,
    files: { path: string; data: Blob }[],
    options?: GetEntryOptions
): Promise<ProgressEvent[]> {
    const tasks: Promise<ProgressEvent>[] = [];

    for (let i = 0; i < files.length; i++) {
        tasks.push(writeFile(fs, files[i].path, files[i].data, options ?? {}));
    }

    return Promise.all(tasks);
}

export {
    requestFileSystem,
    resolveLocalFileSystemURL,
    isExists,
    mkdir,
    mkdirRecursive,
    writeFile,
    writeFiles,
};
