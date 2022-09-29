$(function(){
const layer = layui.layer
const form = layui.form

  $('#go2Reg').on('click',function(){
    $('.reg-warp').show()
    $('.login-warp').hide()
  })

  $('#go2Login').on('click',function(){
    $('.reg-warp').hide()
    $('.login-warp').show()
  })

// form.verify({
//   pwd: [
//     /^[\S]{6,12}$/
//     ,'密码必须6到12位，且不能出现空格'
//   ],
//   repwd: function(value){
//     const pwd = $('.reg-warp [name=password]').val()
//     if(value !==pwd){
//       return '两次密码不一致'
//     }
//   }
// })

form.verify({
  pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
  repwd: function(value){
    if($('.reg-warp [name=password]').val() !== value){
      return '两次密码不一致'
    }
  }
})

// 注册提交
// $('#reg-form').on('submit',function(e){
//   e.preventDefault()
//   const data = {username: $('#reg-form [name=username]').val(),
//    password: $('#reg-form [name=password]').val()}

//   $.post(`${baseUrl}/api/reguser`,data,function(res){
//     if(res.status !== 0) return layer.msg(res.message)
//     layer.msg(res.message)
//     $('#go2Login').click()
//   })
// })
$('#reg-form').on('submit',function(e){
  e.preventDefault()
  console.log(format2json($(this).serialize()));
  $.ajax({
    method: 'post',
    url: `/api/reg`,
    data: $(this).serialize(),
    success(res){
      if(res.code !==0){
        return layer.msg(res.message)
      }
      layer.msg('注册成功')
      $('#go2Login').click()
    }
    })
  })




// 登录提交
$('#login-form').submit(function(e){
  e.preventDefault()
  console.log($('#login-form').serialize());
  $.ajax({
    method: 'post',
    url: `/api/login`,
    data: $(this).serialize(),
    success(res){
      if(res.code !==0) return layer.msg('登录失败')
      layer.msg('登录成功')
      localStorage.setItem('big_news_token',res.token)
      location.href = '/index.html'

    }
  })
})

})