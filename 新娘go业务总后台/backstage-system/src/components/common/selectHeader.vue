<template>
    <div class="select-header color00">
        <!-- 上半部分————筛选title -->
        <div v-if="isSelect" class="select-title backgroundfff">
            <!-- title的文字 -->
            <div class="left-title">
                <div class="square24d8"></div>
                <span class="">{{title}}</span>
            </div>
            <!-- title的按钮 -->
            <div class="flexible-select">
                <div class="mr22" @click="openSelectBox">
                    <div>
                        <span v-if="isOpen">收起筛选</span><span v-else>展开筛选</span>
                    </div>
                    <div class="ml8">
                        <img v-if="isOpen" class="img20" src="@/assets/img/icon/selectUp.png" alt="">
                        <img v-else class="img20" src="@/assets/img/icon/selectDown.png" alt="">
                    </div>
                </div>
                <div v-if="hasAdvanced">
                    <my-button :isAdvanced="true" @advancedFn="advancedFn"></my-button>
                </div>
            </div>
        </div>
        <div v-if="isList" class="select-title2">
            <!-- title的文字 -->
            <div class="left-title">
                <div class="square24d8"></div>
                <span class="">{{title}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import myButton from '@/components/common/myButton';
export default {
    components:{
        myButton
    },
    props:{
        'title':{//列表title
            type:String,
            default:'筛选查询'
        },
        'isSelect':{
            type:Boolean,
            default:false
        },
        'isList':{
            type:Boolean,
            default:false
        },
        'hasAdvanced':{
            type:Boolean,
            default:false
        }
    },
    data () {
        return {
            isOpen:true //默认打开
        }
    },
    methods:{
        //展开或者收起筛选框
        openSelectBox(){
            let ths = this;

            ths.isOpen = !ths.isOpen;
            ths.$emit('openSelectBox',ths.isOpen)
        },
        //高级搜索
        advancedFn(){
            let ths = this;

            ths.$emit('advancedFn')
        }
    }
}
</script>
<style lang="scss" scoped>
.select-header{
    font-size: 18px;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // 上半部分-title
}
.select-title{
    border-bottom: 1px solid #e9eaed;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 22px;
}
.select-title2{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 22px;
}
.left-title{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    .square24d8{
        width: 24px;
        height: 24px;
        background: #d8d8d8;
        margin-right: 8px;
    }
}
.flexible-select{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    div{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
}

</style>
