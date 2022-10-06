$(function(){
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    samePwd: function(value){
      if(value ===$('[name=old_pwd]').val()){
        return '与原密码一致'
      }
    },
    rePwd: function(value){
      if(value !==$('[name=new_pwd]').val()){
        return '与新密码不一致'
      }
    }
  })
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: '/my/updatepwd',
      data: form.val('userForm'),
      success(res){
        if(res.code !==0){
          return layer.msg('修改失败')
        }
        layer.msg('修改成功')
        $('.layui-form')[0].reset()
      }
    })
  })

})