export type Todo = {
    id: string;
    text: string;
    state: boolean;
};
export type TodoGroup = {
    title: string;
    todos: Todo[];
};

export const useTodoStore = defineStore('todo', {
    state: () => ({
        groups: <TodoGroup[]>[{ title: '待办事项', todos: [] }],
        todos: <Todo[]>[
            { id: '1', text: '完善待办页面', state: false },
            { id: '2', text: '完善用户页面', state: false },
            { id: '3', text: '完善管理员页面', state: true },
        ],
    }),
    getters: {
        todoList: (state) => state.todos.filter((todo) => !todo.state),
        doneList: (state) => state.todos.filter((todo) => todo.state),
    },
    actions: {},
});
