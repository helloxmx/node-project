<template>
<div class="business-detail">
    <!-- title按钮 -->
    <div class="parent-header">
        <div><header-title :isParent="false" :isBtns="true" :btns="btnsList" @btnFn="btnFn"></header-title></div>
    </div>
    <div class="step-item">
        <div class="step-content stepthree">
            <div class="content-form">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="手机号码" prop="name" style="width:400px;">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="婚礼日期">
                        <el-date-picker
                            v-model="form.registDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-date-picker
                            v-model="form.registDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
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
                    <el-form-item label="新密码" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="账户启用状态" prop="status" style="margin-right:22px;">
                        <el-switch v-model="ruleForm.status" @change="changeStatus" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                    </el-form-item>
                    <div class="sub-btn">
                        <el-button type="primary" @click="orderCancle(ruleForm,'ruleForm')">提交</el-button>
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
import api from '@/http/api';
export default {
    components:{headerTitle},
    data(){
        return {
            ruleForm: {
                name: '',
                region: '',
                type: [],
                resource: '',
                desc: ''
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
            }]
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
    },
    methods:{
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
        //修改用户简要信息
        getUserUserSummary(){
            let ths = this;
            let params = {
                tk:ths.tk,
                id:ths.xid
            };

            api.getUserUserSummary(params).then(res => {
                ths.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
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
