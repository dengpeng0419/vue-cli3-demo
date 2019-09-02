<template>
  <div class="asset-profit">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">资产负债率</div>
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
      <div class="button"><router-link tag='span' to='asset-debt-trend'>月度趋势</router-link></div>
    </div>
    <div class="content-frame">
      <div class="left-frame">
        <div class="one">
          <div class="total-desc">
            <div class="desc-top">资产负债率</div>
            <div class="desc-middle">
              <div class="right">当期值:</div>
              <div class="middle">99.99%</div>
            </div>
            <div class="desc-bottom">
              <p>同比:</p>
              <div class="right-num">30%</div>
              <div class="right-arrow arrow-up"></div>
            </div>
          </div>
        </div>
        <div class="two">
          <div class="desc-top">总负债</div>
          <div class="desc-bottom">
            <p>同比:</p>
            <div class="right-num">30%</div>
            <div class="right-arrow arrow-up"></div>
            <div class="right-desc">当期值:</div>
            <div class="right-num">9999</div>
          </div>
        </div>
        <div class="two">
          <div class="desc-top">总资产</div>
          <div class="desc-bottom">
            <p>同比:</p>
            <div class="right-num">30%</div>
            <div class="right-arrow arrow-up"></div>
            <div class="right-desc">当期值:</div>
            <div class="right-num">9999</div>
          </div>
        </div>
      </div>
      <div class="right-frame">
        <div class="top-bottom-frame">
          <div class="row-manage">
            <div class="title">总负债</div>
            <div class="chart-manage">
              <div class="chart-content">
                <div class="chart-desc">月度值</div>
                <div class="middle">123456</div>
                <div class="chart-content-value">
                  <div class="left">
                    <div class="name">年累计值</div>
                    <div class="name">年累计值</div>
                  </div>
                  <div class="right">
                    <div class="value">99999</div>
                    <div class="value">99999</div>
                  </div>
                </div>
              </div>
              <v-chart class="chart-top" :options="topOption"></v-chart>
            </div>
          </div>
        </div>
        <div class="top-bottom-frame">
          <div class="row-manage">
            <div class="title"><p>总资产</p></div>
            <div class="chart-manage">
              <div class="chart-content">
                <div class="chart-desc">月度值</div>
                <div class="middle">123456</div>
                <div class="chart-content-value">
                  <div class="left">
                    <div class="name">年累计值</div>
                    <div class="name">年累计值</div>
                  </div>
                  <div class="right">
                    <div class="value">99999</div>
                    <div class="value">99999</div>
                  </div>
                </div>
              </div>
              <v-chart class="chart-top" :options="topOption"></v-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetProfit',
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

        this.topOption = {
          legend: {
            data:['利润总额','净利润'],
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
            top: '16%',
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
              data:[120],
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
              data:[200],
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
              data:[120],
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
              data:[200],
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
              data:[200],
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
  .asset-profit {
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

    .top-bottom-frame {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      width: 1524px;
      height: 620px;
      background-image: url(../../assets/img/middle_bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .row-manage {
        box-sizing: content-box;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .title {
          display: flex;
          justify-content: space-between;
          padding-right: 40px;
          margin-top: 10px;
          color: #77bde1;
          font-size: 40px;
        }
        .chart-manage {
          margin-top: 20px;
          display: flex;
          text-align: left;
          width: 1386px;
          height: 490px;
          background: url(../../assets/img/manage_small_rect.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 20px;
          .chart-desc {
            margin-top: 20px;
            color: #77bde1;
            font-size: 36px;
            margin-left: 50px;
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
            margin: 20px 100px 20px 50px;
            padding: 0 5px;
            letter-spacing: 5px;
          }
          .chart-content {
            display: flex;
            flex-direction: column;
            margin-top: 40px;
            width: 560px;
            .chart-content-value {
              display: flex;
              margin-top: 50px;
            }
            .left {
              display: flex;
              flex-direction: column;
              .name {
                margin-top: 10px;
                color: #77bde1;
                font-size: 36px;
                margin-left: 50px;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              .value {
                margin-top: 10px;
                color: #fff;
                font-size: 36px;
                margin-left: 50px;
              }
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
        min-width: 80px;
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
    .content-frame {
      display: flex;
    }
    .left-frame {
      width: 963px;
      margin-left: 30px;
      
      .one {
        margin-top: 40px;
        width: 963px;
        height: 700px;
        background-image: url(../../assets/img/middle_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .total-desc {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
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
          .desc-top {
            margin: 80px 0;
            font-size: 60px;
          }
          .desc-middle, .desc-bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 60px;
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
      }
      .two {
        margin-top: 20px;
        width: 963px;
        height: 262px;
        background-image: url(../../assets/img/middle_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #77bde1;
        font-size: 50px;
        display: flex;
        flex-direction: column;
        .desc-top {
          margin-top: 40px;
          font-size: 50px;
        }
        .desc-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
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
        .right-desc {
          margin-left: 30px;
        }
        .right-num {
          margin-left: 40px;
          color: #fff;
        }
      }
      .three {
        margin-top: 20px;
        width: 963px;
        height: 262px;
        background-image: url(../../assets/img/middle_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #77bde1;
        font-size: 50px;
      }
    }
    .right-frame {
      margin-left: 30px;
      margin-top: 10px;
      width: 1524px;
    }
    .chart-top {
      width: 760px;
      height: 480px;
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
