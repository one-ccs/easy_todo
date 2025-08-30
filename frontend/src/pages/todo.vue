<script setup lang="ts">
import SlideRouterView from '@/components/SlideRouterView.vue';
import CreateBox from '@/components/todo/CreateBox.vue';
import TodoList from '@/components/todo/TodoList.vue';
import DoneList from '@/components/todo/DoneList.vue';

const globalStore = useGlobalStore();
</script>

<template>
    <div class="client-view">
        <slide-router-view direction="down" :duration="350" />

        <create-box />

        <div
            class="todo-list"
            :class="{ 'add-overly-shown': globalStore.todo.overlyShown }"
        >
            <todo-list />

            <div class="van-hairline--top"></div>

            <done-list />
        </div>
    </div>
</template>

<style lang="less" scoped>
.client-view {
    overflow-x: hidden;
    overflow-y: auto;

    .todo-list {
        transition: margin-top 0.3s ease-in-out;

        &.add-overly-shown {
            margin-top: calc(64px * 3 + 4em);
        }
        .van-hairline--top {
            margin: 0 var(--et-space);
            height: 1px;

            &::after {
                border-color: var(--et-border-color);
            }
        }
    }
}
</style>
