<script setup lang="ts">
import { ref, type Component } from 'vue';
import Popup from '@/components/Popup.vue';
import SettingsPopup from '@/components/Popup/Settings.vue';

const popupShown = ref(false);
const popupTitle = ref('');
const components = <{ [key: string]: Component }>{
    设置: SettingsPopup,
};

const show = (title: string) => {
    popupTitle.value = title;
    popupShown.value = true;
};
</script>

<template>
    <div class="client-view">
        <van-cell-group inset>
            <van-cell is-link title="设置" @click="show('设置')" />
        </van-cell-group>

        <popup v-model:shown="popupShown" v-model:title="popupTitle">
            <component :is="components[popupTitle]"></component>
        </popup>
    </div>
</template>

<style lang="less"></style>
