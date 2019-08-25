<template>
    <div>
        <div>
            <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header
                    :isSelect="true" @openSelectBox="openSelectBox"
                    :hasAdvanced="true" @advancedFn="openAdvanced"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="商户账号">
                                        <el-input v-model="form.xid" clearable :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="商户名称">
                                        <el-input v-model="form.name" clearable :style="{width:formWidth}" placeholder="商户名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="开户时间">
                                        <el-date-picker
                                            v-model="form.xTime"
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
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
                        <div class="table-btns">
                            <my-button class="pl12" :isAddBus="true" @addBusFn="addBusFn"></my-button>
                            <!-- <el-select class="pl12" v-model="value" placeholder="导出数据">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select> -->
                            <!-- <el-select class="pl12" v-model="value" placeholder="排序方式">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select> -->
                        </div>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="商户ID" width="160"></el-table-column>
                        <el-table-column prop="storeCode" label="商户账号" width="160"></el-table-column>
                        <el-table-column prop="name" label="商户名称"></el-table-column>
                        <el-table-column prop="type" label="商户类型" width="100"></el-table-column>
                        <el-table-column prop="business" label="机构种类" width="100"></el-table-column>
                        <el-table-column prop="level" label="商户等级"></el-table-column>
                        <el-table-column label="成交金额" width="120">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{ scope.row.fee }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="账户启用状态" width="120">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.status" @change="recommendSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="editRow(scope.$index, tableData)">编辑</el-button>
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer-page">
                        <div>
                            <!-- <el-select v-model="operate" placeholder="请选择" @change="changeOperate">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-button plain @click="openConfirm">确认</el-button> -->
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
        <advanced-search v-show="isAdvancedSearch" @closeFn="closeFn" @submitForm="submitForm"></advanced-search>
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
            isAdvancedSearch:false,//高级搜索
            isOpen:true,//是否打开筛选框

            value1:'',

            tableData: [],
            pageSize:10,
            page: 1,
            total:0,
            // screenHeight:500,
            value: '',

            operate:'',//操作的元素
            options:[{//0删除 1启用 2停用
                value:'',
                label:'不操作'
            },{
                value:'0',
                label:'删除'
            },{
                value:'1',
                label:'启用'
            },{
                value:'2',
                label:'停用'
            }],
            ids:[],//批量选择后的数组
            options2: [{
                value: '0',
                label: '选中用户'
            }, {
                value: '1',
                label: '全部用户'
            }],
            options1: [{
                value: '0',
                label: '升序'
            }, {
                value: '1',
                label: '降序'
            }],
            multipleSelection:[],
            // screenHeight: document.body.clientHeight - 800
            form: {
                xid:'',//商户账号
                name: '',//商户名称
                type: '',//商户类型
                xTime: '',//开户时间
                status:''//账户状态
            },
            formWidth:'190px'
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getStoreList(ths.form.xid,ths.form.name,ths.form.xTime,ths.page);//获取列表数据 商户Id/商户名称/时间/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getStoreList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                name:ths.form.name,//商户名称
                xTime:ths.form.xTime,//开户时间
                xid:ths.form.xid,//商户Id
                type:ths.form.type,//商户类型
                status:ths.form.status,//账户状态
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getStoreList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    ths.tableData[key].fee = ths.tableData[key].fee ? ths.tableData[key].fee.toFixed(2) : '0.00';
                    if (ths.tableData[key].status == 0){ //0启用
                        ths.tableData[key].status = true;
                    } else {
                        ths.tableData[key].status = false;
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //导出商户列表
        getReportStore(){
            let ths = this;
            let params = {};

            api.getReportStore(params).then(res => {
                ths.$message({
                    message: '导出成功',
                    type: 'success'
                });
            }).catch(e => {
                ths.$message({
                    message: '导出失败',
                    type: 'error'
                });
            })
        },
        //高级搜索
        submitForm(formdata){
            let ths = this;

            ths.form.xid = formdata.xid;
            ths.form.name = formdata.name;
            ths.form.type = formdata.type;
            ths.form.xTime = formdata.xTime;
            ths.form.status = formdata.status;
            ths.getStoreList();
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
        // 下拉选择事件
        selectChange(id){
            let ths = this;

            ths.typeId = id;
        },
        //表格多选或者不选择
        handleSelectionChange(rows){
            let ths = this;

            ths.ids = [];
            for (let key in rows){
                ths.ids.push(rows[key].id.toString());
            }
        },
        //选择批量的操作
        changeOperate(key){
        },
        //批量操作数据删除 启动
        getStoreUpdateBatch(){
            let ths = this;
            let params = {
                tk:ths.tk,
                ids:ths.ids,//批量数组
                type:ths.operate//操作类型 0删除1启用2停用
            };

            api.getStoreUpdateBatch(params).then(res => {
                ths.$message({
                    message: '操作成功',
                    type: 'success'
                });
            }).catch(e => {
                ths.$message({
                    message: '操作失败',
                    type: 'error'
                });
            })
        },
        //添加商户
        addBusFn(){
            let ths = this;

            ths.$router.push({
                name:'addStore',
                query:{}
            });
            ths.changeChildTitle('添加商户')//跳转的时候将header的值存入store中
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.form.type = null;
            ths.form.status = null;
            ths.getStoreList();

        },
        //改变一页展示条数
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
            ths.getStoreList();
        },
        //跳转到第几页
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getStoreList();
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
            let ths = this;

            ths.ids = [];
            ths.ids.push(rows[index].id.toString());
            ths.operate = '0'; //删除
            ths.getStoreUpdateBatch();
            rows.splice(index, 1);
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
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
                ths.$message.warning('请选择需要执行的操作项');
                return false
            }
            this.$msgbox({
                title: '是否确认',
                message: h('p', null, [
                    h('span', null, '进行该批量操作')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') { //确定
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '操作中...';
                        ths.getStoreUpdateBatch();//批量删除
                        ths.getStoreList();//刷新列表
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
