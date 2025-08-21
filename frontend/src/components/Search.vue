<script setup lang="ts">
const searchValue = ref('');
</script>

<template>
    <div class="full-view">
        <div class="search-container">
            <van-search
                v-model="searchValue"
                placeholder="搜索"
                autocomplete="off"
                autofocus
            />
            <van-button @click="$router.back()" type="default" plain hairline
                >取消</van-button
            >
        </div>
    </div>
</template>

<style lang="less" scoped>
:deep(.search-container) {
    display: flex;
    align-items: center;

    .van-search {
        position: relative;
        flex: 1 1 auto;
        background: transparent;

        &::after {
            position: absolute;
            top: 100%;
            left: 3%;
            content: '';
            display: block;
            border-radius: 3px;
            width: 94%;
            height: 3.8px;
            background-color: var(--et-border-color);
        }

        .van-search__content {
            background: transparent;
        }
    }

    .van-button {
        flex: 0 0 auto;
        height: 100%;
        color: var(--et-color);
        background: transparent;

        &::after {
            border: unset;
            position: absolute;
            top: 100%;
            left: 3%;
            content: '';
            display: block;
            border-radius: 3px;
            width: 94%;
            height: 3.8px;
            background-color: var(--et-color);
        }
    }
}
</style>
