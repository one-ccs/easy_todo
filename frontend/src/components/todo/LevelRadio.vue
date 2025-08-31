<script setup lang="ts">
const level = defineModel<number>({ required: true });
const emit = defineEmits<{ (event: 'change', level: number): void }>();

const todoStore = useTodoStore();
const onChange = (level: number) => {
    emit('change', level);
};
</script>

<template>
    <van-radio-group
        class="level"
        v-model="level"
        direction="horizontal"
        @change="onChange"
    >
        <van-radio
            class="radio"
            v-for="level in todoStore.levels"
            :name="level.level"
            :style="{ color: level.color }"
        >
            <template #icon="{ checked }">
                <van-icon
                    v-if="checked"
                    class-prefix="fa"
                    name="check-circle"
                    size="0.88em"
                />
                <van-icon v-else class-prefix="fa" name="circle-o" size="0.88em" />
            </template>
        </van-radio>
    </van-radio-group>
</template>

<style lang="less" scoped>
.radio {
    filter: drop-shadow(var(--et-drop-shadow));
    overflow: unset;
    transition: transform 0.3s;

    &[aria-checked='true'] {
        transform: scale(1.2);
    }
}
</style>
