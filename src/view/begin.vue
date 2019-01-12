<template>
    <div class="container">
        <div id="bimgContainer" class="img-container">
          
            <div class="img-con">
                <img id="bshowbg" v-show="showbg" class="bg" src="../assets/chuiqi.png" alt="">
                <img class="people" width="70%" src="../assets/deng.gif" alt="">
                <p class="timer">{{time}}s</p>
                <img class="bouble" src="../assets/bouble.gif" alt="">
                <img class="start-bg" @touchstart="start" @touchend="end" width="30%" src="../assets/longpress.gif" alt="">
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
            time: 5,
            timer: null
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
            this.timer = setInterval(() => {
                this.time--
                if(this.time <= 0){
                    clearInterval(this.timer)
                    this.time = 5
                    this.$router.replace('/result')
                    
                }
            },1000)
        },
        end(){
            console.log(1235)
            clearInterval(this.timer)
            
            if(this.time <= 0){
                this.$router.replace('/result')
            }
            this.time = 5
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
                }
                .timer{
                    position: absolute;
                    width: 100%;
                    bottom: 27%;
                    font-size: 60px;
                    font-style: italic;
                    text-align: center;
                    color: #2c9d46;
                }
                .bouble{
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
            .bg{
                display: block;
                margin: 0;
                // position: absolute;
                // @include centerAll;
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
