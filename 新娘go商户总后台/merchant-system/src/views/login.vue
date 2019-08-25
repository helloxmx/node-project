<template>
    <div class="login">
        <div class="login-img">
            <img src="@/assets/img/loginBg.jpg" alt="">
        </div>
        <div class="login-box">
            <div class="logo">
                <img src="@/assets/img/icon/logo.png" alt="">
            </div>
            <div class="login-bg">
                <div class="login-title">
                    <div class="main-title">商户后台管理系统</div>
                    <div class="second-title">Business Management System</div>
                </div>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm">
                    <el-form-item prop="user">
                        <el-input clearable placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="ruleForm2.user" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="psw">
                        <el-input type="password" clearable placeholder="请输入密码" prefix-icon="el-icon-search" v-model="ruleForm2.psw" auto-complete="off" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width:100%" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/http/api';

export default {
    name: 'login',
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                if (this.ruleForm2.psw !== '') {
                    this.$refs.ruleForm2.validateField('psw');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };

        return {
            ruleForm2: {
                user: '',
                psw: ''
            },
            rules2: {
                user: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                psw: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        ...mapGetters(['tk'])
    },
    mounted(){
        localStorage.clear();
    },
    methods: {
        ...mapActions([
            'storeTk',//存储tk
            'storeBusiness',//存储商户类型
            'storeUserName',//存储用户名
            'storeUserAvator'//存储用户头像
        ]),
        submitForm(formName) {
            let ths = this;
            let params = {
                userName: this.ruleForm2.user.trim(),
                pwd: this.ruleForm2.psw.trim()
                // userName: '18058779975',
                // pwd: '123456'
            };

            api.login(params).then(res => {
                ths.storeTk(res.data.token);
                ths.storeBusiness(res.data.business);
                ths.storeUserName(res.data.name);
                ths.storeUserAvator(res.data.avator);
                this.$router.push({
                    name: 'index',
                    query: {
                        xid:res.data.userId
                    }
                })
            }).catch(e => {
                ths.$message({
                    message:'登录失败',
                    type: 'error'
                });
            })
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //     } else {
            //         return false;
            //     }
            // });
        }
    }
}
</script>
<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .login-img{
        width: 100%;
        height: 100%;
        img{
            width: 130%;
            margin-left: -15%;
        }
    }
    .login-box{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .logo{
            margin-bottom: 32px;
            img{
                width: 64px;
                height: 64px;
            }
        }
        .login-bg{
            width: 400px;
            height: 328px;
            padding: 40px 36px;
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.5);
            .login-title{
                color: #ffffff;
                text-align: center;
                margin-bottom: 32px;
                .main-title{
                    font-size: 24px;
                    margin-bottom: 8px;
                }
                .second-title{
                    font-size: 16px;
                }
            }

        }
    }
}
</style>
