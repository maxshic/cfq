<template>
    <div class="container">
        <div id="bimgContainer" class="img-container">
          
            <div class="img-con">
                <img id="bshowbg" v-show="showbg" class="bg" src="../assets/chuiqi.png" alt="">
                <img class="people" width="70%" :src="dengsrc" alt="">
                <p class="timer">{{time}}s</p>
                <img class="bouble" :src="boublesrc" alt="">
                <div @touchstart="start" @touchend="end" class="start-con"></div>
                <!-- <img class="start-bg" @touchstart="start" @touchend="end" width="30%" src="../assets/longpress.gif" alt=""> -->
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'Begin',
    data(){
        return{
            showbg: false,
            per: 0.532635987885885,
            time: 3,
            timer: null,
            boublesrc: '',
            dengsrc: require('../assets/dengstatic.png'),
            denggif: require('../assets/deng.gif')
        }
    },
    mounted(){
        let imgContainer = document.getElementById('bimgContainer')

        let conwidth = window.getComputedStyle(imgContainer).width.split('px')[0]
        let conheight = window.getComputedStyle(imgContainer).height.split('px')[0]
        //let per = conwidth/conheight
        if((conwidth/conheight) > this.per){
            document.getElementById('bshowbg').style.height = conheight + 'px'
            this.showbg = true
        }else{
            document.getElementById('bshowbg').style.width = conwidth + 'px'
            this.showbg = true
        }
    },
    methods: {
        start(){
            console.log(123)
            clearInterval(this.timer)
            this.boublesrc = require('../assets/bouble.gif')
            this.dengsrc = this.denggif
            this.time--
            this.timer = setInterval(() => {
                this.time--
                if(this.time <= 0){
                    clearInterval(this.timer)
                    this.time = 3
                    this.boublesrc = ''
                    this.dengsrc = require('../assets/dengstatic.png')
                    this.$router.replace('/result')
                }
            },1000)
        },
        end(){
            clearInterval(this.timer)
            
            if(this.time <= 0){
                this.boublesrc = ''
                this.$router.replace('/result')
            }
            this.boublesrc = ''
            this.dengsrc = require('../assets/dengstatic.png')
            this.time = 3
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../scss/app.scss';
    .container{
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;

        .img-container{
            width: 90%;
            height: 95%;
            position: absolute;
            @include centerAll;
            .img-con{
                position: absolute;
                // width: 100%;
                // height: 100%;
                @include centerAll;
                .people{
                    position: absolute;
                    top: 18%;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 99;
                }
                .timer{
                    position: absolute;
                    width: 100%;
                    bottom: 27%;
                    font-size: 60px;
                    font-style: italic;
                    text-align: center;
                    color: #2c9d46;
                    z-index: 99;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                .bouble{
                    position: absolute;
                    width: 90%;
                    bottom: 10%;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 9;
                }
            }
            .bg{
                display: block;
                margin: 0;
                // position: absolute;
                // @include centerAll;
            }
            .start-con{
                position: absolute;
                width: 32%;
                height: 12%;
                // background-color: red;
                background-image: url(../assets/longpress.gif);
                background-size: 100% auto;
                background-repeat: no-repeat;
                background-position: center center;
                left: 50%;
                bottom: 12%;
                transform: translateX(-50%);
                z-index: 9;
            }
            .start-bg{
                position: absolute;
                left: 50%;
                bottom: 12%;
                transform: translateX(-50%);
                z-index: 9;
            }
        }
    }
</style>
