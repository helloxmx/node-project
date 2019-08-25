<template>
<div>
    <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
    <div class="p22">
        <div class="set-box backgroundfff">
            <!-- <el-upload
            class="avatar-uploader"
            accept="image/*"
            action="//up.qbox.me/"
            :data="formData"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名">{{userName}}</el-form-item>
                <el-form-item label="旧密码" prop="everPass">
                    <el-input style="width:300px" v-model.number="ruleForm2.everPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input style="width:300px" type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input style="width:300px" type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-button style="margin:22px 0px 80px 100px" type="primary" @click="getAuthOrgMenus(ruleForm2,'ruleForm2')">提交</el-button>
        </div>
    </div>
</div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import api from '@/http/api'
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    components:{
        headerTitle
    },
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            imageUrl: '',
            formData: { // 存放获取到uptoken 和 key
                token: '', // 需要经过编译，并不是直接复制七牛账号里面的token
                key: '', // 这个key是文件资源的名称，key可以重命名上传的文件名，其他作用不太记得了
                config: {useCdnDomain: true, region: null}
            },
            ruleForm2: {
                pass: '',
                checkPass: '',
                everPass: ''
            },
            rules2: {
                everPass: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle','userName','userAvator'])
    },
    mounted(){
        let ths = this;

        api.getToken().then(res => { // 从后台获取七牛的token值，具有时效性
            ths.formData.token = res.data.token;
        });
    },
    methods: {
        getAuthOrgMenus(ruleForm2,formName){
            let ths = this;
            let params = {
                tk:ths.tk,
                pwd:ruleForm2.pass,
                oldpwd:ruleForm2.checkPass
            };

            api.getAuthOrgMenus(params).then(res => {
                ths.$message({
                    message: '修改成功',
                    type: 'success'
                });
                ths.$refs[formName].resetFields();
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        handleAvatarSuccess(res, file) {
            let ths = this

            ths.imageUrl = 'http://img.bridegoing.com/' + file.response.key
            //   this.cover = URL.createObjectURL(file.raw)
        
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/*';
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            // return isJPG && isLt2M;
            return isLt2M;
        }
    }
}
</script>
<style lang="scss" scoped>
.set-box{
    padding-top: 22px;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.avatar-uploader{
    margin:80px 0px 22px 100px;
    border: 1px solid #d9d9d9;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

