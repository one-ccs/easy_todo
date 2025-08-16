<script setup lang="ts">
export type Todo = {
    title: string;
    text?: string;
    state: boolean;
};

const globalStore = useGlobalStore();
const { list } = defineProps<{ list: Todo[] }>();
</script>

<template>
    <van-cell-group inset v-for="todo in list" :key="todo.title">
        <van-swipe-cell>
            <template #default>
                <van-cell :size="globalStore.cellSize" center>
                    <template #icon>
                        <van-checkbox v-model="todo.state" />
                    </template>
                    <template #title>
                        <div class="title van-ellipsis">{{ todo.title }}</div>
                    </template>
                    <template #label>
                        <div class="text van-ellipsis">{{ todo.text }}</div>
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
