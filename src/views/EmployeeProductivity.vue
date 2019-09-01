<template>
  <div class="employee-productivity">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">劳动生产率</div>
      <el-select class="structure-choose" @change="chooseType(typeValue)" v-model="typeValue" placeholder="用工结构">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select 
        class="company-choose" 
        @change="selectedChange"
        v-model="companyValue" 
        multiple
        :clearable=false
        collapse-tags
        placeholder="按公司筛选">
        <el-option
          v-for="(item, index) in companyOptions"
          :key="index"
          :label="item.alias"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select class="start-time-choose" v-model="startValue" placeholder="开始日期">
        <el-option
          v-for="item in startOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="stop-time-choose" v-model="stopValue" placeholder="结束日期">
        <el-option
          v-for="item in stopOptions"
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
  name: 'employeeProductivity',
  data() {
    return {
      stopOptions: [{
        value: '7',
        label: '2019年7月'
      }, {
        value: '6',
        label: '2019年6月'
      }],
      stopValue: '',
      startOptions: [{
        value: '7',
        label: '2019年7月'
      }, {
        value: '6',
        label: '2019年6月'
      }],
      startValue: '',
      typeOptions: [{
        value: '1',
        label: '全员劳动生产率'
      }, {
        value: '2',
        label: '职工劳动生产率'
      }, {
        value: '3',
        label: '主业在岗职工劳动生产率'
      }],
      typeValue: '全员劳动生产率',
      companyOptions: [],
      companyValue: '',
      trendOption: {},
      chooseLine: ''
    }
  },
  mounted() {
    this.companyOptions = JSON.parse(sessionStorage.getItem('company'));
    this.companyOptions.push({alias: '总计', id: 0});
    this.companyValue = [1];
    this.getPageData('/app/HumanResource/employee/productivityAllTrend');
  },
  methods: {
    chooseType(typeValue) {
      this.chooseLine = typeValue;
      if (typeValue === '1') {
        this.getPageData('/app/HumanResource/employee/productivityAllTrend');
      } else if(typeValue === '2') {
        this.getPageData('/app/HumanResource/employee/productivityStaffTrend');
      } else {
        this.getPageData('/app/HumanResource/employee/productivityStaffOnPostTrend');
      }
    },
    selectedChange(val) {
      if (val.indexOf(0) > -1) {
        for (let i = 0; i < val.length; i++) {
          this.companyValue.shift();
        }
        if(val.length > 1) {
          this.companyValue.shift();
        }
      }
      if (this.chooseLine === '1') {
        this.getPageData('/app/HumanResource/employee/productivityAllTrend');
      } else if(this.chooseLine === '2') {
        this.getPageData('/app/HumanResource/employee/productivityStaffTrend');
      } else {
        this.getPageData('/app/HumanResource/employee/productivityStaffOnPostTrend');
      }
    },
    getPageData(url) {
      this.$ajax({
        url: url,
        data: {
          deviceId: "1111",
          startYear: 2018,
          startMonth: 11,
          endYear: 2019,
          endMonth: 7,
          companyIdList: this.companyValue
        }
      }).then(res => {
        const list = res.data.trend || [];
        if (list.length < 1) {
          return;
        } 
        let muti_employee1 = [];
        let muti_employee2 = [];
        let muti_employee3 = [];
        let muti_employee4 = [];
        let muti_employee5 = [];
        let muti_employee_x = [];
        list[0].content.map((item) => {
          muti_employee1.push(item.value || 0);
          muti_employee_x.push(item.month + '月');
        })
        list[1] && list[1].content.map((item) => {
          muti_employee2.push(item.value || 0);
        })
        list[2] && list[2].content.map((item) => {
          muti_employee3.push(item.value || 0);
        })
        list[3] && list[3].content.map((item) => {
          muti_employee4.push(item.value || 0);
        })
        list[4] && list[4].content.map((item) => {
          muti_employee5.push(item.value || 0);
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
              name:'劳动生产率',
              type:'line',
              data: muti_employee1,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'劳动生产率',
              type:'line',
              data: muti_employee2,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'劳动生产率',
              type:'line',
              data: muti_employee3,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'劳动生产率',
              type:'line',
              data: muti_employee4,
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            },
            {
              name:'劳动生产率',
              type:'line',
              data: muti_employee5,
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
  .employee-productivity {
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
      .start-time-choose {
        position: absolute;
        right: 330px;
        top: 0;
        width: 240px;
      }
      .stop-time-choose {
        position: absolute;
        right: 60px;
        top: 0;
        width: 240px;
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
    .el-select .el-tag {
      color: #77bde1;
      background: rgba(0, 0, 0, 0);
    }
    .el-select .el-tag__close.el-icon-close {
      display: none;
    }
  }
</style>

