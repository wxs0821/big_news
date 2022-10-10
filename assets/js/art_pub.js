$(function(){
  const layer = layui.layer
  const form = layui.form

  initEditor()
  loadCateList()
  function loadCateList() {
    $.ajax({
      method: 'get',
      url: `http://big-event-vue-api-t.itheima.net/my/cate/list`,
      headers: {
        Authorization: localStorage.getItem('big_news_token')
      },
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

  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)
  
  $('#selectImage').on('click',function(){
    $('#file').click()
  })

  $('#file').on('change',function(e){
    console.log('ok')
    const files =  e.target.files
    if(files.length ===0){
      return layer.msg('请您选择图片')
    }
    const imgUrl = URL.createObjectURL(files[0])
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', imgUrl)  // 重新设置图片路径
   .cropper(options) 
  console.log(imgUrl);
  // 重新初始化裁剪区域
  })
  let state = '已发布'
  
  $('#btnSave2').on('click',function(){
    state = '草稿'
  })
  $('#formPub').on('submit',function(e){
    e.preventDefault()
    const fd = new FormData($(this)[0])
    fd.append('state',state)
    $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob)
    $.ajax({
      method: 'post',
      url: 'http://big-event-vue-api-t.itheima.net/my/article/add',
      data: fd,
          headers: {
            Authorization: localStorage.getItem('big_news_token')
          },
          // 固定的写法
          processData: false,
          contentType: false,
          success(res) {
            if (res.code !== 0) return layer.msg('发布文章失败了')
            layer.msg('发布文章成功了')
            location.href = '/article/art_list.html'
          }
    })
  })
})
})