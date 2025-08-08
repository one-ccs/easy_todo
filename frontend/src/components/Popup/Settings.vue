<script setup lang="ts">
import { ref, type Component } from 'vue';
import Popup from '../Popup.vue';
import PickerCell, { type PickerChange } from '../PickerCell.vue';
import SwitchCell from '../SwitchCell.vue';
import About from './Settings/About.vue';
import useGlobalStore from '@/stores/global';
import useSettingStore, { themes, type Theme } from '@/stores/setting';

const globalStore = useGlobalStore();
const settingStore = useSettingStore();
const popupShown = ref(false);
const popupTitle = ref('');
const popupComponents = <{ [key: string]: Component }>{
    关于: About,
};

const showPopup = (title: string) => {
    popupTitle.value = title;
    popupShown.value = true;
};
const onThemeChange = (data: PickerChange) => {
    settingStore.setTheme(data.selectedOptions[0] as Theme);
};
</script>

<template>
    <div class="settings">
        <van-cell-group inset>
            <picker-cell
                title="颜色主题"
                :model-value="[settingStore.theme.text]"
                :value="settingStore.theme.text"
                :columns="((): any => themes)()"
                @confirm="onThemeChange"
            />
            <switch-cell v-model="globalStore.safeAreaInsetTop" title="顶部安全区适配" />
            <switch-cell
                v-model="globalStore.safeAreaInsetBottom"
                title="底部安全区适配"
            />
            <van-cell title="关于" @click="showPopup('关于')" is-link />
        </van-cell-group>

        <popup v-model:shown="popupShown" v-model:title="popupTitle">
            <component :is="popupComponents[popupTitle]"></component>
        </popup>
    </div>
</template>

<style lang="less" scoped></style>
