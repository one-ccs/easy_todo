<script setup lang="ts">
import logo from '@/assets/images/logo.svg';
import useGlobalStore from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <div class="about">
        <div class="logo">
            <van-icon :name="logo" />
        </div>
        <div class="app-name">Easy Todo</div>
        <div class="version">版本: v{{ globalStore.appVersion }}</div>
        <div class="footer">
            <div class="copyright">Copyright ©2025 ONE-CCS 版权所有</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.about {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;

    .logo {
        margin-top: 8vh;
        font-size: 8em;
    }
    .app-name {
        font-size: 2em;
    }
    .version {
        margin-top: 3px;
        color: var(--et-sub-color);
    }
    .footer {
        margin: auto auto 2.5em;
        font-size: 0.75em;
        color: var(--et-sub-color);
    }
}
</style>
