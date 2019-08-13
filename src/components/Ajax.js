import axios from 'axios'

const ajax = function (opts) {
  const FormData = Object.prototype.toString.call(opts.data) === '[object FormData]';
  const protocol = process.env.CODE_ENV !== 'development' && process.env.VUE_APP_API.indexOf('http') === -1 ? location.protocol : '';
  let apiDomain = opts.customUrl ? process.env.URL.static : process.env.VUE_APP_API;
  const defaults = {
    responseType: 'json',
    method: 'post',
    baseURL: process.env.CODE_ENV === 'development' ? '/' : protocol + apiDomain,
    url: '',
    data: {},
    timeout: 30000,
    // withCredentials: !(process.env.CODE_ENV === 'development'),
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    transformResponse: [function (data) {
      return data;
    }]
  };
  opts = Object.assign(defaults, opts);

  const callbackUrl = opts.callbackUrl || location.href;
  // source 报送
  let adtag = sessionStorage.getItem('ADTAG');
  if (adtag) {
    adtag = adtag.toLocaleUpperCase();
    if (!FormData) {
      opts.data.source = adtag;
    } else {
      opts.data.append('source', adtag);
    }
  }

  // 本地联调固定容器和jdpin
  if (process.env.CODE_ENV === 'debug') {
    if (!FormData) {
      opts.data.jdpin = 'dengpeng0419';
    } else {
      opts.data.append('jdpin', 'dengpeng0419');
    }
  }

  // container 报送
  if (!FormData) {
    opts.data.container = 'WEB';
  } else {
    opts.data.append('container', 'WEB')
  }

  // 设备信息报送
  let deviceInfo = sessionStorage.getItem('TRANSFERPLA_DEVICE_INFO');
  if (deviceInfo) {
    deviceInfo = JSON.parse(deviceInfo);
    if (!FormData) {
      opts.data = Object.assign({}, opts.data, deviceInfo);
    } else {
      for (let key in deviceInfo) {
        opts.data.append(key, deviceInfo[key]);
      }
    }
  }

  if (opts.type) {
    opts.method = opts.type;
    delete opts.type;
  }
  if (opts.dataType) {
    opts.responseType = opts.dataType;
    delete opts.dataType;
  }

  if (process.env.CODE_ENV !== 'production') {
    console.log(JSON.stringify(opts.data));
    console.log('%c' + opts.url, 'color: #207928');
  }

  return new Promise((resole, reject) => {
    axios(opts).then(res => {
      const json = res.data || {};

      if (process.env.CODE_ENV === 'development') {
        console.log(json);
      } else if (process.env.CODE_ENV !== 'production') {
        console.log(JSON.stringify(json, null, 2));
      }
      if (json.code === '0') {
        resole(json);
      }
      // 跳转实名
      else if (json.code === -4) {
        location.href = `${json.data.redirect}&directReturnUrl=${encodeURIComponent(callbackUrl)}`;
      }
      // 未登录
      else if (json.code === -5) {
        location.href = location.protocol + '//plogin.m.jd.com/user/login.action?appid=207&returnurl=' + encodeURIComponent(callbackUrl);
      }
      // 普通跳转
      else if (json.code === -6) {
        location.href = json.data.redirect;
      }
      // 失败
      else {
        const resultMsg = json.resultMsg || {};
        reject({
          code: resultMsg.code || '',
          msg: resultMsg.msg || '哎哟，出错了～'
        })
      }
    }).catch(err => {
      if (process.env.CODE_ENV !== 'production') {
        console.log(err.message);
      }
      const res = err.response || {};
      let msg = err.message ? err.message : (res.statusText || '');
      const code = res.status || '';

      if (err.code && err.code === 'ECONNABORTED') {
        msg = '系统在开小差，请稍后再试.';
      } else if (err.message === 'Network Error') {
        msg = '连接似乎有问题，请检查手机网络.';
      } 
      reject({
        code: code,
        msg: msg
      })
    })
  })
};

export default ajax;
