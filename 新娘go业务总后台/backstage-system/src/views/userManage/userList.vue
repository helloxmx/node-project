<template>
    <div>
        <div>
            <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header
                    :isSelect="true" @openSelectBox="openSelectBox"
                    :hasAdvanced="true" @advancedFn="openAdvanced"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="用户账号">
                                        <el-input v-model="form.id" clearable :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户昵称">
                                        <el-input v-model="form.name" clearable :style="{width:formWidth}" placeholder="请输入用户昵称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="注册时间">
                                        <el-date-picker
                                            v-model="form.registDate"
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            :style="{width:formWidth}">
                                            </el-date-picker>
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
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="userId" label="用户ID" width="170"></el-table-column>
                        <el-table-column prop="telephone" label="手机" width="160"></el-table-column>
                        <el-table-column prop="nickName" label="用户昵称"></el-table-column>
                        <el-table-column prop="fee" label="消费金额" width="100">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{ scope.row.fee }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderNum" label="订单数量"></el-table-column>
                        <el-table-column prop="coin" label="可用金币" width="100"></el-table-column>
                        <el-table-column prop="status" label="账户启用状态">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.status" @change="recommendSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="editRow(scope.$index, tableData)">编辑</el-button>
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
        </div>
        <advanced-search v-show="isAdvancedSearch" @closeFn="closeFn" @submitForm="submitForm"></advanced-search>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import selectHeader from '@/components/common/selectHeader';
import headerTitle from '@/components/common/headerTitle';
import myButton from '@/components/common/myButton';
import advancedSearch from '@/views/userManage/advancedSearch';
import api from '@/http/api';
export default {
    components:{
        selectHeader,
        myButton,
        headerTitle,
        advancedSearch
    },
    data(){
        return {
            isAdvancedSearch:false,//高级搜索
            isOpen:true,//是否打开筛选框

            options: [{
                value: '选项1',
                label: '婚礼策划'
            }, {
                value: '选项2',
                label: '婚宴预定'
            }, {
                value: '选项3',
                label: '婚礼摄影'
            }, {
                value: '选项4',
                label: '婚礼摄像'
            }, {
                value: '选项5',
                label: '婚礼造型'
            }, {
                value: '选项6',
                label: '婚礼主持'
            }],
            value:'',
            value1: '',

            form:{
                id:'',
                name:'',
                registDate:''
            },
            tableData: [],
            pageSize:10,
            page: 1,
            total:0,
            screenHeight:500,
            formWidth:'190px'
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getArticleTypeList();//资讯文章类型下拉列表数据
        ths.userBackUserList();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //资讯文章类型下拉列表数据
        getArticleTypeList(){
            let ths = this;
            let params = {};

            api.getArticleTypeList(params).then(res => {
                ths.typeList = res.data;
                let obj = {id:-1,name:'全部'};

                ths.typeList.unshift(obj);
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取列表数据
        userBackUserList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                rUser:'',
                orderId:'',
                status:'',
                type:'',
                cTime:'',
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.userBackUserList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    ths.tableData[key].fee = ths.tableData[key].fee ? ths.tableData[key].fee.toFixed(2) : '0.00';
                    if (ths.tableData[key].recommend == 0){
                        ths.tableData[key].recommend = false;
                    } else {
                        ths.tableData[key].recommend = true;
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        // 下拉选择事件
        selectChange(id){
            let ths = this;

            ths.typeId = id;
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.userBackUserList();

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.userBackUserList();
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
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'userDetail',
                query: {
                    xid:row.userId
                }
            })
            ths.changeChildTitle('用户详情')//跳转的时候将header的值存入store中
        },
        //编辑
        editRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'userEditInfo',
                query: {
                    xid:row.userId
                }
            })
            ths.changeChildTitle('编辑资料')//跳转的时候将header的值存入store中
        },
        //删除
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
        },
        //展开高级搜索
        openAdvanced(){
            let ths = this;

            ths.isAdvancedSearch = true;
        },
        //关闭高级搜索
        closeFn(){

        },
        //提交高级搜索
        submitForm(){

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
    }
    .footer-page{
        padding: 16px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
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
