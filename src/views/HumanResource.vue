<template>
  <div class="human-resource">
    <div class="top-frame">
      <div class='top-data'>
        <router-link to="/employee-number" class="rect-bg">
          <div class="title">用工数量</div>
          <div class="value">{{pageData.employeeCount}}</div>
        </router-link>
        <router-link to="/employee-change" class="rect-bg">
          <div class="title">新增职工人数</div>
          <div class="value">{{pageData.employeeIncreaseTotal}}</div>
        </router-link>
        <router-link to="/employee-change" class="rect-bg">
          <div class="title">职工减少数</div>
          <div class="value">{{pageData.employeeDecreaseTotal}}</div>
        </router-link>
        <router-link to="/density-ranking" class="rect-bg">
          <div class="title">人才当量密度</div>
          <div class="value">{{pageData.employeeTalentEquivalentDensity}}</div>
        </router-link>
        <router-link to="/hightech-ranking" class="rect-bg">
          <div class="title">高技能人才比例</div>
          <div class="value">{{pageData.employeeHighSkilledPercentage}}</div>
        </router-link>
      </div>
    </div>
    <div class="bottom-frame">
      <div class="left-frame">
        <v-chart class="chart-employee" :options="option"></v-chart>
        <div class="left-bottom-frame">
          <router-link to="/all-ranking" class="rect-bg">
            <div class="value">{{pageData.employeeProductivityAll}}</div>
            <div class="title">全口径劳动生产率</div>
            <div class="title">(万元/人年)</div>
          </router-link>
          <router-link to="/staff-ranking" class="rect-bg">
            <div class="value">{{pageData.employeeProductivityStaff}}</div>
            <div class="title">职工劳动生产率</div>
            <div class="title">(万元/人年)</div>
          </router-link>
          <router-link to="/staffon-ranking" class="rect-bg">
            <div class="value">{{pageData.employeeProductivityStaffOnPost}}</div>
            <div class="title">主业在岗职工劳动生产率</div>
            <div class="title">(万元/人年)</div>
          </router-link>
        </div>
      </div>
      <div class="right-frame">
        <div class="employee-number-frame" @click="toEmployeeNumber">
          <v-chart class="chart-productive" :options="polar"></v-chart>
        </div>
        <v-chart class="chart-structure" :options="structure"></v-chart>
        <div class="pie-frame-bg"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HumanResource',
  data() {
    return {
      pageData: {
        employeeIncreaseTotal: 0,
        employeeProductivityAll: 0,
        employeeTalentEquivalentDensity: 0,
        employeeDecreaseTotal: 0,
        employeeCount: 0,
        employeeHighSkilledPercentage: 0,
        employeeProductivityStaffOnPost: 0,
        employeeProductivityStaff: 0
      },
      polar: {
        title: {
          show: true,
          text: "员工数量变化趋势",
          x: "left",
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#77bde1'          // 主标题文字颜色
          },
        }
      },
      option: {
        title: {
          show: true,
          text: "劳动生产率趋势图",
          x: "left",
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#77bde1'          // 主标题文字颜色
          },
        }
      },
      structure: {
        title : {
          text: '用工人员结构',
          x: 'left',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#77bde1'          // 主标题文字颜色
          },
        }
      }
    }
  },
  mounted() {
    //this.datas = this.genData(50);
    this.getHomeData();
  },
  methods: {
    toEmployeeNumber() {
      this.$router.push({
        name: 'employeeTrend'
      })
    },
    getHomeData() {
      this.$ajax({
        url: '/app/HumanResource/employee/overview',
        data: {
          deviceId: '1111'
        }
      }).then(res => {
        this.pageData = res.data;
        let employee = [];
        let employee_x = [];
        res.data.employeeCountTrend.map((item) => {
          employee.push(item.employeeCount)
          employee_x.push(item.month + '月');
        })
        let employee_structure = [];
        let employee_structure_x = [];
        res.data.employeeStructure.map((item) => {
          const obj = {};
          obj.name = item.label;
          obj.value = item.value;
          employee_structure.push(obj);
          employee_structure_x.push(item.label);
        })
        let muti_employee1 = [];
        let muti_employee2 = [];
        let muti_employee3 = [];
        let muti_employee_x = [];
        res.data.employeeProductivityTrend.map((item) => {
          muti_employee1.push(item.employeeProductivityAll);
          muti_employee2.push(item.employeeProductivityStaff);
          muti_employee3.push(item.employeeProductivityStaffOnPost);
          muti_employee_x.push(item.month + '月');
        })
        this.polar = {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          title: {
            show: true,
            text: "员工数量变化趋势",
            x: "left",
            textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#77bde1'          // 主标题文字颜色
            },
          },
          xAxis: {
            type : 'category',
            boundaryGap : false,
            data: employee_x,
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
          },
          yAxis: {
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
          grid: {
            x: 60,
            width: '78%'
          },
          series: [{
            name: '销量',
            type: 'line',
            data: employee,
            itemStyle: {
              color: '#efea3d',
              borderColor: '#efea3d'
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: '#efea3d'
                }
              }
            }
          }]
        }
        this.structure = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          title : {
            text: '用工人员结构',
            x: 'left',
            textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#77bde1'          // 主标题文字颜色
            },
          },
          // tooltip : {
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b} : {c} ({d}%)"
          // },
          legend: {
            orient: 'horizontal',
            x: 'left',
            y: 'bottom',
            padding: 1,
            data: employee_structure_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '用工人员结构',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: employee_structure,
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
        }
        this.option = {
          title: {
            show: true,
            text: "劳动生产率趋势图",
            x: "left",
            textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#77bde1'          // 主标题文字颜色
            },
          },
          tooltip : {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          calculable : true,
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
              name:'全口径劳动生产率',
              type:'line',
              data: muti_employee1,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'职工劳动生产率',
              type:'line',
              data: muti_employee2,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'主业在岗职工劳动生产率',
              type:'line',
              data: muti_employee3,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            }
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .human-resource {
    .top-frame {
      margin-top: 116px;
      width: 1960px;
      height: 243px;
      overflow-x: scroll;
      overflow-y: hidden;
      .top-data {
        display: flex;
        margin-left: 16px;
        width: 2170px;
        height: 280px;
        .rect-bg {
          width: 424px;
          height: 243px;
          background-image: url(../assets/img/human_rectangle.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          margin-right: 10px;
          padding-left: 60px;
          padding-top: 20px;
          box-sizing: border-box;
          .title {
            color: #77bde1;
            font-size: 46px;
          }
          .value {
            color: #fff;
            font-size: 90px;
          }
        }
      }
    }
    .bottom-frame {
      display: flex;
      .left-frame {
        margin-top: 25px;
        .chart-employee {
          box-sizing: border-box;
          padding-top: 25px;
          padding-left: 10px;
          margin-left: 16px;
          margin-bottom: 35px;
          width: 1285px;
          height: 923px;
          background-image: url(../assets/img/middle_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .left-bottom-frame {
          display: flex;
          margin-left: 16px;
          .rect-bg {
            width: 424px;
            height: 243px;
            overflow: hidden;
            flex-wrap: nowrap;
            background-image: url(../assets/img/human_rectangle.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            margin-right: 10px;
            //padding-top: 20px;
            box-sizing: border-box;
            text-align: left;
            .title {
              padding-left: 10px;
              color: #77bde1;
              font-size: 36px;
            }
            .value {
              padding-left: 20px;
              color: #fff;
              font-size: 90px;
            }
          }
        }
        
      }
      .right-frame {
        position: relative;
        display: flex;
        flex-direction: column;
        //justify-content: center;
        align-items: center;
        width: 634px;
        height: 1200px;
        background-image: url(../assets/img/human_right_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: 10px;
        padding-bottom: 15px;
        .chart-productive {
          width: 600px;
          height: 500px;
          margin-top: 40px;
        }
        .chart-structure {
          position: absolute;
          top: 520px;
          left: 20px;
          z-index: 9;
          width: 600px;
          height: 650px;
        }
        .pie-frame-bg {
          z-index: 8;
          width: 410px;
          height: 410px;
          background-color: #1d2e4a;
          position: absolute;
          top: 640px;
          left: 114px;
          border-radius: 20px;
        }
      }
    }
  }
</style>
