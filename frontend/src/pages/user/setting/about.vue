<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import logo from '@/assets/images/logo.svg';

const globalStore = useGlobalStore();

const onCheckUpdate = () => {
    if (
        globalStore.update.checking ||
        globalStore.update.downloading ||
        globalStore.update.updating
    ) {
        return;
    }

    globalStore.checkUpdate().then((manifest) => {
        if (globalStore.update.zip) {
            globalStore.doUpdate(globalStore.update.zip);
        } else {
            showConfirmDialog({
                title: '提示',
                message: `发现新版本 ${manifest.version}，是否立即更新？`,
                confirmButtonText: '是',
                cancelButtonText: '否',
            })
                .then(() => {
                    globalStore
                        .downloadUpdate(manifest)
                        .then(globalStore.doUpdate)
                        .catch(console.error);
                })
                .catch(() => {
                    console.log('取消更新');
                });
        }
    });
};
</script>

<template>
    <div class="full-view">
        <van-nav-bar title="关于" left-arrow @click="$router.back" />

        <div class="about">
            <div class="logo">
                <van-icon :name="logo" />
            </div>
            <div class="app-name">Easy Todo</div>

            <van-cell-group class="actions" inset>
                <van-cell
                    title="当前版本"
                    :value="'v' + globalStore.appVersion"
                    :size="globalStore.cellSize"
                />
                <van-cell
                    class="check-version"
                    title="检查更新"
                    :size="globalStore.cellSize"
                    @click="onCheckUpdate"
                    is-link
                >
                    <template #value>
                        <div class="flex-center">
                            <van-loading
                                size="18px"
                                v-if="
                                    globalStore.update.checking ||
                                    globalStore.update.downloading
                                "
                            />
                            <div>{{ globalStore.update.text }}</div>
                            <van-badge
                                v-if="globalStore.update.newVersion"
                                class="version-badge"
                                content="new"
                            />
                        </div>
                    </template>
                </van-cell>
                <van-cell
                    title="卸载更新"
                    :size="globalStore.cellSize"
                    @click="globalStore.uninstallUpdate"
                    is-link
                />
            </van-cell-group>

            <div class="footer">
                <div class="copyright">Copyright ©2025 ONE-CCS 版权所有</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.about {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;

    .logo {
        margin-top: 8vh;
        font-size: 8em;
    }
    .app-name {
        font-size: 2em;
    }
    .actions {
        margin-top: 2em;
        width: 80%;

        :deep(.check-version) {
            .van-cell__title {
                flex: 1 0 auto;
            }
            .van-cell__value {
                flex: 1 1 auto;
            }
        }
        .flex-center {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .version-badge {
            margin-left: 0.5em;
            transform: unset;
        }
    }
    .footer {
        margin: auto auto 2.5em;
        font-size: 0.75em;
        color: var(--et-sub-color);
    }
}
</style>
