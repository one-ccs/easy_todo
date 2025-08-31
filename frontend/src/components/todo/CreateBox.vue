<script setup lang="ts">
import { showNotify } from 'vant';
import LevelRadio from './LevelRadio.vue';

const globalStore = useGlobalStore();
const settingStore = useSettingStore();
const todoStore = useTodoStore();
const level = ref(3);
const todos = ref<Todo[]>([{ text: '', done: false, level: level.value }]);
const nullCount = <{ [key: string]: number }>{};

const focusLatestField = (index?: number) => {
    nextTick(() => {
        const newIndex = index ?? todos.value.length - 1;
        const newField = document.getElementById(
            `createTodoField_${newIndex}`
        ) as HTMLTextAreaElement;
        newField.focus();
        newField.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
};
const onEnterClick = (index: number) => {
    if (!todos.value[index].text.trim()) {
        return;
    }
    if (index < todos.value.length - 1) {
        focusLatestField(index + 1);
        return;
    }
    if (todos.value.length >= globalStore.todo.singleMax) {
        showNotify({
            message: `单次最多新建 ${globalStore.todo.singleMax} 条待办`,
            color: 'var(--et-reverse-color)',
            background: 'var(--et-reverse-bgc)',
        });
        return;
    }
    todos.value.push({ text: '', done: false, level: level.value });
    focusLatestField();
};
const onDeleteClick = (index: number) => {
    if (todos.value.length === 1 || todos.value[index].text) {
        return;
    }
    const key = `createTodoField_${index}`;

    nullCount[key] ? nullCount[key]++ : (nullCount[key] = 1);

    if (nullCount[key] >= 2) {
        nullCount[key] = 0;

        todos.value.pop();
        focusLatestField();
    }
};
const saveTodo = () => {
    globalStore.todo.overlyShown = false;
    todoStore.addTodo(
        todos.value.map((todo) => ({ ...todo, level: level.value })).reverse(),
        0
    );
    todos.value = [{ text: '', done: false, level: level.value }];
    for (const key in nullCount) {
        nullCount[key] = 0;
    }
};

watchEffect(() => {
    if (globalStore.todo.overlyShown) {
        focusLatestField();
    }
});

eventEmitter.withAlive(EventNames.ROUTER_BEFORE_EACH, () => {
    saveTodo();
});
</script>

<template>
    <van-popup
        :show="globalStore.todo.overlyShown"
        :safe-area-inset-top="settingStore.safeAreaInsetTop"
        :safe-area-inset-bottom="settingStore.safeAreaInsetBottom"
        :duration="0.3"
        @close="saveTodo"
        position="top"
        z-index="1"
    >
        <div class="create-todo" @mousedown.prevent>
            <div class="wrapper"></div>
            <div class="title">新建</div>

            <div class="content">
                <van-cell
                    v-for="(todo, index) in todos"
                    :size="globalStore.cellSize"
                    center
                >
                    <template #icon>
                        <van-icon
                            class="check-icon"
                            :class="{ null: !todo.text }"
                            class-prefix="fa"
                            name="circle-o"
                            size="1.2em"
                            :color="todoStore.levels[level].color"
                        />
                    </template>
                    <template #title>
                        <van-field
                            class="field"
                            :id="`createTodoField_${index}`"
                            v-model="todo.text"
                            type="textarea"
                            rows="1"
                            autosize
                            autocomplete="off"
                            :show-word-limit="
                                todo.text.length >= globalStore.todo.maxLength * 0.9
                            "
                            :maxlength="globalStore.todo.maxLength"
                            @click="focusLatestField(index)"
                            @keypress.enter.prevent="onEnterClick(index)"
                            @keyup.delete.prevent="onDeleteClick(index)"
                        />
                    </template>
                </van-cell>
            </div>

            <div class="footer">
                <level-radio v-model="level" />
                <div class="done van-haptics-feedback" @click="saveTodo">完成</div>
            </div>
        </div>
    </van-popup>
</template>

<style lang="less" scoped>
.van-overlay {
    background: var(--et-overlay-bgc);
    backdrop-filter: blur(1px);
}
.van-popup {
    background: transparent;

    .create-todo {
        position: relative;
        margin: 2em;
        border: 0.2em solid var(--et-color);

        .wrapper {
            z-index: -1;
            position: absolute;
            top: -2.2em;
            left: -2.2em;
            height: calc(100% + 2.2em * 2);
            width: calc(100% + 2.2em * 2);
            background: linear-gradient(
                to bottom,
                var(--et-bgc) 90%,
                var(--et-overlay-bgc),
                transparent
            );
        }
        .title {
            position: absolute;
            top: -1em;
            left: 0.5em;
            padding: 0 0.5em;
            font-size: 1.2em;
            color: #ff6a71;
            background: var(--et-bgc);
        }
        .content {
            position: relative;
            margin-top: 5%;
            height: calc(64px * 3 + 2em);
            overflow-x: hidden;
            overflow-y: auto;

            .van-cell {
                background: transparent;
                padding-top: 0.5em;
                padding-bottom: 0.5em;
            }
            .check-icon {
                filter: drop-shadow(var(--et-drop-shadow));
                transition: opacity 0.3s;

                &::after {
                    content: '';
                    background: var(--et-bgc);
                    border-radius: 50%;
                    width: 0.6em;
                    height: 0.6em;
                    position: absolute;
                    inset: 0;
                    top: 0.21em;
                    left: 0.138em;
                }
                &.null {
                    opacity: 0.3;
                }
            }
        }
        .footer {
            display: flex;
            align-items: center;

            .level {
                margin-left: var(--et-space);
            }
            .done {
                position: relative;
                margin: 0 var(--et-space) 0 auto;
                padding: var(--et-space);

                &::after {
                    position: absolute;
                    top: 80%;
                    left: 15%;
                    content: '';
                    display: block;
                    border-radius: 3px;
                    width: 2.5em;
                    height: 3.8px;
                    background-color: #f6ce49;
                }
            }
        }
    }
}
</style>
