<template>
    <div class="container">
        <div id="gimgContainer" class="img-container">
          
            <div class="img-con">
                <img id="gshowbg" v-show="showbg" class="bg" src="../assets/jiangpin.png" alt="">
                
                
                <div class="btn-group">
                    <div><img @click="meTo" src="../assets/meTo.png" alt=""></div>
                    <div><img @click="torank" src="../assets/list.png" alt=""></div>
                </div>
                
                <template v-if="result">
                    <div class="num-con">
                        <p class="top">{{nickname}}的<span>五芳福袋</span></p>
                        <p class="bottom">恭喜获得</p>
                    </div>
                    <div @click="showrule = true" class="rule"></div>
                    <!-- <div @click="showtmall = true" class="immediate"></div> -->
                    <img v-if="result == 5" @click="getBag('20')" class="dai" width="55%" src="../assets/20.png" alt="">
                    <img v-if="result == 4" @click="getBag('50')" class="dai" width="55%" src="../assets/50.png" alt="">
                    <img v-if="result == 3" @click="getBag('100')" class="dai" width="55%" src="../assets/100.png" alt="">
                    <img v-if="result == 10" @click="getBag('139-30')" class="dai" width="55%" src="../assets/139-30.png" alt="">
                    <img v-if="result == 8" @click="getBag('199-20')" class="dai" width="55%" src="../assets/199-20.png" alt="">
                    <img v-if="result == 9" @click="getBag('199-50')" class="dai" width="55%" src="../assets/199-50.png" alt="">
                    <img v-if="result == 6" @click="getBag('199-100')" class="dai" width="55%" src="../assets/199-100.png" alt="">
                    <img v-if="result == 7" @click="getBag('299-50')" class="dai" width="55%" src="../assets/299-50.png" alt="">
                    <img v-if="result == 1" @click="getBag('ds')" class="dai" width="55%" src="../assets/ds.png" alt="">
                    <img v-if="result == 2" @click="getBag('xc')" class="dai" width="55%" src="../assets/xc.png" alt="">
                    
                </template>
                <template v-else-if="result == 0">
                    <div class="nobag">
                        <p>手速太慢</p>
                        <p>福袋已被抢完</p>
                        <img width="60%" src="../assets/fortune-null.png" alt="">
                    </div>
                </template>
            </div>
        </div>
        <div v-if="showrule" @click="showrule = false" class="rule-bg">
            <img class="ruleimg" width="70%" src="../assets/rule.png" alt="">
            <img class="close" width="30" src="../assets/close.png" alt="">
        </div>
        <div v-if="showtmall" class="tmall-bg">
            <img src="../assets/command.png" class="command" width="55%" alt="">
            <div class="text">{{'￥'+ tao.split("￥")[1] +'￥'}}</div>
            <div class="copy"
                style="cursor: pointer;"
                onclick
                :data-clipboard-text="tao"></div>
            <img @click="showtmall = false" src="../assets/close.png" class="close" width="30" alt="">
        </div>
        <div class="copy-success" v-if="copySuccess">复制成功!</div>
    </div>
