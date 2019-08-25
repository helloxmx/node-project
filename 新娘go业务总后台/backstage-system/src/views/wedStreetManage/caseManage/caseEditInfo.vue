<template>
<div>
<div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
    <div class="add-box backgroundfff">
        <div class="step-box">
            <div class="step-item">
                <div class="step-content steptwo">
                    <div class="content-title">1.基本信息</div>
                    <div class="content-form">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                            <el-form-item label="案例分类">{{typeValue}}</el-form-item>
                            <el-form-item label="案例标题" prop="name" style="width:400px;">
                                <el-input clearable v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="封面图片" prop="name">
                                <my-upload></my-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="content-title">2.案例元素</div>
                    <div class="content-form">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                            <el-form-item label="风格" prop="style">
                                <el-radio-group v-model="ruleForm.style" @change="singleSelect">
                                    <el-radio v-for="item in styleList" :key="item.id" :label="item.name"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="颜色" prop="color">
                                <el-radio-group v-model="ruleForm.color" @change="singleSelect">
                                    <el-radio v-for="item in colorList" :key="item.id" :label="item.name"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="content-title">3.案例正文</div>
                    <div class="content-form">
                        <editor class="editor"></editor>
                    </div>
                </div>
                <div class="btn-Box">
                    <el-button type="primary" @click="submitFn">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import editor from '@/components/editor'//富文本编辑器
import myUpload from '@/components/common/myUpload'//上传按钮
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/http/api';
export default {
    components:{
        headerTitle,
        editor,
        myUpload
    },
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            styleList:[
                {
                    id:'1',
                    name:'经典'
                },{
                    id:'2',
                    name:'中式'
                },{
                    id:'3',
                    name:'教堂'
                },{
                    id:'4',
                    name:'海岛'
                },{
                    id:'5',
                    name:'草坪'
                },{
                    id:'6',
                    name:'森系'
                },{
                    id:'7',
                    name:'户外'
                },{
                    id:'8',
                    name:'酒店'
                },{
                    id:'9',
                    name:'梦幻'
                },{
                    id:'10',
                    name:'韩式'
                },{
                    id:'11',
                    name:'童话'
                },{
                    id:'12',
                    name:'复古'
                },{
                    id:'13',
                    name:'田园'
                },{
                    id:'14',
                    name:'其他'
                }
            ],//风格类型
            colorList: [
                {
                    id:'1',
                    name:'黑色'
                },
                {
                    id:'2',
                    name:'白色'
                },
                {
                    id:'3',
                    name:'红色'
                },
                {
                    id:'4',
                    name:'黄色'
                },
                {
                    id:'5',
                    name:'粉色'
                },
                {
                    id:'6',
                    name:'紫色'
                },
                {
                    id:'7',
                    name:'金色'
                },
                {
                    id:'8',
                    name:'绿色'
                },
                {
                    id:'9',
                    name:'银色'
                },
                {
                    id:'10',
                    name:'其他'
                }
            ],
            value: '',
            typeValue:'',//另外说明的被选定的商户类型
            provinceList:[],//省集合
            cityList:[],//市集合
            districtList: [],//区集合
            ruleForm: {
                name: '',
                summary:'',//商户简介
                type: [],
                style: '',//风格
                color:''
            },
            address:'',
            rules: {
                name: [
                    { required: true, message: '请输入商户名称', trigger: 'blur' }
                    // ,{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入商户电话', trigger: 'blur' }
                    // ,{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                    // ,{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                passwordConfirm:[{validator: validatePass, trigger: 'blur'}],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                style: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            isAdd:false,
            labelList:[],//标签数组
            tempArr:[],//临时存放数组
            giveData:{ //vue2.0将数据定位对象的形式，实现父子组件的通信
                height:300,
                longitude:116.404,
                latitude:39.915
            },
            giveOutData:{
                height:400,
                longitude:116.417854,
                latitude:39.921988
            }
        }
    },
    computed:{
        ...mapGetters(['headerTitle','headerChildTitle','tk'])
    },
    mounted(){
        let ths = this;

    },
    methods:{
        //风格类型
        singleSelect(key){
        },
        //提交
        submitFn(){
            let ths = this;

            ths.isStepTwo = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.add-box{
    padding: 22px;
    min-height: 100%;
}
//进度样式
.progress-slider{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    .slider{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        .circle{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            font-size: 16px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .circle-gray{
            border:1px solid #aaaaaa;
            color: #aaaaaa;
        }
        .circle-pink{
            color: #FE6494;
            border:1px solid #FE6494;
        }
    }
    .line{
        width: calc(50% - 280px);
        height: 1px;
        margin: 0px 16px ;
    }
    .line-gray{
        background:#aaaaaa;
    }
    .line-pink{
        background: #FE6494;
    }
}
//内容部分
.step-box{
    margin-top: 40px;
    .step-item{
    // 公共部分
        .step-content{
            .content-title{
                color: #000000;
                margin-bottom: 22px;
            }
        }
        .btn-Box{
            width: 100%;
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 22px;
        }
        // 单独部分
        //第一步
        .stepone{
            .select-res{
                margin-top: 22px;
            }
        }
        .steptwo{
            .content-form{
                margin-bottom: 22px;
            }
        }
        .stepthree{
            .list-input{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .label-list{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 22px;
                .label-item{
                    padding:8px 14px;
                    background: #f6f8fb;
                    margin-right: 30px;
                    border-radius: 6px;
                    span:first-child{
                        margin-right: 18px;
                    }
                }
            }
        }
    }

}
.finish{

}
</style>
