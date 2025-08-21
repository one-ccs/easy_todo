<script setup lang="ts">
import TodoList from '@/components/todo/TodoList.vue';
import DoneList from '@/components/todo/DoneList.vue';

const todoStore = useTodoStore();
</script>

<template>
    <div class="todo-group">
        <todo-list />

        <div class="van-hairline--top"></div>

        <done-list />
    </div>
</template>

<style lang="less" scoped>
.van-hairline--top {
    margin: 0 var(--et-space);
    height: 1px;

    &::after {
        border-color: var(--et-border-color);
    }
}
</style>
