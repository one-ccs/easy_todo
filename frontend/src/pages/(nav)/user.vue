<script setup lang="ts">
import router from '@/router';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <div class="client-view">
        <p>{{ globalStore.appName }}</p>
        <p>{{ globalStore.appVersion }}</p>

        <van-button @click="globalStore.toggleTheme()">{{
            globalStore.theme
        }}</van-button>
        <van-button @click="router.push('/user/settings')">设置</van-button>

        <van-popup></van-popup>
    </div>
</template>

<style lang="less"></style>
