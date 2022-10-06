$(function(){
  const layer = layui.layer

   // 1.1 获取裁剪区域的 DOM 元素
   var $image = $('#image')
   // 1.2 配置选项
   const options = {
     // 纵横比
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
   }
 
   // 1.3 创建裁剪区域
   $image.cropper(options)

   $('.layui-btn').on('click',function(){
    // id特殊
    file.click()
   })
   $('#file').on('change',function(e){
    const files = e.target.files
    if(files.length ===0){
      return layer.msg('请选择照片')
    }
    const imgUrl = URL.createObjectURL(files[0])
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', imgUrl)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
   })
})