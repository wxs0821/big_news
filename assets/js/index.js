let layer = layui.layer
$(function(){
getUserinfo()

})
function getUserinfo(){
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    success(res){
      if(res.code !== 0) return layer.msg(res.message)
      renderAvatar(res)
    }
  })
}
const renderAvatar = function(res){
  const name = res.data.nickname|| res.data.username
  if(res.data.user_pic){
    $('.user-text').hide()
    $('.user-box img').attr('src',res.data.user_pic).show()
  }else{
    $('.user-box img').hide()
    $('.user-text').html(name.charAt(0).toUpperCase()).show()
  }
  $('.text').html('欢迎&nbsp;&nbsp;'+name)
}
$('#btnLogOut').on('click',function(){
  const re = confirm('您确定要退出吗？')
  if(re){
    localStorage.removeItem('big_news_token')
    location.href = '/login.html'
  }
})