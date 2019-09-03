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
      <div class="middle">{{banner}}</div>
      <div class="right">比去年同期:</div>
      <div class="right-arrow arrow-up" :class="{'arrow-down':bannerUp<0}"></div>
      <div class="right-num">{{bannerUp}}%</div>
    </div>
    <div class="pie-list">
      <div class="column">
        <div class="pie-title">非流动资产</div>
        <v-chart class="chart-top" :options="ageOption"></v-chart>
        <div class="chart-frame-top"></div>
        <div class="column-desc">
          <div class="left">非流动资产</div>
          <div class="middle">{{unflueAsset}}</div>
          <div class="right">比去年同期:</div>
          <div class="right-arrow arrow-up" :class="{'arrow-down':flueAssetUp<0}"></div>
          <div class="right-num">{{flueAssetUp}}%</div>
        </div>
      </div>
      <div class="column">
        <div class="pie-title">流动资产</div>
        <v-chart class="chart-top" :options="wenhuaOption"></v-chart>
        <div class="chart-frame-top"></div>
        <div class="column-desc">
          <div class="left">流动资产</div>
          <div class="middle">{{flueAsset}}</div>
          <div class="right">比去年同期:</div>
          <div class="right-arrow arrow-up" :class="{'arrow-down':unflueAssetUp<0}"></div>
          <div class="right-num">{{unflueAssetUp}}%</div>
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
      flueAsset: 0,
      flueAssetUp: 0,
      unflueAsset: 0,
      unflueAssetUp: 0,
      pie1: [],
      pie2: [],
      pie1_x: [],
      pie2_x: [],
      banner: 0,
      bannerUp: 0
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
        const data = res.data || {};
        const assetStructure = data.assetStructure || [];
        this.flueAsset = assetStructure[0] ? assetStructure[0].value : 0;
        this.flueAssetUp = assetStructure[1] ? assetStructure[1].value : 0;
        this.unflueAsset = assetStructure[2] ? assetStructure[2].value : 0;
        this.unflueAssetUp = assetStructure[3] ? assetStructure[3].value : 0;

        const banner = data.banner || [];
        this.banner = banner[0] ? banner[0].value : 0;
        this.bannerUp = banner[0] ? banner[0].comparedToPreviousYear : 0;

        const assetStructureDetail = data.assetStructureDetail || [];
        const pie1 = assetStructureDetail[0] ? assetStructureDetail[0].value : [];
        const pie2 = assetStructureDetail[1] ? assetStructureDetail[1].value : [];
        pie1.map((item) => {
          this.pie1.push({
            name: item.label,
            value: item.value
          })
          this.pie1_x.push(item.label);
        });

        pie2.map((item) => {
          this.pie2.push({
            name: item.label,
            value: item.value
          })
          this.pie2_x.push(item.label);
        });

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
            data: this.pie1_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '非流动资产',
            type: 'pie',
            radius : '50%',
            center: ['50%', '40%'],
            data: this.pie1,
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
            data: this.pie2_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '流动资产',
            type: 'pie',
            radius : '50%',
            center: ['50%', '40%'],
            data: this.pie2,
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
            font-size: 50px;
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

