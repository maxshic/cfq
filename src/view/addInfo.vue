<template>
  <div class="container">
      <img class="flower" src="../assets/huawen.png" alt="">
    <div id="addimgContainer" class="img-container">
      <div class="img-con">
        <img id="addshowbg" v-show="showbg" class="bg" src="../assets/jiangpin.png" alt>
        <div class="title">请完善领奖信息</div>
        <div class="dai">
          <img src="../assets/info.png" alt>
          <div class="info-box">
            <div>收件人</div>
            <input v-model="name" type="text">
            <div>手机号</div>
            <input v-model="tell" type="number">
            <div>收件地址</div>
            <input v-model="address" type="text">
          </div>
        </div>
        <img @click="submit" class="start-bg" width="40%" src="../assets/submit.png" alt>
      </div>
    </div>
  </div>
</template>
<script>
import $request from "@/utils/request";
export default {
  name: "AddInfo",
  data() {
    return {
      showbg: false,
      per: 0.532635987885885,
      name: "",
      tell: "",
      address: "",
      flag: true
    };
  },
  mounted() {
    let imgContainer = document.getElementById("addimgContainer");
    let conwidth = window.getComputedStyle(imgContainer).width.split("px")[0];
    let conheight = window.getComputedStyle(imgContainer).height.split("px")[0];
    //let per = conwidth/conheight
    if (conwidth / conheight > this.per) {
      document.getElementById("addshowbg").style.height = conheight + "px";
      this.showbg = true;
    } else {
      document.getElementById("addshowbg").style.width = conwidth + "px";
      this.showbg = true;
    }
  },
  methods: {
    submit() {
      if (!this.flag) return;
      this.flag = false;
      const { name, tell, address } = this;
      //   console.log()
      if (name.trim().length <= 0) {
        this.flag = true;
        return alert("请填写姓名");
      }
      if (!/^(1[3456789]|9[28])\d{9}$/.test("" + this.tell)) {
        this.flag = true;
        return alert("请填写正确的手机号");
      }
      if (address.trim().length <= 0) {
        this.flag = true;
        return alert("请填写地址");
      }
      const data = {
        Name: name,
        Phone: tell,
        Site: address,
        PrizeId: this.$route.query.prizeId
      };
      $request
        .post("/CefuqiAPi/PostAddress", data)
        .then(res => {
          if (!res.res) {
            this.flag = true;
            alert("提交失败");
          } else {
            this.$router.replace({
                path: '/gift',
                shareid: this.$route.query.shareid
            })
          }
        })
        .catch(err => {
          this.flag = true;
          alert("提交失败");
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

  .img-container {
    width: 90%;
    height: 95%;
    position: absolute;
    z-index: 1;
    @include centerAll;
    .img-con {
      position: absolute;
      // width: 100%;
      // height: 100%;
      @include centerAll;
      .title {
        font-size: r(20px);
        font-weight: bold;
        font-family: "宋体";
        color: #010003;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 65%;
        width: 100%;
      }
      .dai {
        position: absolute;
        bottom: 23%;
        width: 55%;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 0px;
        line-height: 0;
        img {
          width: 100%;
        }
        .info-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: r(14px);
          line-height: r(14px);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #ead7a2;
          input {
            width: 60%;
            border: none;
            border-bottom: 1px solid #ead7a2;
            background: none;
            outline: none;
            margin: 6% 0 10%;
            color: #ead7a2;
            font-size: r(14px);
          }
        }
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
      left: 50%;
      bottom: 13%;
      transform: translateX(-50%);
      z-index: 9;
    }
  }
}
</style>
