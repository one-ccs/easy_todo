<script setup lang="ts">
import Tabbar from '@/components/Tabbar.vue';
import NoteNavBar from './components/NavBar/Note.vue';
import TodoNavBar from './components/NavBar/Todo.vue';
import UserNavBar from './components/NavBar/User.vue';
import type { Component } from 'vue';

const globalStore = useGlobalStore();
const settingStore = useSettingStore();
const navbar_list = <{ [key: string]: Component }>{
    '/note': NoteNavBar,
    '/todo': TodoNavBar,
    '/user': UserNavBar,
};
let lastNavbar: Component | null = null;
const getNavBar = (path: string): Component => {
    if (navbar_list[path]) {
        lastNavbar = navbar_list[path];
    }
    return navbar_list[path] || lastNavbar;
};
</script>

<template>
    <van-config-provider
        :theme="settingStore.theme"
        :theme-vars="globalStore.vanThemeVars"
    >
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="getNavBar(route.path)"></component>
            </keep-alive>
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
            <tabbar />
        </router-view>
    </van-config-provider>
</template>

<style></style>
