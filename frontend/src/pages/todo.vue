<script setup lang="ts">
import SlideRouterView from '@/components/SlideRouterView.vue';
import TodoList from '@/components/todo/TodoList.vue';
import DoneList from '@/components/todo/DoneList.vue';
</script>

<template>
    <div class="client-view">
        <slide-router-view direction="down" :duration="350" />

        <todo-list />

        <div class="van-hairline--top"></div>

        <done-list />
    </div>
</template>

<style lang="less" scoped>
.client-view {
    overflow-x: hidden;
    overflow-y: auto;

    .van-hairline--top {
        margin: 0 var(--et-space);
        height: 1px;

        &::after {
            border-color: var(--et-border-color);
        }
    }
}
</style>
