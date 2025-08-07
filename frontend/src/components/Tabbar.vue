<script setup lang="ts">
import useGlobalStore from '@/stores/global';
import config from '@/config/tabbar.json';

const globalStore = useGlobalStore();
</script>

<template>
    <van-tabbar
        route
        placeholder
        :safe-area-inset-bottom="globalStore.safeAreaInsetBottom"
    >
        <van-tabbar-item
            v-for="item in config"
            :name="item.name"
            :icon="item.icon"
            :to="item.path"
            >{{ item.label }}</van-tabbar-item
        >
    </van-tabbar>
</template>

<style lang="less"></style>
