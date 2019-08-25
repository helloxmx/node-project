<template>
    <div>
        <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
        <div class="content">
            <div class="detail-article">
                <!-- 表单部分 -->
                <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="文章标题:" prop="title">
                    <el-input class="ipt" type="title" v-model="dataForm.title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图片:" prop="cover">
                        <el-form-item label="">
                          <!-- action="//up.qbox.me/" -->
                            <el-upload
                                ref="testpic"
                                class="upload-demo"
                                type="drag"
                                action="//up.qbox.me/"
                                :accept="accepts"
                                :before-upload="beforeAvatarUpload"
                                :on-remove="removeFile"
                                :on-success="handleAvatarSuccess"
                                :data="formData"
                                :limit='1'>
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                            </el-upload>
                        </el-form-item>
                    </el-form-item>
                    <div v-show="dataForm.cover !== ''&& dataForm.cover !== null" class="pub-cover">
                        <img :src="dataForm.cover" alt="">
                    </div>
                    <el-form-item label="文章分类："  prop="typeId">
                        <el-select v-model="dataForm.typeId" placeholder="选择分类" class="ipt">
                            <el-option label="全部" value="-1"></el-option>
                            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户ID："  prop="userId">
                            <el-input class="ipt" type="string"  v-model="dataForm.userId"></el-input>
                        </el-form-item>
                        <el-form-item label="初始点赞数："  prop="praiseNum">
                            <el-input class="ipt" type="number"  v-model="dataForm.praiseNum"></el-input>
                        </el-form-item>
                        <el-form-item label="初始收藏数："  prop="collectNum">
                            <el-input type="number" class="ipt" v-model="dataForm.collectNum"></el-input>
                        </el-form-item>
                        <el-form-item label="显示设置："  prop="showStatus">
                            <el-switch v-model="dataForm.showStatus"></el-switch>
                        </el-form-item>
                </el-form>
                <!-- 富文本编辑器 -->
                <editor v-if="hackReset" class="editor" :originContent="dataForm.content"></editor>
                <!-- 商品列表 -->
                <div class="commodity-box">
                    <div class="commodity-select">
                        <el-select
                        v-model="state4"
                        filterable
                        remote
                        reserve-keyword
                        :clearable = "true"
                        placeholder="请输入搜索关键词"
                        :remote-method="searchCommodity"
                        @change="handleSelect"
                        :loading="loading">
                        <el-option
                        v-for="item in commodities"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                        <span v-show="dataForm.commodityList.length < 5" @click="addCommodity">添加到列表</span>
                    </div>
                    <span class="tixing">温馨提醒:关键字输入请尽量精确</span>
                    <div class="commodity-list">
                        <div>商品列表</div>
                        <div class="single-item" v-for="item in dataForm.commodityList" :key="item.id">
                            <span @click="removeCommodity(item.id)">移除</span>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <!-- 提交 -->
                <div class='footer'>
                    <el-button class="btn" type="primary" @click="submitForm('dataForm')">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import editor from '@/components/editor'
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/http/api'
export default {
    name: 'publishArticles',
    components: {
        headerTitle,
        editor
    },
    data () {
        return {
            isBack: true, // 是返回还是刷新

            hackReset:true,
            xid:'',//编辑文章时的文章id

            typeList:[{id:-1,name:'全部'}],//文章分类 类型列表
            dataForm: {
                title: '', // 文章标题
                cover: '', // 封面图片地址
                typeId:'',//文章分类
                userId: '',//用户Id
                praiseNum:null,//初始点赞数
                collectNum:null,//初始收藏数
                showStatus: true, // 是否显示文章开关
                width: 0,//封面图的宽
                height: 0,//封面图的高
                commodityList:[],//商品信息
                id:'',//当编辑状态打开时的时候，有一个文章id
                pubTime:'2017-11-25 04:08',
                readTimes:36
            },
            rules:{//验证表单不可为空项
                title:[{required: true, message: '文章标题不能为空'}],
                cover:[{required: true, message: '封面图片不能为空'}],
                typeId:[{required: true, message: '请选择分类'}],
                userId:[{required: true, message: '用户ID不可为空'}]
            },

            actionPath: 'http://img.bridegoing.com/',
            loading: false,
            bucketHost: 'http://img.bridegoing.com/', // 上传图片的外链域名,公司申请的七牛空间地址
            formData: { // 存放获取到uptoken 和 key
                token: '', // 需要经过编译，并不是直接复制七牛账号里面的token
                key: 'test', // 这个key是文件资源的名称，key可以重命名上传的文件名，其他作用不太记得了
                config: {useCdnDomain: true, region: null}
            },
            accepts: 'image/jpeg, image/jpg, image/png, image/gif, application/zip, application/x-zip-compressed',// 运行上传图片和zip文件

            imgs:[],
            commodities: [],
            singleItem:{},
            state4: ''
        }
    },
    beforeMount (){
        let ths = this;
        
        ths.xid = ths.$route.query.xid || '';
        if (ths.xid !=='' && ths.xid !== null) {
            ths.getArticleDetail();//编辑状态
        }
    },
    mounted () {
        let ths = this
        
        api.getToken().then(res => { // 从后台获取七牛的token值，具有时效性
            ths.formData.token = res.data.token
        })
        ths.getArticleTypeList();//资讯文章类型下拉列表数据
    },
    computed:{
        ...mapGetters([
            'tk',//tk
            'headerChildTitle',//页面title
            'editorContent'//富文本编辑器内容
        ])
    },
    methods: {
        ...mapActions([
            'storeEditorContent'//存储富文本信息
        ]),
        //获取article详情
        getArticleDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getArticleDetail(params).then(res => {
                ths.dataForm = res.data.data;
                ths.dataForm.id = ths.xid;
                if (ths.dataForm.showStatus == 0) { //显示开关数据转换
                    ths.dataForm.showStatus = false;
                } else {
                    ths.dataForm.showStatus = true;
                }

            }).catch(e => {
                // alert(e.msg)
            })
        },
        //文章类型下拉列表数据
        getArticleTypeList(){
            let ths = this;
            let params = {};

            api.getArticleTypeList(params).then(res => {
                ths.typeList = res.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        // 封面图片上传前
        beforeAvatarUpload (file) { // 每次上传文件之前设置key,文件资源的名称
            let ths = this
            let timestamp = (new Date()).valueOf()

            ths.formData.key = timestamp
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            const isSize = new Promise(function (resolve, reject) {
                let myUrl = window.URL || window.webkitURL
                let img = new Image()

                img.onload = function () {
                    ths.dataForm.width = img.width
                    ths.dataForm.height = img.height
                    ths.dataForm.height ? resolve() : reject()
                }
                img.src = myUrl.createObjectURL(file)
            }).then(() => {
                return file
            }, () => {
                this.$message.error('上传的icon必须是等于或大于100*100!')
                return Promise.reject()
            })

            return isLt2M && isSize
        },
        // 封面图片上传成功
        handleAvatarSuccess (res, file) {
            let ths = this

            ths.dataForm.cover = 'http://img.bridegoing.com/' + file.response.key
            //   this.cover = URL.createObjectURL(file.raw)
        },
        // 移除图片
        removeFile (key) {
            let ths = this

            ths.dataForm.cover = ''
        },
        // 获取商品列表数据
        searchCommodity(commodityName) {
            let params = {
                commodityName:commodityName
            }

            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                api.searchCommodity(params).then((res) => {
                    this.commodities = res.data;
                    for ( let key in this.commodities) {

                        this.commodities[key].id = this.commodities[key].id.toString();
                    }
                }).catch((res) => {

                })
            }, 200);

        },
        //选择商品数据
        handleSelect(item) {
            let ths = this;

            for (let key in ths.commodities ) {
                if (item == ths.commodities[key].id) {
                    ths.singleItem = ths.commodities[key];
                }
            }
        },
        //添加选中商品
        addCommodity(){
            let ths = this;

            if (ths.state4 !=='' && ths.state4 !== null) {
                ths.dataForm.commodityList.push(ths.singleItem);
            } else {
                ths.$message.warning('请选择商品')
            }

            ths.singleItem = {};
            ths.state4 = '';
        },
        //移除选中商品
        removeCommodity(id){
            let ths = this;

            for (let key in ths.dataForm.commodityList) {
                if (ths.dataForm.commodityList[key].id === id){
                    ths.dataForm.commodityList.splice(key,1);//删除指定元素
                    ths.state4 = '';
                }
            }
        },
        //验证并提交数据
        submitForm (formName) {
            let ths = this

            if (ths.dataForm.title === '' || ths.dataForm.title === null) {
                this.$message('文章名称不能为空')
                return false
            }
            if (ths.dataForm.cover === '' || ths.dataForm.cover === null) {
                this.$message('封面图不能为空')
                return false
            }
            if (ths.dataForm.typeId === '' || ths.dataForm.typeId === null) {
                this.$message('文章分类不能为空')
                return false
            }
            if (ths.dataForm.userId === '' || ths.dataForm.userId === null) {
                this.$message('用户ID不能为空')
                return false
            }
            if (ths.dataForm.showStatus) {
                ths.dataForm.showStatus = 1 // 显示
            } else {
                ths.dataForm.showStatus = 0 // 不显示
            }

            ths.articleInsert(ths.dataForm);
        },

        articleInsert (data) {
            let ths = this
            let strList = ths.editorContent.match(/src="(.*?)"/g);//获取成对src里面的图片地址

            for (let key in strList){
                strList[key]= strList[key].match(/src="(\S*)"/)[1]//获取富文本编辑器内所有图片，存入数组，便于图片点击放大使用
            }
            let commodityList = [];

            for (let key in ths.dataForm.commodityList){ //取出所有商品的id
                commodityList.push(ths.dataForm.commodityList[key].id);
            }

            let params = {
                xid:ths.dataForm.id.toString(),//文章id
                tk: ths.tk, // 用户登录的token值
                title: data.title, // 文章标题
                cover: ths.dataForm.cover, // 封面图片封面图片
                typeId: data.typeId, // 文章分类,div中的ths.dataForm.type就是typeId
                showStatus: ths.dataForm.showStatus, // 是否显示
                userId: data.userId, // 用户ID
                content: ths.editorContent, // 内容
                width: ths.dataForm.width, // 图片的宽
                height: ths.dataForm.height, // 图片的高
                imgs:strList, //图片数组
                commodityList: commodityList, // 商品id列表
                collectNum: ths.dataForm.collectNum,
                praiseNum: ths.dataForm.praiseNum
            }

            api.articleInsert(params).then((res) => {
                this.$message('提交成功')
                ths.storeEditorContent('');//富文本数据存入vuex中,清空
                ths.$refs.dataForm.resetFields();//清空表单数据
                this.$refs.testpic.clearFiles();//清空已经上传图片
                ths.dataForm.width = 0;//宽恢复0
                ths.dataForm.height = 0;//高恢复0
                ths.dataForm.commodityList = [];//商品列表清空
                // window.location.reload();
                this.hackReset = false
                this.$nextTick(() => {
                    this.hackReset = true
                })
            }).catch((res) => {

            })
        }
    }

}
</script>
<style scope lang='scss'>
.content{
    position: relative;
    overflow-x: hidden;
    display: flex;
    .left-title{
        width:181px;
        height:624px;
        border:1px solid rgba(228, 228, 228, 1);
        border-right: 0;
        z-index:100;
        position: relative;
        .radius{
               width: 0;
                height: 0;
                position: absolute;
                left:181px;
                z-index: 100;
                border-top: 25px solid transparent;
                border-left: 19px solid #9da7b4;
                border-bottom: 25px solid transparent;
        }
        .title{
            background:#9da7b4;
            width:181px;
            height:50px;
            display: flex;
            align-items: center;
            margin-top:60px;
        }
        p{
            img{
                float:left;
                width:12px;
                height:16px;
                margin-left:20px;
                margin-right:10px;
            }
            margin:0;
            font-size:14px;
            color:#fff;
        }
    }
    .detail-article{
        background: #ffffff;
        flex:1;
        border:1px solid rgba(228, 228, 228, 1);
        position: relative;
        top: 0;
        left:0;
        .demo-ruleForm{
            margin-top:40px;
        }
        .ipt{
            width:400px;
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #FF739E;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.editor{
    margin:0px 22px;
}
.pub-cover{
    width: 200px;
    margin-left: 130px;
    margin-bottom: 22px;
    img{
        width: 100%;
    }
}
.upload-demo{
    width: 360px;
}
.commodity-box{
    margin: 22px;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    .commodity-select{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        span{
            margin-left: 20px;
            color:#FF739E;
            cursor: pointer;
        }
    }
    .commodity-list{
        margin-top:22px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        .single-item{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            padding: 6px 0px;
            span{
                color: red;
                margin-right: 12px;
                cursor: pointer;
            }
        }
    }
}
.btn,.footer{
      border-top:1px solid #ccc;
      margin:30px 30px 20px 30px ;
      position:relative
  }
.footer{
    display:flex;
    justify-content: center;
}
.tixing{
    margin-top: 20px;
    color: #cccccc;
}
</style>