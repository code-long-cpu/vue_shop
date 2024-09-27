<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search
      v-model="search"
      show-action
      placeholder="请输入搜索关键词"
      clearable
    >
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>
    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div
          class="list-item"
          v-for="item in history"
          :key="item"
          @click="goSearch(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
​
<script>
import { getHistory, setHistory } from "@/utils/storge";

export default {
  name: "SearchIndex",
  data() {
    return {
      search: "", //输入框的内容
      // history: ["手机", "白酒", "电视"], //unshift 在头部追加
      history: getHistory(), //unshift 在头部追加
    };
  },
  methods: {
    goSearch(key) {
      // console.log("进行了搜索", key);
      // 点击或者搜索key，并把key放置在history到头部
      const index = this.history.indexOf(key);
      // 查找历史中是否有该key项
      if (index !== -1) {
        // 如果history存在key项，就删除
        this.history.splice(index, 1);
      }
      // 然后在history头部添加该key项
      this.history.unshift(key);
      // 储存当前的history
      setHistory(this.history);
      // 跳转到搜索列表页面
      this.$router.push(`/searchlist?search=${key}`);
    },
    clear() {
      // 清空历史记录
      this.history = [];
      // 清空本地历史记录
      setHistory([]);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>