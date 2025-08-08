<script setup lang="ts">
import logo from '@/assets/images/logo.svg';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <div class="about">
        <van-icon :name="logo"></van-icon>
        <p>{{ globalStore.appName }}</p>
        <p>{{ globalStore.appVersion }}</p>
    </div>
</template>

<style lang="less"></style>
