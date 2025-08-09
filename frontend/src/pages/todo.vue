<script setup lang="ts">
import StatusButton, { type ButtonStatus } from '@/components/StatusButton.vue';

const checkStatus = <ButtonStatus[]>[
    { value: true, icon: 'check-circle' },
    { value: false, icon: 'circle' },
];
const list = [
    { text: '完善待办页面', status: false },
    { text: '完善用户页面', status: true },
    { text: '完善管理员页面', status: false },
];

const todoList = list.filter((x) => x.status === false);
const doneList = list.filter((x) => x.status === true);
</script>

<template>
    <div class="client-view">
        <div class="todo">
            <van-swipe-cell v-for="todo in todoList" :left-width="50" :right-width="50">
                <template #default>
                    <div class="todo-wrapper">
                        <van-icon name="check-circle" />
                        <div class="text">{{ todo.text }}</div>
                    </div>
                </template>
                <template #left> left </template>
                <template #right> right </template>
            </van-swipe-cell>
        </div>

        <div class="done">
            <van-swipe-cell v-for="done in doneList" :left-width="50" :right-width="50">
                <template #default>
                    <div class="done-wrapper">
                        <van-icon name="check-circle" />
                        <div class="text">{{ done.text }}</div>
                    </div>
                </template>
                <template #right> right </template>
            </van-swipe-cell>
        </div>
    </div>
</template>

<style lang="less" scoped>
.client-view,
.todo,
.todo-wrapper,
.done,
.done-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}
.todo-wrapper,
.done-wrapper {
    flex-direction: row;
}
</style>
