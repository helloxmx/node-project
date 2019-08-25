<template>
    <div>
        <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
        <div class="p22">
            <div class="mb22">
                <select-header :isSelect="true" @openSelectBox="openSelectBox"></select-header>
                <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                    <div class="my-select-items">
                        <div class="my-select-item">
                            <el-form :inline="true" ref="form" :model="form" label-width="100px">
                                <el-form-item label="Banner标题">
                                    <el-input v-model="form.keyWord" clearable :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                                </el-form-item>
                                <el-form-item label="配置人员">
                                    <el-select v-model="form.name" style="width:220px;" :style="{width:formWidth}" placeholder="请选择分类" @change="selectChange">
                                        <el-option
                                        v-for="item in typeList"
                                        :key="item.id"
                                        :label="item.creator"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="配置时间">
                                    <el-date-picker
                                    v-model="form.confDate"
                                    type="datetime"
                                    placeholder="选择日期时间"
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
                    <my-button :isAddBanner="true" @addBannerFn="addBannerFn"></my-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="编号" width="160"></el-table-column>
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="confTime" label="配置时间"></el-table-column>
                    <el-table-column prop="creator" label="配置人员" width="100"></el-table-column>
                    <el-table-column prop="targetType" label="Banner类型" width="130"></el-table-column>
                    <el-table-column prop="status" label="配置结果" width="100"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="editRow(scope.$index, tableData)">取消</el-button>
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
                keyWord:'',
                creator:'',
                confDate:''
            },
            keyWord:'',//资讯标题关键字
            typeValue:'',//选择框默认展示
            typeId:null,//资讯分类Id
            typeList:[],//资讯分类列表

            tableData: [],
            pageSize:10,
            page: 1,
            total:0,
            screenHeight:500,
            formWidth:'190px'
            // screenHeight: document.body.clientHeight - 800
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getBannerList();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getBannerList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                keyWord:'',
                creator:'',
                confDate:'',
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getBannerList(params).then(res => {
                ths.tableData = res.data;
                ths.total = res.ext;

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
        //发布资讯
        addBannerFn(){
            let ths = this;

            ths.$router.push({
                name:'publishArticles',
                query:{}
            });
            ths.changeChildTitle('添加Banner')//跳转的时候将header的值存入store中
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getBannerList();

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getBannerList();
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
        //编辑
        editRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'publishArticles',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('发布资讯')//跳转的时候将header的值存入store中
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
