<script setup lang="ts">
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <van-nav-bar :safe-area-inset-top="globalStore.safeAreaInsetTop" left-disabled>
        <template #left>
            <div class="left">
                <div class="icon">
                    <van-icon name="user" />
                </div>
                <div class="content">
                    <div class="title">昵称</div>
                    <div class="desc">账号：xx**888</div>
                </div>
            </div>
        </template>
    </van-nav-bar>
</template>

<style lang="less"></style>
