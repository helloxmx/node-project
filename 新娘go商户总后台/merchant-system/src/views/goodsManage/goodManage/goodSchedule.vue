<template>
    <div class="pop-bg">
        <div class="bobm-box backgroundfff">
            <div class="box-title">
                <icons :isClose="true" @closeFn="closeFn"></icons>
            </div>
            <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                <el-form-item label="档期设置" prop="stockList" style="width:400px;">
                    <el-date-picker
                    v-model="stockList"
                    type="daterange"
                    align="right"
                    unlink-panels
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <div class="schedule-tip">该设置只对单品有效，当商户存在多规格货品时为不可编辑状态，展示档期取决于当前商品设置档期。</div>
                <el-form-item label="订单数" prop="stockValue" style="width:400px;">
                    <el-input clearable v-model="stockValue"></el-input>
                </el-form-item>
                <div class="schedule-tip">单日可接纳</div>
                <div class="advanced-btn">
                    <div>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm',ruleForm)">确定</el-button>
                    </div>
                </div>
            </el-form>
                <div class="doubleColumn">
                    <el-form-item label="推荐状态" prop="recommend">
                         <el-select v-model="ruleForm.recommend" :style="{width:formWidth}" placeholder="请选择">
                            <el-option v-for="item in recommendList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="advanced-btn">
                    <div>
                        <el-button type="primary" @click="submitForm(ruleForm)">开始检索</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import echartCalendar from '@/components/common/echartCalendar'
import api from '@/http/api';
export default {
    components:{
        echartCalendar
    },
    data() {
        return {
            ruleForm: {
                keyWord:'',//商品名称关键字
                type:'',//商品类型
                recommend:'',//是否推荐
                status:'',//是否上架
                name:''//商家名称
            },
            typeList:[],
            statusList:[
                {
                    id:null,
                    name:'全部'
                },
                {
                    id:'1',
                    name:'推荐'
                },
                {
                    id:'0',
                    name:'不推荐'
                }
            ],
            recommendList:[{
                id:null,
                name:'全部'
            },
            {
                id:'0',
                name:'上架'
            },
            {
                id:'1',
                name:'下架'
            }],
            formWidth:'210px'
        };
    },
    mounted(){
        let ths = this;

        ths.getTypeList();
    },
    methods: {
        //类型下拉列表数据
        getTypeList(){
            let ths = this;
            let params = {};

            api.getTypeList(params).then(res => {
                ths.typeList = res.data.data;
                let obj = {id:null,name:'全部'};

                ths.typeList.unshift(obj);
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        submitForm(formName) {
            let ths = this;

            ths.$emit('submitForm',formName)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        closeFn(){
            let ths = this;

            ths.$emit('closeFn')
        }
    }
}
</script>
<style lang="scss" scoped>
.bobm-box{
    padding: 36px;
    .box-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
        padding-bottom: 22px;
    }
}
.doubleColumn{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.advanced-btn{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
</style>
