<template>
    <div class="add-box backgroundfff">
        <div class="step-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <div class="step-content">
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>基本信息</div>
                    </div>
                    <div class="content-form">
                        <div class="content-form-base">
                            <el-form-item label="菜单名称" prop="name" style="width:400px;">{{ruleForm.name}}</el-form-item>
                        </div>
                        <div class="content-form-base">
                            <el-form-item label="套餐金额" prop="price" style="width:400px;">{{ruleForm.price}}元/桌</el-form-item>
                        </div>
                    </div>
                    <!-- 商品元素 -->
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>菜品信息</div>
                    </div>
                    <div class="content-form">
                        <div class="good-table">
                            <div class="good-row">
                                <div class="good-column-left">套餐号</div>
                                <div class="good-column">具体内容</div>
                            </div>
                            <div class="good-row" v-for="(item,index) in ruleForm.contents" :key="index" >
                                <div class="good-column-left">{{item.cn}}</div>
                                <div class="good-column">
                                    <span v-for="itemIn in item.cv" :key="itemIn" >{{itemIn}}、 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import editor from '@/components/editor'//富文本编辑器
import myUpload from '@/components/common/myUpload'//上传按钮
import api from '@/http/api';
export default {
    components:{
        editor,
        myUpload
    },
    data () {
        return {
            ruleForm: {
                name:'',// 菜单名称
                price:'',// 菜单金额
                contents:[]//菜单内容
            },

            newTitle:'',//新增套餐名
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            isEdit:false,

            rules: {
                name: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    { min: 0, max: 8, message: '长度在 0 到 8 个字符', trigger: 'blur' }
                ],//商户类型 第一步
                price: [
                    { required: true, message: '请输入菜单价格', trigger: 'blur' }//input
                ],//商铺名称
                contents:[
                    { required: true, message: '请输入套餐内容', trigger: 'blur' }//数组
                ]
            }


        }
    },
    computed:{
        ...mapGetters([
            'tk',
            'headerChildTitle',
            'editorContent'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid || '';
        if (ths.xid != '') {
            ths.getCbookGroupDetail();//获取列表数据 标题关键字/文章类型/文章当前页
        } else {
            ths.newTitle = 'A';
        }

    },
    methods:{
        ...mapActions([]),
        //详情
        getCbookGroupDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getCbookGroupDetail(params).then(res => {
                ths.ruleForm = res.data;
                let len = ths.ruleForm.contents.length;
                let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                ths.newTitle = string.substring(len,len + 1);
                
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //二次确认
        openConfirm(formName) {
            let ths = this;
            const h = this.$createElement;

            if (ths.ruleForm.name == ''){
                ths.$message({
                    message: '请输入菜单名称',
                    type: 'warning'
                });
                return false
            }
            if (ths.ruleForm.price == ''){
                ths.$message({
                    message: '请输入菜单金额',
                    type: 'warning'
                });
                return false
            }
            if (ths.ruleForm.contents.length == 0){
                ths.$message({
                    message: '请至少添加一个套餐',
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
                        setTimeout(() => {
                            done();
                            ths.cbookUpsert(formName);//提交
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
        cbookUpsert(formName){
            let ths = this;
            let params = {
                tk:ths.tk,
                name:ths.ruleForm.name,
                price:ths.ruleForm.price,
                contents:ths.ruleForm.contents
            };

            console.log(params);
            api.cbookUpsert(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });
                ths.$refs[formName].resetFields();//清空数据
                this.$router.push({
                    name: 'cookList',
                    query: {}
                })
                ths.changeChildTitle('宴会菜单列表')//跳转的时候将header的值存入store中
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;

            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        //添加或者修改菜单信息
        addGroup(type){
            let ths = this,obj = {};
            
            let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            obj.cn = ths.newTitle;
            obj.cv = ths.dynamicTags;
            
            if (ths.newTitle == ''){
                ths.$message({
                    message: '套餐名称不能为空',
                    type: 'warning'
                });
                return false
            }
            if (ths.dynamicTags.length == 0){
                ths.$message({
                    message: '套餐内容不能为空',
                    type: 'warning'
                });
                return false
            }
            switch (type) {
            case 'isEdit':
                for (let key in ths.ruleForm.contents){
                    if (ths.ruleForm.contents[key].cn == obj.cn){
                        ths.ruleForm.contents[key].cn = obj.cn;
                        ths.ruleForm.contents[key].cv = obj.cv;
                    }
                }
                break;
            case 'isNew':
                ths.ruleForm.contents.push(obj);
                break;
            default:
                break;
            }
            ths.isEdit = false;
            let len1 = ths.ruleForm.contents.length;
                
            ths.newTitle = string.substring(len1,len1 + 1);
            ths.dynamicTags = [];
        },
        editGroup(index){
            let ths = this;

            ths.isEdit = true;
            ths.newTitle = ths.ruleForm.contents[index].cn;
            ths.dynamicTags = ths.ruleForm.contents[index].cv;
        },
        deleteGroup(index){
            this.$confirm('是否删除该套餐?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.ruleForm.contents.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.add-box{
    padding: 22px;
    min-height: 100vh;
    height: 100%;
}
//内容部分
.step-box{
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
            .content-form-base{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                span{
                    margin-top: 12px;
                    margin-left: 6px;
                }
            }
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
//商品内容
.good-table{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    width: 100%;
    .good-row{
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        border-top:1px solid #dcdfe6;
        border-left:1px solid #dcdfe6;
        border-right:1px solid #dcdfe6;
        &:last-child{
            border-bottom:1px solid #dcdfe6;
        }
        .good-column-left{
            width: 100px;
            padding: 14px;
            border-right:1px solid #dcdfe6;
        }
        .good-column{
            width: calc(100% - 100px);
            padding: 14px;
        }
    }
    
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 150px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
