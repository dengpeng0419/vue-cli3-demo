<template>
  <div class="asset-structure">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">资产结构一览表</div>
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
    <div class="overview">
      <div class="column">
        <div class="chart-frame-top"></div>
        <v-chart class="chart-top" :options="pieOption"></v-chart>
      </div>
      <div class="right-view">
        <div class="title-frame">
          <div class="title">非流动资产</div>
        </div>
        <div class="list">
          <div class="line" v-for="(item, index) in [1,2,3,4,5]" :key="index">
            <div class="name">123</div>
            <div class="value">11111</div>
          </div>
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
      pieOption: {},
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
        url: '/app/HumanResource/employee/increaseAndDecrease/structure',
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

        this.pieOption = {
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
          // legend: {
          //   x: 'center',
          //   y: 'bottom',
          //   padding: 10,
          //   data: pie_age_x,
          //   textStyle: {
          //     color: '#77bde1'
          //   }
          // },
          series : [{
            name: '非流动资产',
            type: 'pie',
            radius : '80%',
            center: ['50%', '50%'],
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
    .overview {
      display: flex;
      .column {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 1200px;
        height: 1200px;
        position: relative;
        margin-left: 70px;
        .pie-title {
          color: #77bde1;
          font-size: 50px;
          margin-top: -20px;
        }
        .chart-top {
          position: absolute;
          z-index: 9;
          width: 1200px;
          height: 1200px;
          top: 120px;
          left: 0;
        }
        .chart-frame-top {
          position: absolute;
          z-index: 8;
          width: 1200px;
          height: 1200px;
          background-color: #212d3f;
          background-image: url(../../assets/img/middle_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          top: 120px;
          left: 0;
          border-radius: 20px;
        }
      }
      .right-view {
        display: flex;
        margin-left: 15px;
        margin-top: 120px;
        .title-frame {
          width: 200px;
          min-height: 1200px;
          color: #fff;
          background: #212d3f;
          background-image: url(../../assets/img/middle_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
          .title {
            writing-mode: vertical-lr;
            font-size: 60px;
            text-align: center;
          }
        }
        .list {
          display: flex;
          flex-direction: column;
          min-height: 1200px;
          width: 1000px;
          color: #fff;
          font-size: 40px;
          .line{
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            height: 100px;
            line-height: 100px;
            &:nth-child(even) {
              background: #212d3f;
              background-image: url(../../assets/img/middle_bg.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
          }
          
        }
      }
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

