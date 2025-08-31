<script setup lang="ts">
import LevelRadio from './LevelRadio.vue';

const todo = defineModel<Todo>({ required: true });

const globalStore = useGlobalStore();
const todoStore = useTodoStore();
const swipeCellRef = ref();
const levelRadioShown = ref(false);

const beforeClose = ({
    position,
}: {
    position: 'left' | 'right' | 'cell' | 'outside';
}) => {
    if (position === 'right') {
        return false;
    }
    return true;
};
const onCheckBoxClick = () => {
    todo.value.done = !todo.value.done;
};
const onDeleteClick = () => {
    swipeCellRef.value.close();
    todoStore.removeTodo(todo.value);
};
</script>

<template>
    <van-swipe-cell
        ref="swipeCellRef"
        class="todo-item"
        :style="{ background: todoStore.levels[todo.level].background }"
        :before-close="beforeClose"
        @close="levelRadioShown = false"
    >
        <template #default>
            <van-cell
                :size="globalStore.cellSize"
                :border="false"
                :style="{ background: todoStore.levels[todo.level].color }"
                center
            >
                <template #icon>
                    <van-icon
                        class="van-haptics-feedback"
                        :class="{ checkbox: !todo.done }"
                        class-prefix="fa"
                        :name="todo.done ? 'check-circle' : 'circle-o'"
                        size="1.3em"
                        @click="onCheckBoxClick"
                    />
                </template>
                <template #title>
                    <van-field
                        v-model="todo.text"
                        type="textarea"
                        rows="1"
                        autosize
                        autocomplete="off"
                        :maxlength="globalStore.todo.maxLength"
                    />
                </template>
            </van-cell>
        </template>
        <template #left>
            <div class="left">
                <van-button square plain type="primary" text="选择" />
            </div>
        </template>
        <template #right>
            <div class="right">
                <transition name="van-slide-left">
                    <div
                        v-if="!levelRadioShown"
                        class="button ring"
                        @click="levelRadioShown = true"
                        @mousedown.prevent
                    ></div>
                    <level-radio
                        v-else
                        v-model="todo.level"
                        @change="((levelRadioShown = false), swipeCellRef.close())"
                    />
                </transition>
                <van-icon
                    class="button van-haptics-feedback"
                    name="clock-o"
                    size="1.2em"
                />
                <van-icon
                    class="button van-haptics-feedback"
                    name="delete-o"
                    size="1.2em"
                    @click="onDeleteClick"
                />
            </div>
        </template>
    </van-swipe-cell>
</template>

<style lang="less" scoped>
.van-theme-dark {
    .todo-item {
        filter: brightness(0.8);
    }
}
.todo-item {
    border-radius: var(--et-radius-lg);
    color: #fff;

    :deep(.van-cell) {
        --van-field-input-text-color: #333;

        border-radius: var(--et-radius-lg);
        color: #333;
        background: transparent;

        .checkbox {
            position: relative;

            &::after {
                content: '';
                background: #fffa;
                border-radius: 50%;
                width: 0.6em;
                height: 0.6em;
                position: absolute;
                inset: 0;
                top: 0.21em;
                left: 0.138em;
            }
        }
    }

    .right {
        display: flex;
        align-items: center;
        padding-right: var(--et-space-lg);
        height: 100%;

        .button {
            margin-left: var(--et-space-lg);
        }
        .level {
            margin-left: var(--et-space-lg);
        }
        .ring {
            position: relative;
            border-radius: 50%;
            width: 1.2em;
            height: 1.2em;
            filter: drop-shadow(var(--et-drop-shadow));

            &::before {
                content: '';
                position: absolute;
                inset: 0;
                border: 3px solid transparent;
                border-top-color: v-bind('todoStore.levels[4].color');
                border-right-color: v-bind('todoStore.levels[1].color');
                border-bottom-color: v-bind('todoStore.levels[3].color');
                border-left-color: v-bind('todoStore.levels[2].color');
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }
}
</style>
