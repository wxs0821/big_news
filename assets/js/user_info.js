$(function(){
  const form = layui.form
  const layer = layui.layer
  form.verify({
    nickname: function(value){
      if(value.length>6) return '输入1-6个字符串'
    }
  })
  const initInfo = function(){
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success(res){
        if(res.code !== 0) return layer.msg('获取信息失败')
        console.log(res)
        form.val('userForm',res.data)
        },
        error(res){
          console.log(res)
      }
    })
  }
  initInfo()

  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initInfo()
  })

  $('.layui-form').submit(function(e){
    e.preventDefault()
    console.log(form.val('userForm'));
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data: form.val('userForm'),
      // data: $(this).serialize(),
      success(res){
        if(res.code !==0){
          return layer.msg('提交修改信息失败') 
        }
        // console.log(res);
        layer.msg('提交修改信息成功') 
        window.parent.getUserinfo()
      }
    })
  })
})