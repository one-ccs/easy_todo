<script setup lang="ts">
import { ref } from 'vue';
import type { Numeric } from 'vant/lib/utils';
import type { PickerColumn, PickerOption } from 'vant';
import useGlobalStore from '@/stores/global';

export type PickerData = {
    selectedValues: Numeric[];
    selectedOptions: (PickerColumn | PickerOption)[];
    selectedIndexes: number[];
};

const globalStore = useGlobalStore();
const pickerValue = defineModel<PickerOption[]>();
const { title, label, columns } = defineProps<{
    title: string;
    label?: string;
    columns: (PickerColumn | PickerOption)[];
}>();
const emit = defineEmits<{
    confirm: [data: PickerData];
}>();

const pickerShown = ref(false);

const onConfirm = (data: PickerData) => {
    pickerShown.value = false;
    pickerValue.value = data.selectedOptions;

    emit('confirm', data);
};
</script>

<template>
    <div class="picker-cell">
        <van-cell
            :title="title"
            :label="label"
            :value="pickerValue?.map((x) => x.text).join()"
            :size="globalStore.cellSize"
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
            round
        >
            <van-picker
                :model-value="
                    pickerValue?.filter((x) => x.value !== undefined).map((x) => x.value!)
                "
                :title="title"
                :columns="columns"
                @cancel="pickerShown = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<style lang="less" scoped></style>
