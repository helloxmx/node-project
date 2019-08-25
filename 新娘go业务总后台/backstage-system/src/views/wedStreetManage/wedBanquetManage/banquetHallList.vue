<template>
    <div>
        <div>
            <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="输入搜索">
                                        <el-input v-model="form.keyWord" style="width:200px;" placeholder="婚宴厅名称/婚宴厅编号"></el-input>
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
                        <el-table-column prop="id" label="编号" width="160"></el-table-column>
                        <el-table-column prop="cover" label="宴会厅主图" width="100">
                            <template slot-scope="scope">
                                <img style="width:50px;height:50px" :src="scope.row.cover" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="宴会厅名称" width="160"></el-table-column>
                        <el-table-column prop="price" label="最低消费">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{ scope.row.price }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否上架" width="120">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.status" @change="recommendSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="档期" width="100">
                            <template slot-scope="scope">
                                <div @click="openSchedule(scope.row.id)">
                                    <i class="el-icon-edit-outline" style="font-size:20px;color:#FF739E;"></i>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="saleCnt" label="销量"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
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

            form:{
                keyWord:''
            },//婚宴厅搜索关键字

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

        ths.getCommodityStoreCommodities(ths.form.keyWord,ths.page);//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getCommodityStoreCommodities(keyWord,type,page){
            let ths = this;
            let params = {
                tk:ths.tk,
                keyWord:keyWord,
                page:page,
                pageSize:ths.pageSize
            };

            api.getCommodityStoreCommodities(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //上架或者不上架
                    ths.tableData[key].price = ths.tableData[key].price ? ths.tableData[key].price.toFixed(2) : '0.00';
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
        // 打开档期编辑
        openSchedule(id){

        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getCommodityStoreCommodities(ths.form.keyWord,ths.typeId,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getCommodityStoreCommodities(ths.form.keyWord,ths.typeId,val);
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
                name: 'goodDetail',//详情
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
