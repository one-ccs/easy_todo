<script setup lang="ts">
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();

const todo = {
    id: 1,
    title: 'Buy groceries',
    desc: 'Milk, cheese, bread, apples',
    list: [
        {
            title: 'Grocery List',
            content: '',
            tag: '',
        },
    ],
};
</script>

<template>
    <van-config-provider :theme="globalStore.theme">
        <router-view v-slot="{ Component, route }">
            <transition name="van-fade" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>
        <tabbar />
    </van-config-provider>
</template>

<style lang="less" scoped></style>
