<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                    <el-form-item class="mr22" label="部门名称" prop="name">
                        <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="请输入部门名称"></el-input>
                    </el-form-item>
                    <el-form-item label="职能描述" prop="note">
                        <el-input v-model="ruleForm.note" type="textarea" :autosize="{ minRows:4, maxRows: 5 }" :style="{width:formWidth}" placeholder="请输入职能描述"></el-input>
                    </el-form-item>
                    <div class="advanced-btn">
                        <div>
                            <el-button type="primary" @click="submitForm(ruleForm)">确定</el-button>
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
    props:{
        ruleForm: {
            name:{
                type:String,
                default:''//部门名称
            },
            note:{
                type:String,
                default:''
            }//操作
        }
    },
    data() {
        return {

            rules: {
                name: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                note: [
                    { required: true, message: '请输入职能描述', trigger: 'blur' }
                ]
            },
            formWidth:'350px'
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
