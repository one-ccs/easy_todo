<script setup lang="ts">
const settingStore = useSettingStore();
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
        :safe-area-inset-top="settingStore.safeAreaInsetTop"
        :safe-area-inset-bottom="settingStore.safeAreaInsetBottom"
        :overlay="overlay"
        :style="{ width, height }"
        :duration="duration"
        :position="position"
        close-on-popstate
        teleport="#app"
    >
        <div class="popup">
            <div class="title-wrapper">
                <van-icon name="arrow-left" class="back" @click="shown = false" />
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
    width: 100%;
    height: 100%;

    .title-wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: var(--et-nav-bar-padding);
        height: var(--et-nav-bar-height);

        .back {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: var(--et-nav-bar-icon-size);
            height: var(--et-nav-bar-icon-size);
        }

        .title {
            margin: 0 auto;
            line-height: 1em;
        }
    }
    .container {
        width: 100%;
        height: 100%;
        background-color: var(--et-bgc);
    }
}
</style>
