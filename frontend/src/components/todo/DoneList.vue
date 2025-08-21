<script setup lang="ts">
const globalStore = useGlobalStore();
const todoStore = useTodoStore();

const onCheckBoxClick = (todo: Todo) => {
    todoStore.removeDone(todo);
    setTimeout(() => {
        todoStore.addTodo(todo);
    }, 500);
};
</script>

<template>
    <transition-group name="list" tag="div" class="done-list">
        <van-cell-group
            v-for="todo in todoStore.currentGroup.doneList"
            :key="todo.id"
            class="done"
            inset
        >
            <van-swipe-cell>
                <template #default>
                    <van-cell :size="globalStore.cellSize" center>
                        <template #icon>
                            <van-icon
                                class="van-haptics-feedback"
                                class-prefix="fa"
                                name="check-circle"
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
                                readonly
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
                        @click="todoStore.removeDone(todo)"
                    />
                </template>
            </van-swipe-cell>
        </van-cell-group>
    </transition-group>
</template>

<style lang="less" scoped>
:deep(.van-swipe-cell) {
    filter: grayscale(100%) invert(20%) opacity(0.5);

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
