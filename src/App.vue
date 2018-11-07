<template>
  <div id="app">
    <h1>快递简单查</h1><sub>今日已提供<span style="color: darkcyan;">{{todayCount}}</span>次服务</sub>
    <div style="width: 100%;" :style="{'margin-top':checked?'50px':'150px'}">
      <el-input placeholder="请输入快递编号" style="width: 500px;" v-model="logisticCode" class="input-with-select">
        <el-select v-model="shipperCode" style="width: 105px;" slot="prepend" placeholder="请选择" :value="shipperCode">
          <el-option v-for="express in expresses" :key="express.value" :value="express.value" :label="express.label"></el-option>
        </el-select>
        <el-button slot="append" :loading="checking" icon="el-icon-search" @click="checkExpress"></el-button>
      </el-input>
      <el-card v-show="traces.length > 0" class="box-card">
        <el-steps direction="vertical" :active="traces.length">
          <el-step v-for="trace in traces" :key="trace.AcceptTime" :title="trace.AcceptStation" :description="trace.AcceptTime"></el-step>
        </el-steps>
      </el-card>
    </div>
  </div>
</template>

<script>
import NetworkService from './lib/NetworkService'
export default {
  name: 'App',
  data () {
    return {
      todayCount: '0',
      logisticCode: '',
      checking: false,
      checked: false,
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
      shipperCode: 'YD',
      traces: [],
      state: ''
    }
  },
  created () {
    this.getTodayCount()
    console.log('%cHiram %c Copyright \xa9 2017-%s\n%c %c ',
      'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
      'font-size:12px;color:#999999;', (new Date()).getFullYear(), 'color:#333;font-size:16px;', 'font-size:12px;')
  },
  methods: {
    checkExpress () {
      const vm = this
      vm.checking = true
      if (vm.logisticCode.length <= 0 || vm.shipperCode.length <= 0) {
        vm.message('数据不足', 'error')
        vm.checking = false
        return
      }
      NetworkService.checkExpress(vm.logisticCode, vm.shipperCode).then(function (res) {
        if (res.code === 0) {
          vm.message('查询成功', 'success')
          vm.traces = res.data.traces
          vm.state = res.data.state
          vm.checked = true
          vm.todayCount = parseInt(res.msg) + ''
        } else {
          vm.message(res.msg, 'error')
          vm.traces = []
          vm.state = ''
          vm.checked = false
          vm.todayCount = parseInt(res.data) + ''
        }
        vm.checking = false
      })
    },
    message (msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    getTodayCount () {
      const vm = this
      NetworkService.getTodayCount().then(function (res) {
        vm.todayCount = res.data + ''
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
  .box-card {
    margin: 50px auto 0 auto;
    text-align: center;
    width: 700px;
  }
</style>
