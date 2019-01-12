<template>
    <div class="container">
        <div id="rimgContainer" class="img-container">
          
            <div class="img-con">
                <img id="rshowbg" v-show="showbg" class="bg" src="../assets/jiangpin.png" alt="">
                <img class="dai" @click="share = true" width="70%" src="../assets/dai.gif" alt="">
                <img class="start-bg" @click="again" width="40%" src="../assets/again.png" alt="">
                <div class="num-con">
                    <p class="top">清风扬的福气值为</p>
                    <p class="middle">99</p>
                    <p class="bottom">点击福袋试试手气</p>
                </div>
                <p class="desc">福气那么旺，快让大家沾沾你的福气<br>
                    福袋内含8份惊喜大奖，分享即可开福袋
                </p>
            </div>
            
        </div>
        <div class="share-bg" v-show="share" @click="share = false">
            <img src="../assets/share.png" width="75%" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'Result',
    data(){
        return{
            showbg: false,
            per: 0.532635987885885,
            share: false,
        }
    },
    mounted(){
        let imgContainer = document.getElementById('rimgContainer')

        let conwidth = window.getComputedStyle(imgContainer).width.split('px')[0]
        let conheight = window.getComputedStyle(imgContainer).height.split('px')[0]
        //let per = conwidth/conheight
        if((conwidth/conheight) > this.per){
            document.getElementById('rshowbg').style.height = conheight + 'px'
            this.showbg = true
        }else{
            document.getElementById('rshowbg').style.width = conwidth + 'px'
            this.showbg = true
        }
    },
    methods: {
        again(){
            this.$router.replace('/begin')
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
                .dai{
                    position: absolute;
                    bottom: 25%;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .num-con{
                    width: 100%;
                    position: absolute;
                    top: 29%;
                    text-align: center;
                    .top{
                        font-size: 24px;
                        font-weight: bold;
                        font-family: '宋体';
                    }
                    .middle{
                        font-size: 40px;
                        font-weight: bold;
                        color: #2c9d46;
                    }
                    .bottom{
                        font-size: 20px;
                        color: #2c9d46;
                    }
                }
                .desc{
                    width: 100%;
                    line-height: 1.5;
                    position: absolute;
                    bottom: 23%;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
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
                bottom: 13%;
                transform: translateX(-50%);
                z-index: 9;
            }
        }
        .share-bg{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 999;
            background: rgba($color: #000000, $alpha: 0.5);
            img{
                display: block;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
</style>
