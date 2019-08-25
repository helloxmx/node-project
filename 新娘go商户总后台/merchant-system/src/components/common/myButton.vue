<template>
    <div class="my-button">
        <!-- default -->
        <el-button v-if="isSearch" @click="searchFn">查询结果</el-button>
        <el-button v-if="isPub" @click="pubFn">发布资讯</el-button>
        <el-button v-if="isAddBus" @click="addBusFn">添加商户</el-button>
        <el-button v-if="isAdd" @click="addBusFn">添加</el-button>
        <el-button v-if="isAdvanced" @click="advancedFn">高级搜索</el-button>
        <el-button v-if="isAddBanner" @click="addBannerFn">添加Banner</el-button>
        <el-button v-if="isAddGood" @click="addGoodFn">添加商品</el-button>
        <el-button v-if="isAddCase" @click="addCaseFn">添加案例</el-button>
        <el-button v-if="isAddBanque" @click="addBanqueFn">添加宴会厅</el-button>
        <el-button v-if="isAddCook" @click="addCookFn">添加宴会菜单</el-button>
        <el-button v-if="isExportOrder" @click="exportOrderFn">导出订单</el-button>
        <!-- pink-line -->

        <!-- pink -->
    </div>
</template>
<script>
export default {
    props:{
        'isSearch':{
            type:Boolean,
            default:false
        },//查询结果
        'isPub':{
            type:Boolean,
            default:false
        },//发布资讯
        'isAddBus':{
            type:Boolean,
            default:false
        },//添加商户
        'isAdd':{
            type:Boolean,
            default:false
        },
        //高级搜索
        'isAdvanced':{
            type:Boolean,
            default:false
        },
        //导出订单
        'isExportOrder':{
            type:Boolean,
            default:false
        },
        //添加banner
        'isAddBanner':{
            type:Boolean,
            default:false
        },
        //添加商品
        'isAddGood':{
            type:Boolean,
            default:false
        },
        //添加案例
        'isAddCase':{
            type:Boolean,
            default:false
        },
        //添加宴会厅
        'isAddBanque':{
            type:Boolean,
            default:false
        },//添加宴会厅
        'isAddCook':{
            type:Boolean,
            default:false
        }
        // 'isClassify':{
        //     type:Boolean,
        //     default:false
        // }
    },
    data () {
        return {}
    },
    methods:{
        // 查询结果
        searchFn(){
            let ths = this;

            ths.$emit('searchFn');
        },
        //发布资讯
        pubFn(){
            let ths = this;

            ths.$emit('pubFn');
        },
        // 添加商户
        addBusFn(){
            let ths = this;

            ths.$emit('addBusFn');
        },
        // 添加
        addFn(){
            let ths = this;

            ths.$emit('addFn');
        },
        //高级搜索
        advancedFn(){
            let ths = this;

            ths.$emit('advancedFn');
        },
        //添加商品
        addGoodFn(){
            let ths = this;

            ths.$emit('addGoodFn');
        },
        //添加商品
        addCaseFn(){
            let ths = this;

            ths.$emit('addCaseFn');
        },
        //导出订单
        exportOrderFn(){
            let ths = this;

            ths.$emit('advancedFn');
        },
        //添加banner
        addBannerFn(){
            let ths = this;

            ths.$emit('addBannerFn');
        },
        //添加宴会厅
        addBanqueFn(){
            let ths = this;

            ths.$emit('addBanqueFn');
        },//添加宴会厅
        addCookFn(){
            let ths = this;

            ths.$emit('addCookFn');
        }

    }
}
</script>
<style lang="scss" scoped>

</style>
