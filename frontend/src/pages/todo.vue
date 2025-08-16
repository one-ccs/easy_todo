<script setup lang="ts">
import TodoList from '@/components/todo/TodoList.vue';

const list = ref([
    { title: '完善待办页面', text: '完善待办页面的功能和交互设计', state: false },
    { title: '完善用户页面', state: false },
    { title: '完善管理员页面', state: true },
]);

const todoList = computed(() => list.value.filter((x) => x.state === false));
const doneList = computed(() => list.value.filter((x) => x.state === true));
</script>

<template>
    <div class="client-view">
        <todo-list :list="todoList" />

        <br class="line van-hairline--top" />

        <todo-list :list="doneList" />
    </div>
</template>

<style lang="less" scoped></style>
