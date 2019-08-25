<template>
<div>
    <div><header-title :isParent="false" :title="headerChildTitle" :hasback="true" @goBack="goBack"></header-title></div>
    <div class="add-box backgroundfff">
        <div class="progress-slider">
            <div class="slider sliderone">
                <div :class="{'circle':true,'circle-pink':true}">
                    <span v-if="!isStepOne">1</span>
                    <span v-else>√</span>
                </div>
                <div>选择商户类型</div>
            </div>
            <div :class="{'line':true,'line-gray':!isStepOne,'line-pink':isStepOne}"></div>
            <div class="slider slidertwo">
                <div :class="{'circle':true,'circle-gray':!isStepTwo,'circle-pink':isStepOne}">
                    <span v-if="!isStepTwo">2</span>
                        <span v-else>√</span>
                    </div>
                </div>
                <div>填写商户信息</div>
            <div :class="{'line':true,'line-gray':!isStepTwo,'line-pink':isStepTwo}"></div>
            <div class="slider sliderthree">
                <div :class="{'circle':true,'circle-gray':!isStepThree,'circle-pink':isStepTwo}">
                    <span v-if="!isStepThree">3</span>
                    <span v-else>√</span>
                </div>
                <div>填写商户属性</div>
            </div>
        </div>
        <div class="step-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <div v-if="!isStepOne" class="step-item">
                    <div class="step-content stepone">
                        <div class="content-title">1.选择商户类型</div>
                        <el-form-item label="商户类型" prop="business">
                            <el-select v-model="ruleForm.business" placeholder="请选择" @change="handleSelect">
                                <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div class="select-res">您当前选择的商户类型是：{{typeValue}}</div>
                    </div>
                    <div class="btn-Box">
                        <el-button :disabled="typeValue ==''" type="primary" @click="stepOneNext">下一步，填写商户信息</el-button>
                    </div>
                </div>
                <div v-if="isStepOne && !isStepTwo" class="step-item">
                    <div class="step-content steptwo">
                        <div class="content-title">1.基本信息</div>
                        <div class="content-form">
                                <el-form-item label="商户类型" prop="business">{{typeValue}}</el-form-item>
                                <el-form-item label="商户名称" prop="storeName" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.storeName"></el-input>
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
                                <el-form-item label="详细地址" label-width="158px" prop="address" style="width:400px;">
                                    <el-input disabled clearable v-model="ruleForm.address" placeholder="请搜索定位"></el-input>
                                </el-form-item>
                                <MapView @selectLocation="detailAddress"></MapView>
                                <el-form-item label="商户LOGO" prop="logo">
                                    <my-upload type='0'></my-upload>
                                    {{logoAddress.imgAddr}}
                                </el-form-item>
                                <el-form-item label="商户手机号" prop="tel" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.tel"></el-input>
                                </el-form-item>
                                <el-form-item label="商户登录密码" prop="password" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.password"></el-input>
                                </el-form-item>
                                <el-form-item label="再次输入密码" prop="checkPass" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.checkPass"></el-input>
                                </el-form-item>
                        </div>
                        <div class="content-title">2.其他信息</div>
                        <div class="content-form">
                            <el-form-item label="商家简介" prop="summary">
                               <editor class="editor"></editor>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="btn-Box">
                        <el-button type="primary" plain @click="stepTwoPre">上一步，选择商户类型</el-button>
                        <el-button
                        :disabled="!(ruleForm.storeName != '' && ruleForm.province != '' && ruleForm.city != '' && ruleForm.county != '' && ruleForm.address != '' && ruleForm.tel != '' && ruleForm.password != '' && ruleForm.checkPass != '')"
                        type="primary" @click="stepTwoNext">下一步，填写商户属性</el-button>
                    </div>
                </div>
                <div v-if="isStepOne && isStepTwo" class="step-item">
                    <div class="step-content stepthree">
                        <div class="content-title">1.重要属性</div>
                        <div class="content-form">
                            <!-- 1：金牌，2：银牌，3：普通 -->
                            <el-form-item label="商户等级" prop="level">
                                    <el-select v-model="ruleForm.level" placeholder="请选择">
                                        <el-option label="普通商户" value="3"></el-option>
                                        <el-option label="银牌商户" value="2"></el-option>
                                        <el-option label="金牌商户" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="营业执照" prop="license">
                                    <my-upload type='1'></my-upload>
                                    {{licenseAddress.imgAddr}}
                                </el-form-item>
                                <el-form-item label="企业类型" prop="type">
                                    <el-select v-model="ruleForm.type" placeholder="请选择">
                                        <el-option label="企业" value="0"></el-option>
                                        <el-option label="个人" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <div class="remaid-box">
                                    <el-form-item label="返佣比例" prop="remaidRatio" style="width:400px;">
                                        <el-input clearable v-model="ruleForm.remaidRatio" :rules="[{ required: true, message: '不能为空'},
                                            { type: 'number', message: '必须为数字值'}]"></el-input>
                                    </el-form-item>
                                    <span>%</span>
                                </div>
                                <el-form-item label="商户标签" prop="labels">
                                    <div class="list-input">
                                        <el-input clearable v-model="labelSingle" style="width:280px;"></el-input>
                                        <el-button type="primary" :disabled="isAdd" @click="addLabel(labelSingle)">添加</el-button>
                                    </div>
                                    <div class="label-list">
                                        <div class="label-item" v-for="(item,index) in ruleForm.labels" :key="index">
                                            <span>{{item}}</span>
                                            <span @click="removeLabel(index)">
                                                <img src="@/assets/img/icon/close.png" alt="">
                                            </span>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="商户封面" prop="cover" style="width:400px;">
                                    <my-upload type="2"></my-upload>
                                </el-form-item>
                        </div>
                    </div>
                    <div class="btn-Box">
                        <el-button type="primary" plain @click="stepThreePre">上一步，填写商户信息</el-button>
                        <el-button
                        :disabled="!(ruleForm.level != ''&&ruleForm.type !='' && ruleForm.remaidRatio!= ''&& ruleForm.labels != '')" type="primary"
                        @click="openConfirm('ruleForm')">完成，确认开户</el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import editor from '@/components/editor'//富文本编辑器
