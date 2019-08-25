<template>
<div class="business-detail">
    <!-- title按钮 -->
    <div class="parent-header">
        <div><header-title :isParent="false" :isBtns="true" :btns="btnsList" @btnFn="btnFn" :hasback="true"></header-title></div>
    </div>
    <div class="step-item backgroundfff p22">
        <div class="step-content stepthree">
            <div class="content-form">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="联系电话" prop="tel" :style="{width:midWidth}">
                        <el-input v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="商户地址">
                        <el-col :span="6">
                            <el-form-item label="省" label-width="38px" prop="province" >
                                <el-select v-model="ruleForm.province" placeholder="请选择" @change="selectCity">
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="市" label-width="38px" prop="city" >
                                <el-select v-model="ruleForm.city" placeholder="请选择" @change="getRegionList">
                                    <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="区" label-width="38px" prop="county" >
                                <el-select v-model="ruleForm.county" placeholder="请选择" @change="getDistrict">
                                    <el-option v-for="item in districtList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="商户地址" prop="address" :style="{width:LongWidth}">
                        <el-input v-model="ruleForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="返佣比例" prop="remaidRatio" :style="{width:midWidth}">
                        <el-input v-model="ruleForm.remaidRatio"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password" :style="{width:midWidth}">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="rePassword" :style="{width:midWidth}">
                        <el-input v-model="ruleForm.rePassword"></el-input>
                    </el-form-item>
                    <el-form-item label="商户简介" prop="summary" style="margin-right:22px;">
                        <editor class="editor"></editor>
                    </el-form-item>
                    <el-form-item label="账户启用" prop="status" style="margin-right:22px;">
                        <el-switch v-model="ruleForm.status" @change="changeStatus" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                    </el-form-item>
                    <div class="sub-btn">
                        <el-button type="primary" @click="getStoreUStore(ruleForm,'ruleForm')">提交</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import editor from '@/components/editor'//富文本编辑器
import api from '@/http/api';
export default {
    components:{headerTitle,editor},
    data(){
        return {
            xid:'',
            provinceList:[],
            cityList:[],
            districtList:[],
            status:'0',//账户状态是否开启初始值
            ruleForm: {
                tel: '',
                province: '',
                city: '',
                county:'',
                lat: '',
                log:'',
                address: '',
                summary: '',
                status: false,
                level: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                    // ,{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            btnsList:[{
                key:'storeDetail',
                name:'商户详情',
                autofocus:false
            },
            {
                key:'editInfo',
                name:'编辑资料',
                autofocus:true
            },
            {
                key:'loginLog',
                name:'登录日志',
                autofocus:false
            }],
            midWidth:'320px',
            LongWidth:'600px'
        }
    },
    computed:{
        ...mapGetters(['tk','editorContent'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getRegionH5List();//获取省市信息
    },
    methods:{
        ...mapActions([
            'storeEditorContent'//存储富文本信息
        ]),
        //商家详情  编辑资料  登录日志
        btnFn(name){
            let ths = this;

            switch (name) {
            case 'storeDetail':
                ths.$router.push({
                    name: 'storeDetail',
                    query: {
                        xid:ths.xid
                    }
                })
                break;
            case 'editInfo':
                ths.$router.push({
                    name: 'editInfo',
                    query: {
                        xid:ths.xid
                    }
                })
                break;
            case 'loginLog':
                ths.$router.push({
                    name: 'loginLog',
                    query: {
                        xid:ths.xid
                    }
                })
                break;
            default:
                break;
            }
        },
        //修改商铺简要信息
        getStoreUStore(ruleForm,formName){

            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid,
                tel:ruleForm.tel,
                province:ruleForm.province,
                city:ruleForm.city,
                county:ruleForm.county,
                level:ruleForm.level,
                lat:ruleForm.lat,
                log:ruleForm.log,
                address:ruleForm.address,
                summary:ths.editorContent,
                status:ths.status,
                password:ruleForm.password,
                rePassword:ruleForm.rePassword,
                remaidRatio:ruleForm.remaidRatio
            };

            api.getStoreUStore(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });
                ths.$refs[formName].resetFields();
                ths.storeEditorContent = ''
            }).catch(e => {
                ths.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        },
        //获取省市列表
        getRegionH5List(key){

            let ths = this;
            let params = key?{xid:key}:{};

            api.getRegionH5List(params).then(res => {
                let arr = res.data.data;

                if (key) {
                    ths.cityList = arr;
                } else {
                    ths.provinceList = arr;
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取区域列表
        getRegionList(key){

            let ths = this;
            let params = {
                xid:key
            };

            api.getRegionH5List(params).then(res => {
                ths.districtList = res.data.data;

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取城市列表
        selectCity(key){
            let ths = this;

            ths.getRegionH5List(key);//市
            ths.ruleForm.city = '';

        },
        //获取区域列表
        selectDistrict(key){
            let ths = this;

            ths.getRegionList(key);//区

        },
        getDistrict(key){
            let ths = this;

        },
        //启用账户状态
        changeStatus(key){
            let ths = this;

            if (key == true){
                ths.status = '1';
            } else {
                ths.status = '0';
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.step-item{
    // 公共部分
    .step-content{
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
    .stepthree{
        .content-form{
            .sub-btn{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
        }
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
</style>
