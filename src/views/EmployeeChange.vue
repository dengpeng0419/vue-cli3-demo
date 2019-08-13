<template>
  <div class="employee-change">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">职工新增、减少</div>
      <el-select class="company-choose" v-model="value" placeholder="按公司筛选">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="time-choose" v-model="value" placeholder="按时间筛选">
        <el-option
          v-for="item in options"
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
    <div class="trend-line">
      <v-chart class="trend-chart" :options="trendOption"></v-chart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'employeeChange',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      ageOption: {},
      wenhuaOption: {},
      trendOption: {}
    }
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.$ajax({
        url: '/app/HumanResource/employee/structure',
        data: {
          deviceId: '1111'
        }
      }).then(res => {
        console.log(res.data);
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

        let muti_employee1 = [];
        let muti_employee2 = [];
        let muti_employee_x = [];
        // res.data.employeeProductivityTrend.map((item) => {
        //   muti_employee1.push(item.employeeProductivityAll);
        //   muti_employee2.push(item.employeeProductivityStaff);
        //   muti_employee_x.push(item.month + '月');
        // })

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

        this.trendOption = {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            width: '85%'
          },
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

