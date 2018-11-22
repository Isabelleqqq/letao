$(function() {
  // 一级分类管理
  var currentPage = 1;
  var pageSize = 5;
  // 发送ajax请求，得到一级分类列表信息，渲染页面
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        var htmlStr = template("firstTpl", info);
        $("tbody").html(htmlStr);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: 1, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function(a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    });
  }
});
