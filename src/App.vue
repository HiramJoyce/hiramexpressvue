<template>
  <div id="app">
    <router-view/>
    <div style="margin-top: 150px; width: 100%;">
      <el-input placeholder="请输入快递编号" style="width: 500px;" v-model="logisticCode" class="input-with-select">
        <el-select v-model="shipperCode" style="width: 120px;" slot="prepend" placeholder="请选择" :value="shipperCode">
          <el-option v-for="express in expresses" :key="express.value" :value="express.value" :label="express.label"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="checkExpress"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import NetworkService from './lib/NetworkService'
export default {
  name: 'App',
  data () {
    return {
      logisticCode: '',
      expresses: [{
        value: 'YD',
        label: '韵达速递'
      }, {
        value: 'SF',
        label: '顺丰速运'
      }, {
        value: 'ZTO',
        label: '中通快递'
      }, {
        value: 'STO',
        label: '申通快递'
      }, {
        value: 'YTO',
        label: '圆通速递'
      }, {
        value: 'EMS',
        label: '韵达快递'
      }, {
        value: 'HHTT',
        label: '天天快递'
      }, {
        value: 'JD',
        label: '京东快递'
      }],
      shipperCode: 'YD'
    }
  },
  methods: {
    checkExpress () {
      NetworkService.checkExpress(this.logisticCode, this.shipperCode).then(function (res) {
        console.log(JSON.stringify(res))
      })
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
