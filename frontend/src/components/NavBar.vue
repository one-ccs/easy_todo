<script setup lang="ts">
import { type NavBarProps } from 'vant';

const settingStore = useSettingStore();
const props = defineProps<Partial<NavBarProps>>();
</script>

<template>
    <div class="nav-bar">
        <van-nav-bar
            v-bind="props"
            :safe-area-inset-top="props.safeAreaInsetTop ?? settingStore.safeAreaInsetTop"
        >
            <template v-for="(_, name) in $slots" #[name]="slotData">
                <slot :name="name" v-bind="slotData ?? {}"></slot>
            </template>
        </van-nav-bar>
    </div>
</template>

<style lang="less" scoped>
.nav-bar {
    :deep(.van-nav-bar) {
        .van-nav-bar__left--disabled {
            opacity: 1;
        }
        .left {
            display: flex;
            flex-direction: row;
            align-items: flex-end;

            .icon {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: var(--et-nav-bar-icon-radius);
                width: calc(var(--et-nav-bar-icon-size) + 0.5em);
                height: calc(var(--et-nav-bar-icon-size) + 0.5em);
                color: var(--et-reverse-color);
                background-color: var(--et-reverse-bgc);

                .van-icon {
                    font-size: var(--et-nav-bar-icon-size);
                }
            }
            .content {
                margin-left: var(--et-nav-bar-space);
                text-align: left;
                line-height: 1.2em;

                .title {
                    font-size: 1em;
                }
                .desc {
                    color: var(--et-sub-color);
                    font-size: 0.8em;
                }
            }
        }
    }
}
</style>
