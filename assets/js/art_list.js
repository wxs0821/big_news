$(function(){
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage
  let qs = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  template.defaults.imports.dataFormat = function(time){
    const newTime = new Date(time)
    const year = newTime.getFullYear()
    const month = (newTime.getMonth()+1 +'').padStart(2,'0')
    const day = (newTime.getDate() +'').padStart(2,'0')
    const hours = (newTime.getHours() +'').padStart(2,'0')
    const min = (newTime.getMinutes() +'').padStart(2,'0')
    const sec = (newTime.getSeconds() +'').padStart(2,'0')
    return `${year}-${month}-${day} ${hours}-${min}-${sec}`
  }

  initTable()
  function initTable(){
    $.ajax({
      method: 'get',
      url: `/my/article/list?pagenum=${qs.pagenum}&pagesize=${qs.pagesize}&cate_id=${qs.cate_id}&state=${qs.state}`,
      success(res){
        if(res.code!==0) return layer.msg('获取文章列表失败')
        console.log(res.data);
        const htmlstr =  template('tbodyList',res)
        $('tbody').html(htmlstr)
        renderPage(res.total)
        console.log(res.total);
      }
    })
  }
  loadCateList()
  function loadCateList() {
    $.ajax({
      method: 'get',
      url: `/my/cate/list`,
      success(res) {
        if (res.code !== 0) {
          return layer.msg('获取列表失败')
        }
        console.log(res.data);
        const htmlstr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlstr)
        form.render()
      }
    })
  }
  $('#choose-form').on('submit',function(e){
    e.preventDefault()
    const cate_id = $('[name=cate_id]').val()
    const state = $('[name=state]').val()
    qs.cate_id = cate_id
    qs.state = state
    initTable()
  })

  function renderPage(total){
    laypage.render({
      elem:'pageBox',
      count: total,
      limit: qs.pagesize,
      curr: qs.pagenum,
      layout: ['prev','limit', 'page', 'next','skip'],
      limits: [2,5,8],
      jump: function(obj,first){
        // console.log(obj.cuur)
        qs.pagenum = obj.curr
        qs.pagesize = obj.limit
        if(!first){
          initTable()
        }
      }
    })
  }

    $('tbody').on('click','.btn-delete',function(){
      const re = confirm('您确定要删除嘛？')
      const len = $('.btn-delete').length
      if(re){
        const id = $(this).attr('delete-id')
        $.ajax({
          method: 'delete',
          url: `/my/article/info?id=${id}`,
          success(res) {
            if (res.code !== 0) {
              return layer.msg('删除文章失败')
            }
            layer.msg('删除文章成功')
            if(len ===1){
              qs.pagenum = qs.pagenum ===1 ? 1: qs.pagenum -1
            }
            initTable()

          }
        })
      }
    })
})