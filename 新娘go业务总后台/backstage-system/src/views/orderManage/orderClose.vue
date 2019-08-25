<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <div class="title-left">关闭订单</div>
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form :model="ruleForm" label-position="left" ref="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
                    <el-form-item class="mr22" label="操作备注" prop="content">
                        <el-input
                        :autosize="{ minRows: 5, maxRows: 10}"
                        type="textarea" v-model="ruleForm.content"
                        :style="{width:formWidth}"
                        placeholder="请输入操作备注"></el-input>
                    </el-form-item>
                    <div class="advanced-btn">
                        <div>
                            <el-button @click="closeFn('ruleForm')">取消</el-button>
                            <el-button type="primary" @click="submitForm(ruleForm)">确认</el-button>
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
                content: ''
            },
            rules: {
                content: [
                    { required: true, message: '请输入操作备注', trigger: 'blur' }
                    // ,{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },

            formWidth:'400px'
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
    .box-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 22px;
        .title-left{
            font-size: 18px;
        }
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
