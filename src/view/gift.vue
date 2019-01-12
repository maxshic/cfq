<template>
    <div class="container">
        <div id="rimgContainer" class="img-container">
          
            <div class="img-con">
                <img id="rshowbg" v-show="showbg" class="bg" src="../assets/jiangpin.png" alt="">
                
                
                <div class="btn-group">
                    <div><img @click="meTo" src="../assets/meTo.png" alt=""></div>
                    <div><img src="../assets/list.png" alt=""></div>
                </div>
                
                <template v-if="hasBag">
                    <div class="num-con">
                        <p class="top">清风扬的<span>五芳福袋</span></p>
                        <p class="bottom">恭喜获得</p>
                    </div>
                    <img @click="q20" class="dai" width="55%" src="../assets/20.png" alt="">
                </template>
                <template v-else>
                    <div class="nobag">
                        <p>手速太慢</p>
                        <p>福袋已被抢完</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Gift',
    data(){
        return{
            showbg: false,
            per: 0.532635987885885,
            hasBag: false,
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
        meTo(){
            this.$router.replace('/')
        },
        q20(){
            alert(123)
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
                    bottom: 23%;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .num-con{
                    width: 100%;
                    position: absolute;
                    top: 28%;
                    text-align: center;
                    .top{
                        font-size: 20px;
                        font-weight: bold;
                        font-family: '宋体';
                        color: #010003;
                        padding-bottom: 5px;
                        span{
                            color: #A13018;
                        }
                    }
                    .middle{
                        font-size: 40px;
                        font-weight: bold;
                        color: #2c9d46;
                    }
                    .bottom{
                        font-size: 24px;
                        color: #010003;
                        font-family: '宋体';
                        font-weight: bold;
                    }
                }
                .desc{
                    width: 100%;
                    line-height: 1.5;
                    position: absolute;
                    bottom: 30%;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                }
                .btn-group{
                    width: 70%;
                    position: absolute;
                    bottom: 16%;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-around;
                    img{
                        display: block;
                        width: 94%;
                        margin: auto;
                    }
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
