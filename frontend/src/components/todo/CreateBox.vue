<script setup lang="ts">
import { showNotify } from 'vant';
import type { Todo } from '@/stores/todo';
import { guid } from '@/utils/utils';

const globalStore = useGlobalStore();
const settingStore = useSettingStore();
const todoStore = useTodoStore();
const popupRef = ref();
const todos = ref<Partial<Pick<Todo, 'id' | 'done' | 'text'>>[]>([{}]);
const nullCount = <{ [key: string]: number }>{};

const focusLatestField = () => {
    nextTick(() => {
        const newIndex = todos.value.length - 1;
        const newField = document.getElementById(
            `createTodoField_${newIndex}`
        ) as HTMLTextAreaElement;
        newField.focus();
    });
};
const onEnterClick = () => {
    if (!todos.value[todos.value.length - 1]?.text?.trim()) {
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
    todos.value.push({ id: guid(), text: '', done: false });
    focusLatestField();
};
const onDeleteClick = () => {
    if (todos.value.length === 1) {
        return;
    }
    const index = todos.value.length - 1;
    const key = `createTodoField_${index}`;

    if (todos.value[index].text) {
        return;
    }
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
        todos.value.filter((todo) => !!todo.text).map((todo) => todo.text!)
    );
    todos.value = [{}];
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
        <div ref="popupRef" class="create-todo" @click="focusLatestField">
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
                            :class="{ null: !todo.text }"
                            class-prefix="fa"
                            name="circle-o"
                            size="1.2em"
                        />
                    </template>
                    <template #title>
                        <van-field
                            :id="`createTodoField_${index}`"
                            v-model="todo.text"
                            type="textarea"
                            rows="1"
                            autosize
                            autocomplete="off"
                            :maxlength="globalStore.todo.maxLength"
                            @keypress.enter.prevent="onEnterClick"
                            @keyup.delete.prevent="onDeleteClick"
                        />
                    </template>
                </van-cell>
            </div>

            <van-button @click="saveTodo" class="done">完成</van-button>
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
        .van-cell {
            background: transparent;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
        }
    }
}
.create-todo {
    position: relative;
    margin: 2em;
    border: 0.2em solid var(--et-color);
    height: calc(64px * 3 + 4em);

    .wrapper {
        z-index: -1;
        position: absolute;
        top: -2.2em;
        left: -2.2em;
        height: calc(100% + 2.2em * 2);
        width: calc(100% + 2.2em * 2);
        background: linear-gradient(to bottom, var(--et-bgc) 90%, var(--et-overlay-bgc));
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
        padding-top: 2%;
        height: 80%;
        overflow-x: hidden;
        overflow-y: auto;

        .null {
            opacity: 0.3;
        }
    }

    .done {
        position: absolute;
        right: 0;
        bottom: 0;
        margin-right: var(--et-space);
        border: none;
        background: transparent;

        &::after {
            position: absolute;
            top: 80%;
            left: 20%;
            content: '';
            display: block;
            border-radius: 3px;
            width: 2.5em;
            height: 3.8px;
            background-color: #f6ce49;
        }
    }
}
</style>
