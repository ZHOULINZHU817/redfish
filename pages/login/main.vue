<template>
  <div></div>
</template>
<script>
import http from "@/api/http.js";
import { $storage, $router, $message } from "@/utils/prototype/vue.js";
import { loginMiniProgram, getTopPerMenuListFPc } from "@/api/interface.js";
export default {
  data() {
    return {
      redirectUrl: null
    };
  },
  onLoad(options) {
    let that = this;
    that.redirectUrl = options.redirectUrl;
    wx.login({
      success(res) {
        if (res.code) {
          $storage.set("code", res.code);
          http
            .get(loginMiniProgram, { js_code: res.code, state: "wx" })
            .then(res => {
              $storage.set("userOpenid", res.dataObj.userOpenid);
              if (res.dataObj.register == "true") {
                $router.replace("my/bindPhone");
              } else {
                let ticketTokenid = JSON.parse(res.dataObj.userInfo);
                $storage.set("loginInfor", ticketTokenid);
                $storage.set("userId", ticketTokenid.userId);
                $storage.set("sessionid", ticketTokenid.ticketTokenid);
                http.get(getTopPerMenuListFPc).then(el => {
                  if (el) {
                    $storage.set("getTopPerMenuList", el.menuList);
                    $storage.set(
                      "footerMenu",
                      el.menuList.filter(v => v.menuShow === 0)
                    );
                    wx.getUserInfo({
                      success: function(res) {
                        console.log(res, "rrrr");
                        $storage.set("userInfo", res.userInfo);
                      }
                    });
                    let miniToken = wx.getStorageSync("miniToken");
                    let cookie = ticketTokenid.ticketTokenid;
                    let miniCookie =
                      miniToken +
                      "=" +
                      cookie +
                      "; Domain=" +
                      that.$domain.substring(8) +
                      "; Path=/";
                    $storage.set("miniUserName", miniCookie);
                    if (that.redirectUrl) {
                      $router.replace(that.redirectUrl);
                    }
                    // if (that.redirectUrl) {
                    //   $router.replace(that.redirectUrl);
                    // } else {
                    //   $router.replace("o2o_mine");
                    // }
                  }
                });

                // else {
                //   $router.replace("o2o_mine");
                // }
              }
            });
        }
      }
    });
  },

  methods: {}
};
</script>




