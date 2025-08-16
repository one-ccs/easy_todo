<script setup lang="ts">
const router = useRouter();
const globalStore = useGlobalStore();

if (router.currentRoute.value.path === '/') {
    router.replace(globalStore.homePath);
}
</script>

<template></template>

<style lang="less" scoped></style>
