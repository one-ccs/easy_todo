<script setup lang="ts">
import type { Todo } from '@/stores/todo';

const globalStore = useGlobalStore();
const todoStore = useTodoStore();

const onCheckBoxClick = (todo: Todo) => {
    todoStore.removeTodo(todo);
    setTimeout(() => {
        todoStore.addDone(todo);
    }, 500);
};
</script>

<template>
    <transition-group name="list" tag="div" class="todo-list">
        <van-cell-group
            v-for="todo in todoStore.currentGroup.todoList"
            :key="todo.id"
            class="todo"
            inset
        >
            <van-swipe-cell>
                <template #default>
                    <van-cell :size="globalStore.cellSize" center>
                        <template #icon>
                            <van-icon
                                class="van-haptics-feedback"
                                class-prefix="fa"
                                name="circle-o"
                                size="1.2em"
                                @click="onCheckBoxClick(todo)"
                            />
                        </template>
                        <template #title>
                            <van-field
                                v-model="todo.text"
                                type="textarea"
                                rows="1"
                                autosize
                                autocomplete="off"
                                :maxlength="globalStore.todo.maxLength"
                            />
                        </template>
                    </van-cell>
                </template>
                <template #left>
                    <van-button square plain type="primary" text="选择" />
                </template>
                <template #right>
                    <van-button square plain type="primary" text="收藏" />
                    <van-button
                        square
                        plain
                        type="danger"
                        text="删除"
                        @click="todoStore.removeTodo(todo)"
                    />
                </template>
            </van-swipe-cell>
        </van-cell-group>
    </transition-group>
</template>

<style lang="less" scoped>
:deep(.van-swipe-cell) {
    .van-swipe-cell__left,
    .van-swipe-cell__right {
        background-color: #e6e6e6;
    }

    .van-cell {
        .van-cell__title {
            flex: 1 1 auto;
            overflow: hidden;
        }
    }

    .van-button {
        border: unset;
        height: 100%;
        background: transparent;
    }
}
</style>
