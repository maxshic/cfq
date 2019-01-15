<template>
  <div class="container" ref="cutScreen">
    <div id="createimgContainer" class="img-container">
      <div class="img-con">
        <img id="createshowbg" class="bg" src="../assets/jiangpin.png" alt>
        <img class="dai" width="70%" src="../assets/dai.gif" alt>
        <img class="start-bg" width="40%" src="../assets/again.png" alt>
        <div class="num-con">
          <p class="top">{{nickname}}的福气值为</p>
          <p class="middle">{{value}}</p>
          <p class="bottom">点击福袋试试手气</p>
        </div>
        <p class="desc">福气那么旺，快让大家沾沾你的福气
          <br>福袋内含8份惊喜大奖，分享即可开福袋
        </p>
        <img class="codeimage" src="../assets/code.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  props: ['nickname', 'value'],
  data() {
    return {
      per: 0.532635987885885,
    };
  },
  created() {},
  mounted() {
    let imgContainer = document.getElementById("createimgContainer");

    let conwidth = window.getComputedStyle(imgContainer).width.split("px")[0];
    let conheight = window.getComputedStyle(imgContainer).height.split("px")[0];
    //let per = conwidth/conheight
    if (conwidth / conheight > this.per) {
      document.getElementById("createshowbg").style.height = conheight + "px";
    } else {
      document.getElementById("createshowbg").style.width = conwidth + "px";
    }
    this.doScreeenShots();
  },
  methods: {
    doScreeenShots() {
      const _this = this;
      setTimeout(() => {
        // 创建一个新的canvas
        const _canvas = _this.$refs.cutScreen;
        // 此处用于解决截图不清晰问题，将生成的canvas放大，然后再填充到原有的容器中就会清晰
        const width = _canvas.offsetWidth;
        const height = _canvas.offsetHeight;
        const canvas2 = document.createElement("canvas");
        const scale = 2;
        canvas2.width = width * scale;
        canvas2.height = height * scale;
        const context1 = canvas2.getContext("2d");
        if (context1) {
          context1.scale(scale, scale);
        }
        const opts = {
          scale,
          canvas: canvas2,
          logging: false, //日志开关，便于查看html2canvas的内部执行流程
          width,
          height,
          // 【重要】开启跨域配置
          useCORS: true
        };
        html2canvas(_canvas, opts).then(canvas => {
          const context = canvas2.getContext("2d");
          if (context) {
            context.scale(2, 2);
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
          }
          // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
          //   a.href = canvas.toDataURL();
          _this.$emit("successCreateImg", canvas.toDataURL());
        });
      }, 1000);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../scss/app.scss";
.container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 300%;
  left: 0;
  background-image: url(../assets/beijing.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .img-container {
    width: 90%;
    height: 95%;
    position: absolute;
    @include centerAll;
    .img-con {
      position: absolute;
      // width: 100%;
      // height: 100%;
      @include centerAll;
      .codeimage {
        width: 20%;
        position: absolute;
        right: 2%;
        bottom: 0;
      }
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
      left: 0;
      right: 0;
      bottom: 13%;
      margin: auto;
      z-index: 9;
    }
  }
  .share-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: rgba($color: #000000, $alpha: 0.5);
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
</style>