<template>
    <div>
        <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
        <div class="p22">
            <div class="mb22">
                <select-header :isSelect="true" @openSelectBox="openSelectBox"></select-header>
                <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                    <div class="my-select-items">
                        <div class="my-select-item">
                            <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                <el-form-item label="输入搜索">
                                    <el-input v-model="form.name" clearable placeholder="请输入用户名/姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="所属部门">
                                    <el-input v-model="form.orgName" clearable placeholder="请输入所属部门名称"></el-input>
                                    <!-- <el-select v-model="form.status" style="width:220px;" placeholder="请选择分类">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select> -->
                                </el-form-item>
                            </el-form>
                        </div>
                        <div style="width:98px;">
                            <my-button :isSearch="true" @searchFn="searchFn"></my-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-table backgroundfff">
                <div class="table-title">
                    <select-header title="数据列表" :isList="true"></select-header>
                    <div class="table-header-btns">
                        <div class="btn-item">
                            <el-button @click="updateMemberFn('')">添加</el-button>
                        </div>
                        <div class="btn-item"><el-select v-model="value" placeholder="排序方式">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select></div>
                    </div>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="成员账号" width="160"></el-table-column>
                    <el-table-column prop="realName" label="姓名"></el-table-column>
                    <el-table-column prop="email" label="邮箱地址"></el-table-column>
                    <el-table-column prop="orgName" label="所属部门" width="100"></el-table-column>
                    <el-table-column prop="createTime" label="添加时间"></el-table-column>
                    <el-table-column prop="lastTime" label="最后登录"></el-table-column>
                    <el-table-column label="是否启用" width="120">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" @change="recommendSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="showRow(scope.$index, tableData)">权限设置</el-button>
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="updateMemberFn(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footer-page">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10,20,30,40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <update-member v-if="isUpdateMember" :ruleForm="ruleForm" @submitForm="upDateAuthIUser" @closeFn="closeFn"></update-member>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/http/api';
import headerTitle from '@/components/common/headerTitle';
import selectHeader from '@/components/common/selectHeader';
import myButton from '@/components/common/myButton';
import updateMember from '@/views/rightManage/member/updateMember'
export default {
    components:{
        selectHeader,
        myButton,
        headerTitle,
        updateMember
    },
    data(){
        return {
            isUpdateMember:false,//是否打开新增或者更新弹框
            isOpen:true,//是否打开筛选框

            form:{
                name:'',
                orgName:''
            },//列表搜索条件
            ruleForm:{
                name:'',
                note:'',
                checkPass:'',
                pass:''
            },//添加或更新的数据
            options:[
                {
                    value:'qwe',
                    label:'eawrt'
                }
            ],
            value:'',
            tableData: [],
            pageSize:10,
            page: 1,
            total:0,
            screenHeight:500
            // screenHeight: document.body.clientHeight - 800
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getAuthUserList();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getAuthUserList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                name:ths.form.name,
                orgName:ths.form.orgName,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getAuthUserList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    if (ths.tableData[key].status == 0){
                        ths.tableData[key].status = false;
                    } else {
                        ths.tableData[key].status = true;
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //打开 增加或者更新弹框
        updateMemberFn(row){
            let ths = this;

            if (row !=''){
                ths.id = row.id;//更新
                ths.ruleForm.name = row.name;
                ths.ruleForm.note = row.note;
            } else {
                ths.id = '';//新增
                ths.ruleForm.name = '';
                ths.ruleForm.note = '';
            }


            ths.isUpdateMember = true;
        },
        //关闭 增加或者更新弹框
        closeFn(){
            let ths = this;

            ths.isUpdateMember = false;
        },
        //提交增加或者更新数据
        upDateAuthIUser(data){
            let ths = this;

            let params = {
                tk:ths.tk,
                name:data.name,
                note:data.note,
                id:ths.id
            };

            api.upDateAuthIUser(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });

                ths.isUpdateMember = false;
                ths.getAuthList(); //更新列表数据
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getAuthUserList(ths.keyWord,ths.typeId,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getAuthUserList(ths.keyWord,ths.typeId,val);
        },
        //推荐或者不推荐的操作按钮
        recommendSwitch(value){
            let recommend = 0;

            if (value === true) {
                recommend = 1;
            } else {
                recommend = 0;
            }
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'infoDetail',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('资讯详情')//跳转的时候将header的值存入store中
        },
        //删除
        deleteRow(index, rows) {
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]
            let ths = this;
            let ids = [];

            ids.push(row.id)
            let params = {
                tk:ths.tk,
                ids:ids,
                itype:2,//0:推介 1:隐藏 2:删除
                value:'n'//n 删除y 不删除
            };

            api.articleSetArticle(params).then(res => {

                rows.splice(index, 1);
                ths.$message({
                    message: '已删除',
                    type: 'success'
                });

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
        }
    }
}
</script>
<style lang="scss" scoped>
.select-box{
    box-shadow: 0 0 3px 2px rgba(155,155,155,0.05);
}
.list-box{
    box-shadow: 0 0 3px 2px rgba(155,155,155,0.05);
}
.list-table{
    .table-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 22px;
        border-bottom: 1px solid #e9eaed;
        .table-header-btns{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
        }
        .btn-item{
            margin-left: 12px;
        }
    }
    .footer-page{
        padding: 16px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}
.single-btn{
    width: 100px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &:last-child{
        margin-right: 0px;
    }
}
.single-size{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
}

</style>
