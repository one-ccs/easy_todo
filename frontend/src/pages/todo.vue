<script setup lang="ts">
import SlideRouterView from '@/components/SlideRouterView.vue';
import CreateBox from '@/components/todo/CreateBox.vue';
import Waterfall from '@/components/todo/ui/Waterfall.vue';
import Quadrant from '@/components/todo/ui/Quadrant.vue';

const UIComponents = {
    Waterfall,
    Quadrant,
};
const todoStore = useTodoStore();
</script>

<template>
    <div class="client-view">
        <slide-router-view direction="down" :duration="350" />

        <create-box />

        <div class="todos">
            <component :is="UIComponents[todoStore.ui]" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.client-view {
    overflow-x: hidden;
    overflow-y: auto;

    .todos {
        margin: var(--et-space);
        border-radius: var(--et-radius);
        overflow: hidden;
    }
}
</style>
