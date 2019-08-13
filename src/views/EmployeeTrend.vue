<template>
  <div class="employee-number">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">用工数量详情</div>
      <el-select class="structure-choose" v-model="value" placeholder="用工结构">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
    <div class="trend-line">
      <v-chart class="trend-chart" :options="trendOption"></v-chart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
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
      trendOption: {}
    }
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.$ajax({
        url: '/app/HumanResource/employee/trend',
        data: {
          deviceId: '1111'
        }
      }).then(res => {
        const list = res.data.companyEmployeeTrendList || [];
        if (list.length < 1) {
          return;
        } 
        let muti_employee1 = [];
        let muti_employee2 = [];
        let muti_employee3 = [];
        let muti_employee4 = [];
        let muti_employee_x = [];
        list[0].content.map((item) => {
          muti_employee1.push(item.employeeCount);
          muti_employee_x.push(item.month + '月');
        })
        list[1].content.map((item) => {
          muti_employee2.push(item.employeeCount);
        })
        list[2].content.map((item) => {
          muti_employee3.push(item.employeeCount);
        })
        list[3].content.map((item) => {
          muti_employee4.push(item.employeeCount);
        })

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
            },
            {
              name:'主业在岗职工劳动生产率2',
              type:'line',
              data: muti_employee4,
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
  .employee-number {
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
    .trend-chart {
      margin-top: 100px;
      width: 100%;
      height: 1200px;
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

