<template>
    <div class="pop-bg">
        <div class="pop-inner-bg">
            <div class="bobm-box backgroundfff">
                <div class="box-title">
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                    <el-form-item class="mr22" label="成员账号" prop="name">
                        <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="请输入部门名称"></el-input>
                    </el-form-item>
                    <el-form-item class="mr22" label="成员姓名" prop="name">
                        <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="请输入部门名称"></el-input>
                    </el-form-item>
                    <el-form-item class="mr22" label="邮箱地址" prop="name">
                        <el-input v-model="ruleForm.name" :style="{width:formWidth}" placeholder="请输入部门名称"></el-input>
                    </el-form-item>
                    <el-form-item class="mr22" label="所属部门" prop="name">
                        <el-select v-model="ruleForm.xid" :style="{width:formWidth}" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.xid"
                            :label="item.name"
                            :value="item.xid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="mr22" label="登录密码" prop="pass">
                        <el-input v-model="ruleForm.pass" :style="{width:formWidth}" placeholder="请输入部门名称"></el-input>
                    </el-form-item>
                    <el-form-item class="mr22" label="确认密码" prop="checkPass">
                        <el-input v-model="ruleForm.checkPass" :style="{width:formWidth}" placeholder="请输入部门名称"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息" prop="note">
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
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/http/api';
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
            },//操作
            pass:{
                type:String,
                default:''
            },
            checkPass:{
                type:String,
                default:''
            }
        }
    },
    data() {
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
            options:[],
            rules: {
                name: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                note: [
                    { required: true, message: '请输入职能描述', trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            formWidth:'350px'
        };
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        this.getAuthOrgList();
    },
    methods: {
        //获取部门列表
        getAuthOrgList(){
            let ths = this;
            let params = {
                tk:ths.tk
            };

            api.getAuthOrgList(params).then(res => {
                ths.options = res.data;

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
