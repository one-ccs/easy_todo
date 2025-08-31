export enum TodoUI {
    QUADRANT = 'Quadrant',
    WATERFALL = 'Waterfall',
}
export type TodoLevel = {
    level: number;
    color: string;
    background: string;
};
export type Todo = {
    text: string;
    done: boolean;
    level: number;
};

export const useTodoStore = defineStore('todo', {
    state: () => ({
        ui: <TodoUI>TodoUI.WATERFALL,
        levels: <{ [level: number]: TodoLevel }>{
            1: {
                level: 1,
                color: '#d9effa',
                background: '#c1d5e0',
            },
            2: {
                level: 2,
                color: '#e0f5e6',
                background: '#c4dbcb',
            },
            3: {
                level: 3,
                color: '#fcf3b2',
                background: '#e3daa1',
            },
            4: {
                level: 4,
                color: '#f7d794',
                background: '#e1c27e',
            },
        },
        todos: <Todo[]>[
            {
                text: '完善待办页面',
                done: false,
                level: 1,
            },
            {
                text: '完善用户页面',
                done: false,
                level: 2,
            },
            {
                text: '完善管理员页面',
                done: true,
                level: 3,
            },
            {
                text: '完善管理员页面',
                done: true,
                level: 4,
            },
        ],
    }),
    getters: {},
    actions: {
        addTodo(todo: string | Todo | string[] | Todo[], position?: number) {
            if (Array.isArray(todo)) {
                todo.forEach((t) => this.addTodo(t, position));
                return;
            }
            if (typeof todo === 'object' && todo.text.trim()) {
                position = position ?? this.todos.length;
                this.todos.splice(position, 0, todo);
            }
            if (typeof todo === 'string' && todo.trim()) {
                position = position ?? this.todos.length;
                this.todos.splice(position, 0, { text: todo, done: false, level: 0 });
            }
        },
        removeTodo(todo: Todo) {
            const index = this.todos.indexOf(todo);

            if (index !== -1) {
                this.todos.splice(index, 1);
            }
        },
    },
});
