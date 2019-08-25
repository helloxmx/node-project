<template>
    <div>
        <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
        <div class="p22">
            <div class="mb22">
                <select-header :isSelect="true" @openSelectBox="openSelectBox"></select-header>
                <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                    <div class="my-select-items">
                        <div class="my-select-item">
                            <el-form :inline="true" ref="form" :model="form" label-width="90px">
                                <el-form-item label="新人说标题">
                                    <el-input v-model="form.keyWord" clearable placeholder="请输入资讯标题关键字"></el-input>
                                </el-form-item>
                                <el-form-item label="新人说分类">
                                    <el-select v-model="form.typeId" style="width:220px;" placeholder="请选择分类" @change="selectChange">
                                        <el-option
                                        v-for="item in typeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
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
                    <el-table-column prop="id" label="新人说ID" width="160"></el-table-column>
                    <el-table-column prop="category" label="类型" width="100"></el-table-column>
                    <el-table-column prop="content" label="标题/简介"></el-table-column>
                    <el-table-column prop="type" label="分类" width="100"></el-table-column>
                    <el-table-column prop="pubTime" label="发布时间"></el-table-column>
                    <el-table-column label="相关" width="120">
                        <template slot-scope="scope">
                            <div style="margin-left: 10px">点赞：{{ scope.row.priseCnt }}</div>
                            <div style="margin-left: 10px">收藏：{{ scope.row.collectCnt }}</div>
                            <div style="margin-left: 10px">评价：{{ scope.row.commentCnt }}</div>
                        </template>
                    </el-table-column>
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
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import selectHeader from '@/components/common/selectHeader';
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
            isOpen:true,//是否打开筛选框

            form:{
                keyWord:'',//资讯标题关键字
                typeId:''//资讯分类Id
            },
            typeList:[],//资讯分类列表
            value:'',
            options:[],

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

        ths.getNewSayTypeList();//资讯文章类型下拉列表数据
        ths.getNewSayList();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //资讯文章类型下拉列表数据
        getNewSayTypeList(){
            let ths = this;
            let params = {};

            api.getNewSayTypeList(params).then(res => {
                ths.typeList = res.data;
                let obj = {id:null,name:'全部'};

                ths.typeList.unshift(obj);
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取列表数据
        getNewSayList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                keyWord:ths.form.keyWord,
                type:ths.form.typeId,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getNewSayList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
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
        // 下拉选择事件
        selectChange(id){
            let ths = this;

            ths.form.typeId = id;
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getNewSayList();

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
            ths.getNewSayList();
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getNewSayList();
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'newSayDetail',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('新人说详情')//跳转的时候将header的值存入store中
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
                itype:2//0:推介 1:隐藏 2:删除
            };
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
