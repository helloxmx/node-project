<template>
    <div class="pop-bg">
        <div class="bobm-box backgroundfff">
            <div class="box-title">
                <icons :isClose="true" @closeFn="closeFn"></icons>
            </div>
            <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <div class="doubleColumn">
                    <el-form-item class="mr22" label="订单编号" prop="orderId">
                        <el-input v-model="ruleForm.orderId" :style="{width:formWidth}" placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                    <el-form-item label="商家名称" prop="storeName">
                        <el-input v-model="ruleForm.storeName" :style="{width:formWidth}" placeholder="请输入商家名称"></el-input>
                    </el-form-item>
                </div>
                <div class="doubleColumn">
                    <el-form-item class="mr22" label="订单状态" prop="status">
                        <el-select v-model="ruleForm.status" :style="{width:formWidth}" placeholder="请选择订单状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单类型" prop="type">
                        <el-select v-model="ruleForm.type" :style="{width:formWidth}" placeholder="请选择订单类型">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="doubleColumn">
                    <el-form-item class="mr22" label="收货人" prop="rUser">
                        <el-input v-model="ruleForm.rUser" :style="{width:formWidth}" placeholder="请输入收货人名称/手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="提交时间" prop="cTime">
                        <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                        v-model="ruleForm.cTime" :style="{width:formWidth}" placeholder="选择日期"></el-date-picker>
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
import icons from '@/components/common/icons';
export default {
    components:{
        icons
    },
    data() {
        return {
            options1:[{
                value:'0',
                label:'待付款'
            },{
                value:'1',
                label:'已付款待接订单'
            },{
                value:'2',
                label:'服务中'
            },{
                value:'3',
                label:'待操作退款'
            },{
                value:'4',
                label:'待处理提现'
            },{
                value:'5',
                label:'服务完待评价'
            },{
                value:'6',
                label:'服务完已评价'
            }],
            options2:[{
                value:'0',
                label:'酒店预订'
            },{
                value:'1',
                label:'婚礼策划'
            },{
                value:'2',
                label:'婚礼定制'
            },{
                value:'3',
                label:'婚礼司仪'
            },{
                value:'4',
                label:'婚礼摄影'
            }],
            ruleForm: {
                orderId: '',
                storeName: '',
                status:'',
                type:'',
                rUser:'',
                cTime:''
            },
            formWidth:'210px'
        };
    },
    methods: {
        submitForm(ruleForm) {
            let ths = this;
            
            ths.$emit('submitForm',ruleForm)
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
