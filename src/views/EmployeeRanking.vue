<template>
  <div class="employee-ranking">
    <div class="title-bar">
      <div style="position: absolute; top: 0; left: 45px;" @click="$router.go(-1)">
        <img src="../assets/img/icon_back.png" width="21" height="36">
      </div>
      <div class="title">{{title}}</div>
      <el-select class="structure-choose" @change="chooseItem(value)" v-model="value" placeholder="排行">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="company-choose" @change="chooseYear(year)" v-model="year" placeholder="年份">
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="time-choose" @change="chooseMonth(month)" v-model="month" placeholder="月份">
        <el-option
          v-for="item in months"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <v-chart class="rank-chart" :options="trendOption"></v-chart>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      options: [],
      years: [{
        value: 2019,
        label: '2019年'
      }],
      months: [{
        value: 7,
        label: '7月'
      }, {
        value: 6,
        label: '6月'
      }],
      value: '',
      yearLabel: '2019年',
      monthLabel: '7月',
      year: 2019,
      month: 7,
      trendOption: {},
      rankBy: '',
      title: ''
    }
  },
  mounted() {
    const curRouter = this.$router.history.current.name;
    this.initOption(curRouter);
    this.getPageData();
  },
  methods: {
    chooseItem(value) {
      this.rankBy = value;
      this.getPageData();
    },
    chooseYear(year) {
      this.year = year;
      this.getPageData();
    },
    chooseMonth(month) {
      this.month = month;
      this.getPageData();
    },
    initOption(curRouter) {
      switch(curRouter) {
        case 'densityRanking':
          this.title = '人才质量排行榜';
          this.rankBy = 'TalentEquivalentDensity';
          this.value = '人才当量密度';
          this.options = [{
            value: 'TalentEquivalentDensity',
            label: '人才当量密度'
          }, {
            value: 'HighSkilledPercentage',
            label: '高技能人才占比'
          }];
          break;
        case 'hightechRanking':
          this.title = '人才质量排行榜';
          this.rankBy = 'HighSkilledPercentage';
          this.value = '高技能人才占比';
          this.options = [{
            value: 'HighSkilledPercentage',
            label: '高技能人才占比'
          }, {
            value: 'TalentEquivalentDensity',
            label: '人才当量密度'
          }];
          break;
        case 'allRanking':
          this.title = '劳动生产率';
          this.rankBy = 'ProductivityAll';
          this.value = '全员劳动生产率';
          this.options = [{
            value: 'ProductivityAll',
            label: '全员劳动生产率'
          }, {
            value: 'ProductivityStaff',
            label: '职工劳动生产率'
          }, {
            value: 'ProductivityStaffOnPost',
            label: '主业在岗职工劳动生产率'
          }];
          break;
        case 'staffRanking':
          this.title = '劳动生产率';
          this.rankBy = 'ProductivityStaff';
          this.value = '职工劳动生产率';
          this.options = [{
            value: 'ProductivityAll',
            label: '全员劳动生产率'
          }, {
            value: 'ProductivityStaff',
            label: '职工劳动生产率'
          }, {
            value: 'ProductivityStaffOnPost',
            label: '主业在岗职工劳动生产率'
          }];
          break;
        case 'staffonRanking':
          this.title = '劳动生产率';
          this.rankBy = 'ProductivityStaffOnPost';
          this.value = '主业在岗职工劳动生产率';
          this.options = [{
            value: 'ProductivityAll',
            label: '全员劳动生产率'
          }, {
            value: 'ProductivityStaff',
            label: '职工劳动生产率'
          }, {
            value: 'ProductivityStaffOnPost',
            label: '主业在岗职工劳动生产率'
          }];
          break;
        defaut: break;
      }
    },
    getPageData() {
      this.$ajax({
        url: '/app/HumanResource/employee/rank',
        data: {
          "deviceId": "1111",
          "rankBy": this.rankBy,
          "year": this.year,
          "month": this.month
        }
      }).then(res => {
        const list = res.data.huamResourceRank || [];
        let muti_rank = [];
        let muti_rank_x = [];
        
        list.map((item) => {
          muti_rank.push(item.value);
          muti_rank_x.push(item.name);
        })

        this.trendOption = {
          tooltip: {
            trigger: 'axis'
          },
          calculable : true,
          xAxis: [{
            type : 'value',
            // boundaryGap : [0, 0.01],
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
          yAxis: [{
            type : 'category',
            data : muti_rank_x,
            axisLine: {
              show: false,
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
                fontSize: 18
              }
            }
          }],
          grid: {
            x: '30%',
            width: '60%'
          },
          series: [{
            name:'2011年',
            type:'bar',
            data: muti_rank,
            barWidth: 44,
            itemStyle: {
              normal: {
                color: '#1c77be'
              }
            }
          }]
        };
      })
    }
  }
}
</script>

<style lang="scss">
  .employee-ranking {
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
    .rank-chart {
      margin-top: 60px;
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

