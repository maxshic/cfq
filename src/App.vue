<template>
    <div id="app">
        <img :src="denggif" alt="" style="transform: translateY(10000px);">
        <div class="music-bg" @click="switchbg">
            <img v-if="switcha" class="round-music" src="./assets/yinyueon.png" width="100%" alt="">
            <img v-else src="./assets/yinyueoff.png" width="100%" alt="">
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App",
    data(){
        return{
            denggif: require('./assets/deng.gif'),
            switcha: true,
        }
    },
    methods: {
        switchbg(){
            if(this.switcha){
                document.getElementById('bgsound').pause()
                this.switcha = false
            }else{
                document.getElementById('bgsound').play()
                this.switcha = true
            }
        }
    }
};
</script>

<style lang="scss">
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
    background-image: url(./assets/beijing.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .music-bg{
        position: fixed;
        width: 40px;
        height: 40px;
        top: 10px;
        right: 10px;
        z-index: 999999;
    }
    .round-music{
        animation: animatemusic 10s linear infinite;
    }
    @keyframes animatemusic {
        0%{
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        50%{
            -webkit-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        100%{
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
}
</style>
