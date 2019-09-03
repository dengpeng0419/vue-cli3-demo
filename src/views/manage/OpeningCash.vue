<template>
  <div class="opening-cash">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">营业收入/成本趋势</div>
      <el-select class="company-choose" @change="chooseCompany(companyValue)" v-model="companyValue" placeholder="按公司筛选">
        <el-option
          v-for="item in companyOptions"
          :key="item.id"
          :label="item.alias"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="top-frame">
      <v-chart class="chart-top" :options="topOption"></v-chart>
      <div class="years">
        <div class="year choose-year">半年</div>
        <div class="year">一年</div>
        <div class="year">三年</div>
      </div>
    </div>
    <div class="top-frame">
      <v-chart class="chart-bottom" :options="bottomOption"></v-chart>
      <div class="years">
        <div class="year choose-year">2017</div>
        <div class="year">2018</div>
        <div class="year">2019</div>
      </div>
      <div class="types">
        <div class="type" :class="{'choose-type': showA}" @click="show1">营业收入同期对比</div>
        <div class="type" :class="{'choose-type': showB}" @click="show2">营业成本同期对比</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'assetTrend',
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
      topOption: {},
      bottomOption: {},
      tline_x: [],
      tline1: [],
      tline2: [],
      line_x: [],
      line1: [],
      line2: [],
      line3: [],
      line4: [],
      line5: [],
      line6: [],
      showA: true,
      showB: false
    }
  },
  mounted() {
    this.companyOptions = JSON.parse(sessionStorage.getItem('company'));
    this.getPageData();
    this.getYearData();
  },
  methods: {
    show1() {
      this.showA = true;
      this.showB = false;
      this.showLine(this.line_x, this.lin1, this.line2, this.line3);
    },
    show2() {
      this.showA = false;
      this.showB = true;
      this.showLine(this.line_x, this.lin4, this.line5, this.line6);
    },
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
        url: '/app/financial/operating/trend',
        data: {
          deviceId: '1111',
          startYear: 2018,
          startMonth: 7,
          endYear: 2019,
          endMonth: 7,
          companyId: 0
        }
      }).then(res => {
        this.tline_x = [];
        this.tline1 = [];
        this.tline2 = [];
        const data = res.data || {};
        const operatingTrend = data.operatingTrend || [];
        const detailValue1 = operatingTrend[0]&&operatingTrend[0].value ? operatingTrend[0].value : [];
        const detailValue2 = operatingTrend[1]&&operatingTrend[1].value ? operatingTrend[1].value : [];
        detailValue1.map((item) => {
          this.tline_x.push(item.month);
          this.tline1.push(item.value);
        })
        detailValue2.map((item) => {
          this.tline2.push(item.value);
        })
        this.topOption = {
          tooltip : {
              trigger: 'axis'
          },
          legend: {
            data:['流动资产','非流动资产'],
            x: 'center',
            y: 'bottom',
            padding: 15,
            textStyle: {
              color: '#77bde1'
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '18%',
            containLabel: true
          },
          calculable : true,
          xAxis: [
            {
              type: 'category',
              boundaryGap : false,
              data: this.tlin_x,
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#77bde1',
                  fontSize: 12
                }
              }
            }
          ],
          yAxis: [
            {
              type : 'value',
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#bdd6ef'
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#50586c'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#77bde1',
                  fontSize: 12
                }
              }
            }
          ],
          series: [
            {
              name:'流动资产',
              type:'line',
              stack: '总量',
              data:this.tline1,
              itemStyle: {
                borderColor: '#3589c4',
                normal: {
                  color: '#3589c4',
                  areaStyle: {
                    color: '#3589c4'
                  }
                }
              }
            },
            {
              name:'非流动资产',
              type:'line',
              stack: '总量',
              data:this.tline2,
              itemStyle: {
                normal: {
                  color: '#3ebfdf',
                  borderColor: '#3ebfdf',
                  areaStyle: {
                    color: '#3ebfdf'
                  }
                }
              }
            }
          ]
        };
       });
     },
    getYearData() {
      this.$ajax({
        url: '/app/financial/operating/yearlyCompare',
        data: {
          deviceId: '1111',
          companyId: 0
        }
      }).then(res => {
        this.line_x = [];
        this.line1 = [];
        this.line2 = [];
        this.line3 = [];
        this.line4 = [];
        this.line5 = [];
        this.line6 = [];
        const data = res.data || {};
        const yearlyCompare = data.yearlyCompare || [];
        const data1 = yearlyCompare[0] || {};
        const data2 = yearlyCompare[1] || {};
        const line1 = data1.value[0].value || [];
        const line2 = data1.value[1].value || [];
        const line3 = data1.value[2].value || [];
        const line4 = data2.value[0].value || [];
        const line5 = data2.value[1].value || [];
        const line6 = data2.value[2].value || [];
        line1.map((item) => {
          this.line_x.push(item.month);
          this.line1.push(item.value);
        });
        line2.map((item) => {
          this.line2.push(item.value);
        });
        line3.map((item) => {
          this.line3.push(item.value);
        });
        line4.map((item) => {
          this.line4.push(item.value);
        });
        line5.map((item) => {
          this.line5.push(item.value);
        });
        line6.map((item) => {
          this.line6.push(item.value);
        });

        this.showLine(this.line_x, this.lin1, this.line2, this.line3);
       });
     },
    showLine(x,line1,line2,line3){
      this.bottomOption = {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%',
            containLabel: true
          },
          legend: {
            data: ['2017','2018','2019'],
            x: 'center',
            y: 'bottom',
            padding: 15,
            textStyle: {
              color: '#77bde1'
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: x,
            axisLine: {
              lineStyle: {
                color: '#bdd6ef'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#77bde1',
                fontSize: 12
              }
            }
          }],
          yAxis: [{
            axisLine: {
              show: false,
              lineStyle: {
                color: '#bdd6ef'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#50586c'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#77bde1',
                fontSize: 12
              }
            }
          }],
          series: [
            {
              name:'2017',
              type:'line',
              data: line1,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'2018',
              type:'line',
              data: line2,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'2019',
              type:'line',
              data: line3,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            }
          ]
        }
    }
  }
}
</script>

<style lang="scss">
  .opening-cash {
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
        right: 80px;
        top: 0;
      }
      .time-choose {
        position: absolute;
        right: 160px;
        top: 0;
      }
    }

    .top-frame, .bottom-frame {
      position: relative;
    }

    .years {
      position: absolute;
      top: 20px;;
      right: 200px;
      display: flex;
      color: #77bde1;
      font-size: 32px;
      .year {
        margin-left: 40px;
      }
      .choose-year {
        color: #fff;
      }
    }

    .types {
      position: absolute;
      top: 20px;
      left: 100px;
      display: flex;
      color: #77bde1;
      font-size: 32px;
      .type {
        margin-left: 40px;
      }
      .choose-type {
        color: #fff;
      }
    }
    
    .chart-top {
      margin-left: 70px;
      margin-top: 30px;
      width: 2420px;
      height: 568px;
      background-image: url(../../assets/img/middle_bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .chart-bottom {
      margin-left: 70px;
      margin-top: 40px;
      width: 2420px;
      height: 742px;
      background-image: url(../../assets/img/middle_bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
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

