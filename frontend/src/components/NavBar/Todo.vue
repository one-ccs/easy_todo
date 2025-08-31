<script setup lang="ts">
import NavBar from '../NavBar.vue';

const globalStore = useGlobalStore();
const todoStore = useTodoStore();
</script>

<template>
    <nav-bar>
        <template #left>
            <div class="left van-haptics-feedback">
                <div class="icon">
                    <van-icon name="todo-list" />
                </div>
                <div class="content">
                    <div class="title">
                        <span>待办</span>
                        <van-icon name="play" style="color: unset" />
                    </div>
                    <div class="desc">{{ todoStore.todos.length }}条待办</div>
                </div>
            </div>
        </template>
        <template #right>
            <div class="right">
                <van-button
                    @click="$router.push('/todo/search')"
                    class="nav-button"
                    icon="search"
                    hairline
                    round
                />
                <van-button
                    @click="globalStore.todo.overlyShown = true"
                    class="nav-button"
                    icon="plus"
                    hairline
                    round
                />
            </div>
        </template>
    </nav-bar>
</template>

<style lang="less" scoped>
.right {
    .nav-button {
        &::after {
            border: unset;
        }

        :deep(.van-icon) {
            color: currentColor;
        }
    }
}
</style>
