import { guid } from '@/utils/utils';

export type Todo = {
    id: string;
    text: string;
    done: boolean;
};
export type TodoGroup = {
    id: string;
    title: string;
    position: number;
    todoList: Todo[];
    doneList: Todo[];
};
export type TodoGroups = {
    [key: string]: TodoGroup;
};

const _guid = guid();

export const useTodoStore = defineStore('todo', {
    state: () => ({
        currentGroupId: _guid,
        groups: <TodoGroups>{
            [_guid]: {
                id: _guid,
                title: '待办事项',
                position: 0,
                todoList: <Todo[]>[
                    {
                        id: '1',
                        text: '完善待办页面',
                        done: false,
                    },
                    {
                        id: '2',
                        text: '完善用户页面',
                        done: false,
                    },
                ],
                doneList: <Todo[]>[
                    {
                        id: '3',
                        text: '完善管理员页面',
                        done: true,
                    },
                ],
            },
        },
    }),
    getters: {
        sortedGroupInfo: (state) =>
            Object.values(state.groups)
                .sort((a, b) => a.position - b.position)
                .map((group) => ({
                    id: group.id,
                    title: group.title,
                    position: group.position,
                })),
        currentGroup: (state) => state.groups[state.currentGroupId],
    },
    actions: {
        addGroup(title: string, position: number) {
            const id = guid();
            this.groups[id] = {
                id,
                title,
                position,
                todoList: [],
                doneList: [],
            };

            return this;
        },
        removeGroup(id: string) {
            delete this.groups[id];

            return this;
        },
        addTodo(text: string | Todo, groupId?: string) {
            if (typeof text === 'string') {
                this.groups[groupId ?? this.currentGroupId].todoList.unshift({
                    id: guid(),
                    text,
                    done: false,
                });
            }
            if (typeof text === 'object') {
                const group = this.groups[groupId ?? this.currentGroupId];

                group.todoList.push(text);
            }

            return this;
        },
        removeTodo(todo: Todo, groupId?: string) {
            const group = this.groups[groupId ?? this.currentGroupId];
            const index = group.todoList.indexOf(todo);

            if (index !== -1) {
                group.todoList.splice(index, 1);
            }

            return this;
        },
        addDone(todo: Todo, groupId?: string) {
            const group = this.groups[groupId ?? this.currentGroupId];

            group.doneList.unshift(todo);

            return this;
        },
        removeDone(todo: Todo, groupId?: string) {
            const group = this.groups[groupId ?? this.currentGroupId];
            const index = group.doneList.indexOf(todo);

            if (index !== -1) {
                group.doneList.splice(index, 1);
            }

            return this;
        },
    },
});
