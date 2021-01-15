<template>
  <div class="personal">
    <commonHeader :title="title" :leftIcon="leftIcon" :rightIcon="rightIcon" />
    <div class="personal-save" @click="messageSave">保存</div>
    <div class="personal-img">
      <img :src=" userInfo.avatarUrl || userInfo.avatar || userImgurl" />
    </div>
    <div class="personal-con">
      <ul>
        <li>
          用户名
          <span>{{userMsg.userName}}</span>
        </li>
        <li>
          昵称
          <span>{{userInfo.nickName}}</span>
        </li>
        <li>
          性别
          <p>
            <view @click="sexClick(1)">
              <i class="iconfont" v-if="userMsg.userSex=='1'" :style="{color:baseColor}">&#xe671;</i>
              <i class="iconfont" v-else>&#xe672;</i>
              男
            </view>
            <view @click="sexClick(2)">
              <i class="iconfont" v-if="userMsg.userSex=='2'" :style="{color:baseColor}">&#xe671;</i>
              <i class="iconfont" v-else>&#xe672;</i>
              女
            </view>
          </p>
        </li>
        <li>
          生日
          <picker mode="date" :start="startDate" :end="endDate" @change="bindDateChange">
            <view class="picker">{{userMsg.userBirthday?userMsg.userBirthday:'请选择'}}</view>
          </picker>
        </li>
      </ul>
    </div>
    <div class="personal-set">
      <ul>
        <li>
          <label for>设置</label>
          <p @click="loginOut">清除缓存</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import { $storage, $router, $message } from "@/utils/prototype/vue.js";
import { getPersonal, changePersonal, loginOut } from "@/api/interface.js";
import commonHeader from "@/components/communal/commonHeader";
import {formatDate} from "@/utils/prototype/date.js";
export default {
  data() {
    return {
      title: "设置",
      leftIcon: true,
      rightIcon: false,
      baseColor: "",
      items: ["男", "女"],
      userBirthday: "请选择",
      userMsg: {},
      userInfo: {},
      userImgurl: require("../../../../static/img/mine/default_header.png"),
	  startDate: '1950-01-01',
	  endDate: formatDate(new Date().getTime())
    };
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: $storage.get("proappEnvName")
    });
    wx.setNavigationBarColor({
      frontColor: "#ffffff", // 必写项
      backgroundColor: "#" + this.$state.baseColor
    });
  },
  components: {
    commonHeader
  },
  mounted() {
    this.baseColor = "#" + this.$state.baseColor;
    this.userInfo = this.$storage.get("userInfo");
    http
      .post(getPersonal, { userId: this.$storage.get("userId") })
      .then(res => {
        this.userMsg = res;
      });
  },
  methods: {
    sexClick(index) {
      if (index == 1) {
        this.userMsg.userSex = "1";
      } else {
        this.userMsg.userSex = "2";
      }
    },
    loginOut() {
      http.get(loginOut).then(res => {
        if (res.success) {
          // let baseColor = $storage.get("baseColor");
          // wx.removeStorageSync("token");
          // wx.clearStorage();
          // $storage.set("baseColor", baseColor);
          wx.showToast({
            title: "清除成功",
            icon: "none",
            duration: 2000
          });
        }
      });
    },
    bindDateChange(e) {
      let { value } = e.target;
      this.userMsg.userBirthday = value;
    },
    messageSave() {
      let params = {
        userNickname: this.userInfo.nickName,
        userImgurl: this.userInfo.avatarUrl,
        userBirthday: this.userMsg.userBirthday,
        userId: this.$storage.get("userId"),
        userSex: this.userMsg.userSex
      };
      http.post(changePersonal, params).then(res => {
        if (res && res.success) {
          $message.alert("保存成功！");
          $router.replace("mine");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../common/css/common.less";
.personal {
  width: 100%;
  height: 100%;
  background: @white-color;
  &-save {
    position: fixed;
    z-index: 9999;
    height: 90rpx;
    width: 70rpx;
    line-height: 90rpx;
    text-align: right;
    right: 30rpx;
    top: 0;
    font-size: @big-title;
  }
  &-img {
    padding: 130rpx 0 48rpx;
    border-bottom: 20rpx solid #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 164rpx;
      height: 164rpx;
      border-radius: 50%;
    }
  }
  &-con {
    padding: @padding-30;
    ul {
      li {
        border-bottom: 1rpx solid #f6f6f8;
        height: 99rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: @big-title;
        color: @color-333;
        p {
          display: flex;
          align-items: center;
          view {
            display: flex;
            align-items: center;
            i {
              margin-right: 10rpx;
              color: #8d8d8d;
            }
            &:first-child {
              margin-right: 38rpx;
            }
          }
        }
      }
    }
  }
  &-set {
    border-top: 20rpx solid #fafafa;
    padding: @padding-30;
    ul {
      border-bottom: 1rpx solid #f6f6f8;

      font-size: @big-title;
      color: @color-333;
      li {
        display: flex;
        height: 99rpx;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>




