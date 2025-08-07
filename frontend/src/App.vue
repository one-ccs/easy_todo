<script setup lang="ts">
import Tabbar from '@/components/Tabbar.vue';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <van-config-provider :theme="globalStore.theme">
        <router-view v-slot="{ Component, route }">
            <transition name="van-fade" mode="out-in">
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </transition>
        </router-view>
        <tabbar />
    </van-config-provider>
</template>

<style></style>
