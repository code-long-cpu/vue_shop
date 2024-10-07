// 计数器组件
<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" @change="handleChange" type="text" class="inp" />
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  // 父亲传来的值
  props: {
    value: {
      type: Number,
      default: 1, //没有值就默认为1；
    },
  },
  methods: {
    // 向父亲发出修改数据的方法
    handleSub() {
      if (this.value <= 1) {
        return;
      }
      // 触发父组件的 input事件，传递 this.value - 1 的值
      this.$emit("input", this.value - 1);
    },
    handleAdd() {
      this.$emit("input", this.value + 1);
    },
    handleChange(e) {
      // console.log(e.target.value);
      const num = +e.target.value; //+号是转数字处理 1.数字 2.NaN
      // 输入不合法的文本，负值和小数，回退为原来的value值
      if (isNaN(num) || num < 1 || num % 10 < 1 || !Number.isInteger(num)) {
        // e.target.value可以反向给输入框赋值
        e.target.value = this.value;
        return;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.count-box {
  width: 110px;
  display: flex;
  .add,
  .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: rgb(243, 243, 243);
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: rgb(243, 243, 243);
    text-align: center;
  }
}
</style>