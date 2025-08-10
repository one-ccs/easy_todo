<script setup lang="ts">
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
const list = [
    { title: '完善待办页面', text: '完善待办页面的功能和交互设计', status: false },
    { title: '完善用户页面', status: false },
    { title: '完善管理员页面', status: true },
];

const todoList = list.filter((x) => x.status === false);
const doneList = list.filter((x) => x.status === true);
</script>

<template>
    <div class="client-view">
        <van-cell-group inset :border="false">
            <van-swipe-cell v-for="todo in todoList">
                <template #default>
                    <van-cell
                        :title="todo.title"
                        :label="todo.text"
                        :size="globalStore.cellSize"
                        center
                    >
                        <template #icon>
                            <van-checkbox />
                        </template>
                    </van-cell>
                </template>
                <template #left>
                    <van-button square type="primary" text="选择" />
                </template>
                <template #right>
                    <van-button square type="danger" text="删除" />
                    <van-button square type="primary" text="收藏" />
                </template>
            </van-swipe-cell>
        </van-cell-group>

        <br style="width: 100%" />

        <div class="done">
            <van-swipe-cell>
                <template #default>
                    <van-cell :border="false" title="单元格" value="内容" />
                </template>
                <template #left>
                    <van-button square type="primary" text="选择" />
                </template>
                <template #right>
                    <van-button square type="danger" text="删除" />
                    <van-button square type="primary" text="收藏" />
                </template>
            </van-swipe-cell>
        </div>
    </div>
</template>

<style lang="less" scoped>
.client-view {
    .van-checkbox__icon {
        .van-icon {
            border-width: 3px;
        }
    }

    .van-button {
        display: inline-block;
        height: 100%;
    }
}
</style>
