<template>
    <div>
        <div>
            <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
            <div class="coin-box p22">
                <div class="backgroundfff p22 mb22">
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>金币明细</div>
                    </div>
                    <el-table border ref="multipleTable" :data="detailData" tooltip-effect="dark" style="width: 100%" :max-height="screenHeight">
                        <el-table-column prop="userId" label="用户账号" width="170"></el-table-column>
                        <el-table-column prop="nickName" label="用户昵称" width="170"></el-table-column>
                        <el-table-column prop="totalCoin" label="可用金币"></el-table-column>
                        <el-table-column prop="coin" label="历史金币"></el-table-column>
                    </el-table>
                </div>
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox" @wedBtn="wedBtn"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="用户账号">
                                        <el-input v-model="form.id" clearable placeholder="商户ID/账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户昵称">
                                        <el-input v-model="form.name" clearable placeholder="请输入用户昵称"></el-input>
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
                        <el-table-column prop="telephone" label="用户手机号" width="160"></el-table-column>
                        <el-table-column prop="nickName" label="用户昵称"></el-table-column>
                        <el-table-column prop="totalCoin" label="可用金币" width="100"></el-table-column>
                        <el-table-column prop="coin" label="历史金币"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">金币明细</el-button>
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">修改数值</el-button>
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

            xid:'',//xid
            keyWord:'',//商户账号关键字
            value:'',
            value1: '',
            form:{
                id:'',
                name:''
            },

            detailData:[],//金币明细

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

        ths.xid = ths.$route.query.xid;
        ths.userCoinDetail();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        userCoinDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:'',
                type:'',
                occurDate:ths.form.name,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.userCoinDetail(params).then(res => {
                ths.tableData = res.data;
                ths.total = res.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
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
            ths.userCoinDetail();

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.userCoinDetail();
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
.coin-box{
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
}
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
