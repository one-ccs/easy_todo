<script setup lang="ts">
import NavBar from '../NavBar.vue';
</script>

<template>
    <nav-bar >
        <template #left>
            <div class="left">
                <div class="icon">
                    <van-icon name="todo-list" />
                </div>
                <div class="content">
                    <div class="title">待办</div>
                    <div class="desc">25条待办</div>
                </div>
            </div>
        </template>
    </nav-bar>
</template>

<style lang="less" scoped></style>
