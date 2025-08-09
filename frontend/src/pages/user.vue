<script setup lang="ts">
import SlideRouterView from '@/components/SlideRouterView.vue';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();

const routes = [{ title: '设置', path: '/user/setting' }];
</script>

<template>
    <div class="client-view">
        <slide-router-view />

        <van-cell-group inset>
            <van-cell
                v-for="route in routes"
                :title="route.title"
                :size="globalStore.cellSize"
                @click="$router.push(route.path)"
                is-link
            />
        </van-cell-group>
    </div>
</template>

<style lang="less" scoped></style>
