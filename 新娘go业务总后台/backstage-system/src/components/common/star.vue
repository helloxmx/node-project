<template>
    <div>
        <i class="el-icon-star-on" style="color:#FF739E" v-for="item in starts" :key="item.key"></i><!--
        --><i class="el-icon-star-off" style="color:#FF739E" v-for="item in offstart" :key="item.key"></i>
    </div>
</template>
<script>
export default {
    props:{
        starts:{
            type:Number,
            default:3
        }
    },
    data(){
        return {
            offstart:''
        }
    },
    mounted(){
        let ths = this;

        ths.init();
    },
    methods:{
        init(){
            let ths = this;

            if (ths.starts !==null) {
                ths.offstart = 5 - ths.starts;//空星星
            } else {
                ths.offstart = 5;
            }
        }
    }
}
</script>
