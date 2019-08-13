var MockJS = require('mockjs');

var MockData = {
  // 排行
  '/app/HumanResource/employee/rank': {
        "msg": "请求成功",
        "code": "0",
        "data": {
            "huamResourceRank": [
                {
                    "id": 11,
                    "name": "国网新疆电力有限公司经济技术研究院",
                    "value": 1324
                },
                {
                    "id": 10,
                    "name": "国网新疆电力有限公司本部",
                    "value": 123
                }
            ]
        },
        "recordsFiltered": 0
  },
  // 用工趋势
  '/app/HumanResource/employee/trend': {
    "msg": "请求成功",
    "code": "0",
    "data": {
        "companyEmployeeTrendList": [
            {
                "label": "本部",
                "content": [
                    {
                        "id": 4237,
                        "year": 2018,
                        "month": 11,
                        "employeeCount": 1
                    },
                    {
                        "id": 8368,
                        "year": 2018,
                        "month": 12,
                        "employeeCount": 2
                    },
                    {
                        "id": 6081,
                        "year": 2019,
                        "month": 1,
                        "employeeCount": 3
                    },
                    {
                        "id": 7696,
                        "year": 2019,
                        "month": 2,
                        "employeeCount": 1
                    },
                    {
                        "id": 234,
                        "year": 2019,
                        "month": 3,
                        "employeeCount": 3
                    },
                    {
                        "id": 8086,
                        "year": 2019,
                        "month": 4,
                        "employeeCount": 2
                    },
                    {
                        "id": 9729,
                        "year": 2019,
                        "month": 5,
                        "employeeCount": 3
                    },
                    {
                        "id": 4385,
                        "year": 2019,
                        "month": 6,
                        "employeeCount": 6
                    },
                    {
                        "id": 2535,
                        "year": 2019,
                        "month": 7,
                        "employeeCount": 4
                    }
                ]
            },
            {
              "label": "本部",
              "content": [
                  {
                      "id": 4237,
                      "year": 2018,
                      "month": 11,
                      "employeeCount": 10
                  },
                  {
                      "id": 8368,
                      "year": 2018,
                      "month": 12,
                      "employeeCount": 20
                  },
                  {
                      "id": 6081,
                      "year": 2019,
                      "month": 1,
                      "employeeCount": 30
                  },
                  {
                      "id": 7696,
                      "year": 2019,
                      "month": 2,
                      "employeeCount": 10
                  },
                  {
                      "id": 234,
                      "year": 2019,
                      "month": 3,
                      "employeeCount": 30
                  },
                  {
                      "id": 8086,
                      "year": 2019,
                      "month": 4,
                      "employeeCount": 20
                  },
                  {
                      "id": 9729,
                      "year": 2019,
                      "month": 5,
                      "employeeCount": 30
                  },
                  {
                      "id": 4385,
                      "year": 2019,
                      "month": 6,
                      "employeeCount": 60
                  },
                  {
                      "id": 2535,
                      "year": 2019,
                      "month": 7,
                      "employeeCount": 40
                  }
              ]
          },
          {
            "label": "本部",
            "content": [
                {
                    "id": 4237,
                    "year": 2018,
                    "month": 11,
                    "employeeCount": 11
                },
                {
                    "id": 8368,
                    "year": 2018,
                    "month": 12,
                    "employeeCount": 12
                },
                {
                    "id": 6081,
                    "year": 2019,
                    "month": 1,
                    "employeeCount": 13
                },
                {
                    "id": 7696,
                    "year": 2019,
                    "month": 2,
                    "employeeCount": 11
                },
                {
                    "id": 234,
                    "year": 2019,
                    "month": 3,
                    "employeeCount": 13
                },
                {
                    "id": 8086,
                    "year": 2019,
                    "month": 4,
                    "employeeCount": 12
                },
                {
                    "id": 9729,
                    "year": 2019,
                    "month": 5,
                    "employeeCount": 13
                },
                {
                    "id": 4385,
                    "year": 2019,
                    "month": 6,
                    "employeeCount": 16
                },
                {
                    "id": 2535,
                    "year": 2019,
                    "month": 7,
                    "employeeCount": 14
                }
            ]
        },
        {
          "label": "本部",
          "content": [
              {
                  "id": 4237,
                  "year": 2018,
                  "month": 11,
                  "employeeCount": 12
              },
              {
                  "id": 8368,
                  "year": 2018,
                  "month": 12,
                  "employeeCount": 22
              },
              {
                  "id": 6081,
                  "year": 2019,
                  "month": 1,
                  "employeeCount": 32
              },
              {
                  "id": 7696,
                  "year": 2019,
                  "month": 2,
                  "employeeCount": 21
              },
              {
                  "id": 234,
                  "year": 2019,
                  "month": 3,
                  "employeeCount": 23
              },
              {
                  "id": 8086,
                  "year": 2019,
                  "month": 4,
                  "employeeCount": 22
              },
              {
                  "id": 9729,
                  "year": 2019,
                  "month": 5,
                  "employeeCount": 23
              },
              {
                  "id": 4385,
                  "year": 2019,
                  "month": 6,
                  "employeeCount": 26
              },
              {
                  "id": 2535,
                  "year": 2019,
                  "month": 7,
                  "employeeCount": 24
              }
          ]
        }
      ]
    },
    "recordsFiltered": 0
  },
  // 用工数量详情
  '/app/HumanResource/employee/structure': {
    "msg": "请求成功",
    "code": "0",
    "data": {
        "pieChartList": [
            {
                "label": "年龄",
                "content": [
                    {
                        "label": "29岁及以下",
                        "value": 0
                    },
                    {
                        "label": "30-34岁",
                        "value": 0
                    },
                    {
                        "label": "35-39岁",
                        "value": 0
                    },
                    {
                        "label": "40-44岁",
                        "value": 0
                    },
                    {
                        "label": "45-49岁",
                        "value": 0
                    },
                    {
                        "label": "50-54岁",
                        "value": 0
                    },
                    {
                        "label": "55岁及以上",
                        "value": 0
                    }
                ]
            },
            {
                "label": "文化程度",
                "content": [
                    {
                        "label": "研究生",
                        "value": 0
                    },
                    {
                        "label": "大学本科",
                        "value": 0
                    },
                    {
                        "label": "大学专科",
                        "value": 0
                    },
                    {
                        "label": "中等职业教育",
                        "value": 0
                    },
                    {
                        "label": "高中",
                        "value": 0
                    },
                    {
                        "label": "初中及以下",
                        "value": 0
                    }
                ]
            },
            {
                "label": "现有专家人才",
                "content": [
                    {
                        "label": "国家级",
                        "value": 0
                    },
                    {
                        "label": "国家电网公司级",
                        "value": 0
                    },
                    {
                        "label": "省级",
                        "value": 0
                    },
                    {
                        "label": "地市级",
                        "value": 0
                    }
                ]
            },
            {
                "label": "专业技术资格等级",
                "content": [
                    {
                        "label": "高级",
                        "value": 0
                    },
                    {
                        "label": "中级",
                        "value": 0
                    },
                    {
                        "label": "初级",
                        "value": 0
                    },
                    {
                        "label": "无专业技术资格",
                        "value": 0
                    }
                ]
            },
            {
                "label": "技能等级",
                "content": [
                    {
                        "label": "高级技师",
                        "value": 0
                    },
                    {
                        "label": "技师",
                        "value": 0
                    },
                    {
                        "label": "高级工",
                        "value": 0
                    },
                    {
                        "label": "中级工",
                        "value": 0
                    },
                    {
                        "label": "初级工",
                        "value": 0
                    }
                ]
            },
            {
                "label": "用工类型",
                "content": [
                    {
                        "label": "职工",
                        "value": 0
                    },
                    {
                        "label": "短期合同职工",
                        "value": 0
                    },
                    {
                        "label": "支援集体职工",
                        "value": 0
                    },
                    {
                        "label": "劳务派遣用工",
                        "value": 0
                    },
                    {
                        "label": "农电用工",
                        "value": 0
                    },
                    {
                        "label": "非全日制用工",
                        "value": 0
                    },
                    {
                        "label": "其他从业人员",
                        "value": 0
                    }
                ]
            }
        ]
    },
    "recordsFiltered": 0
  },
  // 首页
  '/app/HumanResource/employee/overview': {
    "msg": "请求成功",
    "code": "0",
    "data": {
        "employeeIncreaseTotal": 11234,
        "employeeProductivityAll": 1324,
        "employeeTalentEquivalentDensity": 1234,
        "employeeCountTrend": [
            {
                "id": 1,
                "year": 2019,
                "month": 7,
                "employeeCount": 132414
            },
            {
                "id": 2,
                "year": 2019,
                "month": 6,
                "employeeCount": 234234
            },
            {
                "id": 3,
                "year": 2019,
                "month": 5,
                "employeeCount": 234
            },
            {
                "id": 4,
                "year": 2019,
                "month": 4,
                "employeeCount": 23424
            },
            {
                "id": 5,
                "year": 2019,
                "month": 3,
                "employeeCount": 234234
            },
            {
                "id": 6,
                "year": 2019,
                "month": 2,
                "employeeCount": 24234
            },
            {
                "id": 7,
                "year": 2019,
                "month": 1,
                "employeeCount": 234234
            },
            {
                "id": 8,
                "year": 2018,
                "month": 12,
                "employeeCount": 23423
            },
            {
                "id": 9,
                "year": 2018,
                "month": 11,
                "employeeCount": 234243
            }
        ],
        "employeeProductivityTrend": [
            {
                "id": 1,
                "year": 2019,
                "month": 7,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 1341
            },
            {
                "id": 2,
                "year": 2019,
                "month": 6,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 1349
            },
            {
                "id": 3,
                "year": 2019,
                "month": 5,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 1301
            },
            {
                "id": 4,
                "year": 2019,
                "month": 4,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 1341
            },
            {
                "id": 5,
                "year": 2019,
                "month": 3,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 1301
            },
            {
                "id": 6,
                "year": 2019,
                "month": 2,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 141
            },
            {
                "id": 7,
                "year": 2019,
                "month": 1,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 1941
            },
            {
                "id": 8,
                "year": 2018,
                "month": 12,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 1141
            },
            {
                "id": 9,
                "year": 2018,
                "month": 11,
                "employeeProductivityAll": 1324,
                "employeeProductivityStaff": 134,
                "employeeProductivityStaffOnPost": 841
            }
        ],
        "employeeProductivityStaffOnPost": 134123,
        "employeeHighSkilledPercentage": 1234,
        "employeeCount": 132414,
        "employeeProductivityStaff": 134,
        "employeeDecreaseTotal": 134,
        "employeeStructure": [
            {
                "label": "研究生及以上",
                "value": 134
            },
            {
                "label": "大学本科",
                "value": 134
            },
            {
                "label": "大学专科",
                "value": 134
            },
            {
                "label": "中等职业教育",
                "value": 134
            },
            {
                "label": "高中",
                "value": 1234
            },
            {
                "label": "初中及以下",
                "value": 1234
            }
        ]
    },
    "recordsFiltered": 0
  },
  '/purchase/init':{
    "code": 0,
    "resultMsg": "success",
    "data": {
      "channelName": "湖南三湘银行",
      "productName": "金慧存1号",
      "productRate": {
        "name": "测算年化利率",
        "value": "3.9875%"
      },
      "paymentAmountDesc": "10,000元起存，100元递增",
      "minInvestAmount": 10000,
      "increaseAmount": 100,
      "elecAccountNum": "5608",
      "availableBalance": 1762052.54,
      "availableDes": "1,762,052.54",
      "productState": 1,
      "stateDesc": "售卖中",
      "protocol": [
        {
          "name": "京东金融银行业开放平台服务协议",
          "url": "https://bankplus.jd.com/m-life/plaFinancingtran/protocol"
        },
        {
          "name": "京东金融银行业开放平台服务协议",
          "url": "https://bankplus.jd.com/m-life/plaFinancingtran/protocol"
        }
      ],
      "singleLimit": null,//单笔购买金额限制
      "beforeHandle": {
        "code": null,
        "desc": null
      }
    }
  },
  '/purchase/profit':{
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "expectedReturn": "到期可得收益<span>230.33</span>元，购买后可随时发起转让"
    }
  },
  '/purchase/createOrder': {
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "orderNum": "sx2019032609568978",
      "telephone": "188****2345"
    }
  },
  '/purchase/sendVerifyCode': {
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "smsVerifyId": "1234567890"
    }
  },
  '/purchase/submitOrder': {
    "resultCode": 0,
    "resultMsg": null,
    "resultData": {
      "status": "SUCCESS",
      "data": [
        {
          "desc": "成功购买210,000.00元",
          "tips": "银行处理可能有延迟，请关注资产变化"
        },
        {
          "desc": "可随时支取，按提前支取利率计息",
          "tips": "到账时间一般在24小时以内，实际到账时间以银行最终处理时间为准"
        }
      ],
      "banner": {
        "id": 133,
        "pool": [
          {
            "validityTimeBegin": 1539273600000,
            "id": 211,
            "sort": 3,
            "linkUrl": "https://bankplus.jd.com/mact/html/xcxjx1217/",
            "imageUrl": "http://img10.360buyimg.com/test/jfs/t1/5/2/834/2186829/5bc083ffE311244fd/3577d2b8502edf87.jpg",
            "cityName": "全国",
            "validityTimeEnd": 1605715200000,
            "h5ImageUrl": "//img10.360buyimg.com/test/jfs/t1/5/2/834/2186829/5bc083ffE311244fd/3577d2b8502edf87.jpg",
            "httpsImageUrl": "https://img10.360buyimg.com/test/jfs/t1/5/2/834/2186829/5bc083ffE311244fd/3577d2b8502edf87.jpg",
            "adName": "小程序拉新",
            "city": 0
          }
        ],
        "adpic": [],
        "timing": 3,
        "playingOrder": 1,
        "city": 0
      }
    }
  },
  '/order/detail':{
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "title": "转让中，可随时取消",
      "state": 1,
      "purchaseChannel": "转让平台",
      "channelId": "csx",
      "productId": "11111",
      "productType": "1",
      "channelName": "湖南三湘银行",
      "productName": "金慧存1号",
      "profitRateDesc": "年化储蓄利率",
      "profitRate": "3.9875%",
      "leftDayDesc": "产品期限",
      "leftDay": "3年",
      "investAmount": "20,000.00",//持有金额
      "latestIncome": "2.50",//当前收益
      "expectIncome": "1,382.00",//预估到期收益
      "interestStartDate": "2017.11.25",//计息日期
      "interestEndDate": "2020.11.25",//到期日期
      "transferValidDate": "03月21日 23:00",//转让有效期
      "transferEnableDate": "2017.11.26",//可转让日期
      "transferDate": "2017.11.26",//转让日期
      "originProductDesc": "存单年利率3.9875%",//原产品详情描述
      "redeemMethod": "提前支取或到期自动赎回到电子账户",//回款方式
      "redeemTips": "本产品回款由银行负责完成，资金预计在三个工作日内返回至您的银行电子账户，时间到账时间以银行最终处理时间为准。"//回款提示
    }
  },
  '/transfer/init':{
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "productState": 1,
      "stateDesc": "售卖中",
      "productType": "1",
      "channelName": "湖南三湘银行",
      "productName": "金慧存1号",
      "profitRateDesc": "年化储蓄利率",
      "profitRate": "3.9875%",
      "duration": "3年",//产品期限
      "remainDay": "837天",//剩余期限
      "elecAccountNum": "5608",//电子账户尾号
      "transferAmountDesc": "10,000元起，100元递增",
      "minTransferAmount": 10000,//最低转让金额
      "increaseAmount": 100,//递增金额
      "validTransferAmount": 20000,//可转让本金
      "transferTips": [
        "提交转让后，您的存单会在转让平台挂牌转让，若有用户购买您的存款，则转让成功，转让金额会在1个工作日内存入您的支付账户",
        "挂单转让时间为7天，到期若无人购买您的存单，则转让失效"
      ],
      "protocol": [
        {
          "name": "京东金融银行业开放平台服务协议",
          "url": "https://bankplus.jd.com/m-life/plaFinancingtran/protocol"
        },
        {
          "name": "京东金融银行业开放平台服务协议",
          "url": "https://bankplus.jd.com/m-life/plaFinancingtran/protocol"
        }
      ],
      "singleLimit": null,//单笔转让金额限制
      "remainLimit": 1000//部分转让留存金额限制
    }
  },
  "/transfer/accruedInterest":{
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "accruedInterest": "352.75",//待发利息(元)
      "transferCharge": "10.00"//转让手续费(元)
    }
  },
  "/transfer/createOrder": {
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "orderNum": "sx2019032609568978",
      "telephone": "188****2345"
    }
  },
  "/transfer/sendVerifyCode": {
    "resultCode": 0,
    "resultMsg": "",
    "resultData": {
      "smsVerifyId": "1234567890"
    }
  },
  "transfer/submitOrder": {
    "resultCode": 0,
    "resultMsg": null,
    "resultData": {
      "status": "SUCCESS",
      "data": [
        {
          "desc": "您的转让单已经在转让平台挂单成功，您可以随时取消转让。",
          "time": "2019-3-18 21：13：25"
        },
        {
          "desc": "转让有效期为7天，到期未成交则自动下架，您可以再次发起转让。",
          "time": "2019-3-25 22：00：00"
        }
      ],
      "banner": {
        "id": 133,
        "pool": [
          {
            "validityTimeBegin": 1539273600000,
            "id": 211,
            "sort": 3,
            "linkUrl": "https://bankplus.jd.com/mact/html/xcxjx1217/",
            "imageUrl": "http://img10.360buyimg.com/test/jfs/t1/5/2/834/2186829/5bc083ffE311244fd/3577d2b8502edf87.jpg",
            "cityName": "全国",
            "validityTimeEnd": 1605715200000,
            "h5ImageUrl": "//img10.360buyimg.com/test/jfs/t1/5/2/834/2186829/5bc083ffE311244fd/3577d2b8502edf87.jpg",
            "httpsImageUrl": "https://img10.360buyimg.com/test/jfs/t1/5/2/834/2186829/5bc083ffE311244fd/3577d2b8502edf87.jpg",
            "adName": "小程序拉新",
            "city": 0
          }
        ],
        "adpic": [],
        "timing": 3,
        "playingOrder": 1,
        "city": 0
      }
    }
  }
};

function ResData(url) {
  var key, data;
  for (key in MockData) {
    if (url.indexOf(key) > -1) {
      data = MockJS.mock(MockData[key]);
      break;
    }
  }
  return data;
}

module.exports = ResData;
