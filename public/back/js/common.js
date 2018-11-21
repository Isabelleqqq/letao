$(function() {
  // 1.进度条功能
  // 第一个ajax请求开始时开始进度条
  $(document).ajaxStart(function() {
    NProgress.start();
  });
  // 所有的ajax请求结束后关闭进度条
  $(document).ajaxStop(function() {
    setTimeout(function() {
      NProgress.done();
    }, 3000);
  });

  // 公共部分功能
  // 1.左侧二级菜单切换功能
  $("#category").click(function() {
    // 找下一个兄弟元素
    $(this)
      .next()
      .stop()
      .slideToggle();
  });
  // 2.左侧菜单切换功能
  $(".lt_topbar .icon_left").click(function() {
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
  });
  // 3.右侧公共退出功能
  $(".lt_topbar .icon_right").click(function() {
    $("#logoutModal").modal("show");
  });
  $("#logoutBtn").click(function() {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function(info) {
        if (info.success) {
          location.href = "login.html";
        }
      }
    });
  });
});
