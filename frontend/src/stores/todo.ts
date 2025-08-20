export type Todo = {
    id: string;
    text: string;
    state: boolean;
    updated_at: Date | string;
};
export type TodoGroup = {
    title: string;
    todos: Todo[];
};

export const useTodoStore = defineStore('todo', {
    state: () => ({
        groups: <TodoGroup[]>[{ title: '待办事项', todos: [] }],
        todos: <Todo[]>[
            { id: '1', text: '完善待办页面', state: false, updated_at: new Date() },
            { id: '2', text: '完善用户页面', state: false, updated_at: new Date() },
            { id: '3', text: '完善管理员页面', state: true, updated_at: new Date() },
        ],
    }),
    getters: {
        todoList: (state) =>
            state.todos
                .filter((todo) => !todo.state)
                .sort(
                    (a, b) =>
                        Date.parse(a.updated_at as string) -
                        Date.parse(b.updated_at as string)
                ),
        doneList: (state) =>
            state.todos
                .filter((todo) => todo.state)
                .sort(
                    (a, b) =>
                        Date.parse(b.updated_at as string) -
                        Date.parse(a.updated_at as string)
                ),
    },
    actions: {
        updateTodo<K extends Exclude<keyof Todo, 'id' | 'updated_at'>>(
            todo: Todo,
            key: K,
            value: Todo[K]
        ) {
            todo[key] = value;
            todo.updated_at = new Date();
        },
    },
});
