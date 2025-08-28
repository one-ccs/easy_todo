import type { Manifest } from '@/types/public';
import { fetchTimeout } from './requests';
import {
    mkdirRecursive,
    requestFileSystem,
    resolveLocalFileSystemURL,
    writeFiles,
} from './fileSystem';

async function checkUpdate(url: string | string[], timeout: number): Promise<Manifest> {
    if (typeof url === 'string') {
        url = [url];
    }
    for (let i = 0; i < url.length; i++) {
        try {
            const response = await fetchTimeout(url[i], timeout);
            const json = await response.json();

            return json;
        } catch {
            continue;
        }
    }
    throw new Error('检查更新失败');
}

function downloadUpdate(manifest: Manifest): Promise<JSZip> {
    return new Promise((resolve, reject) => {
        fetchTimeout(manifest.url, 1000 * 60 * 5)
            .then((response) => response.blob())
            .then(JSZip.loadAsync)
            .then(resolve)
            .catch(reject);
    });
}

function unzip(zip: JSZip): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let fs: MyFileSystem | null = null;
        try {
            fs = await requestFileSystem((Window as any).PERSISTENT, 0);
        } catch (err) {
            reject(err);
        }

        await Promise.all(
            Object.values(zip.files)
                .filter((file) => file.dir)
                .map(
                    async (file) =>
                        await mkdirRecursive(fs!, file.name, {
                            create: true,
                            exclusive: false,
                        })
                )
        );

        const files = await Promise.all(
            Object.values(zip.files)
                .filter((file) => !file.dir)
                .map(async (file) => ({
                    path: file.name,
                    data: await file.async('blob'),
                }))
        );
        writeFiles(fs!, files, { create: true, exclusive: false })
            .then((events) => {
                resolve();
            })
            .catch(reject);
    });
}

function uninstallUpdate(paths: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        requestFileSystem(1, 0).then(async (fs) => {
            const rootPath = fs.root.toURL();
            const tasks = paths.map((path) =>
                resolveLocalFileSystemURL(`${rootPath}/${path}`).catch(console.warn)
            );
            const entries = await Promise.all(tasks);

            entries
                .filter((e) => e !== void 0)
                .forEach((entry) => {
                    if (entry.isDirectory) {
                        console.log(`[卸载更新] 删除目录 "${entry.toURL()}"`);

                        (entry as DirectoryEntry).removeRecursively(
                            console.log,
                            console.error
                        );
                    } else {
                        console.log(`[卸载更新] 删除文件 "${entry.toURL()}"`);

                        (entry as FileEntry).remove(console.log, console.error);
                    }
                });
            resolve();
        });
    });
}

export { checkUpdate, downloadUpdate, unzip, uninstallUpdate };
