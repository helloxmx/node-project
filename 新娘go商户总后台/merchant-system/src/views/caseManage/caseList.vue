<template>
    <div>
        <div>
            <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="案例标题">
                                        <el-input v-model="form.keyWord" placeholder="请输入案例标题"></el-input>
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
                        <div class="table-btns">
                            <my-button class="pl12" :isAddCase="true" @addCaseFn="addCaseFn"></my-button>
                        </div>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="batchSelect">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="案例ID" width="170"></el-table-column>
                        <el-table-column prop="cover" label="封面图片" width="100">
                            <template slot-scope="scope">
                                <img style="width:50px;height:50px" :src="scope.row.cover" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="200"></el-table-column>
                        <el-table-column prop="pubTime" label="发布时间" width="160"></el-table-column>
                        <el-table-column label="相关">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">收藏：{{ scope.row.collectCnt }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style="font-size:14px;"
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
                                <el-button type="text" size="small" style="font-size:14px;"
                                @click.native.prevent="addCaseFn(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="singleUpdate(scope.row,'deleted')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer-page">
                        <div>
                            <el-select v-model="operate" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-button plain @click="openConfirm">确认</el-button>
                        </div>
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

            typeList: [],
            value: '',
            form:{
                keyWord:'',//商户账号关键字
                type:''//类型-案例
            },
            tableData: [],
            pageSize:10,
            page: 1,
            total:0,
            screenHeight:500,

            operate:'',//操作的元素
            options:[{//0删除 1启用 2停用
                value:'',
                label:'不操作'
            },{
                value:'0',
                label:'删除'
            }],
            ids:[]//批量选择后的数组
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;
        
        ths.getStoreWorkBackList();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getStoreWorkBackList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                keyWord:ths.form.keyWord,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getStoreWorkBackList(params).then(res => {
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
        //添加商品
        addCaseFn(row){
            let ths = this;
            let obj = {};

            if (row){
                obj.xid = row.id;
            }

            ths.$router.push({
                name:'addCase',
                query:obj
            });
            ths.changeChildTitle('添加商品')//跳转的时候将header的值存入store中
        },
        //单条信息操作 是否推荐 是否上下架 是否删除
        singleUpdate(value,type){
            let ths = this;
            let id = value.id.toString();

            ths.ids=[];
            switch (type){
            case 'status'://上下架
                if (value.status == true){
                    ths.operate = '1'//上架
                } else {
                    ths.operate = '2'//下架
                }
                ths.ids.push(id);
                ths.storeDeleteWork();
                break;
            case 'recommend':
                if (value.recommend == true){
                    ths.operate = '3'//推荐
                } else {
                    ths.operate = '4'//不推荐
                }
                ths.ids.push(id);
                ths.storeDeleteWork();
                break;
            case 'deleted':
                ths.operate = '0'//删除
                ths.ids.push(id);
                ths.openConfirm(type);
                break;
            default:
                break;
            }
            
        },
        //批量选择
        batchSelect(selection){
            let ths = this;

            ths.ids = [];
            for (let key in selection) {
                ths.ids.push(selection[key].id.toString());
            }
        },
        //二次确认
        openConfirm(type) {
            let ths = this;
            const h = this.$createElement;

            if ( ths.ids.length ===0 || ths.ids ===null){
                ths.$message.warning('请选择需要操作的行');
                return false
            }
            if (ths.operate ==''){
                ths.$message.warning('请选择需要执行的操作项');
                return false
            }
            this.$msgbox({
                title: '是否确认',
                message: h('p', null, [
                    h('span', null, '删除所有选择项目 ')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') { //确定
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '删除中...';
                        ths.storeDeleteWork();//批量删除
                        ths.getCommentCommodity();//刷新列表
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
                // 确定之后执行
                this.$message({
                    type: 'success',
                    message: '已成功删除所选项！'
                });
            });
        },
        // 提交 0删除1上架2下架3推荐4不推荐
        storeDeleteWork(){
            let ths = this;
            let params = {
                tk:ths.tk,
                type:ths.operate,
                ids:ths.ids
            };

            api.storeDeleteWork(params).then(res => {
                ths.$message({
                    message: '操作成功',
                    type: 'success'
                });
                ths.getStoreWorkBackList();
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
            ths.getStoreWorkBackList();

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getStoreWorkBackList();
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'caseDetail',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('案例详情')//跳转的时候将header的值存入store中
        },
        //编辑
        editRow(index, rows) {
            let ths = this;
            let id = rows[index].id

            this.$router.push({
                name: 'caseEditInfo',
                query: {
                    xid:id
                }
            })
            ths.changeChildTitle('编辑案例')//跳转的时候将header的值存入store中
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
        }
    },
    watch: {}
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
        align-items: center;
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
