$.ajaxPrefilter(function (config) {
  const format2json = function (source) {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    // console.log(JSON.stringify(target));
    return JSON.stringify(target)
  }

  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  config.contentType = 'application/json'
  config.data = format2json(config.data)

})