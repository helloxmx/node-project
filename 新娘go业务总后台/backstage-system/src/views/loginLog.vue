<template>
    <div class="business-detail">
        <!-- title按钮 -->
        <div class="parent-header">
            <div><header-title :isParent="false" :hasback="false" :isBtns="true" :btns="btnsList" @btnFn="btnFn"></header-title></div>
        </div>
        <div>
            <div class="p22">
                <div class="list-table backgroundfff">
                    <div class="table-title">
                        <select-header title="数据列表" :isList="true"></select-header>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column prop="id" label="时间"></el-table-column>
                        <el-table-column prop="storeCode" label="IP"></el-table-column>
                        <el-table-column prop="name" label="地区"></el-table-column>
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
import advancedSearch from '@/views/wedStreetManage/storeManage/advancedSearch';
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
            //上方按钮列表
            btnsList:[{
                key:'storeDetail',
                name:'商户详情',
                autofocus:false
            },
            {
                key:'editInfo',
                name:'编辑资料',
                autofocus:false
            },
            {
                key:'loginLog',
                name:'登录日志',
                autofocus:true
            }],

            tableData: [],
            pageSize:10,
            page: 1,
            total:0
        }
    },
    computed:{
        ...mapGetters(['tk'])
    },
    mounted(){
        let ths = this;

        ths.getUserLoginLog();//获取列表数据
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //登录日志
        getUserLoginLog(){
            let ths = this;
            let params = {
                tk:ths.tk,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getUserLoginLog(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //商家详情  编辑资料  登录日志
        btnFn(name){
            let ths = this;

            switch (name) {
            case 'storeDetail':
                ths.$router.push({
                    name: 'storeDetail',
                    query: {
                        xid:ths.xid
                    }
                })
                break;
            case 'editInfo':
                ths.$router.push({
                    name: 'editInfo',
                    query: {
                        xid:ths.xid
                    }
                })
                break;
            case 'loginLog':
                ths.$router.push({
                    name: 'loginLog',
                    query: {
                        xid:ths.xid
                    }
                })
                break;
            default:
                break;
            }
        },
        //改变一页展示条数
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
            ths.getUserLoginLog();
        },
        //跳转到第几页
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getUserLoginLog();
        }
    }
}
</script>
<style lang="scss" scoped>
.list-table{
    .table-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 22px;
        border-bottom: 1px solid #e9eaed;
        .table-btns{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
    .footer-page{
        padding: 16px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
    }
}

</style>
