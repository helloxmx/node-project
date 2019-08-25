<template>
    <div>
        <echart-calendar></echart-calendar>
    </div>
</template>
<script>
import echartCalendar from '@/components/common/echartCalendar'
export default {
    components:{
        echartCalendar
    },
    data(){
        return {
            list:[{
                date: '2019-02-07',
                num: 2
            }]
        }
    }

}
</script>

