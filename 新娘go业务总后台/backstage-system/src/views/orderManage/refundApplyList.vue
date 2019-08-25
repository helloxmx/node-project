<template>
    <div>
        <div>
            <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
            <div class="order-btns">
                <div :class="{'item-base':true,'item-btn':!item.isFocus,'item-pink-btn':item.isFocus}" v-for="(item,index) in btns" :key="index">{{item.title}}({{item.count}})</div>
            </div>
            <div class="p22">
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="关键字">
                                        <el-input v-model="form.xid" clearable :style="{width:formWidth}" placeholder="请输入商户账号关键字"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请时间">
                                        <el-date-picker v-model="form.occurDate" type="datetime" :style="{width:formWidth}" placeholder="选择日期时间"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="商品分类">
                                        <el-select v-model="form.status" placeholder="请选择" :style="{width:formWidth}" >
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="xid" label="订单编号" width="160"></el-table-column>
                        <el-table-column prop="applyTime" label="申请时间" width="160"></el-table-column>
                        <el-table-column prop="orderCode" label="用户账号"></el-table-column>
                        <el-table-column prop="fee" label="订单金额" width="100">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{scope.row.fee}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="refundMoney" label="退款金额" width="100">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{scope.row.refundMoney}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="申请状态" width="100"></el-table-column>
                        <el-table-column prop="dealTime" label="处理时间"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="90">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click.native.prevent="showRow(scope.$index, tableData)">查看详情</el-button>
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
import advancedSearch from '@/views/orderManage/advancedSearchRefund';//高级搜索
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

            options: [{ //0待处理 1已处理 2已拒绝
                value: null,
                label: '全部'
            },{
                value: 0,
                label: '待处理'
            }, {
                value: 1,
                label: '已处理'
            }, {
                value: 2,
                label: '已拒绝'
            }],
            form:{
                xid:'',//服务单号
                occurDate:'',//申请时间
                status:'',//0待处理 1已处理 2已拒绝
                name:''//操作人员
            },

            btns:[{
                title:'全部申请',
                count:'1000',
                isFocus:true
            },{
                title:'待处理',
                count:'1000',
                isFocus:false
            },{
                title:'已处理',
                count:'1000',
                isFocus:false
            },{
                title:'已拒绝',
                count:'1000',
                isFocus:false
            }],

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

        ths.orderRefundList(ths.keyWord,null,ths.page);//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        orderRefundList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:'',//服务单号
                occurDate:'',//申请时间
                status:'',//0待处理 1已处理 2已拒绝
                name:'',//操作人员
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.orderRefundList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    ths.tableData[key].fee = ths.tableData[key].fee ? ths.tableData[key].fee.toFixed(2) : '0.00';
                    ths.tableData[key].refundMoney = ths.tableData[key].refundMoney ? ths.tableData[key].refundMoney.toFixed(2) : '0.00';
                }
            }).catch(e => {
                ths.$message({
                    message: '获取失败',
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
            ths.orderRefundList(ths.keyWord,ths.typeId,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.orderRefundList(ths.keyWord,ths.typeId,val);
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

            ths.$router.push({
                name: 'refundDetail',
                query: {
                    xid:row.xid
                }
            })
            ths.changeChildTitle('服务单信息')//跳转的时候将header的值存入store中
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
            let ths = this;

            ths.isAdvancedSearch = false;
        },
        //高级搜索页面的列表搜索
        submitForm(form){
        }
    }
}
</script>
<style lang="scss" scoped>
.order-btns{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    padding: 22px 22px 0px 22px;
    .item-base{
        margin-right: 10px;
        padding: 12px;
        border-radius: 4px;
    }
    .item-btn{
        border: 1px solid rgba(0,0,0,0.10);
        color: #4a4a4a;
    }
    .item-pink-btn{
        border: 1px solid #FF739E;
        background: #FF739E;
        color: #ffffff;
    }
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
