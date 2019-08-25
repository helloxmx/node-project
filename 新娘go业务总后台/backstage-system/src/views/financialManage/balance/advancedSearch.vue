<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <div class="doubleColumn">
                        <el-form-item class="mr22" label="订单编号" prop="xid">
                            <el-input v-model="ruleForm.xid" :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                        </el-form-item>
                        <el-form-item label="金额范围" prop="money">
                            <el-select v-model="ruleForm.money" :style="{width:formWidth}" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="doubleColumn">
                        <el-form-item class="mr22" label="支付方式" prop="payChannel">
                        <el-select v-model="ruleForm.money" :style="{width:formWidth}" placeholder="请选择">
                                <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="支付时间" prop="day">
                            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                            v-model="ruleForm.day" :style="{width:formWidth}" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="doubleColumn">
                        <el-form-item label="对账状态" prop="status">
                            <el-select v-model="ruleForm.status" :style="{width:formWidth}" placeholder="请选择分类">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="对账时间" prop="cTime">
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
            ruleForm: {
                xid:'',//订单编号
                money:'',//金额
                status:'',//对账状态
                payChannel:'',//支付方式
                day:'',// 支付时间
                cTime:''// 对账时间
            },
            options1: [ //金额范围1 100以下 2 100至200 以此类推
                {
                    value: null,
                    label: '全部'
                },{
                    value: '1',
                    label: '100元以下'
                },{
                    value: '2',
                    label: '100-200元'
                },{
                    value: '3',
                    label: '200-500元'
                },{
                    value: '4',
                    label: '500-1000元'
                },{
                    value: '5',
                    label: '1000元以上'
                }
            ],
            options2: [ // 0未对账 1已经对账 2异常 3已冲正
                {
                    value: null,
                    label: '全部'
                }, {
                    value: '0',
                    label: '未对账'
                }, {
                    value: '1',
                    label: '已对账'
                }, {
                    value: '2',
                    label: '异常'
                }, {
                    value: '3',
                    label: '已冲正'
                }
            ],
            options3: [ // 0未支付 1支付宝 2 微信 3金币余额
                {
                    value: null,
                    label: '全部'
                }, {
                    value: '0',
                    label: '未支付'
                }, {
                    value: '1',
                    label: '支付宝'
                }, {
                    value: '2',
                    label: '微信'
                }, {
                    value: '3',
                    label: '金币余额'
                }
            ],

            formWidth:'210px'
        };
    },
    methods: {
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
