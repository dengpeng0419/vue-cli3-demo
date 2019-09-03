<template>
  <div class="manage-index">
    <div class="top-frame">
      <div class='top-data'>
        <router-link to="/asset-structure" class="rect-bg" v-if="pageData.banner[0]">
          <div class="title">资产总额(亿元)</div>
          <div class="value">{{parseInt(pageData.banner[0].value/100000000)}}</div>
          <div class="des">比去年同期:<span class="span-img arrow-up" :class="{'arrow-down':pageData.banner[0].comparedToPreviousYear<0}"></span>{{pageData.banner[0].comparedToPreviousYear}}%</div>
        </router-link>
        <router-link to="/manage-cost" class="rect-bg" v-if="pageData.banner[1]">
          <div class="title">营业收入</div>
          <div class="value">{{pageData.banner[1].value}}</div>
          <div class="des">比去年同期:<span class="span-img arrow-up" :class="{'arrow-down':pageData.banner[1].comparedToPreviousYear<0}"></span>{{pageData.banner[1].comparedToPreviousYear}}%</div>
        </router-link>
        <router-link to="/manage-cost" class="rect-bg" v-if="pageData.banner[2]">
          <div class="title">营业成本</div>
          <div class="value">{{pageData.banner[2].value}}</div>
          <div class="des">比去年同期:<span class="span-img arrow-up" :class="{'arrow-down':pageData.banner[2].comparedToPreviousYear<0}"></span>{{pageData.banner[2].comparedToPreviousYear}}%</div>
        </router-link>
        <router-link to="/manage-profit" class="rect-bg" v-if="pageData.banner[3]">
          <div class="title">利润总额(亿元)</div>
          <div class="value">{{pageData.banner[3].value}}</div>
          <div class="des">比去年同期:<span class="span-img arrow-up" :class="{'arrow-down':pageData.banner[3].comparedToPreviousYear<0}"></span>{{pageData.banner[3].comparedToPreviousYear}}%</div>
        </router-link>
        <router-link to="/economy-increase" class="rect-bg" v-if="pageData.banner[4]">
          <div class="title">经济增加值(亿元)</div>
          <div class="value">{{pageData.banner[4].value}}</div>
          <div class="des">比去年同期:<span class="span-img arrow-up" :class="{'arrow-down':pageData.banner[4].comparedToPreviousYear<0}"></span>{{pageData.banner[4].comparedToPreviousYear}}%</div>
        </router-link>
        <router-link to="/asset-profit" class="rect-bg" v-if="pageData.banner[5]">
          <div class="title">净资产收益率</div>
          <div class="value">{{pageData.banner[5].value}}</div>
          <div class="des">比去年同期:<span class="span-img arrow-up" :class="{'arrow-down':pageData.banner[5].comparedToPreviousYear<0}"></span>{{pageData.banner[5].comparedToPreviousYear}}%</div>
        </router-link>
        <router-link to="/asset-debt" class="rect-bg" v-if="pageData.banner[6]">
          <div class="title">资产负债率</div>
          <div class="value">{{pageData.banner[6].value}}</div>
          <div class="des">比去年同期:<span class="span-img arrow-up" :class="{'arrow-down':pageData.banner[6].comparedToPreviousYear<0}"></span>{{pageData.banner[6].comparedToPreviousYear}}%</div>
        </router-link>
      </div>
    </div>
    <div class="bottom-frame">
      <div class="left-frame">
        <router-link to="/opening-cash" class="chart-jump"></router-link>
        <div class="left-top-frame">
          <div class="left-frame-title">主营业务收入\成本</div>
          <div class="row-manage" v-if="label1&&label1.length>0">
            <div class="chart-manage">
              <div class="chart-title">主营业务收入(电力产品)</div>
              <div class="chart-value">
                <div class="detail-value" v-for="(item, index) in label1" :key=index>{{item}}</div>
              </div>
              <div class="chart-title">主营业务收入(其他)</div>
              <div class="chart-value">
                <div class="detail-value" v-for="(item, index) in label2" :key=index>{{item}}</div>
              </div>
              <div class="chart-title">其他营业收入</div>
              <div class="chart-value">
                <div class="detail-value" v-for="(item, index) in label3" :key=index>{{item}}</div>
              </div>
            </div>
            <div class="chart-manage">
              <div class="chart-title">发电成本</div>
              <div class="chart-value">
                <div class="detail-value" v-for="(item, index) in label4" :key=index>{{item}}</div>
              </div>
              <div class="chart-title">购电成本</div>
              <div class="chart-value">
                <div class="detail-value" v-for="(item, index) in label5" :key=index>{{item}}</div>
              </div>
              <div class="chart-title">输配电成本</div>
              <div class="chart-value">
                <div class="detail-value" v-for="(item, index) in label6" :key=index>{{item}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-bottom-frame">
          <!-- <router-link to="/asset-structure" class="chart-jump"></router-link> -->
          <div class="left-bottom-title">利润总额</div>
          <div class="left-bottom-detail">
            <div class="names">
              <div class="detail-name">营业利润</div>
              <div class="detail-name">营业外收入</div>
              <div class="detail-name">营业外支出(亿元)</div>
            </div>
            <div class="values" v-if="label7&&label7.length>0">
              <div class="values-line">
                <div class="detail-value" v-for="(item, index) in label7" :key=index>{{item}}</div>
              </div>
              <div class="values-line">
                <div class="detail-value" v-for="(item, index) in label8" :key=index>{{item}}</div>
              </div>
              <div class="values-line">
                <div class="detail-value" v-for="(item, index) in label9" :key=index>{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-frame">
        <router-link to="/asset-structure" class="chart-jump"></router-link>
        <div class="right-title">资产总额</div>
        <div class="chart-title">流动资产:</div>
        <div class="chart-value">
          <div class="detail-value" v-for="(item, index) in flueAsset" :key=index>{{item}}</div>
        </div>
        <div class="chart-title">非流动资产:</div>
        <div class="chart-value">
          <div class="detail-value" v-for="(item, index) in unflueAsset" :key=index>{{item}}</div>
        </div>
        <v-chart class="chart-structure" :options="structure"></v-chart>
        <div class="pie-frame-bg"></div>
        <v-chart class="chart-option" :options="option"></v-chart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageIndex',
  data() {
    return {
      pageData: {},
      banner: [],
      flueAsset: [],
      unflueAsset: [],
      label1: [],
      label2: [],
      label3: [],
      label4: [],
      label5: [],
      label6: [],
      label7: [],
      label8: [],
      label9: [],
      structure: {},
      option: {}
    }
  },
  mounted() {
    // this.datas = this.genData(50);
    this.getHomeData();
    this.getCompany();
  },
  methods: {
    getCompany() {
      this.$ajax({
        url: '/app/HumanResource/company/list',
        data: {
          deviceId: '1111'
        }
      }).then(res => {
        const company = res.data;
        sessionStorage.setItem('company', JSON.stringify(company));
      })
    },
    toEmployeeNumber() {
      this.$router.push({
        name: 'employeeTrend'
      })
    },
    getHomeData() {
      this.$ajax({
        url: '/app/financial/overview',
        data: {
          deviceId: '111',
          startYear: 2018,
          startMonth: 7,
          endYear: 2019,
          endMonth: 7,
          companyId: 0
        }
      }).then(res => {
        this.pageData = res.data || {};
        const assetStructure = this.pageData.assetStructure || [];
        const flueAsset = assetStructure[0] ? assetStructure[0].value || 0 : 0;
        const unflueAsset = assetStructure[1] ? assetStructure[1].value || 0 : 0;
        const pieData = [{
          value: flueAsset,
          name: '流动资产'
        }, {
          value: unflueAsset,
          name: '非流动资产'
        }];
        this.flueAsset = (parseInt(flueAsset/100000000)+'').split('');
        this.unflueAsset = (parseInt(unflueAsset/100000000)+'').split('');

        const detail = this.pageData.details || [];
        const label1 = detail[0] ? detail[0].value || 0 : 0;
        const label2 = detail[1] ? detail[1].value || 0 : 0;
        const label3 = detail[2] ? detail[2].value || 0 : 0;
        const label4 = detail[3] ? detail[3].value || 0 : 0;
        const label5 = detail[4] ? detail[4].value || 0 : 0;
        const label6 = detail[5] ? detail[5].value || 0 : 0;
        const label7 = detail[6] ? detail[6].value || 0 : 0;
        const label8 = detail[7] ? detail[7].value || 0 : 0;
        const label9 = detail[8] ? detail[8].value || 0 : 0;
        this.label1 = (label1+'').split('');
        this.label2 = (label2+'').split('');
        this.label3 = (label3+'').split('');
        this.label4 = (label4+'').split('');
        this.label5 = (label5+'').split('');
        this.label6 = (label6+'').split('');
        this.label7 = (label7+'').split('');
        this.label8 = (label8+'').split('');
        this.label9 = (label9+'').split('');

        const assetTrend = this.pageData.assetTrend || [];
        const assetTrend1 = assetTrend[0] ? assetTrend[0].value || {} : {};
        const assetTrend2 = assetTrend[1] ? assetTrend[1].value || {} : {};
        const line_x = [];
        const line1 = [];
        const line2 = [];
        assetTrend1.map((item) => {
          line_x.push(item.month);
          line1.push(item.value);
        })
        assetTrend2.map((item) => {
          line2.push(item.value);
        })

        this.structure = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          // title : {
          //   text: '资产总额',
          //   x: 'left',
          //   textStyle: {
          //     fontSize: 18,
          //     fontWeight: 'bolder',
          //     color: '#77bde1'          // 主标题文字颜色
          //   },
          // },
          // tooltip : {
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b} : {c} ({d}%)"
          // },
          // legend: {
          //   orient: 'horizontal',
          //   x: 'left',
          //   y: 'bottom',
          //   padding: 1,
          //   data: employee_structure_x,
          //   textStyle: {
          //     color: '#77bde1'
          //   }
          // },
          series : [{
            name: '资产总额',
            type: 'pie',
            radius : '55%',
            center: ['66%', '50%'],
            data: pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal:{
                color:function(params) {
                //自定义颜色
                var colorList = ['#7876b6', '#e98e12', '#df4e3e', '#17a5c4', '#59ccf7', '#f5b031', '#fad797', '#c3b4df'];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }]
        };
        this.option = {
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
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他'],
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
              data : line_x,
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
              name:'邮件营销',
              type:'bar',
              stack: '广告',
              data: line1,
              barWidth: 12,
              itemStyle: {
                normal: {
                  color: '#3589c4'
                }
              }
            },
            {
              name:'联盟广告',
              type:'bar',
              stack: '广告',
              data:line2,
              barWidth: 12,
              itemStyle: {
                normal: {
                  color: '#3ebfdf'
                }
              }
            }
          ]
        };
      })
    }
  }
}
</script>

