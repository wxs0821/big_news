$(function () {
  const layer = layui.layer
  const form = layui.form
  loadCateList()
  function loadCateList() {
    $.ajax({
      method: 'get',
      url: '/my/cate/list',
      success(res) {
        if (res.code !== 0) {
          return layer.msg('获取列表失败')
        }
        // console.log(res.data);
        const htmlstr = template('tpl-cate', res)
        $('tbody').html(htmlstr)
      }
    })
  }
  let index = null
  $('#btnAddCate').on('click', function () {
    isEdit = false
    index = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加分类',
      content: $('#AddCate').html()
    })
  })
  let isEdit = false
  $('body').on('submit', '#AddForm', function (e) {
    e.preventDefault()
    if (isEdit) {
      $.ajax({
        method: 'put',
        url: '/my/cate/info',
        // data: $(this).serialize(),
        data: form.val('AddForm'),
        success(res) {
          if (res.code !== 0) {
            return layer.msg('修改分类失败')
          }
          console.log(res.data);
          layer.msg('修改分类成功')
          loadCateList()
        }
      })
    } else {
      console.log(form.val('AddForm'));
      $.ajax({
        method: 'post',
        url: '/my/cate/add',
        // data: $(this).serialize(),
        data: form.val('AddForm'),
        success(res) {
          if (res.code !== 0) {
            return layer.msg('添加分类失败')
          }
          layer.msg('添加分类成功')
          loadCateList()
        }
      })
    }
    isEdit = false
    layer.close(index)
  })
  $('tbody').on('click', '.btn-edit', function () {
    isEdit = true
    index = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '修改分类',
      content: $('#AddCate').html()
    })

    const id = $(this).attr('data-id')
    $.ajax({
      method: 'get',
      url: `/my/cate/info?id=${id}`,
      success(res) {
        if (res.code !== 0) return layer.msg('回显失败')
        form.val('AddForm', res.data)
        // console.log(res.data);
      }
    })
  })
  $('tbody').on('click', '.btn-delete', function () {
    const re = confirm('确认删除吗')
    const id = $(this).attr('data-id')
    if (re) {
      $.ajax({
        method: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success(res) {
          if (res.code !== 0) return layer.msg('删除失败')
          layer.msg('删除成功')
          loadCateList()

        }
      })
    }

  })
})