import myUpload from '@/components/common/myUpload'//上传按钮
import MapView from '@/components/Map.vue'
import api from '@/http/api';
export default {
    components:{
        headerTitle,
        editor,
        myUpload,
        MapView
    },
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            isStepOne:false,
            isStepTwo:false,
            isStepThree:false,
            typeList: [],//商户类型 第一步
            typeValue:'',//另外说明的被选定的商户类型
            provinceList:[],//省列表
            cityList:[],//市列表
            districtList: [],//区列表
            ruleForm: {
                business:'',//商户类型 第一步
                storeName:'',//商铺名称
                province:'',//省份
                city:'',//城市
                county:'',//区县
                address:'',//地址
                tel:'',//电话号码
                password:'',//密码
                checkPass:'',//再次输入密码
                summary:'',//简介
                level:'',//商家级别
                type:'',//0(商家)|1工作室|2 酒店
                remaidRatio:null,//返佣比例，N%
                labels:[],//关联的标签
                longitude:'',//经度
                latitude:'',//纬度
                cover:'',
                logo:'',
                license:''
            },
            address:'',
            rules: {
                business: [
                    { required: true, message: '请选择商户类型', trigger: 'change' }//数组
                ],//商户类型 第一步
                storeName: [
                    { required: true, message: '请输入商户名称', trigger: 'blur' }//input
                ],//商铺名称
                province:[
                    { required: true, message: '请选择省', trigger: 'change' }//数组
                ],//省份
                city:[
                    { required: true, message: '请选择市', trigger: 'change' }//数组
                ],//城市
                county:[
                    { required: true, message: '请选择区', trigger: 'change' }//数组
                ],//区县
                address:[
                    { required: true, message: '请输入详细地址', trigger: 'blur' }//input
                ],//地址
                tel: [
                    { required: true, message: '请输入商户手机号', trigger: 'blur' }//input
                ],//电话号码
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                summary: [
                    { required: true, message: '请输入商家简介', trigger: 'blur' }
                ],//简介
                cover: [
                    { required: true, message: '请上传封面', trigger: 'blur' }
                ],//简介
                logo: [
                    { required: true, message: '请上传商家logo', trigger: 'blur' }
                ],//简介
                license: [
                    { required: true, message: '请上传营业执照', trigger: 'blur' }
                ],//简介
                level:[
                    { required: true, message: '请选择商户等级', trigger: 'change' }//数组
                ],//商家级别
                type:[
                    { required: true, message: '请选择类型', trigger: 'change' }//数组
                ],//0(商家)|1工作室|2 酒店
                labels: [//关联的标签
                    { required: 'array', message: '请至少添加一个标签', trigger: 'change' }//数组
                ]
                // longitude:'',//经度
                // latitude:''//纬度
            },
            isAdd:false,//添加标签
            labelSingle:'',//标签
            tempArr:[]//临时存放数组
        }
    },
    computed:{
        ...mapGetters([
            'tk',
            'headerChildTitle',
            'editorContent',
            'logoAddress',
            'licenseAddress',
            'coverAddress'])
    },
    mounted(){
        let ths = this;

        ths.getTypeList();//获取商家类型

    },
    methods:{
        ...mapActions([
            'logoLink',//添加商户-上传logo地址
            'licenseLink',//添加商户-上传营业执照地址
            'coverLink',//添加商户-上传封面地址
            'changeChildTitle'//跳转到子页面title
        ]),
        //返回列表
        goBack(){
            let ths = this;

            // ths.$router.push({
            //     name: 'storeList',
            //     query: {}
            // })
            // ths.changeChildTitle('商户列表')//跳转的时候将header的值存入store中
        },
        //获取类型下拉列表数据 第一步
        getTypeList(){
            let ths = this;
            let params = {};

            api.getTypeList(params).then(res => {
                ths.typeList = res.data.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
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
        //获取详细地址信息及经纬度
        detailAddress(local){
            let ths = this;

            ths.ruleForm.address = local.address;//详细地址
            ths.ruleForm.longitude = local.lng;//经度
            ths.ruleForm.latitude = local.lat//纬度
        },
        // 第二步
        stepOneNext(){
            let ths = this;

            // if (ths.typeValue!=='') {
            ths.isStepOne = true;
            // } else {
            //     ths.$message.warning('请选择商家类型')
            //     return false
            // }

            ths.getRegionH5List();//获取省市信息
        },
        //返回第一步
        stepTwoPre(){
            let ths = this;

            ths.isStepOne = false;
            ths.isStepTwo = false;
        },
        //第三步
        stepTwoNext(){
            let ths = this;

            if (ths.editorContent == ''){
                ths.$message({
                    message: '请输入商户简介',
                    type: 'warning'
                });
                return false
            }
            if (ths.logoAddress.imgAddr && ths.logoAddress.imgAddr !=''){
                let a = {};
            } else {
                ths.$message({
                    message: '请上传商户logo',
                    type: 'warning'
                });
                return false
            }

            ths.isStepTwo = true;
        },
        //返回第二步
        stepThreePre(){
            let ths = this;

            ths.isStepTwo = false;
            ths.isStepThree = false;
        },
        //选择商户类型
        handleSelect(id){
            let ths = this;

            for (let key in ths.typeList) {
                if (id == ths.typeList[key].id ) {
                    ths.typeValue = ths.typeList[key].name;
                }
            }
        },
        //添加
        addLabel(value){
            let ths = this;

            if (value !== '' && value !== null ) {
                if (ths.ruleForm.labels.length < 3) {
                    if (ths.ruleForm.labels.length > 0) {
                        for (let key in ths.ruleForm.labels) {
                            if (ths.ruleForm.labels[key] == value) {
                                ths.$message.warning('已存在相同标签')
                            } else {
                                ths.ruleForm.labels.push(value);
                                ths.labelSingle = '';
                                break;
                            }
                        }
                    } else {
                        ths.ruleForm.labels.push(value);
                        ths.labelSingle = '';
                    }
                    // ths.ruleForm.labels.push(value);
                } else {
                    ths.isAdd = true;//按钮置灰，最多三条
                    ths.$message.warning('最多添加3条标签');
                    ths.labelSingle = '';
                }
            } else {
                ths.$message.warning('标签不能为空')
            }
        },
        //删除标签
        removeLabel(index){
            let ths = this;

            for (let key in ths.ruleForm.labels) {
                if (key == index) {
                    ths.ruleForm.labels.splice(index,1);
                    ths.isAdd = false;
                }
            }
        },
        //二次确认
        openConfirm(formName) {
            let ths = this;
            const h = this.$createElement;

            if (ths.licenseAddress.imgAddr && ths.licenseAddress.imgAddr !=''){
                let a = {};
            } else {
                ths.$message({
                    message: '请上传营业执照',
                    type: 'warning'
                });
                return false
            }
            if (ths.coverAddress.imgAddr && ths.coverAddress.imgAddr !=''){
                let a = {};
            } else {
                ths.$message({
                    message: '请上传商户封面',
                    type: 'warning'
                });
                return false
            }
            this.$msgbox({
                title: '是否确认',
                message: h('p', null, [
                    h('span', null, '提交所有内容 ')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') { //确定
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '提交中...';
                        ths.getStoreGenerate(formName);//提交
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 200);
                        }, 1000);
                    } else {
                        done();//取消
                    }
                }
            }).then(action => {
            });
        },
        //完成提交
        getStoreGenerate(formName){
            let ths = this;

            ths.isStepThree = true;
            let params = {
                tk:ths.tk,
                business:ths.ruleForm.business,//商户类型
                storeName:ths.ruleForm.storeName,//商铺名称
                province:ths.ruleForm.province,//省份
                city:ths.ruleForm.city,//城市
                county:ths.ruleForm.county,//区县
                address:ths.ruleForm.address,//地址
                tel:ths.ruleForm.tel,//电话号码
                password:ths.ruleForm.password,//密码
                summary:ths.editorContent,//简介
                level:ths.ruleForm.level,//商家级别
                type:ths.ruleForm.type,//0(商家)|1工作室|2 酒店
                remaidRatio:ths.ruleForm.remaidRatio,//返佣比例，N%
                labels:ths.ruleForm.labels,//关联的标签数组
                longitude:ths.ruleForm.longitude,//经度
                latitude:ths.ruleForm.latitude,//纬度
                width:ths.coverAddress.width,//封面宽度
                height:ths.coverAddress.height,//封面高度
                cover:ths.coverAddress.imgAddr,//封面
                logo:ths.logoAddress.imgAddr,//logo地址
                license:ths.licenseAddress.imgAddr//营业执照
            };

            api.getStoreGenerate(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });
                ths.logoLink({});//清空添加商户-上传logo地址
                ths.licenseLink({});//清空添加商户-上传营业执照地址
                ths.coverLink({});//清空商户-上传封面地址
                ths.$refs[formName].resetFields();//清空数据
                ths.$router.push({
                    name: 'storeList',
                    query: {}
                })
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
                    display: -webkit-flex;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding:8px 14px;
                    background: #f6f8fb;
                    margin-right: 30px;
                    border-radius: 6px;
                    span:first-child{
                        margin-right: 18px;
                    }
                    span{
                        img{
                            width: 18px;
                            display: -webkit-flex;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                        }
                    }

                }
            }
            .remaid-box{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                span{
                    padding: 10px 0px 0px 5px;
                }
            }
        }
    }

}
.row-flex{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
}
.finish{

}
</style>
