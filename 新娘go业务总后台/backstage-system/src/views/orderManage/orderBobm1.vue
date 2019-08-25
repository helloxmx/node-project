<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <div>{{bobmTitle}}</div>
                    <div><icons :isClose="true" @closeFn="closeFn"></icons></div>
                </div>
                <el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                    <div class="doubleColumn">
                        <el-form-item :label="listTitle" prop="desc">
                            <el-input
                            style="width:300px"
                            :autosize="{ minRows: 5, maxRows: 10}"
                            type="textarea"
                            v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                    </div>
                    <div class="advanced-btn">
                        <div>
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
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
    props:{
        bobmTitle:{
            type:String,
            default:'标题'
        },
        listTitle:{
            type:String,
            default:'内容标题'
        }
    },
    data() {
        return {
            ruleForm: {
                desc: ''
            },
            rules:{//验证表单不可为空项
                desc:[{required: true, message: '不能为空'}]
            }
        };
    },
    methods: {
        submitForm(formName) {
            let ths = this;

            ths.$emit('submitForm',formName.desc)
        },
        resetForm(formName) {
            let ths = this;

            this.$refs[formName].resetFields();
            ths.$emit('closeFn')
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
        font-size: 18px;
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
    flex-direction: row-reverse;
    align-items: center;
}
</style>
