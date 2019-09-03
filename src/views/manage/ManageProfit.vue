<template>
  <div class="manage-profit">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">营业利润</div>
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
    <div class="buttons">
      <div class="button"><router-link tag='span' to='profit-trend'>月度趋势</router-link></div>
      <div class="button">城市对比</div>
    </div>
    <div class="top-frame">
      <div class="top-bottom-frame">
        <v-chart class="chart-top" :options="topOption"></v-chart>
        <!-- <v-chart class="chart-top" :options="bottomOption"></v-chart> -->
        <div class="row-manage">
          <div class="chart-manage" v-for="(item,index) in line1" :key="index">
            <div class="chart-title"><p>净利润</p><p>亿元</p></div>
            <div class="chart-desc">月度值</div>
            <div class="middle">{{item.value}}</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">{{item.year}}</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{item.up}}%<span class="span-img arrow-up" :class="{'arrow-down':item.up<0}"></span></div>
              </div>
            </div>
          </div>
          <div class="chart-manage">
            
          </div>
        </div>
      </div>
    </div>
    <div class="top-frame">
      <div class="top-bottom-frame">
        <v-chart class="chart-bottom" :options="bottomOption"></v-chart>
        <div class="row-manage" v-for="(item,index) in line2" :key="index">
          <div class="chart-manage">
            <div class="chart-title"><p>营业利润</p><p>亿元</p></div>
            <div class="chart-desc">月度值</div>
            <div class="middle">{{item.value}}</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">{{item.year}}</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{item.up}}%<span class="span-img arrow-up" :class="{'arrow-down':item.up<0}"></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manageProfit',
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
      main: 0,
      cost: 0,
      mainValue: 0,
      costValue: 0,
      mainUp: 0,
      costUp: 0,
      line1: [],
      line1_x: [],
      line1_y: [],
      line2: [],
      line2_x: [],
      line2_y: [],
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
        url: '/app/financial/profit/structure',
        data: {
          deviceId: '111',
          year: 2019,
          month: 7,
          companyId: 0
        }
      }).then(res => {
        const data = res.data || {};
        // const overview = data.overview || [];
        // this.main = overview[0]&&overview[0].value ? overview[0].value.当月值 : 0;
        // this.mainValue = overview[0]&&overview[0].value ? overview[0].value.比去年同期 : 0;
        // this.cost = overview[1]&&overview[1].value ? overview[1].value.当月值 : 0;
        // this.costValue = overview[1]&&overview[1].value ? overview[1].value.比去年同期 : 0;

        const overview = data.overview || [];
        overview.map((item) => {
          this.line1_x.push(item.label);
          this.line1_y.push(item.value.当月值);
          this.line1.push({
            name: item.label,
            value: item.value.当月值,
            year: item.value.年累计值,
            up: item.value.比去年同期
          })
        })
        const detail = data.detail[0].value || [];
        detail.map((item) => {
          this.line2_x.push(item.label);
          this.line2_y.push(item.value.当月值);
          this.line2.push({
            name: item.label,
            value: item.value.当月值,
            year: item.value.年累计值,
            up: item.value.比去年同期
          })
        })

        this.topOption = {
          // tooltip : {
          //   trigger: 'axis',
          //   axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          //   },
          //     textStyle: {
          //     align: 'left'
          //   }
          // },
          legend: {
            data: this.line1_x,
            x: 'center',
            y: 'bottom',
            padding: 15,
            textStyle: {
              color: '#77bde1'
            }
          },
          grid: {
            left: '4%',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: [
            {
              type : 'category',
              data : [''],
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
            },
          ],
          series: [
            {
              name:'利润总额',
              type:'bar',
              data: [this.line1_y[0]],
              barWidth: 60,
              barGap: '100%',
              itemStyle: {
                normal: {
                  color: '#3589c4',
                }
              }
            },
            {
              name:'净利润',
              type:'bar',
              data:[this.line1_y[1]],
              barWidth: 60,
              barGap: '100%',
              // itemStyle: {
              //   normal: {
              //     color: '#3589c4'
              //   }
              // }
            }
          ]
        };

        this.bottomOption = {
          // tooltip : {
          //   trigger: 'axis',
          //   axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          //   },
          //     textStyle: {
          //     align: 'left'
          //   }
          // },
          legend: {
            data:['营业利润','营业外收入','营业外支出'],
            x: 'center',
            y: 'bottom',
            padding: 15,
            textStyle: {
              color: '#77bde1'
            }
          },
          grid: {
            left: '4%',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: [
            {
              type : 'category',
              data : [''],
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
            },
          ],
          series: [
            {
              name:'营业利润',
              type:'bar',
              data:[this.line2_y[0]],
              barWidth: 60,
              barGap: '100%',
              itemStyle: {
                normal: {
                  color: '#3589c4',
                }
              }
            },
            {
              name:'营业外收入',
              type:'bar',
              data:[this.line2_y[1]],
              barWidth: 60,
              barGap: '100%',
              // itemStyle: {
              //   normal: {
              //     color: '#3589c4'
              //   }
              // }
            },
            {
              name:'营业外支出',
              type:'bar',
              data:[this.line2_y[2]],
              barWidth: 60,
              barGap: '100%',
              // itemStyle: {
              //   normal: {
              //     color: '#3589c4'
              //   }
              // }
            }
          ]
        };
      });
    }
  }
}
</script>

<style lang="scss">
  .manage-profit {
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
        right: 540px;
        top: 0;
      }
      .time-choose {
        position: absolute;
        right: 100px;
        top: 0;
      }
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding-right: 100px;
      box-sizing: border-box;
      margin-top: 10px;
      .button {
        margin-left: 40px;
        width: 200px;
        height: 60px;
        line-height: 60px;
        color: #fff;
        background-color: #77bde1;
        background-image: url(../../assets/img/manage_button.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 10px;
        font-size: 36px;
      }
    }

    .top-frame, .bottom-frame {
      box-sizing: border-box;
      position: relative;
      padding-top: 18px;
      padding-left: 18px;
    }

    .top-bottom-frame {
      display: flex;
      .row-manage {
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
        // margin-left: 10px;
        .chart-manage {
          box-sizing: border-box;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          text-align: left;
          width: 546px;
          height: 568px;
          background: url(../../assets/img/manage_small_rect.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 20px;
          .chart-title {
            display: flex;
            justify-content: space-between;
            padding-right: 40px;
            margin-top: 10px;
            color: #77bde1;
            font-size: 36px;
            margin-left: 40px;
          }
          .chart-desc {
            margin-top: 70px;
            color: #77bde1;
            font-size: 36px;
            margin-left: 40px;
          }
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
            margin: 20px 30px;
            padding: 0 5px;
            letter-spacing: 5px;
          }
          .chart-content {
            display: flex;
            margin-top: 40px;
            .name {
              margin-top: 30px;
              color: #77bde1;
              font-size: 36px;
              margin-left: 40px;
            }
            .value {
              margin-top: 10px;
              color: #fff;
              font-size: 36px;
              margin-left: 40px;
            }
            .span-img {
              display: inline-block;
              margin-left: 10px;
              width: 35px;
              height: 33px;
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
          }
        }
      }
    }

    .line-desc {
      display: flex;
      justify-content: flex-start;
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
    
    .top-frame {
      margin-left: 30px;
      margin-top: 30px;
      width: 2498px;
      height: 620px;
      background-image: url(../../assets/img/middle_bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .chart-top {
      width: 760px;
      height: 560px;
    }
    .chart-bottom {
      width: 760px;
      height: 560px;
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
