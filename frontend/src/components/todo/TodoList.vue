<script setup lang="ts">
import type { Todo } from '@/stores/todo';

const globalStore = useGlobalStore();
const todoStore = useTodoStore();
</script>

<template>
    <transition-group name="list" tag="div" class="todo-list">
        <van-cell-group
            v-for="todo in todoStore.todoList"
            :key="todo.id"
            class="todo"
            inset
        >
            <van-swipe-cell>
                <template #default>
                    <van-cell :size="globalStore.cellSize" center>
                        <template #icon>
                            <van-checkbox
                                :model-value="todo.state"
                                @update:model-value="
                                    ($event) =>
                                        todoStore.updateTodo(todo, 'state', $event)
                                "
                            />
                        </template>
                        <template #title>
                            <van-field
                                :model-value="todo.text"
                                @update:model-value="
                                    ($event) => todoStore.updateTodo(todo, 'text', $event)
                                "
                                type="textarea"
                                rows="1"
                                autosize
                                autocomplete="off"
                            />
                        </template>
                    </van-cell>
                </template>
                <template #left>
                    <van-button square plain type="primary" text="选择" />
                </template>
                <template #right>
                    <van-button square plain type="danger" text="删除" />
                    <van-button square plain type="primary" text="收藏" />
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
        .van-checkbox {
            flex: 0 0 auto;
            margin-right: var(--et-space);

            .van-icon {
                border-width: 3px;
            }
        }
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
