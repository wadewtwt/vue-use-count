<template>
  <div class="app">

    <router-link :to="'/user/umsUser/list'">
      <el-button  style="float: left; margin: 50px 50px" >
        返回
      </el-button>
    </router-link>

    <!--   热力图 https://blog.csdn.net/qq_33763827/article/details/110491488-->
    <!--    选择月-->
    <div class="wholeDiv">
      <div class="block" style="float: left; margin-left: 1%; margin-top: 100px; width: 400px">
        <span class="demonstration">请选择月份</span>
        <el-date-picker
          v-model="monthValue"
          type="month"
          value-format="yyyy-MM-dd"
          placeholder="选择月">
        </el-date-picker>
        <!--      月份热图-->
        <div id="monthEcharts" :style="{height: '300px', width:'400px', marginTop: '50px'}"></div>

        <p style="font-size: small; color: #99a9bf">ps:每隔10s记录</p>
      </div>

      <div style="float: left; width:1000px">
        <!--    选择日-->
        <div class="block" style="float: left; margin: 100px auto;">
          <span class="demonstration">请选择日期</span>
          <el-date-picker
            v-model="dayValue"
            type="date"

            placeholder="选择日期">
          </el-date-picker>
        </div>
        <!--    折线图-->
        <div  :style="{height: '400px',  margin: '150px auto'}">
          <div id="timeBatteryEcharts" :style="{height: '300px', width:'1000px'}"></div>
          <div id="timeTemperatureEcharts" :style="{height: '300px', width:'1000px'}"></div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts';


