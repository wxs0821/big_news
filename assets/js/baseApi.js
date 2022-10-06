$.ajaxPrefilter(function (config) {
  const format2json = function (source) {
    let target = {}
    // console.log(source.split('&'));
    // console.log(source);
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = decodeURIComponent(kv[1])
      // target[kv[0]] = kv[1]
    })
    // console.log(JSON.stringify(target));
    return JSON.stringify(target)
  }

  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  config.contentType = 'application/json'
 
  config.data = config.data && format2json(config.data)


  if(config.url.includes('/my/')){
   config.headers = {
      Authorization: localStorage.getItem('big_news_token') || ''
    }
  }
  config.error = function(err){
    if(err.responseJSON?.code === 1 && err.responseJSON?.message === '身份认证失败！'){
      localStorage.removeItem('big_news_token')
      location.href = '/login.html'
    }
  }
  
})