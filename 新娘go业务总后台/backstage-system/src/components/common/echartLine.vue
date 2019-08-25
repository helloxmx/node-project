<template>
    <div id="myChart" ref="myChartRef" :style="{width: chartWidth, height: chartHeight}"></div>
</template>
<script>
export default {
    props:{
        'chartTitle':{
            type:String,
            default:'chartTitle'
        },
        'yData':{
            type:null,
            default:function(){
                return [820, 932, 901, 934, 1290, 1330, 1320]
            }
        },
        'xData':{
            type:null,
            default:function(){
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        },
        'themeColor':{
            type:String,
            default:'#FE6494'
        }
    },
    data(){
        return {
            chartWidth:'100%',
            chartHeight:'400px'
        }
    },
    mounted(){
        this.drawLine();
    },
    methods:{
        drawLine(){
        // 基于准备好的dom，初始化echarts实例
            // let myChart = this.$echarts.init(document.getElementById('myChart'))
            let ths = this;
            let myChart = ths.$echarts.init(ths.$refs.myChartRef);

            // 绘制图表
            myChart.setOption({
                title: {
                    text: ths.chartTitle
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ths.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: ths.yData,
                    type: 'line',
                    itemStyle:{
                        color:ths.themeColor
                    },
                    lineStyle:{
                        color:ths.themeColor
                    },
                    areaStyle: {
                        color:ths.themeColor,
                        opacity:0.3
                    }
                }],
                tooltip:{
                    show:true,
                    trigger:'axis',
                    axisPointer:{
                        type:'line',
                        label:{
                            show:true
                        },
                        lineStyle:{
                            color:ths.themeColor,
                            width:1,
                            type:'solid'
                        }
                    }
                }
            });
            window.onresize = function(){
                myChart.resize();
                //myChart1.resize();    //若有多个图表变动，可多写

            }
        }

    }
}
</script>
