<script setup lang="ts">
import NavBar from '../NavBar.vue';
</script>

<template>
    <nav-bar>
        <template #left>
            <div class="left van-haptics-feedback">
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
    </nav-bar>
</template>

<style lang="less" scoped></style>
