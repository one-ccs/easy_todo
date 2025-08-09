<script setup lang="ts">
export type Direction = 'left' | 'right';

const { direction = 'right', duration = 200 } = defineProps<{
    direction?: Direction;
    duration?: number | {
        enter: number;
        leave: number;
    };
}>();

const transitionName = {
    left: 'van-slide-left',
    right: 'van-slide-right',
};
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition :name="transitionName[direction]" :duration="duration">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style lang="less" scoped></style>
