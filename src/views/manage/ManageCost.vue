<template>
  <div class="manage-cost">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">营业收入/成本</div>
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
      <div class="button">月度趋势</div>
      <div class="button">城市对比</div>
    </div>
    <div class="top-frame">
      <div class="line-desc">
        <div class="left">资产总额(亿元)</div>
        <div class="middle">123456</div>
        <div class="right">比去年同期:</div>
        <div class="right-arrow arrow-up"></div>
        <div class="right-num">30%</div>
      </div>
      <div class="top-bottom-frame">
        <v-chart class="chart-top" :options="topOption"></v-chart>
        <!-- <v-chart class="chart-top" :options="bottomOption"></v-chart> -->
        <div class="row-manage">
          <div class="chart-manage">
            <div class="chart-title">主营业务收入(电力产品)  亿元</div>
            <div class="chart-desc">月度值</div>
            <div class="middle">123456</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">99999</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">99999<span class="span-img arrow-up"></span></div>
              </div>
            </div>
          </div>
          <div class="chart-manage">
            <div class="chart-title">主营业务收入(电力产品)  亿元</div>
            <div class="chart-desc">月度值</div>
            <div class="middle">123456</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">99999</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">99999<span class="span-img arrow-up"></span></div>
              </div>
            </div>
          </div>
          <div class="chart-manage">
            <div class="chart-title">主营业务收入(电力产品)  亿元</div>
            <div class="chart-desc">月度值</div>
            <div class="middle">123456</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">99999</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">99999<span class="span-img arrow-up"></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-frame">
      <div class="line-desc">
        <div class="left">主营业务成本</div>
        <div class="middle">123456</div>
        <div class="right">比去年同期:</div>
        <div class="right-arrow arrow-up"></div>
        <div class="right-num">30%</div>
      </div>
      <div class="top-bottom-frame">
        <v-chart class="chart-bottom" :options="bottomOption"></v-chart>
        <div class="row-manage">
          <div class="chart-manage">
            <div class="chart-title">主营业务成本(电力产品)  亿元</div>
            <div class="chart-desc">月度值</div>
            <div class="middle">123456</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">99999</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">99999<span class="span-img arrow-up"></span></div>
              </div>
            </div>
          </div>
          <div class="chart-manage">
            <div class="chart-title">主营业务成本(电力产品)  亿元</div>
            <div class="chart-desc">月度值</div>
            <div class="middle">123456</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">99999</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">99999<span class="span-img arrow-up"></span></div>
              </div>
            </div>
          </div>
          <div class="chart-manage">
            <div class="chart-title">主营业务成本(电力产品)  亿元</div>
            <div class="chart-desc">月度值</div>
            <div class="middle">123456</div>
            <div class="chart-content">
              <div class="left">
                <div class="name">年累计值</div>
                <div class="value">99999</div>
              </div>
              <div class="right">
                <div class="name">比去年同期</div>
                <div class="value">99999<span class="span-img arrow-up"></span></div>
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
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data:['主营业务收入(电力产品)','主营业务收入(其他)','其他业务收入'],
            textStyle: {
              color: '#77bde1',
              fontSize: 10,
            }
          },
          calculable : false,
          series : [{
            name:'营业收入',
            type:'pie',
            selectedMode: 'single',
            radius : [0, 50],
            // for funnel
            x: '20%',
            width: '40%',
            funnelAlign: 'right',
            max: 10,
            itemStyle : {
              normal : {
                label : {
                  show : false,
                },
                labelLine : {
                  show : false
                }
              }
            },
            data:[
              {value:70, name:'主营业务收入'},
              {value:30, name:'其他业务收入'},
            ]
          },
          {
            name:'访问来源',
            type:'pie',
            radius : [60, 90],
            // for funnel
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 100,
            data:[
              {value:20, name:'主营业务收入(电力产品)'},
              {value:50, name:'主营业务收入(其他)'},
              {value:30, name:'其他业务收入'}
            ],
            itemStyle : {
              normal : {
                label : {
                  show : false,
                },
                labelLine : {
                  show : false
                }
              }
            }
         }]
        };

        this.bottomOption = {
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
            data: ['主营业务收入(电力产品)','主营业务收入(其他)','其他业务收入'],
            textStyle: {
              color: '#77bde1',
              fontSize: 10
            }
          },
          series : [{
            name: '流动资产',
            type: 'pie',
            radius : '70%',
            center: ['50%', '50%'],
            data: [
              {value:20, name:'主营业务收入(电力产品)'},
              {value:50, name:'主营业务收入(其他)'},
              {value:30, name:'其他业务收入'}
            ],
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
  .manage-cost {
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
      }
    }

    .top-frame, .bottom-frame {
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
        margin-left: 20px;
        .chart-manage {
          box-sizing: border-box;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          text-align: left;
          width: 546px;
          height: 488px;
          background: url(../../assets/img/manage_small_rect.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 20px;
          .chart-title {
            margin-top: 10px;
            color: #77bde1;
            font-size: 36px;
            margin-left: 40px;
          }
          .chart-desc {
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
            font-size: 80px;
            margin: 20px 30px;
            padding: 0 5px;
            letter-spacing: 5px;
          }
          .chart-content {
            display: flex;
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
      width: 780px;
      height: 500px;
    }
    .chart-bottom {
      width: 780px;
      height: 500px;
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

