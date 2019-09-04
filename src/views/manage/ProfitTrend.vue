<template>
  <div class="profit-trend">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">利润(趋势)</div>
      <el-select class="company-choose" @change="chooseCompany(companyValue)" v-model="companyValue" placeholder="按公司筛选">
        <el-option
          v-for="item in companyOptions"
          :key="item.id"
          :label="item.alias"
          :value="item.id">
        </el-option>
      </el-select>
      <div class="years">
        <div class="year">半年</div>
        <div class="year choose-year">一年</div>
        <div class="year">三年</div>
      </div>
    </div>
    <v-chart class="chart-bottom" :options="bottomOption"></v-chart>
    <v-chart class="chart-top" :options="topOption"></v-chart>
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
        url: '/app/financial/profit/trend',
        data: {
          deviceId: '111',
          startYear: 2018,
          startMonth: 7,
          endYear: 2019,
          endMonth: 7,
          companyId: 0
        }
      }).then(res => {
        const list = res.data.trend || [];
        const data1 = list[0] ? list[0].value : [];
        const data2 = list[1] ? list[1].value : [];
        const data3 = list[2] ? list[2].value : [];
        const data4 = list[3] ? list[3].value : [];

        this.line1_x = [];
        this.line1 = [];
        this.line2 = [];
        this.line3_x = [];
        this.line3 = [];
        this.line4 = [];

        data1.map((item) => {
          this.line1_x.push(item.month + '月');
          this.line1.push(item.value);
        });
        data2.map((item) => {
          this.line2.push(item.value);
        });
        data3.map((item) => {
          this.line3_x.push(item.month + '月');
          this.line3.push(item.value);
        });
        data4.map((item) => {
          this.line4.push(item.value);
        });

        this.topOption = {
          tooltip : {
              trigger: 'axis'
          },
          legend: {
            data:['营业利润','营业外收支净额'],
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
              data: this.line3_x,
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
              name:'营业利润',
              type:'line',
              stack: '总量',
              data:this.line3,
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
              name:'营业外收支净额',
              type:'line',
              stack: '总量',
              data:this.line4,
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

        this.bottomOption = {
          tooltip : {
            trigger: 'axis'
          },
          calculable : true,
          legend: {
            data:['营业利润','同比增长率'],
            x: 'center',
            y: 'bottom',
            padding: 15,
            textStyle: {
              color: '#77bde1'
            }
          },
          grid: {
            left: '3%',
            right: '2%',
            bottom: '18%',
            containLabel: true
          },
          xAxis: [
            {
              type : 'category',
              data : this.line1_x,
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
              name : '营业利润',
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
            },
            {
              type : 'value',
              name : '同比增长率',
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
              name:'资产总量',
              type:'bar',
              data:this.line1,
              barWidth: 24,
              itemStyle: {
                normal: {
                  color: '#17a5c4'
                }
              }
            },
            {
              name:'增长率',
              type:'line',
              yAxisIndex: 1,
              data:this.line2,
              itemStyle: {
                normal: {
                  color: '#6aa129',
                  borderColor: '#6aa129',
                }
              }
            }
          ]
        };
       });
     }
  }
}
</script>

<style lang="scss">
  .profit-trend {
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
      height: 732px;
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

