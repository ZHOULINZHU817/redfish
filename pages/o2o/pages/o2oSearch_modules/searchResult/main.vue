<template>
  <div class="search">
    <div class="search-top">
      <div class="iconfont" @click="goBack">&#xe62d;</div>
      <div class="search-top-input">
        <i class="iconfont" style="margin-left: 20rpx;">&#xe613;</i>
        <div class="search">
          <i class="iconfont icon-sousuo1"></i>
          <a @click="goSearch" id="searchResult">
            <input placeholder="请输入关键字" disabled v-model="inputValue" />
          </a>
        </div>
      </div>
      <div class="search-top-btn" @click="searchBtn">搜索</div>
    </div>
    <div class="goods_list">
      <div
        class="product_list"
        v-for="(item,index) in productList"
        :key="index"
        @click="goodsDetail(item.skuCode)"
      >
        <div class="product_h">
          <img class="imgs" :src="item.dataPic" alt />
        </div>
        <div class="product_t">
          <div class="goods-name">{{item.goodsName}}</div>
          <div class="t_subtitle">{{item.goodsProperty}}</div>
          <!-- <p class="f_title" :style="{color:baseColor,borderColor:baseColor}"></p> -->
          <div class="t-box">
            <div class="t-box-flex3">
              <div class="color-red">{{unitPrice.obpay}}{{item.pricesetNprice}}{{unitPrice.mapay}}</div>
              <div
                class="market-price"
                v-if="item.pricesetMakeprice != 0 "
              >{{unitPrice.obpay}}{{item.pricesetMakeprice}}{{unitPrice.mapay}}</div>
            </div>
            <div class="t-box-flex1">
              <i
                class="add-car iconfont"
                @click.stop="addCart(item.skuId)"
                :style="{background:baseColor}"
              >&#xe6f3;</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/http.js";
