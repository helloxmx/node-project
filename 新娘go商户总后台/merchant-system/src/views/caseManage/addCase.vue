<template>
<div>
    <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
    <div class="add-box backgroundfff">
        <div class="step-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <div class="step-content">
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>基本信息</div>
                    </div>
                    <el-form-item label="案例标题" prop="title" style="width:400px;">
                        <el-input clearable v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图片" prop="cover">
                        <my-upload type='2' :fileUrl=ruleForm.cover></my-upload>
                    </el-form-item>
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>案例元素</div>
                    </div>
                    <el-form-item label="风格" prop="categoryId">
                        <el-radio-group v-model="ruleForm.categoryId" @change="test1">
                            <el-radio v-for="item in radioList1" :key="item.label" :label="item.label">{{item.value}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="颜色" prop="colorId">
                        <el-radio-group v-model="ruleForm.colorId" @change="test2">
                            <el-radio v-for="item in radioList2" :key="item.label" :label="item.label">{{item.value}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>案例正文</div>
                    </div>
                    <el-form-item label="案例正文" prop="description">
                        <editor class="editor" :originContent="editorContent"></editor>
                    </el-form-item>
                </div>
            </el-form>
            <div class="btn-Box">
                <el-button @click="openConfirm('ruleForm')">完成，提交案例</el-button>
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
        return {
            radioList1:[
                {
                    label:'1',
                    value:'经典'
                },
                {
                    label:'2',
                    value:'中式'
                },
                {
                    label:'3',
                    value:'教堂'
                },
                {
                    label:'4',
                    value:'海岛'
                },
                {
                    label:'5',
                    value:'草坪'
                },
                {
                    label:'6',
                    value:'森系'
                },
                {
                    label:'7',
                    value:'户外'
                },
                {
                    label:'8',
                    value:'酒店'
                },
                {
                    label:'9',
                    value:'梦幻'
                },
                {
                    label:'10',
                    value:'韩式'
                },
                {
                    label:'11',
                    value:'童话'
                },
                {
                    label:'12',
                    value:'复古'
                },
                {
                    label:'13',
                    value:'摩登'
                },
                {
                    label:'14',
                    value:'田园'
                },
                {
                    label:'15',
                    value:'古堡'
                },
                {
                    label:'16',
                    value:'奢华'
                },
                {
                    label:'17',
                    value:'个性'
                },
                {
                    label:'18',
                    value:'简约'
                },
                {
                    label:'19',
                    value:'特殊'
                }
            ],
            radioList2:[
                {
                    label:'1',
                    value:'蓝色'
                },
                {
                    label:'2',
                    value:'红色'
                },
                {
                    label:'3',
                    value:'绿色'
                },
                {
                    label:'4',
                    value:'黄色'
                },
                {
                    label:'5',
                    value:'白色'
                },
                {
                    label:'6',
                    value:'粉色'
                },
                {
                    label:'7',
                    value:'紫色'
                },
                {
                    label:'8',
                    value:'黑色'
                },
                {
                    label:'9',
                    value:'金色'
                },
                {
                    label:'10',
                    value:'银色'
                },
                {
                    label:'11',
                    value:'橘黄色'
                },
                {
                    label:'12',
                    value:'特殊'
                }
            ],
            ruleForm: {
                id:'',
                cover:'',
                categoryId: '',//风格
                colorId:'',//颜色
                title: ''
            },
            address:'',
            rules: {
                title: [
                    { required: true, message: '请输入案例标题', trigger: 'blur' }
                ],
                cover: [
                    { required: true, message: '请输入案例封面', trigger: 'blur' }
                ],
                categoryId: [
                    { required: true, message: '请选择案例风格元素', trigger: 'blur' }
                ],
                colorId: [
                    { required: true, message: '请选择案例颜色元素', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入案例正文', trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        ...mapGetters([
            'tk',
            'headerTitle',
            'headerChildTitle',
            'business',
            'editorContent',//富文本
            'editorImgs',//富文本图片集合
            'coverAddress'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid || '';
        if (ths.xid !='') {
            ths.getStoreWorkDetail();
        } else {
            ths.storeEditorContent('')//清空富文本信息
        }
    },
    methods:{
        ...mapActions([
            'coverLink',//添加商品-上传封面地址
            'storeEditorContent',//存储富文本信息
            'storeEditorImgs',//储存图片数组
            'changeChildTitle'//存储跳转标题
        ]),
        test1(value){
            // console.log(this.ruleForm.categoryId)
            // console.log(this.ruleForm.colorId)
            console.log(value)
        },
        test2(value){
            // console.log(this.ruleForm.categoryId)
            // console.log(this.ruleForm.colorId)
            console.log(value)
        },
        getStoreWorkDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getStoreWorkDetail(params).then(res => {
                let result = res.data;

                result.categoryId = result.category.toString();
                result.colorId = result.color.toString();
                ths.ruleForm = result;

                let obj = {};

                obj.width = result.width;
                obj.height = result.height;
                obj.imgAddr = result.cover;

                ths.coverLink(obj);//商户-上传封面地址初始化
                ths.storeEditorContent(result.content);//富文本信息初始化
                ths.storeEditorImgs(result.imageList);//图片集合
            }).catch(e => {
                // alert(e.msg)
            })
        },
        //二次确认
        openConfirm(formName) {
            let ths = this;
            const h = this.$createElement;

            if (ths.ruleForm.title == ''){
                ths.$message({
                    message: '请输入案例标题',
                    type: 'warning'
                });
                return false
            }
            if (ths.coverAddress.imgAddr && ths.coverAddress.imgAddr !=''){
                let a = {};
            } else {
                ths.$message({
                    message: '请上传案例封面',
                    type: 'warning'
                });
                return false
            }
            if (ths.ruleForm.colorId == ''){
                ths.$message({
                    message: '请选择商品的颜色',
                    type: 'warning'
                });
                return false
            }
            if (ths.ruleForm.catagoryId == ''){
                ths.$message({
                    message: '请选择案例元素风格',
                    type: 'warning'
                });
                return false
            }
            if (ths.editorContent == ''){
                ths.$message({
                    message: '请输入案例正文',
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
                        ths.storeWorkUpsert(formName);//提交
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
        storeWorkUpsert(formName){
            let ths = this;
            let params = {
                tk:ths.tk,
                categoryId:ths.ruleForm.categoryId,//风格
                colorId:ths.ruleForm.colorId,//颜色
                title: ths.ruleForm.title,//案例标题
                // vuex存储
                description:ths.editorContent,//描述
                imageList:ths.editorImgs,//图片集
                width:ths.coverAddress.width,//封面宽度
                height:ths.coverAddress.height,//封面高度
                cover:ths.coverAddress.imgAddr,//封面
                videoList:[]
            };

            if (ths.xid != ''){
                params.id = ths.xid//编辑
            }
            api.storeWorkUpsert(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });
                ths.coverLink({});//清空商户-上传封面地址
                ths.storeEditorContent('')//清空富文本信息
                ths.storeEditorImgs([])//清空图片数组信息
                ths.$refs[formName].resetFields();//清空数据
                ths.$router.push({
                    name: 'caseList',
                    query: {}
                })
                ths.changeChildTitle('案例列表')//跳转的时候将header的值存入store中
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
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
//内容部分
.step-box{
    margin-top: 40px;
    // 公共部分
    .step-content{
        .detail-title{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            margin-bottom: 22px;
            .squareFF739E{
                width: 16px;
                height: 16px;
                background: #FF739E;
                margin-right: 8px;
            }
        }
        .content-form{
            margin-bottom: 22px;
            .schedule-tip{
                margin : 0px 0px 22px 48px;
            }
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
}
</style>
