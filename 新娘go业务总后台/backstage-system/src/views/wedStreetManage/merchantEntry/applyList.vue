<template>
    <div>
        <div>
            <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox" @wedBtn="wedBtn"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="商户电话">
                                        <el-input v-model="form.telephone" placeholder="请输入商户电话搜索"></el-input>
                                    </el-form-item>
                                    <el-form-item label="商品分类">
                                        <el-select v-model="form.type" placeholder="请选择">
                                            <el-option
                                            v-for="item in typeList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="申请时间">
                                        <el-date-picker
                                            v-model="form.date"
                                            type="datetime"
                                            placeholder="选择日期时间">
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
                        <select-header title="商户申请列表" :isList="true"></select-header>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="ID" width="160"></el-table-column>
                        <el-table-column prop="name" label="商户姓名" width="160"></el-table-column>
                        <el-table-column prop="tel" label="商户电话"></el-table-column>
                        <el-table-column prop="type" label="商户类型" width="100"></el-table-column>
                        <el-table-column prop="date" label="申请时间"></el-table-column>
                        <el-table-column prop="status" label="状态" width="100"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">{{scope.row.operateStatus}}</el-button>
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
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import selectHeader from '@/components/common/selectHeader';
import headerTitle from '@/components/common/headerTitle';
import myButton from '@/components/common/myButton';
import api from '@/http/api';
export default {
    components:{
        selectHeader,
        myButton,
        headerTitle
    },
    data(){
        return {
            isAdvancedSearch:false,//高级搜索
            isOpen:true,//是否打开筛选框

            keyWord:'',//商户账号关键字
            form:{
                telephone:'',
                type:'',
                date:''
            },
            value:'',
            typeList:[],

            operateText:'已联络',
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

        ths.getTypeList();//资讯文章类型下拉列表数据
        ths.getStoreJoinList(ths.form.telephone,ths.form.type,ths.form.date,ths.page);//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //类型下拉列表数据
        getTypeList(){
            let ths = this;
            let params = {};

            api.getTypeList(params).then(res => {
                ths.typeList = res.data.data;
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
        getStoreJoinList(telephone,type,date,page){
            let ths = this;
            let params = {
                tk:ths.tk,
                telephone:telephone,
                type:type,
                date:date,
                page:page,
                pageSize:ths.pageSize
            };

            api.getStoreJoinList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //是否已经联络
                    switch (ths.tableData[key].status){
                    case '待联络' :
                        ths.tableData[key].operateStatus = '已联络';
                        break;
                    case '已联络':
                        ths.tableData[key].operateStatus = '撤销';
                        break;
                    default:
                        break;

                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //商家详情，编辑信息，登录日志
        wedBtn(){},
        // 下拉选择事件
        selectChange(id){
            let ths = this;

            ths.typeId = id;
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getStoreJoinList(ths.keyWord,ths.typeId,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getStoreJoinList(ths.keyWord,ths.typeId,val);
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
                name: 'storeDetail',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('商户详情')//跳转的时候将header的值存入store中
        },
        //编辑
        editRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'editInfo',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('编辑信息')//跳转的时候将header的值存入store中
        },
        //删除
        deleteRow(index, rows) {
            rows.splice(index, 1);
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