</template>
<script>
import request from '@/utils/request'
import ClipboardJS from "clipboard"
export default {
    name: 'Gift',
    data(){
        return{
            showbg: false,
            per: 0.532635987885885,
            hasBag: true,
            nickname: '',
            result: 0,
            again: false,
            showrule: false,
            showtmall: false,
            shareid: 0,
            tao: '',
            copySuccess: false,
            address: false
        }
    },
    created(){
        //alert(location.href)
        //alert(this.$route.query.openid)
        //alert(this.$route.query.shareid)
        this.shareid = this.$route.query.shareid
        //获取昵称
        request.post('/CefuqiAPi/SaveOpenid' ,{openid: this.$route.query.openid}).then(res => {
            request.post('/CefuqiAPi/GetNickName').then(res => {
                //alert('GetNickName'+JSON.stringify(res))
                if(res.res){
                    this.nickname = res.nickname
                }
                //获取奖品
                request.post('/CefuqiAPi/GetResult',{shareid:this.$route.query.shareid}).then(res => {
                    //alert('GetResult'+JSON.stringify(res))
                    if(res.res){
                        this.result = res.result
                    }else if(res.errtype == 3){
                        this.again = true
                        this.result = res.result
                        if(res.Scode == 1){
                            this.address = true
                        }
                    }
                }).catch(err => {
                    this.result = 0
                    alert('GetResulterr'+JSON.stringify(err))
                })

            }).catch(err => {
                alert('GetNickName'+JSON.stringify(err))
            })
        }).catch(err => {'SaveOpenid'+alert(JSON.stringify(err))})
        
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


        let clipboard = new ClipboardJS(".copy");
        let timer = null;
        clipboard.on("success", e => {
            this.copySuccess = true
            setTimeout(() => {
                this.copySuccess = false
            }, 2000);
        });
        clipboard.on("error", e => {
            alert("复制失败");
        });
    },
    methods: {
        meTo(){
            this.$router.replace('/')
        },
        torank(){
            this.$router.push({
                path: '/list',
                query: {
                    shareid: this.shareid
                }
            })
        },
        getBag(str){
            //alert(str)
            // if(str == '100'){
            //     this.tao = ''
            // }
            if(str == '299-50'){
                this.showtmall = true
                this.tao = '【优惠券】https://m.tb.cn/h.3qOjJD9?sm=baa500 点击链接，再选择浏览器咑閞；或復·制这段描述￥DuG1bLdlVPN￥后咑閞淘♂寳♀[来自超级会员的分享]'
            }
            if(str == '199-20'){
                this.showtmall = true
                this.tao = '【优惠券】https://m.tb.cn/h.3qO9m5x?sm=083f10 点击链接，再选择浏览器咑閞；或復·制这段描述￥9crMbLdlDIF￥后咑閞淘♂寳♀[来自超级会员的分享]'
            }
            if(str == '20'){
                this.showtmall = true
                this.tao = '【优惠券】惠券】https://m.tb.cn/h.3shDijU?sm=f61f7a 点击链 点击链接，再选择浏览器咑閞；或復·制这段描述￥4PGPbJT4Uct￥后咑閞淘♂寳♀[来自超级会员的分享]'
            }
            if(str == '50'){
                this.showtmall = true
                this.tao = '【优惠券】惠券】https://m.tb.cn/h.3sbLIHO?sm=1013e2 点击链 点击链接，再选择浏览器咑閞；或復·制这段描述￥FAPWbJTfaAD￥后咑閞淘♂寳♀[来自超级会员的分享]'
            }
            if(str == '100'){
                this.showtmall = true
                this.tao = '【优惠券】惠券】https://m.tb.cn/h.3sItnaC?sm=e2d879 点击链 点击链接，再选择浏览器咑閞；或復·制这段描述￥K00kbJTUQEe￥后咑閞淘♂寳♀[来自超级会员的分享]'
            }
            if(str == '199-100'){
                this.showtmall = true
                this.tao = '【优惠券】惠券】https://m.tb.cn/h.3shB6Jt?sm=ee1f85 点击链 点击链接，再选择浏览器咑閞；或復·制这段描述￥275ZbJTgWc2￥后咑閞淘♂寳♀[来自超级会员的分享]'
            }
            if(str == 'xc'){
                if(!this.address){
                    this.$router.push({
                        path: '/addInfo',
                        query: {
                            prizeId: 2,
                            shareid: this.shareid
                        }
                    })
                }
            }
            if(str == 'ds'){
                if(!this.address){
                    this.$router.push({
                        path: '/addInfo',
                        query: {
                            prizeId: 1,
                            shareid: this.shareid
                        }
                    })
                }
            }
            if(str == '199-50'){
                location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf922ce057955c917&redirect_uri=http%3a%2f%2fcywsc.wufangzhai.com%2fcoupon%2f%3fcouponId%3d181225154755463617101626&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
            }
            if(str == '139-30'){
                location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf922ce057955c917&redirect_uri=http%3a%2f%2fcywsc.wufangzhai.com%2fcoupon%2f%3fcouponId%3d181225154540297617512640&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
            }
            
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
        .copy-success{
            position: fixed;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 5px;
            background-color: rgba(0,0,0,0.5);
            color: #fff;
            font-size: 16px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 999999999;
        }
        .rule-bg{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba($color: #000000, $alpha: 0.5);
            z-index: 9999;
            .ruleimg{
                position: absolute;
                top: 10%;
                left: 50%;
                transform: translateX(-50%);
            }
            .close{
                position: absolute;
                top: 65%;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .tmall-bg{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba($color: #000000, $alpha: 0.5);
            z-index: 99999;
            .command{
                position: absolute;
                top: 29%;
                left: 50%;
                transform: translateX(-50%);
                z-index: 99999;
            }
            .text{
                position: absolute;
                width: 35%;
                text-align: center;
                font-size: r(14px);
                // height: r(30px);
                // line-height: 
                top: 36.5%;
                left: 50%;
                transform: translateX(-50%);
                // background-color: red;
                z-index: 999999;
            }
            .copy{
                position: absolute;
                width: 25%;
                height: r(30px);
                top: 41%;
                left: 50%;
                transform: translateX(-50%);
                // background-color: red;
                z-index: 999999;
            }
            .close{
                position: absolute;
                top: 65%;
                left: 50%;
                transform: translateX(-50%);
                z-index: 99999;
            }
        }
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
                .rule{
                    position: fixed;
                    width: 20%;
                    height: r(20px);
                    left: 50%;
                    top: 72.5%;
                    transform: translateX(-50%);
                    //background-color: red;
                    z-index: 999;
                }
                .immediate{
                    position: fixed;
                    width: 30%;
                    height: r(30px);
                    left: 50%;
                    top: 64.5%;
                    transform: translateX(-50%);
                    // background-color: red;
                    z-index: 999;
                    
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
