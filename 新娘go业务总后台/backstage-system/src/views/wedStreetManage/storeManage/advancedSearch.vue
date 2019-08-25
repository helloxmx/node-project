<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                    <div class="doubleColumn">
                        <el-form-item label="商户账号" prop="xid">
                            <el-input clearable v-model="ruleForm.xid" :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                        </el-form-item>
                        <el-form-item label="商户名称" prop="name">
                            <el-input clearable v-model="ruleForm.name" :style="{width:formWidth}" placeholder="商户名称"></el-input>
                        </el-form-item>
                        </div>
                    <div class="doubleColumn">
                    <el-form-item label="开户时间">
                            <el-form-item prop="xTime">
                                <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                                v-model="ruleForm.xTime" :style="{width:formWidth}" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="商户类型" prop="type">
                            <el-select v-model="ruleForm.type" :style="{width:formWidth}" placeholder="请选择">
                                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="doubleColumn">
                        <el-form-item label="账户类型" prop="status">
                            <el-select v-model="ruleForm.status" :style="{width:formWidth}" placeholder="请选择">
                                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="advanced-btn">
                        <div>
                            <el-button type="primary" @click="submitForm('ruleForm',ruleForm)">开始检索</el-button>
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
import api from '@/http/api';
export default {
    components:{
        icons
    },
    data() {
        return {
            formWidth:'210px',
            typeList:[],//商户类型
            statusList:[{//账户类型
                id:null,
                name:'全部'
            },{
                id:0,
                name:'开启'
            },{
                id:1,
                name:'未开启'
            }],
            ruleForm: {
                xid:'',//商户账号
                name: '',//商户名称
                type: '',//商户类型
                xTime: '',//开户时间
                status:''//账户状态
            },
            rules: {
                // name: [
                //     { required: true, message: '请输入活动名称', trigger: 'blur' },
                //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                // ],
                // typeList: [
                //     { required: true, message: '请选择活动区域', trigger: 'change' }
                // ],
                // date1: [
                //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                // ],
                // date2: [
                //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                // ],
                // type: [
                //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                // ],
                // resource: [
                //     { required: true, message: '请选择活动资源', trigger: 'change' }
                // ],
                // desc: [
                //     { required: true, message: '请填写活动形式', trigger: 'blur' }
                // ]
            }
        };
    },
    mounted(){
        let ths = this;

        ths.getTypeList();//类型下拉列表数据
    },
    methods: {
        submitForm(ref,formName) {
            let ths = this;

            ths.$emit('submitForm',formName);
            ths.$emit('closeFn');
            ths.resetForm('ruleForm');//关闭时清空数据
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //类型下拉列表数据
        getTypeList(){
            let ths = this;
            let params = {};

            api.getTypeList(params).then(res => {
                ths.typeList = res.data.data;
                let obj = {id:-1,name:'全部'};

                ths.typeList.unshift(obj);
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        closeFn(){
            let ths = this;

            ths.resetForm('ruleForm');//关闭时清空数据
            ths.$emit('closeFn');

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