export default {
  data() {
    return {
      rootUrl: "",
      active: 0,
      dayValue: null,
      monthValue: '2024-05-20',
      temperatureList: [],
      uniqueCode: ''
    };
  },
  watch: {
    monthValue(newValue, oldValue){
      if (oldValue === ""){
        return
      }
      console.log("monthValue newValue:"+newValue+",oldValue:"+oldValue)
      let postForm= {
        "date": newValue,
        "uniqueCode": this.uniqueCode
      }
      // this.handleDuration(postForm)
    }
    // 同理变更日期
  },
  created() {
    this.uniqueCode = "xxx"
  },
  mounted() {
    let postForm= {
      "date": this.dayValue,
      "uniqueCode": this.uniqueCode
    }
    this.handleTemperatureBattery(postForm)

    let durationPostForm= {
      "date": this.monthValue,
      "uniqueCode": this.uniqueCode
    }
    this.handleDuration(durationPostForm)
  },
  methods:{

    handleDuration(durationPostForm){

      // $.get(this.rootUrl + '/data/asset/data/aqi-beijing.json', durationPostForm, function (res) {

      // 这个是后端返回的格式要求
        let durationRemoteResult = [
          [
            "2024-05-01",
            0
          ],
          [
            "2024-05-02",
            0
          ],
          [
            "2024-05-03",
            0
          ],
          [
            "2024-05-04",
            0
          ],
          [
            "2024-05-05",
            0
          ],
          [
            "2024-05-06",
            0
          ],
          [
            "2024-05-07",
            310
          ],
          [
            "2024-05-08",
            122
          ],
          [
            "2024-05-09",
            222
          ],
          [
            "2024-05-10",
            0
          ],
          [
            "2024-05-11",
            0
          ],
          [
            "2024-05-12",
            0
          ],
          [
            "2024-05-13",
            0
          ],
          [
            "2024-05-14",
            0
          ],
          [
            "2024-05-15",
            0
          ],
          [
            "2024-05-16",
            0
          ],
          [
            "2024-05-17",
            0
          ],
          [
            "2024-05-18",
            0
          ],
          [
            "2024-05-19",
            0
          ],
          [
            "2024-05-20",
            0
          ],
          [
            "2024-05-21",
            0
          ],
          [
            "2024-05-22",
            0
          ],
          [
            "2024-05-23",
            0
          ],
          [
            "2024-05-24",
            0
          ],
          [
            "2024-05-25",
            0
          ],
          [
            "2024-05-26",
            0
          ],
          [
            "2024-05-27",
            0
          ],
          [
            "2024-05-28",
            0
          ],
          [
            "2024-05-29",
            0
          ],
          [
            "2024-05-30",
            0
          ],
          [
            "2024-05-31",
            0
          ]
        ]
        console.log("durationRemoteResult is：")
        console.log(durationRemoteResult)

        if (durationRemoteResult.length === 0){
          this.$message({
            message: '根据【月份】拉取数据为空',
            type: 'warning'
          })
          this.destroyMonthChart()
          return
        }
        this.initMonthChart(durationRemoteResult);

      // })


    },
    handleTemperatureBattery(postForm){
      // $.get(this.rootUrl + '/data/asset/data/aqi-beijing.json', postForm, function (res) {
        let remoteResult = [
          // 返回数据
        ]
        console.log("remoteResult is：")
        console.log(remoteResult)

        if (remoteResult == null){
          this.$message({
            message: '根据【日期】拉取数据为空',
            type: 'warning'
          })
          this.destroyBatteryChart()
          this.destroyTemperatureChart()
          return
        }
        this.initTimeBatteryChart(remoteResult);
        this.initTimeTemperatureChart(remoteResult);
      // })
    },
    destroyMonthChart(){
      var chartDom = echarts.init(document.getElementById('monthEcharts'), null, {});
      chartDom.dispose()
    },
    initMonthChart(durationRemoteResult) {
      // 基于准备好的dom，初始化echarts实例
      var chartDom = echarts.init(document.getElementById('monthEcharts'), null, { });
      // 绘制图表
      let option = {
        tooltip: {
          position: "top",
          formatter: function (p) {
            var format = echarts.format.formatTime("yyyy-MM-dd", p.data[0]);
            return format + "<br/>" + " 上报次数: " + p.data[1] + "";
          },
        },
        visualMap: {
          min: 0, max: 1000, top: "left", show: false, width:'300px',
          inRange: {
            color: ["#f6f6f8", "#5291FF"],
          },
        },
        calendar: {
          width: 250, left: "5%", cellSize: [40, 40],
          dayLabel: {
            nameMap: "cn",
          },
          monthLabel: {
            margin: 20,
            nameMap: "cn",
          },
          yearLabel: {
            show: false,
          },
          orient: "vertical",
          // range: "2024-05",
          range: this.monthValue.substring(0, 7),
          itemStyle: {
            borderColor: "#ccc",
          },
          splitLine: {
            lineStyle: {
              width: 5,
              color: "#fff",
            },
          },
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 0,
            data: this.getVirtualData(2024),
            // data: durationRemoteResult,
            label: {
              show: true,
              formatter: function (params) {
                var number = Number(params.data[0].substring(8, 10));
                // console.log("number is:" + number)
                return number;
              },
            },
          },
        ],
      };
      chartDom && chartDom.setOption(option);
      chartDom.resize();
      let sizeFun = () => {
        chartDom.resize();
      };
      window.addEventListener("resize", sizeFun);
      // this.$once("hook:beforeDestroy", function () {
      //   echarts.dispose(chartDom);
      // });
    },
    // 获取月份热力图的数据
    getVirtualData(year) {
      // const date = +echarts.time.parse(year + '-01-01');
      const date = +echarts.time.parse('2024-05-01');
      // const end = +echarts.time.parse(+year + 1 + '-01-01');
      const end = +echarts.time.parse('2024-05-31');

      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 1000)
        ]);
      }
      return data;
    },
    // 销毁电池图表
    destroyBatteryChart(){
      var chartDom = echarts.init(document.getElementById('timeBatteryEcharts'), null, {});
      chartDom.dispose()
    },
    // 电池折线图
    initTimeBatteryChart(remoteResult) {
      let data = [
        {
          "time": "16:15:15",
          "temperature": 42.5,
          "batteryLevel": 92
        },
        {
          "time": "16:15:30",
          "temperature": 61.9,
          "batteryLevel": 90
        },
        {
          "time": "16:15:45",
          "temperature": 63.8,
          "batteryLevel": 100
        },
        {
          "time": "16:16:00",
          "temperature": 64.7,
          "batteryLevel": 80
        },
        {
          "time": "16:16:30",
          "temperature": 75.0,
          "batteryLevel": 100
        },
        {
          "time": "16:16:45",
          "temperature": 44.0,
          "batteryLevel": 100
        },
        {
          "time": "16:17:00",
          "temperature": 50.0,
          "batteryLevel": 100
        }
      ]

      var chartDom = echarts.init(document.getElementById('timeBatteryEcharts'), null, {});
      var option;

      chartDom.setOption(
        (option = {
          title: {
            text: '电池',
            left: '1%'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '15%',
            bottom: '10%',
          },
          xAxis: {
            data: data.map(function (item) {
              return item.time;
            })
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} %'
            },
            axisPointer: {
              snap: true
            }
          },
          toolbox: {
            right: 10,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            {startValue: '00:00:01'},
            {startValue: '23:59:59'},
            {type: 'inside'}
          ],
          visualMap: {
            top: 50,
            right: 10,
            color: ['#0987e0'],
          },
          series: {
            name: '',
            type: 'line',
            data: data.map(function (item) {
              return item.batteryLevel;
            }),
            markArea: {
              itemStyle: {
                color: 'rgba(65,229,111,0.4)'
              },
              // data: remoteResult.dayRangeChargeDTOS
              data: [
                [
                  {
                    name: '充电中',
                    xAxis: '12:00:00'
                  },
                  {
                    name: '充电中',
                    xAxis: '12:30:00'
                  }
                ],
                [
                  {
                    name: '充电中',
                    xAxis: '10:00:00'
                  },
                  {
                    name: '充电中',
                    xAxis: '10:10:00'
                  }
                ]
              ]
            }
          }
        })
      );

      option && chartDom.setOption(option);
    },
    // 销毁温度图表
    destroyTemperatureChart(){
      var chartDom = echarts.init(document.getElementById('timeTemperatureEcharts'), null, {});
      chartDom.dispose()
    },
    initTimeTemperatureChart(remoteResult) {
      let data = [
        {
          "time": "16:15:15",
          "temperature": 42.5,
          "batteryLevel": 92
        },
        {
          "time": "16:15:30",
          "temperature": 61.9,
          "batteryLevel": 90
        },
        {
          "time": "16:15:45",
          "temperature": 63.8,
          "batteryLevel": 100
        },
        {
          "time": "16:16:00",
          "temperature": 64.7,
          "batteryLevel": 80
        },
        {
          "time": "16:16:30",
          "temperature": 75.0,
          "batteryLevel": 100
        },
        {
          "time": "16:16:45",
          "temperature": 44.0,
          "batteryLevel": 100
        },
        {
          "time": "16:17:00",
          "temperature": 50.0,
          "batteryLevel": 100
        }
      ]

      var chartDom = echarts.init(document.getElementById('timeTemperatureEcharts'), null, {});
      var option;

      chartDom.setOption(
        (option = {
          title: {
            text: '温度',
            left: '1%'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '15%',
            bottom: '10%'
          },
          xAxis: {
            data: data.map(function (item) {
              return item.time;
            })
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            },
            axisPointer: {
              snap: true
            }
          },
          toolbox: {
            right: 10,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            {startValue: '00:00:15'},
            {startValue: '23:59:45'},
            {type: 'inside'}
          ],
          visualMap: {
            top: 50,
            right: 10,
            color: ['#f18463'],
          },
          series: {
            name: '',
            type: 'line',
            data: data.map(function (item) {
              return item.temperature;
            }),
            markArea: {
              itemStyle: {
                color: 'rgba(65,229,111,0.4)'
              },
              data: [
                [
                  {
                    "name": "充电中",
                    "xAxis": "16:15:15"
                  },
                  {
                    "name": "充电中",
                    "xAxis": "16:16:00"
                  }
                ],
                [
                  {
                    "name": "充电中",
                    "xAxis": "16:16:45"
                  },
                  {
                    "name": "充电中",
                    "xAxis": "16:17:00"
                  }
                ]
              ]
            }
          }
        })
      );

      option && chartDom.setOption(option);

    },
    getCurrentDate() {
      // 获取当前日期并格式化为 'YYYY-MM-DD' 格式
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // getMonth() 返回的月份是从0开始的
      const day = currentDate.getDate();
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} 00:00:00`;
    }
  },
}
</script>
