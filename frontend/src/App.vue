<script setup lang="ts">
import { type Component } from 'vue';
import Tabbar from '@/components/Tabbar.vue';
import NoteNavBar from './components/NavBar/NoteNavBar.vue';
import TodoNavBar from './components/NavBar/TodoNavBar.vue';
import UserNavBar from './components/NavBar/UserNavBar.vue';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();

const navbar = <{ [key: string]: Component }>{
    '/note': NoteNavBar,
    '/todo': TodoNavBar,
    '/user': UserNavBar,
};
</script>

<template>
    <van-config-provider :theme="globalStore.theme">
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
