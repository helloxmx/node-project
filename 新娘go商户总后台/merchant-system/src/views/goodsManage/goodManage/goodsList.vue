<template>
    <div>
        <div>
            <div class="head-box">
                <header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title>
                <div class="head-btns">
                    <!-- 标题按钮集合，部分标题带有数值参数 -->
                    <el-button plain @click="comStatusFn('')">全部商品<span>({{comDataObj.all}})</span></el-button>
                    <el-button plain @click="comStatusFn('0')">已上架<span>({{comDataObj.onShelf}})</span></el-button>
                    <el-button plain @click="comStatusFn('1')">未上架<span>({{comDataObj.offShelf}})</span></el-button>
                </div>
            </div>
            <div class="p22">
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <!-- 宴会厅列表 -->
                                <el-form v-if="business == 1" :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="输入搜索">
                                        <el-input v-model="form.name" style="width:200px;" placeholder="婚宴厅名称/婚宴厅编号"></el-input>
                                    </el-form-item>
                                </el-form>
                                <!-- 商品列表 -->
                                <el-form v-else :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="输入搜索" prop="name">
                                        <el-input v-model="form.name" placeholder="商品名称/商品货号"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div style="width:98px;">
                                <my-button :isSearch="true" @searchFn="searchFn"></my-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <!-- 宴会厅列表 -->
                    <div v-if="business == 1" class="list-table backgroundfff">
                        <div class="table-title">
                            <select-header title="数据列表" :isList="true"></select-header>
                            <div class="table-btns">
                                <my-button class="pl12" :isAddBanque="true" @addBanqueFn="addGoodFn"></my-button>
                            </div>
                        </div>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="code" label="编号" width="160"></el-table-column>
                            <el-table-column prop="cover" label="宴会厅主图" width="100">
                                <template slot-scope="scope">
                                    <img style="width:50px;height:50px" :src="scope.row.cover" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="宴会厅名称" width="160"></el-table-column>
                            <el-table-column prop="price" label="最低消费"></el-table-column>
                            <el-table-column label="是否上架" width="120">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.status" @change="singleUpdate(scope.row,'status')" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column prop="id" label="档期" width="100">
                                <template slot-scope="scope">
                                    <div @click="openSchedule(scope.row.xid)">
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
                                    @click.native.prevent="editRow(scope.$index, tableData)">编辑</el-button>
                                    <el-button type="text" size="small" style=""
                                    @click.native.prevent="singleUpdate(scope.row,'deleted')">删除</el-button>
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
                    <!-- 商品列表 -->
                    <div v-else class="list-table backgroundfff">
                        <div class="table-title">
                            <select-header title="数据列表" :isList="true"></select-header>
                            <div class="table-btns">
                                <my-button class="pl12" :isAddGood="true" @addGoodFn="addGoodFn"></my-button>
                            </div>
                        </div>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="batchSelect">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="code" label="编号" width="160"></el-table-column>
                            <el-table-column prop="cover" label="商品封面" width="80">
                                <template slot-scope="scope">
                                    <img style="width:50px;height:50px" :src="scope.row.cover" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
                            <el-table-column prop="price" label="基础售价"></el-table-column>
                            <el-table-column prop="status" label="是否上架" width="100">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.status" @change="singleUpdate(scope.row,'status')" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column prop="id" label="档期" width="100">
                                <template slot-scope="scope">
                                    <div @click="openSchedule(scope.row.xid)">
                                        <i class="el-icon-edit-outline" style="font-size:20px;color:#FF739E;"></i>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="saleCnt" label="销量" width="100"></el-table-column>
                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" style=""
                                    @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
                                    <el-button type="text" size="small" style=""
                                    @click.native.prevent="editRow(scope.$index, tableData)">编辑</el-button>
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
        <!-- 更新档期弹框 -->
        <div v-if="isStock" class="pop-bg">
            <div class="stock-box bobm-box backgroundfff">
                <div class="box-title">
                    <div class="title-name">编辑商品档期</div>
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <div class="stock-content">
                    <div class="stock-pages">
                        <el-button type="text" icon="el-icon-caret-left" :disabled="stockpage <= 0" @click="preStockpage(stockpage)">上个月</el-button>
                        <div>
                            <div v-if="stockOrignalList.length != 0">
                                <div v-for="item in stockOrignalList" :key="item.date">{{item.date}}：可接受{{item.num}}个订单</div>
                            </div>
                            <div v-else>{{initYM}}月暂无档期安排</div>
                        </div>
                        <el-button type="text" @click="nextStockpage(stockpage)">下个月<i class="el-icon-caret-right el-icon--right"></i></el-button>
                    </div>
                    <el-form :model="stockForm" label-position="left" ref="stockForm" label-width="80px">
                        <el-form-item label="档期设置" prop="stockList">
                            <el-date-picker
                            v-model="stockForm.stockList"
                            style="width:480px;"
                            type="dates"
                            align="right"
                            unlink-panels
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :default-value="initDate">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="订单数" prop="stockValue" style="width:400px;">
                            <el-input clearable v-model="stockForm.stockValue"></el-input>
                        </el-form-item>
                        <div class="advanced-btn">
                            <div>
                                <el-button @click="closeFn('stockForm')">取消或关闭</el-button>
                                <el-button type="primary" @click="commodityUpdateStocks('stockForm')">确定</el-button>
                            </div>
                        </div>
                    </el-form>
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
import icons from '@/components/common/icons';
import goodSchedule from '@/views/goodsManage/goodManage/goodSchedule'
import api from '@/http/api';
export default {
    components:{
        selectHeader,
        myButton,
        icons,
        headerTitle
    },
    data(){
        return {
            isOpen:true,//是否展开搜索

            //商品列表
            comDataObj:{},//商品分状态统计数据
            form:{//搜索条件
                name:'',//商家名称
                status:''// 上架——0 下架——1 全部不传
            },
            tableData: [],
            pageSize:10,
            page: 1,
            total:0,

            ids:[],//批量选择
            operate:'',//当前选择的操作
            options:[//批量操作选项
                {//0删除 1隐藏 2显示
                    value:'',
                    label:'不操作'
                },{
                    value:'0',
                    label:'删除'
                },{
                    value:'1',
                    label:'商品上架'
                },{
                    value:'2',
                    label:'商品下架'
                }
                // ,{
                //     value:'3',
                //     label:'推荐商品'
                // },{
                //     value:'4',
                //     label:'取消推荐'
                // }
            ],

            // 档期读取及更新的所有参数
            isStock:false,//是否打开更新档期的弹窗
            stockForm:{
                stockValue:'',//订单数
                stockList:[]//档期时间
            },
            stockId:'',//选中更新档期id
            stockpage:0,//档期当前月份
            stockOrignalList:[],//后台返回的未编辑之前的数据
            initDate:'',//默认打开日期选择器的时间，显示的是当前月
            initYM:''//当前年月份


        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle','business'])
    },
    mounted(){
        let ths = this;

        ths.webStoreGetCommodityList();//获取商品列表
        ths.getCommodityComStatusStatistics();//商品分状态统计数据
        ths.initOriginalDate();
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.webStoreGetCommodityList();
        },
        //按照上架状态搜索列表
        comStatusFn(status){
            let ths = this;

            ths.form.status = status;
            ths.webStoreGetCommodityList();
        },
        //获取商品列表
        webStoreGetCommodityList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                name:ths.form.name,//商家名称
                status:ths.form.status,
                page:ths.page,
                pageSize:ths.pageSize

            };

            api.webStoreGetCommodityList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                ths.isAdvancedSearch = false;
                for (let key in ths.tableData){
                    if (ths.tableData[key].status == '0'){
                        ths.tableData[key].status = true
                    } else {
                        ths.tableData[key].status = false
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //商品分状态统计数据
        getCommodityComStatusStatistics(){
            let ths = this;
            let params = {
                tk:ths.tk
            };

            api.getCommodityComStatusStatistics(params).then(res => {
                ths.comDataObj = res.data.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //改变分页数量
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
            ths.webStoreGetCommodityList();
        },
        //改变当前页
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.webStoreGetCommodityList();
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
        },
        //添加商品
        addGoodFn(){
            let ths = this;

            ths.$router.push({
                name:'addGood',
                query:{}
            });
            ths.changeChildTitle('添加商品')//跳转的时候将header的值存入store中
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'goodDetail',
                query: {
                    xid:row.xid
                }
            })
            ths.changeChildTitle('商品详情')//跳转的时候将header的值存入store中
        },
        //编辑
        editRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'addGood',
                query: {
                    xid:row.xid
                }
            })
            ths.changeChildTitle('编辑商品')//跳转的时候将header的值存入store中
        },
        //单条信息操作 是否推荐 是否上下架 是否删除
        singleUpdate(value,type){
            let ths = this;
            let id = value.xid.toString();

            ths.ids=[];
            switch (type){
            case 'status'://上下架
                if (value.status == true){
                    ths.operate = '1'//上架
                } else {
                    ths.operate = '2'//下架
                }
                ths.ids.push(id);
                ths.commodityBatchOperation();
                break;
            case 'recommend':
                if (value.recommend == true){
                    ths.operate = '3'//推荐
                } else {
                    ths.operate = '4'//不推荐
                }
                ths.ids.push(id);
                ths.commodityBatchOperation();
                break;
            case 'deleted':
                ths.operate = '0'//删除
                ths.ids.push(id);
                ths.openConfirm();
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
        openConfirm() {
            let ths = this;
            const h = this.$createElement;

            if ( ths.ids.length ===0 || ths.ids ===null){
                ths.$message.warning('请选择需要操作的行');
                return false
            }
            if (ths.operate ==''){
                ths.$message.warning('请选择需要执行的操作');
                return false
            }

            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                    h('span', null, '确定执行操作？')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        ths.commodityBatchOperation();
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 200);
                        }, 1000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                ths.webStoreGetCommodityList()
            });

            // const h = this.$createElement;

            // if ( ths.ids.length ===0 || ths.ids ===null){
            //     ths.$message.warning('请选择需要操作的行');
            //     return false
            // }
            // if (ths.operate ==''){
            //     ths.$message.warning('请选择需要执行的操作项');
            //     return false
            // }
            // this.$msgbox({
            //     title: '是否确认',
            //     message: h('p', null, [
            //         h('span', null, '是否执行操作')
            //     ]),
            //     showCancelButton: true,
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     beforeClose: (action, instance, done) => {
            //         if (action === 'confirm') { //确定
            //             instance.confirmButtonLoading = true;
            //             instance.confirmButtonText = '执行中...';
            //             setTimeout(() => {
            //                 setTimeout(() => {
            //                 }, 300);
            //             }, 3000);
            //         } else {
            //             done();//取消
            //         }
            //     }
            // }).then(action => {

            //     // 确定之后执行
            //     this.$message({
            //         type: 'success',
            //         message: '已成功删除所选项！'
            //     });
            // });
        },
        // 提交 0删除1上架2下架3推荐4不推荐
        commodityBatchOperation(){
            let ths = this;
            let params = {
                tk:ths.tk,
                type:ths.operate,
                ids:ths.ids
            };

            api.commodityBatchOperation(params).then(res => {
                ths.$message({
                    message: '操作成功',
                    type: 'success'
                });
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //打开档期弹窗
        openSchedule(xid){
            let ths = this;

            ths.isStock = true;
            ths.stockId = xid.toString();
            ths.stockForm.stockList = [];
            ths.stockForm.stockValue = '';
            // 获取档期信息
            let params = {
                tk:ths.tk,
                xid:ths.stockId,
                page:ths.stockpage
            };

            api.commodityStocks(params).then(res => {
                ths.stockOrignalList = res.data;
                let list = res.data;

                // if (list.length !=0){
                //     for (let key in list){
                //         ths.stockForm.stockList.push(list[key].date);
                //     }
                // }

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //查询上一个月
        preStockpage(num){
            let ths = this;

            ths.stockpage = num - 1;
            ths.openSchedule(ths.stockId);
            ths.initDate = ths.getPreMonth(ths.initDate);
        },
        //查询下一个月
        nextStockpage(num){
            let ths = this;

            ths.stockpage = num + 1;
            ths.openSchedule(ths.stockId);
            ths.initDate = ths.getNextMonth(ths.initDate);
        },
        initOriginalDate(){
            let ths = this;
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            ths.initYM = year + '年的' + month;
            ths.initDate = year + '-' + month + '-' + day;
        },
        //上一个月的日期
        getPreMonth(date) {
            let arr = date.split('-');
            let year = arr[0]; //获取当前日期的年份
            let month = arr[1]; //获取当前日期的月份
            let day = arr[2]; //获取当前日期的日
            let days = new Date(year, month, 0);

            days = days.getDate(); //获取当前日期中月的天数
            let year2 = year;
            let month2 = parseInt(month) - 1;

            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            let day2 = day;
            let days2 = new Date(year2, month2, 0);

            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            this.initYM = year2 + '年的' + month2;
            let t2 = year2 + '-' + month2 + '-' + day2;

            return t2;
        },
        //下一个月的日期
        getNextMonth(date) {
            let arr = date.split('-');
            let year = arr[0]; //获取当前日期的年份
            let month = arr[1]; //获取当前日期的月份
            let day = arr[2]; //获取当前日期的日
            let days = new Date(year, month, 0);

            days = days.getDate(); //获取当前日期中的月的天数
            let year2 = year;
            let month2 = parseInt(month) + 1;

            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
            let day2 = day;
            let days2 = new Date(year2, month2, 0);

            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            this.initYM = year2 + '年的' + month2;
            let t2 = year2 + '-' + month2 + '-' + day2;

            return t2;
        },
        //关闭更新档期弹窗
        closeFn(formName){
            let ths = this;

            ths.isStock = false;
            ths.stockId = '';
        },
        // 提交更新档期的数据信息
        commodityUpdateStocks(formName){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.stockId,
                list:ths.stockForm.stockList,
                stockValue:ths.stockForm.stockValue//单日可接受订单数
            };

            api.commodityUpdateStocks(params).then(res => {
                ths.$message({
                    message: '操作成功',
                    type: 'success'
                });
                ths.openSchedule(ths.stockId);
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        }
    },
    watch: {
    }
}
</script>
<style lang="scss" scoped>
.head-box{
    position: relative;
    .head-btns{
        position: absolute;
        top: 6px;
        left: 120px;
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
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}
.stock-box{
    padding: 36px;
    width: 660px;
    .box-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .title-name{
            font-size: 18px;
        }
        padding-bottom: 12px;
    }
    .stock-content{
        padding: 12px;
        .stock-pages{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 22px;
        }
    }
    .advanced-btn{
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>