<style lang="scss">
  .manage-index {
    .top-frame {
      margin-top: 116px;
      width: 1960px;
      height: 243px;
      overflow-x: scroll;
      overflow-y: hidden;
      .top-data {
        display: flex;
        margin-left: 16px;
        width: 3018px;
        height: 280px;
        .span-img {
          display: inline-block;
          margin-left: 10px;
          width: 25px;
          height: 23px;
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
        .rect-bg {
          width: 424px;
          height: 243px;
          background-image: url(../../assets/img/human_rectangle.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          margin-right: 10px;
          padding-left: 60px;
          // padding-top: 20px;
          box-sizing: border-box;
          .title {
            color: #77bde1;
            font-size: 46px;
          }
          .value {
            color: #fff;
            font-size: 90px;
            line-height: 90px;
          }
          .des {
            color: #77bde1;
            font-size: 38px;
          }
        }
      }
    }
    .bottom-frame {
      display: flex;
      .left-frame {
        margin-top: 16px;
        position: relative;
        text-align: left;
        .left-frame-title {
          color: #77bde1;
          font-size: 40px;
        }
        .chart-jump {
          position: absolute;
          top: 0;
          left: 20px;
          width: 400px;
          height: 100px;
          background: rgba(0,0,0,0);
          z-index: 10;
        }
        .left-top-frame {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding-top: 25px;
          padding-left: 18px;
          padding-right: 25px;
          margin-left: 16px;
          width: 1163px;
          height: 603px;
          background-image: url(../../assets/img/middle_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          .row-manage {
            display: flex;
            margin-top: 10px;
            justify-content: space-between;
            .chart-manage {
              box-sizing: border-box;
              padding: 20px 0;
              display: flex;
              flex-direction: column;
              width: 546px;
              height: 488px;
              background: url(../../assets/img/manage_small_rect.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
              .chart-title {
                margin-top: 10px;
                color: #77bde1;
                font-size: 36px;
                margin-left: 40px;
              }
              .chart-value {
                display: flex;
                margin-left: 40px;
                .detail-value {
                  width: 40px;
                  height: 45px;
                  background: url(../../assets/img/manage_num.png);
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  font-family: tonjay;
                  margin-left: 10px;
                  margin-bottom: 30px;
                  margin-top: 10px;
                  font-size: 45px;
                  color: #fff;
                  text-align: center;
                  line-height: 45px;
                }
              }
            }
          }
        }
        .left-bottom-frame {
          margin-left: 16px;
          height: 595px;
          margin-top: 10px;
          background-image: url(../../assets/img/middle_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding-top: 25px;
          padding-left: 18px;
          padding-right: 25px;
          .chart-jump {
            position: absolute;
            top: 0;
            left: 20px;
            width: 400px;
            height: 100px;
            background: rgba(0,0,0,0);
            z-index: 10;
          }
          .left-bottom-title {
            color: #77bde1;
            font-size: 40px;
          }
          .left-bottom-detail {
            margin-top: 40px;
            margin-left: 60px;
            display: flex;
            color: #77bde1;
            font-size: 40px;
            .detail-name {
              margin-top: 40px;
              text-align: right;
            }
            .values-line {
              display: flex;
              margin-top: 40px;
              margin-left: 40px;
              .detail-value {
                width: 50px;
                height: 56px;
                background: url(../../assets/img/manage_num.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;
                font-family: tonjay;
                margin-left: 10px;
                font-size: 56px;
                color: #fff;
                text-align: center;
                line-height: 56px;
              }
            }
          }
        }  
      }
      .right-frame {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-left: 9px;
        width: 766px;
        height: 1206px;
        background: url(../../assets/img/manage_big_rect.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: 10px;
        padding-bottom: 15px;
        color: #77bde1;
        font-size: 40px;
        .chart-jump {
          position: absolute;
          top: 0;
          left: 20px;
          width: 360px;
          height: 100px;
          background: rgba(0,0,0,0);
          z-index: 10;
        }
        .right-title {
          margin-top: 40px;
          margin-left: 25px;
          margin-bottom: 100px;
          text-align: left;
        }
        .chart-title {
          margin-top: 20px;
          color: #77bde1;
          font-size: 36px;
          margin-left: 25px;
          text-align: left;
        }
        .chart-value {
          display: flex;
          margin-left: 25px;
          .detail-value {
            width: 40px;
            height: 45px;
            background: url(../../assets/img/manage_num.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            font-family: tonjay;
            margin-left: 10px;
            margin-bottom: 30px;
            margin-top: 10px;
            font-size: 45px;
            color: #fff;
            text-align: center;
            line-height: 45px;
          }
        }
        .chart-structure {
          position: absolute;
          top: 80px;
          right: 20px;
          z-index: 9;
          width: 600px;
          height: 600px;
        }
        .pie-frame-bg {
          z-index: 8;
          width: 380px;
          height: 380px;
          background-color: #1d2e4a;
          position: absolute;
          top: 190px;
          right: 30px;
          border-radius: 20px;
        }
      }
    }
  }
  .chart-option {
    margin-top: 60px;
    width: 760px;
    height: 600px;
  }
  @font-face {
    /* font-test*/
    font-family: tonjay;
    src: url(../../assets/fonts/digifaw.ttf);
  }
</style>
