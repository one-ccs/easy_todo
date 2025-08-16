<script setup lang="ts">
import type { CellSize } from 'vant';

const globalStore = useGlobalStore();
const model = defineModel<boolean>();
const { title, label, size } = defineProps<{
    title: string;
    label?: string;
    size?: CellSize;
}>();
</script>

<template>
    <van-cell center :title="title" :size="globalStore.cellSize" :label="label">
        <template #right-icon>
            <van-switch v-model="model" :size="globalStore.switchSize" />
        </template>
    </van-cell>
</template>

<style lang="less" scoped></style>
