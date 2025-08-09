<script setup lang="ts"></script>

<template>
    <div class="container">
        <div class="not-found">
            <h1>404</h1>
            <h2>哎呀，页面未找到！</h2>
            <p>看起来你迷路了，别担心，点击下面的按钮返回上一页。</p>
            <van-button @click="$router.back">返回上一页</van-button>
            <div class="astronaut">
                <!-- <img src="astronaut.png" alt="宇航员"> -->
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--et-bgc, #f0f8ff);
}

.not-found {
    text-align: center;
    color: #333;
}

.not-found h1 {
    font-size: 100px;
    color: #004080;
    animation: blink 1s infinite;
}

.not-found h2 {
    font-size: 24px;
    margin: 20px 0;
}

.not-found p {
    font-size: 16px;
    margin-bottom: 20px;
}

.not-found button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #004080;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.not-found button:hover {
    background-color: #0056a7;
}

.astronaut img {
    width: 200px;
    animation: float 3s ease-in-out infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

@keyframes float {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0);
    }
}
</style>
