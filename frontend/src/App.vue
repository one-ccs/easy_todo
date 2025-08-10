<script setup lang="ts">
import { type Component } from 'vue';
import Tabbar from '@/components/Tabbar.vue';
import NoteNavBar from './components/NavBar/Note.vue';
import TodoNavBar from './components/NavBar/Todo.vue';
import UserNavBar from './components/NavBar/User.vue';
import useGlobalStore from './stores/global';
import useSettingStore from './stores/setting';

const globalStore = useGlobalStore();
const settingStore = useSettingStore();
const navbar = <{ [key: string]: Component }>{
    '/note': NoteNavBar,
    '/todo': TodoNavBar,
    '/user': UserNavBar,
};
</script>

<template>
    <van-config-provider
        :theme="settingStore.theme"
        :theme-vars="globalStore.vanThemeVars"
    >
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="navbar[route.path]"></component>
            </keep-alive>
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
            <tabbar />
        </router-view>
    </van-config-provider>
</template>

<style></style>
