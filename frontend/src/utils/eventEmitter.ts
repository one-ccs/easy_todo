import { onUnmounted, onDeactivated } from 'vue';
import { onMountedOrActivated } from './onMountedOrActivated';

const eventNames = ['API:UN_AUTH', 'API:INVALID'];

type EventNames = (typeof eventNames)[number];

class EventEmitter {
    private listeners: Record<EventNames, Set<Function>> = {};

    /**
     * 注册事件
     * @param eventName 事件名称
     * @param listener 监听函数
     */
    on(eventName: EventNames, listener: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = new Set();
        }
        this.listeners[eventName].add(listener);
    }

    /**
     * 注销事件
     * @param eventName 事件名称
     * @param listener 监听函数
     */
    off(eventName: EventNames, listener: Function) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].delete(listener);
        }
    }

    /**
     * 方便地进行事件绑定，在组件 mounted 和 activated 时注册事件，unmounted 和 deactivated 时注销事件。
     * @param eventName 事件名称
     * @param listener 监听函数
     */
    withAlive(eventName: EventNames, listener: Function) {
        onUnmounted(() => this.off(eventName, listener));
        onDeactivated(() => this.off(eventName, listener));
        onMountedOrActivated(() => this.on(eventName, listener));
    }

    /**
     * 触发事件
     * @param eventName 事件名称
     * @param data 监听函数参数
     */
    emit(eventName: EventNames, ...args: any[]) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((listener) => {
                listener(...args);
            });
        }
    }
}

export default new EventEmitter();
