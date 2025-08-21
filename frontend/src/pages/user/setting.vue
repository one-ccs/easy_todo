<script setup lang="ts">
import SlideRouterView from '@/components/SlideRouterView.vue';
import PickerCell, { type PickerData } from '@/components/PickerCell.vue';
import SwitchCell from '@/components/SwitchCell.vue';
import { showConfirmDialog } from 'vant';

const router = useRouter();
const globalStore = useGlobalStore();
const settingStore = useSettingStore();

const onThemeChange = (data: PickerData) => {
    settingStore.setTheme(data.selectedOptions[0] as Theme);
};
const onClearStorage = () => {
    showConfirmDialog({
        title: '警告',
        message: '确定要清除所有本地数据？该操作无法恢复，请谨慎操作！',
        confirmButtonColor: '#f56c6c',
    }).then(() => {
        const hide = globalStore.showLoadingOverlay({ text: '清除中，请稍后...' });

        window.localStorage.clear();
        router.replace(globalStore.homePath);
        setTimeout(() => {
            window.location.reload();
            hide();
        }, 1000);
    });
};
</script>

<template>
    <div class="full-view">
        <slide-router-view />

        <van-nav-bar title="设置" left-arrow @click="$router.back" />

        <div class="view-container">
            <van-cell-group inset>
                <picker-cell
                    title="颜色主题"
                    :model-value="[themes[settingStore.themeIndex]]"
                    :value="themes[settingStore.themeIndex].text"
                    :columns="((): any => themes)()"
                    @confirm="onThemeChange"
                />
                <switch-cell
                    v-model="globalStore.safeNavBarInsetTop"
                    title="顶部状态栏适配"
                />
                <switch-cell
                    v-model="globalStore.safeAreaInsetTop"
                    title="顶部安全区适配"
                />
                <switch-cell
                    v-model="globalStore.safeAreaInsetBottom"
                    title="底部安全区适配"
                />
            </van-cell-group>

            <van-cell-group inset>
                <van-cell
                    title="清除数据"
                    :size="globalStore.cellSize"
                    @click="onClearStorage"
                    is-link
                />
            </van-cell-group>

            <van-cell-group inset>
                <van-cell
                    title="关于"
                    :size="globalStore.cellSize"
                    @click="$router.push('/user/setting/about')"
                    is-link
                />
            </van-cell-group>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
