<script setup lang="ts">
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <van-nav-bar :safe-area-inset-top="globalStore.safeAreaInsetTop">
        <template #left>
            <div class="left">
                <div class="icon">
                    <van-icon name="notes" />
                </div>
                <div class="content">
                    <div class="title">
                        <span>笔记</span>
                        <van-icon name="play" style="color: unset" />
                    </div>
                    <div class="desc">25篇笔记</div>
                </div>
            </div>
        </template>
    </van-nav-bar>
</template>

<style lang="less" scoped></style>
