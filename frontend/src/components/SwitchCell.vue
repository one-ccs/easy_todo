<script setup lang="ts">
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
const model = defineModel<boolean>();
const { title, label } = defineProps<{
    title: string;
    label?: string;
}>();
</script>

<template>
    <van-cell center :title="title" :size="globalStore.cellSize" :label="label">
        <template #right-icon>
            <van-switch v-model="model" />
        </template>
    </van-cell>
</template>

<style lang="less" scoped></style>
