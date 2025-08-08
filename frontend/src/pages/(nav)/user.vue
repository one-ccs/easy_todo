<script setup lang="ts">
import { ref, type Component } from 'vue';
import Popup from '@/components/Popup.vue';
import Settings from '@/components/Popup/Settings.vue';

const popupShown = ref(false);
const popupTitle = ref('');
const popupComponents = <{ [key: string]: Component }>{
    设置: Settings,
};

const show = (title: string) => {
    popupTitle.value = title;
    popupShown.value = true;
};
</script>

<template>
    <div class="client-view">
        <van-cell-group inset>
            <van-cell title="设置" @click="show('设置')" is-link />
        </van-cell-group>

        <popup v-model:shown="popupShown" v-model:title="popupTitle">
            <component :is="popupComponents[popupTitle]"></component>
        </popup>
    </div>
</template>

<style lang="less" scoped></style>
