<script setup lang="ts" generic="T extends ButtonStatus">
import { useLoops } from '@/utils/use';
import { watchEffect } from 'vue';

export type ButtonStatus = {
    label?: string;
    value?: string;
    icon?: string;
    [key: PropertyKey]: any;
};

const status = defineModel<T>();
const { statusList, iconPrefix } = defineProps<{
    iconPrefix?: string;
    statusList: readonly T[];
}>();
const emit = defineEmits<{
    change: [data: T, index: number];
}>();

const [index, addIndex] = useLoops(statusList.length);

const onClick = () => {
    addIndex();
    status.value = statusList[index.value];
    emit('change', statusList[index.value], index.value);
};

watchEffect(() => {
    index.value = statusList.findIndex((x) => x === status.value);
});
</script>

<template>
    <van-button
        v-bind="$attrs"
        @click="onClick"
        :icon-prefix="iconPrefix"
        :icon="status?.icon || statusList[index].icon"
        :text="status?.label || statusList[index].label"
    />
</template>

<style lang="less" scoped></style>
