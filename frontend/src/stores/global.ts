import { showConfirmDialog, type CellSize, type ConfigProviderThemeVars } from 'vant';
import type { Manifest } from '@/types/public';
import { checkUpdate, downloadUpdate, uninstallUpdate, unzip } from '@/utils/update';
import { compareVersion } from '@/utils/public/version';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        __unstorage: true,
        homePath: '/todo',
        cellSize: <CellSize>'normal',
        switchSize: '1.5em',
        visibilityLog: <string[]>[],

        update: {
            url: ['https://cdn.one-ccs.duckdns.org/app/easy-todo/manifest.json'],
            timeout: 15000,
            debounce: 3000,
            checking: <Promise<Manifest> | null>null,
            downloading: <Promise<JSZip> | null>null,
            updating: <Promise<void> | null>null,
            updateDone: false,
            newVersion: false,
            text: '暂无更新',

            manifest: <Manifest | null>null,
            zip: <JSZip | null>null,
        },
        vanThemeVars: <ConfigProviderThemeVars>{
            navBarHeight: '56px',
        },
        overlay: {
            loading: {
                show: false,
                text: '',
                zIndex: 2,
                color: 'var(--et-color)',
                background: 'var(--et-bgc)',
            },
        },
        todo: {
            singleMax: 3 /* 单次最大添加待办数量 */,
            maxLength: 198 /* 待办内容最大长度 */,
            overlyShown: false,
        },
    }),
    getters: {
        appVersion: () => __APP_VERSION__,
        appName: () => __APP_NAME__,
    },
    actions: {
        showLoadingOverlay({
            text = '',
            zIndex = 2,
            color = 'var(--et-color)',
            background = 'var(--et-bgc)',
        }: {
            text?: string;
            zIndex?: number;
            color?: string;
            background?: string;
        }) {
            this.overlay.loading.text = text;
            this.overlay.loading.zIndex = zIndex;
            this.overlay.loading.color = color;
            this.overlay.loading.background = background;
            this.overlay.loading.show = true;

            return () => (this.overlay.loading.show = false);
        },
        checkUpdate() {
            if (this.update.checking) return this.update.checking;
            if (this.update.manifest) return Promise.resolve(this.update.manifest);

            this.update.text = '正在检查更新...';
            this.update.checking = new Promise((resolve, reject) => {
                checkUpdate(this.update.url, this.update.timeout)
                    .then((manifest) => {
                        if (compareVersion(this.appVersion, manifest.version) < 0) {
                            this.update.newVersion = true;
                            this.update.manifest = manifest;
                            this.update.text = `发现新版本 ${manifest.version}`;
                            resolve(manifest);
                        }
                        this.update.text = '已是最新版本';
                        reject(new Error('已是最新版本'));
                    })
                    .catch((err) => {
                        console.error('[检查更新失败]', err);
                        this.update.text = '检查更新失败，请稍后再试';
                        reject(err);
                    })
                    .finally(() => {
                        this.update.checking = null;
                    });
            });
            return this.update.checking;
        },
        downloadUpdate(manifest: Manifest) {
            if (this.update.downloading) return this.update.downloading;
            if (this.update.zip) return Promise.resolve(this.update.zip);

            this.update.text = '下载更新中...';
            this.update.downloading = new Promise((resolve, reject) => {
                downloadUpdate(manifest)
                    .then((zip) => {
                        this.update.zip = zip;
                        resolve(zip);
                    })
                    .catch((err) => {
                        console.error('[下载更新失败]', err);
                        this.update.text = '下载更新失败，请稍后再试';
                        reject(err);
                    })
                    .finally(() => {
                        this.update.downloading = null;
                    });
            });
            return this.update.downloading;
        },
        doUpdate(zip: JSZip) {
            if (this.update.updating) return this.update.updating;

            this.update.text = '解压中...';
            this.update.updating = new Promise((resolve, reject) => {
                unzip(zip)
                    .then(() => {
                        this.update.updateDone = true;

                        showConfirmDialog({
                            title: '提示',
                            message: '更新成功，是否立即重启应用？',
                            confirmButtonText: '重启',
                            cancelButtonText: '稍后',
                        })
                            .then(() => {
                                window.location.replace('/launch.html');
                            })
                            .catch(() => {
                                this.update.text = '更新成功，请手动重启应用';
                            });
                        resolve();
                    })
                    .catch((err) => {
                        console.error('[解压失败]', err);
                        this.update.text = '解压失败';
                        reject(err);
                    })
                    .finally(() => {
                        this.update.updating = null;
                    });
            });
            return this.update.updating;
        },
        uninstallUpdate() {
            showConfirmDialog({
                title: '提示',
                message: '确定要卸载当前版本吗？',
                confirmButtonText: '确定',
                confirmButtonColor: '#f56c6c',
                cancelButtonText: '取消',
            })
                .then(() => {
                    this.update.text = '卸载中...';

                    uninstallUpdate([
                        '/.vite',
                        '/assets',
                        '/index.html',
                        '/launch.html',
                        '/favicon.ico',
                    ]).then(() => {
                        console.log('[卸载更新成功] 返回启动页');
                        window.location.replace('/launch.html');
                    });
                })
                .catch(() => {});
        },
    },
});
