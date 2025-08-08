<script setup lang="ts">
import { ref } from 'vue';
import type { Numeric } from 'vant/lib/utils';
import type { PickerColumn, PickerOption } from 'vant';

export type PickerChange = {
    selectedValues: Numeric[];
    selectedOptions: (PickerColumn | PickerOption)[];
    selectedIndexes: number[];
};

const pickerValue = defineModel<Numeric[]>();
const {
    title,
    size = 'large',
    columns,
} = defineProps<{
    title: string;
    size?: 'large' | 'normal';
    columns: (PickerColumn | PickerOption)[];
}>();
const emit = defineEmits<{
    (e: 'confirm', data: PickerChange): void;
}>();

const pickerShown = ref(false);

const onConfirm = (data: PickerChange) => {
    pickerShown.value = false;
    pickerValue.value = data.selectedValues;

    emit('confirm', data);
};
</script>

<template>
    <div class="picker-cell">
        <van-cell
            :title="title"
            :value="pickerValue?.join()"
            :size="size"
            @click="pickerShown = true"
            center
            is-link
        />

        <van-popup
            v-model:show="pickerShown"
            teleport="#app"
            position="bottom"
            destroy-on-close
            close-on-popstate
        >
            <van-picker
                :model-value="pickerValue"
                :title="title"
                :columns="columns"
                @cancel="pickerShown = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<style lang="less" scoped></style>
