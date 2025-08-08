<script setup lang="ts">
import useGlobalStore from '@/stores/global';
import { ref } from 'vue';

const globalStore = useGlobalStore();
const active = ref('todo');
const config = [
    {
        label: '笔记',
        name: 'note',
        icon: 'column',
        path: '/note',
    },
    {
        label: '待办',
        name: 'todo',
        icon: 'success',
        path: '/todo',
    },
    {
        label: '我的',
        name: 'user',
        icon: 'contact',
        path: '/user',
    },
];
</script>

<template>
    <van-tabbar
        v-model="active"
        :safe-area-inset-bottom="globalStore.safeAreaInsetBottom"
        route
        placeholder
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

<style lang="less" scoped></style>
