$(function () {


  // =====================================
  // netsells chart   
  // =====================================
  var netsells = {
    series: [
      {
        name: "",
        data: [0, 20, 15, 19, 14, 25, 32]
      },
      {
        name: "",
        data: [0, 12, 19, 13, 26, 16, 25]
      },
    ],
    chart: {
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 260,
      type: "line",
      toolbar: {
        show: false,
      },
      stacked: false
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
      borderColor: "var(--bs-border-color)",
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        },

      },
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
    },
    colors: ["#0085db", "#5AC8FA"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#6993ff"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      labels: {
        show: true,
      },
      type: 'category',
      categories: [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },

    },
    yaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (value) {
          return value + "k";
        }
      },
    },
    tooltip: {
      theme: "dark",
    },
  };
  new ApexCharts(document.querySelector("#netsells"), netsells).render();




  // =====================================
  // total-orders chart   
  // =====================================

  var total_orders = {
    series: [
      {
        name: "Last Year ",
        data: [29, 52, 38, 47, 56, 41, 46],
      },
      {
        name: "This Year ",
        data: [71, 71, 71, 71, 71, 71, 71],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: 150,
      stacked: true,
      foreColor: "#707a82",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 1,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    },
    colors: ["var(--bs-primary)", "#D9D9D9"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "26%",
        borderRadius: [3],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all'
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [["M"], ["T"], ["W"], ["T"], ["F"], ["S"], ["S"]],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      show: false,
    },
  };

  var chart_column_stacked = new ApexCharts(
    document.querySelector("#total-orders"),
    total_orders
  );
  chart_column_stacked.render();



  // =====================================
  // products chart   
  // =====================================


  var products = {
    color: "#adb5bd",
    series: [70, 18, 12],
    labels: ["2022", "2021", "2020"],
    chart: {
      height: 170,
      type: "donut",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '85%',
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ["var(--bs-primary)", "#FB977D", "#5AC8FA"],

    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  var chart = new ApexCharts(document.querySelector("#products"), products);
  chart.render();


  // =====================================
  // customers chart   
  // =====================================


  var options = {
    chart: {
      id: "customers",
      type: "area",
      height: 103,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: 'monthly earnings',
        color: "var(--bs-primary)",
        data: [25, 66, 20, 40, 12, 30],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.05,
        opacityTo: 0,
        stops: [20, 180],
      },
    },


    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#customers"), options).render();



  // -----------------------------------------------------------------------
  // world map
  // -----------------------------------------------------------------------
   


});