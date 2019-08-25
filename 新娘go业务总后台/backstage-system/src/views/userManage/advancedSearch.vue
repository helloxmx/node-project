<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <div class="doubleColumn">
                        <el-form-item class="mr22" label="商品名称" prop="name">
                            <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                        </el-form-item>
                        <el-form-item label="商家名称" prop="name">
                            <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="用户昵称"></el-input>
                        </el-form-item>
                    </div>
                    <div class="doubleColumn">
                        <el-form-item class="mr22" label="商品分类" prop="name">
                            <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="用户昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="上架状态" prop="name">
                            <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="全部"></el-input>
                        </el-form-item>
                    </div>
                    <div class="doubleColumn">
                        <el-form-item label="推荐状态" prop="name">
                            <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="全部"></el-input>
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
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
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
