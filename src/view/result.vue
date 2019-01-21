<template>
    <div class="container">
        <img class="flower" src="../assets/huawen.png" alt="">
        <div id="rimgContainer" class="img-container">
            <img class="langImage" src="../assets/touchLang.png" alt>
            <div class="img-con">
                <img id="rshowbg" v-show="showbg" class="bg" src="../assets/jiangpin.png" alt>
                <div class="num-con">
                    <p class="top">{{nickname}}的福气值为</p>
                    <p class="middle">{{value}}</p>
                    <p class="bottom">点击福袋试试手气</p>
                </div>
                <p class="desc">爱播撒福气的人，运气都不会太差呦！
                    <!-- <br>福袋内含8份惊喜大奖，分享即可开福袋 -->
                </p>
                <img class="saveImage" :src="imageSrc" alt>
                <img class="dai" @click="share = true" width="70%" src="../assets/dai.gif" alt>
                <img class="start-bg" @click="again" width="40%" src="../assets/again.png" alt>
            </div>
        </div>
        <div class="share-bg-box" v-show="share" @click="share = false">
            <img src="../assets/share_03.png" width="75%" alt>
        </div>
        <create-img :nickname="nickname" :value="value" @successCreateImg="successCreateImg"></create-img>
    </div>
</template>
<script>
import request from "@/utils/request";
import wx from "weixin-js-sdk";
import createImg from "@/components/createImg.vue";
export default {
    name: "Result",
    components: {
        createImg
    },
    data() {
        return {
            showbg: false,
            per: 0.532635987885885,
            share: false,
            // value: 80+Math.floor(Math.random()*(100-80)),
            value: "",
            nickname: "",
            shareid: "",
            imageSrc: ""
        };
    },
    created() {
        //昵称
        request
            .post("/CefuqiAPi/GetNickName")
            .then(res => {
                if (res.res) {
                    this.nickname = res.nickname;
                }
            })
            .catch(err => {
                alert(JSON.stringify(err));
            });
        //次数
        request
            .post("/CefuqiAPi/getawarddes")
            .then(res => {
                if (res.res) {
                    // this.$router.replace('/begin')
                    this.value = 80 + Math.floor(Math.random() * (100 - 80));
                    request
                        .post("/CefuqiAPi/Addfu", { Goodvalue: this.value })
                        .then(res => {
                            //alert(JSON.stringify(res))
                        })
                        .catch(err => {
                            alert(JSON.stringify(err));
                        });
                } else {
                    //alert('抽奖次数已用完')
                    this.value = res.goodvalue;
                }
            })
            .catch(err => {
                alert("测试次数已用完!");
            });
        //添加分享
        request
            .post("/CefuqiAPi/AddShare", {})
            .then(res => {
                if (res.res) {
                    this.shareid = res.shareid;
                }
            })
            .catch(err => {});
    },
    mounted() {
        let imgContainer = document.getElementById("rimgContainer");
        let conwidth = window
            .getComputedStyle(imgContainer)
            .width.split("px")[0];
        let conheight = window
            .getComputedStyle(imgContainer)
            .height.split("px")[0];
        //let per = conwidth/conheight
        if (conwidth / conheight > this.per) {
            document.getElementById("rshowbg").style.height = conheight + "px";
            this.showbg = true;
        } else {
            document.getElementById("rshowbg").style.width = conwidth + "px";
            this.showbg = true;
        }
        wx.ready(() => {
            wx.onMenuShareAppMessage({
                title: "发福袋了，大家快来沾沾福气！", // 分享标题
                desc: "发福袋了，大家快来沾沾福气！", // 分享描述
                link:
                    "http://cx.shhuiya.com/CefuApi/BindUserPage1?shareid=" +
                    this.shareid, // 分享链接
                imgUrl: "https://cx.shhuiya.com/cfq/cfq/audio/share.jpg", // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: this.successShare
            });
            wx.onMenuShareTimeline({
                title: "发福袋了，大家快来沾沾福气！", // 分享标题
                link:
                    "http://cx.shhuiya.com/CefuApi/BindUserPage1?shareid=" +
                    this.shareid, // 分享链接
                imgUrl: "https://cx.shhuiya.com/cfq/cfq/audio/share.jpg", // 分享图标
                success: this.successShare
            });
        });
        this.myShare();
    },
    methods: {
        successCreateImg(e) {
            this.imageSrc = e;
        },
        again() {
            request
                .post("/CefuqiAPi/getawarddes")
                .then(res => {
                    if (res.res) {
                        this.$router.replace("/begin");
                    } else {
                        alert("测试次数已用完");
                    }
                })
                .catch(err => {
                    alert("测试次数已用完!");
                });
        },
        successShare() {
            //分享成功的接口
            //alert(213455)
            // $request.post("AddShare", {}).then(res => {
            //     //alert(JSON.stringify(res));
            //     location.href = 'http://cx.shhuiya.com/CefuApi/BindUserPage'
            // });
        },
        myShare() {
            const url = location.href.split("#")[0];
            request
                .post("/CefuAPi/ConfigParams", {
                    url: location.href.split("#")[0]
                })
                .then(res => {
                    const data = {
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

                        appId: res.param.appId, // 必填，公众号的唯一标识
                        timestamp: res.param.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.param.nonceStr, // 必填，生成签名的随机串
                        signature: res.param.signature, // 必填，签名，见附录1
                        jsApiList: [
                            "onMenuShareAppMessage",
                            "onMenuShareTimeline"
                        ]
                        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    };
                    //接口入住权限验证配置
                    wx.config(data);
                })
                .catch(err => {
                    alert(JSON.stringify(err));
                });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../scss/app.scss";
.container {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    .saveImage {
        position: absolute;
        top: -1.5%;
        left: -5%;
        width: 100vw;
        height: 100vh;
        opacity: 0;
    }
    .img-container {
        width: 90%;
        height: 95%;
        position: absolute;
        z-index: 1;
        @include centerAll;
        .langImage {
            width: 30%;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -3.5%;
            margin: auto;
        }
        .img-con {
            position: absolute;
            // width: 100%;
            // height: 100%;
            @include centerAll;
            .dai {
                position: absolute;
                bottom: 25%;
                left: 0;
                right: 0;
                margin: auto;
            }
            .num-con {
                width: 100%;
                position: absolute;
                top: 29%;
                text-align: center;
                .top {
                    font-size: r(14px);
                    font-weight: bold;
                    font-family: "宋体";
                }
                .middle {
                    font-size: r(40px);
                    font-weight: bold;
                    color: #2c9d46;
                }
                .bottom {
                    font-size: r(12px);
                    color: #2c9d46;
                }
            }
            .desc {
                width: 100%;
                line-height: 1.5;
                position: absolute;
                bottom: 23%;
                font-size: r(10px);
                font-weight: bold;
                text-align: center;
            }
        }
        .bg {
            display: block;
            margin: 0;
            // position: absolute;
            // @include centerAll;
        }
        .start-bg {
            position: absolute;
            //   left: 50%;
            bottom: 13%;
            left: 0;
            right: 0;
            margin: auto;
            //   transform: translateX(-50%);
            //   z-index: 9;
        }
    }
    .share-bg-box {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba($color: #000000, $alpha: 0.5);
        z-index: 12345;
        img {
            display: block;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
</style>
