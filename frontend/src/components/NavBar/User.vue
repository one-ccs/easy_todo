<script setup lang="ts">
import StatusButton, { type ButtonStatus } from '../StatusButton.vue';
import useGlobalStore from '@/stores/global';
import useSettingStore, { themes, type Theme } from '@/stores/setting';

const globalStore = useGlobalStore();
const settingStore = useSettingStore();

const onThemeChange = (data: Theme) => {
    settingStore.setTheme(data);
};
</script>

<template>
    <van-nav-bar :safe-area-inset-top="globalStore.safeAreaInsetTop" left-disabled>
        <template #left>
            <div class="left">
                <div class="icon">
                    <van-icon name="user" />
                </div>
                <div class="content">
                    <div class="title">昵称</div>
                    <div class="desc">账号：xx**888</div>
                </div>
            </div>
        </template>
        <template #right>
            <status-button
                class="theme-button"
                :model-value="themes[settingStore.themeIndex]"
                :status-list="themes"
                @change="onThemeChange"
                size="small"
                icon-prefix="fa"
                hairline
                round
            />
        </template>
    </van-nav-bar>
</template>

<style lang="less" scoped>
.theme-button::after {
    border: unset;
}
</style>
