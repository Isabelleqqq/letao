$(function() {
  //使用表单插件验证
  $("#form").bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: "用户名不能为空"
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在2到6之间"
          }
        }
      },
      //校验密码，对应password表单的password属性
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: "密码不能为空"
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在6到12之间"
          }
        }
      }
    }
  });

  //禁止表单的自动提交，使用ajax发送请求验证表单内容
  //若验证成功，跳转至index页面，否则弹出错误信息
  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $("#form").serialize(),
      success: function(info) {
        if (info.success) {
          location.href = "index.html";
        } else {
          alert(info.message);
        }
      }
    });
  });
  //设置表单的重置功能，重置按钮只能重置内容，而不能重置样式
  //这里使用插件中的重置方法
  $('[type="reset"]').click(function() {
    $("#form")
      .data("bootstrapValidator")
      .resetForm();
  });
});
