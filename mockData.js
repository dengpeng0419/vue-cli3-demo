var MockJS = require('mockjs');

var MockData = {
  // 首页
  '/transfer1/init': {
    'resultCode': 0,
    'resultMsg': '',
    'resultData': {
      'position': {
        'investAmount|10000-100000.2': 1,
        'latestIncome|10-100.2': 1
      },
      'banner': {
        'pool|1-3': [{
          'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
          'h5ImageUrl': '@image("750x170", "#894FC4", "#FFF")',
        }]
      },
      "notice": {
        'icon': '',
        'canClose': '0',
        'contents|2-5': [{
          'name': '天府银行年化6.18%半年期理财限量抢！',
          'value': '//m.jd.com'
        }]
      },
      'channelList|10-19': [{
        'channelName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
        'channelIcon': function () {
          return 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/' + this.channelId + '.png'
        },
        'channelId|1': ['spdb', 'tfb', 'cmbc', 'bsb', 'bol', 'bon', 'nbcb', 'jnrc', 'cqfm', 'cjccb', 'bob', 'qlb', 'bodl'],
        'channelJdPin|+1': 1,
        'expertUid|+1': 1
      }],
      'productList|1-3': [{
        'interestRate_temp|1-8.2': 1,
        'channelId|1': ['tfb', 'spdb', 'bsb'],
        'productType|1': [0, 1],
        'productId|1-100': 1,
        'interestRate': function () {
          return this.interestRate_temp + '%';
        },
        'jumpVersion|0-1': 0,
        'productText': '财富走向 100天',
        'duration': '120天',
        'status|1': ['0', '1', '2', '3'],
        'tips|0-1': ['新手专享'],
        'channelName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
        'minInvestAmount|1-10': 1
      }]
    }
  },
  '/purchase/init':{
    "resultCode": 0,
    "resultMsg": "success",
    "resultData": {
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
