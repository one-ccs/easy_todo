<script setup lang="ts">
import { type NavBarProps } from 'vant';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
const props = defineProps<Partial<NavBarProps>>();
</script>

<template>
    <van-nav-bar
        v-bind="props"
        :safe-area-inset-top="props.safeAreaInsetTop ?? globalStore.safeAreaInsetTop"
    >
        <template v-for="(_, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData ?? {}"></slot>
        </template>
    </van-nav-bar>
</template>

<style lang="less" scoped></style>
