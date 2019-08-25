<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form ref="ruleForm" :rules="rules" :model="ruleForm">
                    <el-form-item class="mr22" label="操作备注" prop="note">
                        <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6 }"
                        v-model="ruleForm.note"
                        :style="{width:formWidth}"
                        placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <div class="advanced-btn">
                        <div>
                            <el-button @click="closeFn">取消</el-button>
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
        'operateType':{
            type:String,
            default:''
        }
    },
    data() {
        return {
            ruleForm: {
                note:''//备注
            },
            rules: {
                note: [
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
            let obj = {};

            obj.note = ruleForm.note;
            obj.operateType = ths.operateType;
            ths.$emit('submitForm',obj)
        },
        reset(formName) {
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
        // padding-bottom: 22px;
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
