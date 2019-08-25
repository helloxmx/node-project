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
                                <el-form-item label="商户账号">
                                    <el-input v-model="form.id" clearable :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                                </el-form-item>
                                <el-form-item label="商户名称">
                                    <el-input v-model="form.name" clearable :style="{width:formWidth}" placeholder="请输入用户昵称"></el-input>
                                </el-form-item>
                                <el-form-item label="商户等级">
                                    <el-select v-model="form.level" style="width:220px;" :style="{width:formWidth}" placeholder="请选择分类" @change="selectChange">
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
                    <my-button :isPub="true" @pubFn="pubInfo"></my-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="商户ID" width="130"></el-table-column>
                    <el-table-column prop="code" label="商户账号" width="130"></el-table-column>
                    <el-table-column prop="name" label="商户名称"></el-table-column>
                    <el-table-column prop="invitNum" label="邀请用户" width="100"></el-table-column>
                    <el-table-column prop="donenum" label="成功交易用户" width="120"></el-table-column>
                    <el-table-column prop="rewardsTotal" label="累计奖励" width="120"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="showRow(scope.$index, tableData)">查看明细</el-button>
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
                id:'',
                level:'',
                name:''
            },
            typeList:[],//商户等级

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

        ths.getUserInviteByStore(ths.keyWord,null,ths.page);//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getUserInviteByStore(){
            let ths = this;
            let params = {
                tk:ths.tk,
                id:'',
                level:'',
                name:'',
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getUserInviteByStore(params).then(res => {
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

            ths.typeId = id;
        },
        //发布资讯
        pubInfo(){
            let ths = this;

            ths.$router.push({
                name:'publishArticles',
                query:{}
            });
            ths.changeChildTitle('发布资讯')//跳转的时候将header的值存入store中
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getUserInviteByStore(ths.keyWord,ths.typeId,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getUserInviteByStore(ths.keyWord,ths.typeId,val);
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
