$(function() {
  // 左侧条形图
  var echarts_left = echarts.init(document.querySelector(".echarts_left"));

  // 指定图表的配置项和数据
  var option1 = {
    //大标题
    title: {
      // 标题文本
      text: "2018注册人数"
    },
    // 提示框组件，柱状图不用写参数
    tooltip: {},
    // 图例
    legend: {
      data: ["人数"]
    },
    // x轴
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴  柱状图y轴由数据决定，不需定义
    yAxis: {},
    series: [
      {
        name: "人数",
        // bar表示柱状图
        type: "bar",
        data: [1000, 1500, 1800, 1200, 1000, 500]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);

  //   右侧饼图
  var echarts_right = echarts.init(document.querySelector(".echarts_right"));
  option2 = {
    title: {
      text: "热门品牌销售",
      subtext: "2018年11月",
      x: "center",
      textStyle: {
        fontSize: 25,
        color: "#e92322"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["耐克", "阿迪", "阿迪王", "老北京", "老上海"]
    },
    series: [
      {
        name: "热门品牌", //系列名称
        type: "pie", //饼状图
        // 半径大小
        radius: "55%",
        // 圆心坐标
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "耐克" },
          { value: 310, name: "阿迪" },
          { value: 234, name: "阿迪王" },
          { value: 135, name: "老北京" },
          { value: 1548, name: "老上海" }
        ],
        //控制额外的阴影效果
        itemStyle: {
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
  echarts_right.setOption(option2);
});
