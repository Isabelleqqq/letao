$(function() {
  var currentPage = 1; //当前页
  var pageSize = 5; //每页条数
  var currentId; //当前编辑的用户id
  var isDelete; //当前用户状态
  //1. 一进入页面，发送ajax请求，获取用户列表信息，渲染到页面
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        // 使用模板引擎渲染用户页面
        var htmlStr = template("userTpl", info);
        $("tbody").html(htmlStr);
        // 根据后台返回的数据使用分页插件实现分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          //   只有点击页码才会触发该事件，所以render并不是循环执行，不会产生死递归
          onPageClicked: function(a, b, c, page) {
            //为页码绑定点击事件 page:当前点击的按钮值
            console.log(page);
            // 根据page请求数据重新渲染
            currentPage = page;
            render();
          }
        });
      }
    });
  }
  //2.点击启用禁用按钮弹出模态框（事件委托）
  $("tbody").on("click", ".btn", function() {
    // console.log("使用事件委托批量创建事件");
    $("#userModal").modal("show");
    // 获取用户id
    currentId = $(this)
      .parent()
      .data("id");
    // 获取需要修改的状态
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });
  //   3.给模态框确认按钮添加点击事件，发送ajax请求修改状态然后重新渲染页面
  $("#submitBtn").click(function() {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function(info) {
        // console.log(info);
        if (info.success) {
          $("#userModal").modal("hide");
          render();
        }
      }
    });
  });
});
