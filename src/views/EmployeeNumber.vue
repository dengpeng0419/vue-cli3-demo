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
    <div class="pie-list">
      <div class="column">
        <v-chart class="chart-top" :options="ageOption"></v-chart>
        <v-chart class="chart-bottom" :options="zhuanyeOption"></v-chart>
        <div class="chart-frame-top"></div>
        <div class="chart-frame-bottom"></div>
      </div>
      <div class="column">
        <v-chart class="chart-top" :options="wenhuaOption"></v-chart>
        <v-chart class="chart-bottom" :options="jinengOption"></v-chart>
        <div class="chart-frame-top"></div>
        <div class="chart-frame-bottom"></div>
      </div>
      <div class="column">
        <v-chart class="chart-top" :options="zhuanjiaOption"></v-chart>
        <v-chart class="chart-bottom" :options="leixingOption"></v-chart>
        <div class="chart-frame-top"></div>
        <div class="chart-frame-bottom"></div>
      </div>
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
      ageOption: {},
      wenhuaOption: {},
      zhuanjiaOption: {},
      zhuanyeOption: {},
      jinengOption: {},
      leixingOption: {}
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

        const zhuanjia_data = list[2].content || [];
        let pie_zhuanjia = [];
        let pie_zhuanjia_x = [];
        zhuanjia_data.map((item) => {
          const obj = {};
          obj.name = item.label;
          obj.value = item.value;
          pie_zhuanjia.push(obj);
          pie_zhuanjia_x.push(item.label);
        })

        const zhuanye_data = list[3].content || [];
        let pie_zhuanye = [];
        let pie_zhuanye_x = [];
        zhuanye_data.map((item) => {
          const obj = {};
          obj.name = item.label;
          obj.value = item.value;
          pie_zhuanye.push(obj);
          pie_zhuanye_x.push(item.label);
        })

        const jineng_data = list[4].content || [];
        let pie_jineng = [];
        let pie_jineng_x = [];
        jineng_data.map((item) => {
          const obj = {};
          obj.name = item.label;
          obj.value = item.value;
          pie_jineng.push(obj);
          pie_jineng_x.push(item.label);
        })

        const leixing_data = list[2].content || [];
        let pie_leixing = [];
        let pie_leixing_x = [];
        leixing_data.map((item) => {
          const obj = {};
          obj.name = item.label;
          obj.value = item.value;
          pie_leixing.push(obj);
          pie_leixing_x.push(item.label);
        })

        this.ageOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          title : {
            text: '年龄',
            x: '35%',
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
            text: '文化程度',
            x: '30%',
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

        this.zhuanjiaOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          title : {
            text: '现有专家人才',
            x: '25%',
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
            data: pie_zhuanjia_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '现有专家人才',
            type: 'pie',
            radius : '45%',
            center: ['40%', '40%'],
            data: pie_zhuanjia,
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

        this.zhuanyeOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          title : {
            text: '专业技术资格等级',
            x: '20%',
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
            data: pie_zhuanye_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '专业技术资格等级',
            type: 'pie',
            radius : '45%',
            center: ['40%', '40%'],
            data: pie_zhuanye,
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

        this.jinengOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          title : {
            text: '技能等级',
            x: '30%',
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
            data: pie_jineng_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '技能等级',
            type: 'pie',
            radius : '45%',
            center: ['40%', '40%'],
            data: pie_jineng,
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

        this.leixingOption = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left'
            }
          },
          title : {
            text: '用工类型',
            x: '30%',
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
            data: pie_leixing_x,
            textStyle: {
              color: '#77bde1'
            }
          },
          series : [{
            name: '用工类型',
            type: 'pie',
            radius : '45%',
            center: ['40%', '40%'],
            data: pie_leixing,
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
    .pie-list {
      margin-top: 180px;
      display: flex;
      .column {
        display: flex;
        flex-direction: column;
        width: 850px;
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

