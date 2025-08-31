<script setup lang="ts">
import TodoItem from '../TodoItem.vue';

const globalStore = useGlobalStore();
const todoStore = useTodoStore();

const todoList = computed(() => {
    return todoStore.todos.filter((todo) => !todo.done);
});

const doneList = computed(() => {
    return todoStore.todos.filter((todo) => todo.done);
});
</script>

<template>
    <div class="todo-ui" :class="{ 'add-overly-shown': globalStore.todo.overlyShown }">
        <div class="todo-list">
            <todo-item
                v-for="(todo, index) in todoList"
                :key="index"
                v-model="todoList[index]"
            />
        </div>

        <div class="van-hairline--top"></div>

        <div class="done-list">
            <todo-item
                v-for="(todo, index) in doneList"
                :key="index"
                v-model="doneList[index]"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.todo-ui {
    transition: margin-top 0.3s ease-in-out;

    &.add-overly-shown {
        margin-top: calc(64px * 3 + 5em);
    }
    .todo-item {
        margin: var(--et-space) 0;
    }
    .van-hairline--top {
        margin: 0 var(--et-space);
        height: 1px;

        &::after {
            border-color: var(--et-border-color);
        }
    }
}
</style>
