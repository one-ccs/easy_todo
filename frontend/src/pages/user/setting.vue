<script setup lang="ts">
import SlideRouterView from '@/components/SlideRouterView.vue';
import PickerCell, { type PickerData } from '@/components/PickerCell.vue';
import SwitchCell from '@/components/SwitchCell.vue';
import useGlobalStore from '@/stores/global';
import useSettingStore, { themes, type Theme } from '@/stores/setting';

const globalStore = useGlobalStore();
const settingStore = useSettingStore();

const routes = [{ title: '关于', path: '/user/setting/about' }];

const onThemeChange = (data: PickerData) => {
    settingStore.setTheme(data.selectedOptions[0] as Theme);
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
                    v-for="route in routes"
                    :title="route.title"
                    :size="globalStore.cellSize"
                    @click="$router.push(route.path)"
                    is-link
                />
            </van-cell-group>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
