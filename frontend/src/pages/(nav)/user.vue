<script setup lang="ts">
import router from '@/router';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <div class="view">
        <p>{{ globalStore.appName }}</p>
        <p>{{ globalStore.appVersion }}</p>

        <van-button @click="globalStore.toggleTheme()">{{
            globalStore.theme
        }}</van-button>
        <van-button @click="router.push('/user/settings')">设置</van-button>
    </div>
</template>

<style lang="less"></style>
