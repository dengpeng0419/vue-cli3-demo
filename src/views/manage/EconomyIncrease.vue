<template>
  <div class="economy-increase">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">经济增加值</div>
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
      <div class="middle">{{overview.当月值}}</div>
      <div class="right">比去年同期:</div>
      <div class="right-arrow arrow-up" :class="{'arrow-down':overview.比去年同期<0}"></div>
      <div class="right-num">{{overview.比去年同期}}%</div>
      <div class="button"><router-link tag='span' to='economy-trend'>月度趋势</router-link></div>
    </div>
    <div class="top-frame">
      <div class="line-desc">
        <div class="left">税后净营业利润 关键指标</div>
      </div>
      <div class="top-bottom-frame">
        <div class="row-manage">
          <div class="chart-manage">
            <div class="chart-content">
              <div class="chart-title">净利润  亿元</div>
              <div class="middle">{{line1.当月值}}</div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{line1.比去年同期}}%<span class="span-img arrow-up" :class="{'arrow-down':line1.比去年同期<0}"></span></div>
              </div>
            </div>
            <v-chart class="chart" :options="option1"></v-chart>
          </div>
          <div class="chart-manage">
            <div class="chart-content">
              <div class="chart-title">研发支出  亿元</div>
              <div class="middle">{{line2.当月值}}</div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{line2.比去年同期}}%<span class="span-img arrow-up" :class="{'arrow-down':line2.比去年同期<0}"></span></div>
              </div>
            </div>
            <v-chart class="chart" :options="option2"></v-chart>
          </div>
          <div class="chart-manage">
            <div class="chart-content">
              <div class="chart-title">财务费用  亿元</div>
              <div class="middle">{{line3.当月值}}</div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{line3.比去年同期}}%<span class="span-img arrow-up" :class="{'arrow-down':line3.比去年同期<0}"></span></div>
              </div>
            </div>
            <v-chart class="chart" :options="option3"></v-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="top-frame">
      <div class="line-desc">
        <div class="left">资本成材 关键指标</div>
      </div>
      <div class="top-bottom-frame">
        <div class="row-manage">
          <div class="chart-manage">
            <div class="chart-content">
              <div class="chart-title">资产总值  亿元</div>
              <div class="middle">{{parseInt(line4.期末值/100000000)}}</div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{line4.比去年同期}}%<span class="span-img arrow-up" :class="{'arrow-down':line4.比去年同期<0}"></span></div>
              </div>
            </div>
            <v-chart class="chart" :options="option4"></v-chart>
          </div>
          <div class="chart-manage">
            <div class="chart-content">
              <div class="chart-title">负债总值  亿元</div>
              <div class="middle">{{parseInt(line5.期末值/100000000)}}</div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{line5.比去年同期}}%<span class="span-img arrow-up" :class="{'arrow-down':line5.比去年同期<0}"></span></div>
              </div>
            </div>
            <v-chart class="chart" :options="option5"></v-chart>
          </div>
          <div class="chart-manage">
            <div class="chart-content">
              <div class="chart-title">所有者权益  亿元</div>
              <div class="middle">{{line6.期末值}}</div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">{{line6.比去年同期}}%<span class="span-img arrow-up" :class="{'arrow-down':line6.比去年同期<0}"></span></div>
              </div>
            </div>
            <v-chart class="chart" :options="option6"></v-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'economyIncrease',
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
      option: {},
      option1: {},
      option2: {},
      option3: {},
      option4: {},
      option5: {},
      option6: {},
      line1: {},
      line2: {},
      line3: {},
      line4: {},
      line5: {},
      line6: {},
      overview: {}
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
        url: '/app/financial/eva/structure',
        data: {
          deviceId: '111',
          year: 2019,
          month: 7,
          companyId: 0
        }
      }).then(res => {
        const data = res.data || {};
        const detail = data.detail || [];
        const overview = data.overview || [];
        this.overview = overview[0] ? overview[0].value : {};
        const data1 = detail[0] ? detail[0].value : [];
        const data2 = detail[1] ? detail[1].value : [];
        this.line1 = data1[0] ? data1[0].value : {};
        this.line2 = data1[1] ? data1[1].value : {};
        this.line3 = data1[2] ? data1[2].value : {};
        this.line4 = data2[0] ? data2[0].value : {};
        this.line5 = data2[1] ? data2[1].value : {};
        this.line6 = data2[2] ? data2[2].value : {};

        this.option1 = this.getOption(this.line1.去年同期值, this.line1.当月值);
        this.option2 = this.getOption(this.line2.去年同期值, this.line2.当月值);
        this.option3 = this.getOption(this.line3.去年同期值, this.line3.当月值);
        this.option4 = this.getOption(parseInt(this.line4.年初值/100000000), parseInt(this.line4.期末值/100000000), true);
        this.option5 = this.getOption(parseInt(this.line5.年初值/100000000), parseInt(this.line5.期末值/100000000), true);
        this.option6 = this.getOption(this.line6.年初值, this.line6.期末值, true);
        
      });
    },
    getOption(data1, data2, flag) {
      return {
          legend: {
            data: flag ? ['年初值','期末值'] : ['去年同期值','当期值'],
            x: 'center',
            y: 'bottom',
            padding: 15,
            textStyle: {
              color: '#77bde1',
              fontSize: 10
            }
          },
          grid: {
            left: '4%',
            right: '4%',
            top: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['2'],
              axisLine: {
                lineStyle: {
                  color: '#bdd6ef'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
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
                show: false
              }
            },
          ],
          series: [
            {
              name:flag ? '年初值' : '去年同期值',
              type:'bar',
              data:[data1],
              barWidth: 40,
              barGap: '150%',
              itemStyle: {
                normal: {
                  color: '#3589c4',
                }
              }
            },
            {
              name:flag ? '期末值' : '当期值',
              type:'bar',
              data:[data2],
              barWidth: 40,
              barGap: '150%',
              // itemStyle: {
              //   normal: {
              //     color: '#3589c4'
              //   }
              // }
            }
          ]
        };
    }
  }
}
</script>

<style lang="scss">
  .economy-increase {
    width: 100%;
    min-height: 100vh;
    .title-bar {
      margin-top: 60px;
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

    .total-desc {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #77bde1;
      font-size: 50px;
      position: relative;
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
      .button {
        position: absolute;
        right: 100px;
        top: 0;
        width: 267px;
        height: 70px;
        line-height: 70px;
        color: #fff;
        background-color: #77bde1;
        background-image: url(../../assets/img/manage_button.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 10px;
        font-size: 36px;
      }
    }

    .top-bottom-frame {
      display: flex;
      .row-manage {
        display: flex;
        justify-content: space-between;
        margin: 30px 65px;
        .chart-manage {
          box-sizing: border-box;
          padding: 20px 0;
          display: flex;
          text-align: left;
          width: 775px;
          height: 490px;
          background: url(../../assets/img/manage_small_rect.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 20px;
          .chart-content {
            display: flex;
            flex-direction: column;
            .chart-title {
              margin-top: 50px;
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
              font-size: 50px;
              margin: 20px 30px;
              padding: 0 5px;
              letter-spacing: 5px;
            }
            .name {
              margin-top: 70px;
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

    .chart {
      height: 460px;
      width: 425px;
    }

    .line-desc {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #77bde1;
      font-size: 40px;
      padding-top: 20px;
      padding-left: 65px;
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

