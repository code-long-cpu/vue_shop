<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />

    <!-- 购物车不为空 -->
    <div v-if="isLogin && cartList.length > 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all"
          >共<i>{{ cartTotal }}</i
          >件商品</span
        >
        <span class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox
            :value="item.isChecked"
            @click="toggleCheck(item.goods_id)"
          ></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="" />
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">
                ¥ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <!-- 既希望保修原来的形参，又需要通过调用函数传参；则使用箭头函数 -->
              <!-- <CountBox @input="changeCount" :value="item.goods_num"></CountBox> -->
              <!-- 通过箭头函数拿到了子组件传来的值，并重新传入连个新的参数 -->
              <CountBox
                @input="
                  (value) =>
                    changeCount(value, item.goods_id, item.goods_sku_id)
                "
                :value="item.goods_num"
              ></CountBox>
            </span>
          </div>
        </div>
      </div>

      <!-- 购物车底部 -->
      <div class="footer-fixed">
        <div class="all-check" @click="toggleAllCheck">
          <van-checkbox icon-size="18" :value="isAllChecked"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span
              >¥ <i class="totalPrice">{{ selPrice }}</i></span
            >
          </div>
          <div
            v-if="!isEdit"
            class="goPay"
            :class="{ disabled: selCount === 0 }"
            @click="goPay"
          >
            结算({{ selCount }})
          </div>
          <div
            v-else
            class="delete"
            @click="handleDel"
            :class="{ disabled: selCount === 0 }"
          >
            删除
          </div>
        </div>
      </div>
    </div>

    <!-- 二、购物车为空 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="" />
      <div class="tips">您的购物车是空的, 快去逛逛吧</div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from "@/components/CountBox.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "CartPage",
  components: {
    CountBox,
  },
  data() {
    return {
      isEdit: false,
    };
  },
  // 映射vuex仓库中的数据过来
  computed: {
    ...mapState("cart", ["cartList"]),
    ...mapGetters("cart", [
      "cartTotal",
      "selCartList",
      "selCount",
      "selPrice",
      "isAllChecked",
    ]),
    isLogin() {
      return this.$store.getters.token;
    },
  },

  // 一到购物车页面就请求购物车数据
  created() {
    // 必须是登录过的用户，才能打开购物车
    if (this.isLogin) {
      this.$store.dispatch("cart/getCartAction");
    }
    // console.log(this.selCount);
    // console.log(this.selCartList);
    // console.log(...this.selCartList.map((item) => item.id).join(","));
  },
  methods: {
    // 勾选商品项-更改仓库vuex中的对应的商品选项取反
    toggleCheck(goodsId) {
      this.$store.commit("cart/toggleCheck", goodsId);
    },
    // 勾选全选
    toggleAllCheck() {
      this.$store.commit("cart/toggleAllCheck", !this.isAllChecked);
    },
    // 购物车列表中的子组件中加减商品数量
    changeCount(goodsNum, goodsId, goodsSkuId) {
      // console.log(goodsNum, goodsId, goodsSkuId);
      this.$store.dispatch("cart/changeCountAction", {
        goodsNum,
        goodsId,
        goodsSkuId,
      });
    },
    async handleDel() {
      if (this.selCount === 0) return; //虽然但是前面已经加了类名disabled判断了。。selCount===0点击不了的
      await this.$store.dispatch("cart/vuexDelSelect");
      this.isEdit = false;
    },
    goPay() {
      // 先判断有没有选中的商品
      if (this.selCount > 0) {
        // 有勾选的selCount（结算位置的商品量），才能结算跳转
        this.$router.push({
          path: "/pay",
          query: {
            mode: "cart",
            cartIds: this.selCartList.map((item) => item.id).join(","), //cartId 格式是‘cardId，cardId，cardId’
          },
        });
      }
    },
  },
  watch: {
    isEdit(value) {
      if (value) {
        this.$store.commit("cart/toggleAllCheck", false);
      } else {
        this.$store.commit("cart/toggleAllCheck", true);
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay,
    .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>