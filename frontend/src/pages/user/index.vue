<script setup lang="ts">
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <van-button @click="globalStore.toggleTheme()">{{
        globalStore.theme
    }}</van-button>
</template>

<style lang="less"></style>
