<script setup lang="ts">
import SlideRouterView from '@/components/SlideRouterView.vue';
import CreateBox from '@/components/todo/CreateBox.vue';
import Group from '@/components/todo/Group.vue';
</script>

<template>
    <div class="client-view">
        <slide-router-view direction="down" :duration="350" />

        <create-box />

        <group />
    </div>
</template>

<style lang="less" scoped>
.client-view {
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