import { $storage, $router, $message } from "@/utils/prototype/vue.js";
import { getProappinfo, search, addShoppingGoods } from "@/api/interface.js";
export default {
  data() {
    return {
      title: "搜索",
      leftIcon: true,
      rightIcon: true,
      items: [],
      baseColor: "",
      inputValue: "",
      inputArray: [],
      productList: [1, 1, 2, 2, 2],
      total: 0,
      page: 1,
      rows: 10,
      searchPath: "" //搜索路径
    };
  },
  onLoad(options) {
    Object.assign(this, this.$options.data());
    wx.setNavigationBarTitle({
      title: $storage.get("proappEnvName")
    });
    wx.setNavigationBarColor({
      frontColor: "#ffffff", // 必写项
      backgroundColor: "#" + this.$state.baseColor
    });
    this.baseColor = "#" + this.$state.baseColor;
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    // if(prevpage&&prevpage.route){
    //   $storage.set('searchAfterRouter',prevpage.route)
    // }
    this.inputValue = options.searchParam;
    if (options && options.json) {
      switch (JSON.parse(options.json).path) {
        case "home":
          $storage.set("searchAfterRouter", "home");
          break;
        case "classify":
          $storage.set("searchAfterRouter", "classify");
          break;
      }
    }
  },
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    this.loadMore();
  },
  computed: {
    unitPrice() {
      // mapay 主单位（后面）  mbpay 主单位（前面）  obpay 辅单位（前面）   oapay 辅单位（后面）
      return this.$state.unitPrice || $storage.get("unitPrice");
    }
  },
  mounted() {
    if ($storage.get("searchHistory")) {
      this.items = $storage.get("searchHistory");
    }
    this.baseColor = "#" + this.$state.baseColor;
    this.params = {
      sortField: "",
      order: "desc",
      page: 1,
      rows: this.rows,
      searchParam:
        this.$root.$mp.query.searchParam || $storage.get("searchParam")
    };
    this.commonMounted();
    $storage.get("getTopPerMenuList").map(v => {
      if (v.menuAction == "search" && v.menuCode == "MP000002") {
        this.searchPath = v.menuJspath;
      }
    });
  },
  methods: {
    //下拉加载更多
    loadMore() {
      let num = Math.ceil(this.total / 10);
      this.page++;
      let params = Object.assign(this.params, { page: this.page });
      if (params.page <= num) {
        http.get(search, params).then(res => {
          let list = res.rows;
          list.map(v => {
            if (!RegExp(/http/).test(v.dataPic)) {
              v.dataPic = this.$domain + v.dataPic;
            }
          });

          this.productList = [...this.productList, ...list];
        });
      } else {
        this.lastPageLine = true;
      }
    },
    //跳转详情
    goodsDetail(skuCode) {
      let json = {
        skuCode: skuCode
      };
      $router.push("o2o/pages/goodsdetails_modules/o2o_goosDetail", json);
    },

    goSearch() {
      $router.push(this.searchPath);
    },

    commonMounted() {
      this.lastPageLine = false;
      http.get(search, this.params).then(res => {
        this.productList = res.rows;
        this.productList.map(v => {
          if (!RegExp(/http/).test(v.dataPic)) {
            v.dataPic = this.$domain + v.dataPic;
          }
          v.nowGoodsNum = v.goodsMinnum;
          if (v.goodsMinnum <= 0) {
            v.nowGoodsNum = 1;
          }
        });
        console.log(this.productList, "this.productList---");
        this.total = res.total;
      });
    },
    searchBtn() {
      this.commonHistory();
    },
    commonHistory() {
      if (this.inputValue) {
        if ($storage.get("searchHistory")) {
          let attr = $storage.get("searchHistory");
          attr.unshift(this.inputValue);
          $storage.set("searchHistory", attr);
        } else {
          this.inputArray.unshift(this.inputValue);
          $storage.set("searchHistory", this.inputArray);
        }
      }

      let query = {
        sortField: "",
        order: "desc",
        page: 1,
        rows: 10,
        searchParam: this.inputValue
      };
      $storage.set("searchParam", this.inputValue);
      this.inputValue = "";
    },
    clearHistory() {
      this.items = [];
      this.inputArray = [];
      $storage.remove("searchHistory");
    },
    onSubmit(e) {
      $router.push("o2oSearch_modules/searching");
      this.inputValue = e.target.value;
      this.commonHistory();
    },
    searchItems(item, index) {
      let query = {
        searchParam: item
      };
      $storage.set("searchParam", item);
      $router.push("search_modules/business", query);
    },
    //添加购物车
    addCart(skuid) {
      http
        .get(addShoppingGoods, {
          skuId: skuid,
          goodsNum: 1
        })
        .then(res => {
          if (res.success) {
            $message.alert("购物车添加成功");
          } else {
            $message.alert(res.msg);
          }
        });
    },
    goBack() {
      this.inputValue = "";
      $router.back(-1);
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../../../../common/css/common.less";
.add-car {
  display: inline-block;
  padding: 2rpx;
  width: 36rpx;
  height: 36rpx;
  text-align: center;
  line-height: 36rpx;
  border-radius: 36rpx;
  color: #fff;
  font-size: 24rpx;
  font-weight: bolder;
}
.search {
  width: 100%;
  height: 100%;
  background: @white-color;
  &-cart {
    background-color: rgba(197, 191, 191, 0.8);
    width: 100rpx;
    height: 100rpx;
    border-radius: 50rpx;
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 80rpx;
    left: 80rpx;
  }
  &-top {
    padding: 20rpx 20rpx 10rpx 30rpx;
    display: flex;
    justify-content: space-between;
    height: 68rpx;
    align-items: center;
    border-bottom: 1rpx solid #ececec;
    &-back {
      a {
        width: 36rpx;
        height: 60rpx;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    &-input {
      position: relative;
      width: calc(100% - 64rpx);
      background-color: #eeeeee;
      border-radius: 68rpx;
      margin-left: 30rpx;
      i {
        width: 36rpx;
        height: 68rpx;
        line-height: 68rpx;
        display: inline-block;
        position: absolute;
        left: 0rpx;
        top: 0;
        color: @color-999;
      }
      .search {
        position: relative;
        > i {
          color: #999;
          position: absolute;
          height: 60rpx;
          line-height: 60rpx;
          top: 0;
          left: 30rpx;
          font-size: 28rpx;
        }
        > a {
          > input {
            background: #eeeeee;
            border-radius: 30rpx;
            height: 58rpx;
            color: #999999;
            padding-left: 10%;
          }
        }
      }
    }
    &-btn {
      width: 88rpx;
      height: 68rpx;
      line-height: 68rpx;
      text-align: center;
      font-size: 28rpx;
    }
  }
  .goods_list {
    .product_list {
      margin-left: 30rpx;
      margin-right: 30rpx;
      height: 222rpx;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f2f2f2;
      margin-bottom: 20rpx;
      border-radius: 6rpx;
      .product_h {
        width: 25%;
        height: 158rpx;
        float: left;
        display: inline-block;
        img {
          display: inline-block;
          width: 144rpx;
          height: 144rpx;
          margin-top: 34rpx;
          margin-right: 26rpx;
        }
      }
      .product_t {
        width: 70%;
        height: 100rpx;
        line-height: 50rpx;
        float: left;
        right: 0;
        .goods-name {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          overflow: hidden;
          font-size: 26rpx;
          margin-bottom: 42rpx;
        }
        .t-box {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .t_subtitle {
          font-size: 24rpx;
          color: #c1c1c1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .f_title {
          font-size: 20rpx;
          height: 26rpx;
          line-height: 26rpx;
          display: inline-block;
          //   border: 1px solid #333333;
          border-radius: 22rpx;
          padding: 4rpx 16rpx;
          margin-bottom: 30rpx;
        }
        .t-box-flex1 {
          width: 120rpx;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }
        .t-box-flex3 {
          display: flex;
          flex-direction: row;
          .color-red {
            color: red;
            // font-size: 26rpx;
          }
          .market-price {
            margin-left: 10rpx;
            color: #c1c1c1;
            font-size: 26rpx;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>

