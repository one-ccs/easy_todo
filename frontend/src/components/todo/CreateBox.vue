<script setup lang="ts">
import type { Todo } from '@/stores/todo';

const globalStore = useGlobalStore();
const todoStore = useTodoStore();
const shown = ref(false);
const todo = ref<Partial<Pick<Todo, 'done' | 'text'>>>({});

const onDoneClick = () => {
    shown.value = false;

    if (todo.value.text) {
        todoStore.addTodo(todo.value.text);
    }
};
</script>

<template>
    <van-cell-group class="add-todo" inset title="新建">
        <van-cell :size="globalStore.cellSize" center>
            <template #icon>
                <van-checkbox v-model="todo.done" />
            </template>
            <template #title>
                <van-field
                    v-model="todo.text"
                    type="textarea"
                    rows="5"
                    autosize
                    autocomplete="off"
                />
            </template>
        </van-cell>
        <van-button @click="onDoneClick">完成</van-button>
    </van-cell-group>
</template>

<style lang="less" scoped>
:deep(.van-cell) {
    .van-field__control {
        max-height: 30vh;
    }
}
</style>
