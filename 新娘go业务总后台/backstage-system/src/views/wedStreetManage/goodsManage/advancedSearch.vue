<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <div class="doubleColumn">
                        <el-form-item class="mr22" label="商品名称" prop="keyWord">
                            <el-input v-model="ruleForm.keyWord" :style="{width:formWidth}" placeholder="商品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="商家名称" prop="name">
                            <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="商家名称"></el-input>
                        </el-form-item>
                    </div>
                    <div class="doubleColumn">
                        <el-form-item class="mr22" label="商品分类" prop="type">
                            <el-select v-model="ruleForm.type" :style="{width:formWidth}" placeholder="请选择">
                                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上架状态" prop="status">
                            <el-select v-model="ruleForm.status" :style="{width:formWidth}" placeholder="请选择">
                                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
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
