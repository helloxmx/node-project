<template>
    <div class="pop-bg">
        <div class="bobm-box backgroundfff">
            <div class="box-title">
                <div>{{bobmTitle}}</div>
                <div><icons :isClose="true" @closeFn="closeFn"></icons></div>
            </div>
            <div v-if="hasBobmSecTitle" class="box-sec-title">{{bobmSecTitle}}</div>
            <el-form :model="ruleForm" :rules="rules" label-position="right" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="doubleColumn">
                    <div v-if="isInput">
                        <el-form-item :label="listTitle" prop="desc">
                            <el-input
                            style="width:400px"
                            :autosize="{ minRows: 5, maxRows: 10}"
                            type="textarea"
                            v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                    </div>
                    <div v-else>

                    </div>
                </div>
                <div class="advanced-btn">
                    <div>
                        <el-button @click="closeFn('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="submitForm(ruleForm)">确认</el-button>
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
    props:{
        bobmTitle:{
            type:String,
            default:'标题'
        },
        bobmSecTitle:{
            type:String,
            default:'副标题'
        },
        hasBobmSecTitle:{//是否含有副标题
            type:Boolean,
            default:false
        },
        isInput:{//是否含有输入框
            type:Boolean,
            default:false
        },
        bobmContent:{
            type:String,
            default:'内容'
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
        closeFn(formName){
            let ths = this;

            this.$refs[formName].resetFields();

            ths.$emit('closeFn')
        }
    }
}
</script>
<style lang="scss" scoped>
.pop-bg{
    min-height: 100vh;
}
.bobm-box{
    padding: 18px;
    .box-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 22px;
        font-size: 18px;
    }
    .box-sec-title{
        min-width: 400px;
        font-size: 14px;
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
    flex-direction: row-reverse;
    align-items: center;
}
</style>
