<script setup lang="ts">
import PickerCell, { type PickerChange } from '../PickerCell.vue';
import useSettingStore, { themes, type Theme } from '@/stores/setting';

const settingStore = useSettingStore();

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
        </van-cell-group>
    </div>
</template>

<style lang="less"></style>
