<template>
    <div class="container">
        <div id="gimgContainer" class="img-container">
          
            <div class="img-con">
                <img id="gshowbg" v-show="showbg" class="bg" src="../assets/jiangpin.png" alt="">
                
                
                <div class="btn-group">
                    <div><img @click="meTo" src="../assets/meTo.png" alt=""></div>
                    <div><img src="../assets/list.png" alt=""></div>
                </div>
                
                <template v-if="hasBag">
                    <div class="num-con">
                        <p class="top">清风扬的<span>五芳福袋</span></p>
                        <p class="bottom">恭喜获得</p>
                    </div>
                    <!-- <img @click="getBag('20')" class="dai" width="55%" src="../assets/20.png" alt=""> -->
                    <!-- <img @click="getBag('50')" class="dai" width="55%" src="../assets/50.png" alt=""> -->
                    <!-- <img @click="getBag('100')" class="dai" width="55%" src="../assets/100.png" alt=""> -->
                    <!-- <img @click="getBag('139-30')" class="dai" width="55%" src="../assets/139-30.png" alt=""> -->
                    <!-- <img @click="getBag('199-20')" class="dai" width="55%" src="../assets/199-20.png" alt=""> -->
                    <!-- <img @click="getBag('199-50')" class="dai" width="55%" src="../assets/199-50.png" alt=""> -->
                    <!-- <img @click="getBag('199-100')" class="dai" width="55%" src="../assets/199-100.png" alt=""> -->
                    <!-- <img @click="getBag('299-50')" class="dai" width="55%" src="../assets/299-50.png" alt=""> -->
                    <!-- <img @click="getBag('ds')" class="dai" width="55%" src="../assets/ds.png" alt=""> -->
                    <img @click="getBag('xc')" class="dai" width="55%" src="../assets/xc.png" alt="">
                </template>
                <template v-else>
                    <div class="nobag">
                        <p>手速太慢</p>
                        <p>福袋已被抢完</p>
                        <img width="60%" src="../assets/fortune-null.png" alt="">
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import request from '@/utils/request'
export default {
    name: 'Gift',
    data(){
        return{
            showbg: false,
            per: 0.532635987885885,
            hasBag: true,
        }
    },
    created(){
        alert(location.href)
        alert(this.$route.query.openid)
        request.post('SaveOpenid' ,{openid: this.$route.query.openid}).then(res => {
            request.post('GetNickName').then(res => {
                alert(JSON.stringify(res))
            }).catch(err => {
                alert(JSON.stringify(err))
            })
        }).catch(err => {alert(JSON.stringify(err))})
        
    },
    mounted(){
        let imgContainer = document.getElementById('gimgContainer')

        let conwidth = window.getComputedStyle(imgContainer).width.split('px')[0]
        let conheight = window.getComputedStyle(imgContainer).height.split('px')[0]
        //let per = conwidth/conheight
        if((conwidth/conheight) > this.per){
            document.getElementById('gshowbg').style.height = conheight + 'px'
            this.showbg = true
        }else{
            document.getElementById('gshowbg').style.width = conwidth + 'px'
            this.showbg = true
        }
    },
    methods: {
        meTo(){
            this.$router.replace('/')
        },
        getBag(str){
            alert(str)
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
                .nobag{
                    position: absolute;
                    width: 80%;
                    top: 30%;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    p{
                        font-size: r(14px);
                        font-weight: bold;
                        font-family: '宋体';
                        color: #010003;
                        padding-bottom: 5px;
                    }
                }
                .num-con{
                    width: 100%;
                    position: absolute;
                    top: 28%;
                    text-align: center;
                    .top{
                        font-size: r(14px);
                        font-weight: bold;
                        font-family: '宋体';
                        color: #010003;
                        //padding-bottom: 2px;
                        span{
                            color: #A13018;
                        }
                    }
                    .bottom{
                        font-size: r(16px);
                        color: #010003;
                        font-family: '宋体';
                        font-weight: bold;
                    }
                }
                // .desc{
                //     width: 100%;
                //     line-height: 1.5;
                //     position: absolute;
                //     bottom: 30%;
                //     font-size: 14px;
                //     font-weight: bold;
                //     text-align: center;
                // }
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
