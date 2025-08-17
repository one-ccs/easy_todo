<script setup lang="ts">
import NavBar from '../NavBar.vue';
import StatusButton from '../StatusButton.vue';

const settingStore = useSettingStore();
const themeIndex = computed(() => {
    return settingStore.theme == 'light' ? themes[0] : themes[1];
});

const onThemeChange = (data: Theme) => {
    settingStore.setTheme(data);
};
</script>

<template>
    <nav-bar left-disabled>
        <template #left>
            <div class="left">
                <div class="icon">
                    <van-icon name="user" />
                </div>
                <div class="content">
                    <div class="title">昵称</div>
                    <div class="desc">账号：xx**888</div>
                </div>
            </div>
        </template>
        <template #right>
            <div class="right">
                <status-button
                    class="nav-button"
                    :model-value="themeIndex"
                    :status-list="themes.slice(0, 2)"
                    @change="onThemeChange"
                    icon-prefix="fa"
                    hairline
                    round
                />
            </div>
        </template>
    </nav-bar>
</template>

<style lang="less" scoped>
.right {
    .nav-button::after {
        border: unset;
    }
}
</style>
