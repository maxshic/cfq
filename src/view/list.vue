<template>
  <div class="container">
    <div id="listimgContainer" class="img-container">
      <div class="img-con">
        <img id="listshowbg" v-show="showbg" class="bg" src="../assets/jiangpin.png" alt>
        <img class="look-title" src="../assets/look.png" alt>
        <div class="look-box">
          <div class="look-list" v-for="(item, index) in list" :key="index">
            <img class="look-photo" :src="item.Photo" alt>
            <div class="name">
              <span>{{item.NickName | filterName}}</span>
              <img v-if="item.PrizesId === 1" src="../assets/best.png" alt>
            </div>
            <div class="ing">
              <span>{{item.PrizesId | filterGift}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $request from "@/utils/request";
export default {
  name: "List",
  data() {
    return {
      showbg: false,
      per: 0.532635987885885,
      list: []
    };
  },
  mounted() {
    let imgContainer = document.getElementById("listimgContainer");
    let conwidth = window.getComputedStyle(imgContainer).width.split("px")[0];
    let conheight = window.getComputedStyle(imgContainer).height.split("px")[0];
    //let per = conwidth/conheight
    if (conwidth / conheight > this.per) {
      document.getElementById("listshowbg").style.height = conheight + "px";
      this.showbg = true;
    } else {
      document.getElementById("listshowbg").style.width = conwidth + "px";
      this.showbg = true;
    }
    this.getList();
  },
  filters: {
    filterName(str) {
      let arr = str.split("");
      if (arr.length <= 3) {
        return str;
      } else {
        return `${arr[0]}${arr[1]}${arr[2]}...`;
      }
    },
    filterGift(id) {
      let str = "";
      switch (+id) {
        case 1:
          str = "戴森吹风机";
          break;
        case 2:
          str = "携程礼品卡";
          break;
        case 3:
          str = "￥100";
          break;
        case 4:
          str = "￥50";
          break;
        case 5:
          str = "￥20";
          break;
        case 6:
          str = "￥100";
          break;
        case 7:
          str = "￥50";
          break;
        case 8:
          str = "￥20";
          break;
        case 9:
          str = "￥50";
          break;
        case 10:
          str = "￥30";
          break;
        default:
          str = "￥20";
      }
      return str;
    }
  },
  methods: {
    getList() {
      //获取列表
      $request.post("ShareList", { shareid: this.$route.query.shareid }).then(res => {
        if (res.res) {
          this.list = res.list;
        }
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
    @include centerAll;
    .img-con {
      position: absolute;
      // width: 100%;
      // height: 100%;
      @include centerAll;
      .look-title {
        width: 40%;
        position: absolute;
        top: 26.5%;
        left: 0;
        right: 0;
        margin: auto;
      }
      .look-box {
        width: 60%;
        position: absolute;
        top: 31%;
        left: 0;
        right: 0;
        margin: auto;
        .look-list {
          box-sizing: border-box;
          border-bottom: 1px solid #b43a19;
          font-size: 12px;
          color: #b43a19;
          padding: r(5px) 0 r(5px) r(10px);
          display: flex;
          align-items: center;
          .look-photo {
            width: 15%;
            margin-right: 5px;
            box-sizing: border-box;
            border-radius: 3px;
            border: 1px solid #373034;
          }
          .name {
            width: 49%;
            position: relative;
            top: 0;
            left: 0;
            img {
              width: 50%;
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
            }
          }
          .ing {
            text-shadow: 0 0 2px #ebcd30, 0 0 2px #ebcd30;
          }
          span {
            transform: scale(0.8);
            display: inline-block;
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
