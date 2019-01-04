<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style lang="scss">
@import './scss/app';
#app {
    position: absolute;
    font-family: "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    background-image: url(./assets/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
