<template>
  <div class="asset-structure">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">资产结构</div>
      <el-select class="company-choose" @change="chooseCompany(companyValue)" v-model="companyValue" placeholder="按公司筛选">
        <el-option
          v-for="item in companyOptions"
          :key="item.id"
          :label="item.alias"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select class="time-choose" @change="chooseTime(timeValue)" v-model="timeValue" placeholder="按时间筛选">
        <el-option
          v-for="item in timeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="total-desc">
      <div class="left">资产总额(亿元)</div>
      <div class="middle">123456</div>
      <div class="right">比去年同期:</div>
      <div class="right-arrow arrow-up"></div>
      <div class="right-num">30%</div>
    </div>
    <div class="pie-list">
      <div class="column">
        <div class="pie-title">非流动资产</div>
        <v-chart class="chart-top" :options="ageOption"></v-chart>
        <div class="chart-frame-top"></div>
        <div class="column-desc">
          <div class="left">资产总额(亿元)</div>
          <div class="middle">123456</div>
          <div class="right">比去年同期:</div>
          <div class="right-arrow arrow-up"></div>
          <div class="right-num">30%</div>
        </div>
      </div>
      <div class="column">
        <div class="pie-title">流动资产</div>
        <v-chart class="chart-top" :options="wenhuaOption"></v-chart>
        <div class="chart-frame-top"></div>
        <div class="column-desc">
          <div class="left">资产总额(亿元)</div>
          <div class="middle">123456</div>
          <div class="right">比去年同期:</div>
          <div class="right-arrow arrow-up"></div>
          <div class="right-num">30%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'assetStructure',
  data() {
    return {
      timeOptions: [{
        value: '7',
        label: '2019年7月'
      }, {
        value: '6',
        label: '2019年6月'
      }],
      timeValue: '7',
      companyOptions: [],
      companyValue: '本部',
      ageOption: {},
      wenhuaOption: {},
    }
  },
  mounted() {
    this.companyOptions = JSON.parse(sessionStorage.getItem('company'));
    this.getPageData();
  },
  methods: {
    chooseTime(timeValue) {
      this.timeValue = timeValue;
      this.getPageData();
    },
    chooseCompany(companyValue) {
      this.companyValue = companyValue;
      this.getPageData();
    },
    getPageData() {
      this.$ajax({
        url: '/app/financial/asset/structure',
        data: {
          deviceId: '1111',
          year: 2019,
          month: 7,
          companyId: 0
        }
      }).then(res => {
        const list = res.data.pieChartList || [];
        if (list.length < 1) {
          return;
        } 
        const age_data = list[0].content || [];
        let pie_age = [];
        let pie_age_x = [];
        age_data.map((item) => {
          const obj = {};
          obj.name = item.label;
          obj.value = item.value;
          pie_age.push(obj);
          pie_age_x.push(item.label);
        })

        const wenhua_data = list[1].content || [];
        let pie_wenhua = [];
        let pie_wenhua_x = [];
        wenhua_data.map((item) => {
          const obj = {};
          obj.name = item.label;
          obj.value = item.value;
          pie_wenhua.push(obj);
          pie_wenhua_x.push(item.label);
        })

        this.ageOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          // title : {
          //   text: '非流动资产',
          //   x: '28%',
          //   textStyle: {
          //     fontSize: 18,
          //     fontWeight: 'bolder',
          //     color: '#77bde1'  
          //   },
          // },
          legend: {
            x: 'center',
            y: 'bottom',
            padding: 10,
            data: pie_age_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '非流动资产',
            type: 'pie',
            radius : '50%',
            center: ['50%', '40%'],
            data: pie_age,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal:{
                // color:function(params) {
                // //自定义颜色
                // var colorList = ['#df4e3e', '#e98e12', '#7876b6', '#17a5c4', ];
                //   return colorList[params.dataIndex]
                // },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }]
        }

        this.wenhuaOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          // title : {
          //   text: '流动资产',
          //   x: '24%',
          //   textStyle: {
          //     fontSize: 18,
          //     fontWeight: 'bolder',
          //     color: '#77bde1'  
          //   },
          // },
          legend: {
            x: 'center',
            y: 'bottom',
            padding: 1,
            data: pie_wenhua_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '流动资产',
            type: 'pie',
            radius : '50%',
            center: ['50%', '40%'],
            data: pie_wenhua,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal:{
                // color:function(params) {
                // //自定义颜色
                // var colorList = ['#df4e3e', '#e98e12', '#7876b6', '#17a5c4', ];
                //   return colorList[params.dataIndex]
                // },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }]
        }
      });
    }
  }
}
</script>

<style lang="scss">
  .asset-structure {
    width: 100%;
    min-height: 100vh;
    .title-bar {
      margin-top: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      position: relative;
      .title {
        font-size: 60px;
        color: #fff;
      }
      .structure-choose {
        position: absolute;
        left: 300px;
        top: 0;
      }
      .company-choose {
        position: absolute;
        right: 600px;
        top: 0;
      }
      .time-choose {
        position: absolute;
        right: 160px;
        top: 0;
      }
    }
    .total-desc {
      margin-top: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #77bde1;
      font-size: 50px;
      .middle {
        min-width: 100px;
        height: 135px;
        background: url(../../assets/img/manage_num_long.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-family: tonjay;
        line-height: 135px;
        color: #fff;
        font-size: 100px;
        margin: 0 60px;
        padding: 0 5px;
        letter-spacing: 10px;
      }
      .right-arrow {
        margin-left: 20px;
        width: 65px;
        height: 63px;
        background-repeat: no-repeat;
      }
      .arrow-up {
        background: url(../../assets/img/manage_arrow.png);
        background-size: 100% 100%;
      }
      .arrow-down {
        background: url(../../assets/img/manage_arrow.png);
        background-size: 100% 100%;
        transform: rotate(180deg);
      }
      .right-num {
        margin-left: 40px;
        color: #fff;
      }
    }
    .pie-list {
      margin-top: 80px;
      display: flex;
      justify-content: center;
      .column {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 1100px;
        height: 1000px;
        position: relative;
        .pie-title {
          color: #77bde1;
          font-size: 50px;
          margin-top: -20px;
        }
        .chart-top {
          position: absolute;
          z-index: 9;
          width: 1100px;
          height: 800px;
        }
        .chart-frame-top {
          position: absolute;
          z-index: 8;
          width: 500px;
          height: 500px;
          background-color: #212d3f;
          top: 70px;
          left: 300px;
          border-radius: 20px;
        }
        .column-desc {
          position: absolute;
          z-index: 9;
          bottom: 0;
          margin-top: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #77bde1;
          font-size: 30px;
          .middle {
            min-width: 100px;
            height: 80px;
            background: url(../../assets/img/manage_num_long.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            font-family: tonjay;
            line-height: 80px;
            color: #fff;
            font-size: 80px;
            margin: 0 30px;
            padding: 0 5px;
            letter-spacing: 5px;
          }
          .right-arrow {
            margin-left: 10px;
            width: 45px;
            height: 43px;
            background-repeat: no-repeat;
          }
          .arrow-up {
            background: url(../../assets/img/manage_arrow.png);
            background-size: 100% 100%;
          }
          .arrow-down {
            background: url(../../assets/img/manage_arrow.png);
            background-size: 100% 100%;
            transform: rotate(180deg);
          }
          .right-num {
            margin-left: 20px;
            color: #fff;
          }
        }
      }
    }
    .trend-line {
      margin-top: 100px;
      width: 1000px;
      height: 800px;
    }
    .el-input__inner {
      background-color: #2b516c;
      border: 1px solid #2b516c;
    }
    .el-select .el-input.is-focus .el-input__inner {
      border-color: #2b516c;
    }
    .el-select .el-input__inner:focus {
      border-color: #2b516c;
    }
    .el-input__inner {
      color: #77bde1;
    }
  }
  @font-face {
    /* font-test*/
    font-family: tonjay;
    src: url(../../assets/fonts/digifaw.ttf);
  }
</style>

