<template>
  <div class="employee-change">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">职工新增、减少</div>
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
    <div class="pie-list">
      <div class="column">
        <v-chart class="chart-top" :options="ageOption"></v-chart>
        <div class="chart-frame-top"></div>
      </div>
      <div class="column">
        <v-chart class="chart-top" :options="wenhuaOption"></v-chart>
        <div class="chart-frame-top"></div>
      </div>
    </div>
    <v-chart class="trend-charts" :options="trendOption"></v-chart>
  </div>
</template>

<script>
export default {
  name: 'employeeChange',
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
      trendOption: {}
    }
  },
  mounted() {
    this.companyOptions = JSON.parse(sessionStorage.getItem('company'));
    this.getPageData();
    this.getTrendData();
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
    getTrendData() {
      this.$ajax({
        url: '/app/HumanResource/employee/increaseAndDecrease/trend',
        data: {
          deviceId: "1111",
          startYear: 2018,
          startMonth: 11,
          endYear: 2019,
          endMonth: 7,
          companyId: 0 
        }
      }).then(res => {
        // const line1 = [400, 300, 250, 280, 380, 420, 300];
        // const line2 = [150, 280, 230, 180, 400, 450, 320];
        const muti_employee1 = [400, 300, 250, 280, 380, 420, 300, 320];
        const muti_employee2 = [150, 280, 230, 180, 400, 450, 320, 280];
        const muti_employee_x = ['1月','2月','3月','4月','5月','6月','7月'];
        // line1.map((item) => {
        //     muti_employee1.push(item.value);
        //     muti_employee_x.push(item.month + '月');
        // });
        // line2.map((item) => {
        //   muti_employee1.push(item.value);
        // });
        this.trendOption = {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          legend: {
            orient: 'horizontal',
            padding: 1,
            data: ['新增职工数', '减少职工数']
          },
          // grid: {
          //   width: '90%'
          // },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: muti_employee_x,
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
              name:'职工新增',
              type:'line',
              data: muti_employee1,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'职工减少',
              type:'line',
              data: muti_employee2,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            }
          ]
        }
      });
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

        this.ageOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          title : {
            text: '新职工组成',
            x: '28%',
            textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#77bde1'  
            },
          },
          legend: {
            orient: 'vertical',
            x: '70%',
            y: '20%',
            padding: 1,
            data: pie_age_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '用工人员结构',
            type: 'pie',
            radius : '45%',
            center: ['40%', '40%'],
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
          title : {
            text: '职工减少数构成',
            x: '24%',
            textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#77bde1'  
            },
          },
          legend: {
            orient: 'vertical',
            x: '70%',
            y: '20%',
            padding: 1,
            data: pie_wenhua_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '文化程度',
            type: 'pie',
            radius : '45%',
            center: ['40%', '40%'],
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
  .employee-change {
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
    .pie-list {
      margin-top: 120px;
      display: flex;
      justify-content: center;
      .column {
        display: flex;
        flex-direction: column;
        width: 950px;
        position: relative;
        .chart-top {
          position: absolute;
          z-index: 9;
          width: 800px;
          height: 540px;
        }
        .chart-frame-top {
          position: absolute;
          z-index: 8;
          width: 300px;
          height: 300px;
          background-color: #212d3f;
          top: 70px;
          left: 170px;
          border-radius: 20px;
        }
        .chart-bottom {
          position: absolute;
          z-index: 9;
          top: 540px;
          width: 800px;
          height: 540px;
        }
        .chart-frame-bottom {
          position: absolute;
          z-index: 8;
          width: 300px;
          height: 300px;
          background-color: #212d3f;
          top: 610px;
          left: 170px;
          border-radius: 20px;
        }
      }
    }
    .trend-charts {
      margin-top: 400px;
      margin-left: 100px;
      width: 2400px;
      height: 800px;
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
</style>

