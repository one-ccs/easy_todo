<script setup lang="ts">
import { ref, type Component } from 'vue';
import Popup from '@/components/Popup.vue';
import Setting from '@/components/Popup/Setting.vue';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
const popupShown = ref(false);
const popupTitle = ref('');
const popupComponents = <{ [key: string]: Component }>{
    设置: Setting,
};

const showPopup = (title: string) => {
    popupTitle.value = title;
    popupShown.value = true;
};
</script>

<template>
    <div class="client-view">
        <van-cell-group inset>
            <van-cell
                title="设置"
                @click="showPopup('设置')"
                :size="globalStore.cellSize"
                is-link
            />
        </van-cell-group>

        <popup v-model:shown="popupShown" v-model:title="popupTitle">
            <component :is="popupComponents[popupTitle]"></component>
        </popup>
    </div>
</template>

<style lang="less" scoped></style>
