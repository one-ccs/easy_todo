import { computed, ref, type WritableComputedRef } from 'vue';

/**
 * 循环数值，取值范围 [start, end)
 * @param start 起始值
 * @param end 结束值
 * @param step 步长
 * @returns [数值、增加函数、减少函数]
 */
export function useLoops(
    end: number
): readonly [WritableComputedRef<number, number>, () => void, () => void];
export function useLoops(
    end: number,
    step: number
): readonly [WritableComputedRef<number, number>, () => void, () => void];
export function useLoops(
    start: number,
    end: number
): readonly [WritableComputedRef<number, number>, () => void, () => void];
export function useLoops(end: number, start: number = 0, step: number = 1) {
    const index = useBounds(start, start, end);
    const add = () => {
        if (index.value < end - step) {
            index.value += step;
        } else {
            index.value = start;
        }
    };
    const sub = () => {
        if (index.value > start) {
            index.value -= step;
        } else {
            index.value = end;
        }
    };

    return [index, add, sub] as const;
}

/**
 * 返回一个计算属性，将 num 限制在 [min, max] 之间
 * @param num 数值
 * @param min 最小值
 * @param max 最大值
 * @returns
 */
export function useBounds(num: number, min: number, max: number) {
    const _num = ref(num);
    return computed({
        get: () => _num.value,
        set: (v: number) => {
            _num.value = Math.max(min, Math.min(v, max));
        },
    });
}
