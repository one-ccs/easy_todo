<script setup lang="ts">
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
const shown = defineModel('shown', { default: false, required: true });
const title = defineModel('title', { default: '' });
const {
    overlay = false,
    width = '100%',
    height = '100%',
    duration = 0.2,
    position = 'right',
} = defineProps<{
    overlay?: boolean;
    width?: string;
    height?: string;
    duration?: number;
    position?: 'right' | 'left';
}>();
</script>

<template>
    <van-popup
        v-model:show="shown"
        :safe-area-inset-top="globalStore.safeAreaInsetTop"
        :safe-area-inset-bottom="globalStore.safeAreaInsetBottom"
        :overlay="overlay"
        :style="{ width, height }"
        :duration="duration"
        :position="position"
        close-on-popstate
    >
        <div class="popup">
            <div class="title-wrapper">
                <van-icon name="arrow-left" class="nav-icon" @click="shown = false" />
                <div class="title">{{ title }}</div>
            </div>
            <div class="container">
                <slot></slot>
            </div>
        </div>
    </van-popup>
</template>

<style lang="less" scoped>
.popup {
    display: flex;
    flex-direction: column;

    .title-wrapper {
        display: flex;
        align-items: center;
        justify-content: left;
        padding: var(--et-nav-bar-padding);
        height: var(--et-nav-bar-height);

        .title {
            margin-left: var(--et-nav-bar-space);
            font-weight: bold;
            line-height: 1em;
        }
    }
}
</style>
