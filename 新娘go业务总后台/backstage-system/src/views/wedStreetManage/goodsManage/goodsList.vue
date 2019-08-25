<template>
    <div>
        <div>
            <div><header-title :isParent="false" :isBtns="true" :btns="headerBtns"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header
                    :isSelect="true" @openSelectBox="openSelectBox"
                    :hasAdvanced="true" @advancedFn="openAdvanced"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="输入搜索" prop="keyWord">
                                        <el-input v-model="form.keyWord" placeholder="请输入商品名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="商品分类" prop="type">
                                        <el-select v-model="form.type" placeholder="请选择">
                                            <el-option
                                            v-for="item in typeList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="输入商家">
                                        <el-input v-model="form.name" placeholder="请输入商家名称"></el-input>
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
                        style="width: 100%"
                        @selection-change="batchSelect">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="商品ID" width="160"></el-table-column>
                        <el-table-column prop="cover" label="商品主图" width="80">
                            <template slot-scope="scope">
                                <img style="width:50px;height:50px" :src="scope.row.cover" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="商品名称" width="160"></el-table-column>
                        <el-table-column prop="type" label="商品类型"></el-table-column>
                        <el-table-column prop="storeName" label="商家名称" width="100"></el-table-column>
                        <el-table-column label="其他" width="120">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">上架：<el-switch v-model="scope.row.status" @change="updateSwitch(scope.row,'status')" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch></div>
                                <div style="margin-left: 10px">推荐：<el-switch v-model="scope.row.recommend" @change="updateSwitch(scope.row,'recommend')" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch></div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="onum" label="品类排序" width="100"></el-table-column>
                        <el-table-column prop="cnt" label="销量" width="100"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="openConfirm(scope.row,'deleted')">删除</el-button>
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
        <advanced-search v-show="isAdvancedSearch" @closeFn="closeFn" @submitForm="getStoreCommodities"></advanced-search>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import selectHeader from '@/components/common/selectHeader';
import headerTitle from '@/components/common/headerTitle';
import myButton from '@/components/common/myButton';
import advancedSearch from '@/views/wedStreetManage/goodsManage/advancedSearch';//高级搜索
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

            headerBtns:[{
                key:'allGoods',
                name:'全部商品',
                params:'100'

            },{
                key:'onTheShelf',
                name:'已上架',
                params:'100'
            },{
                key:'underTheShelf',
                name:'未上架',
                params:'100'
            }],
            operate:'',
            options:[{//0删除 1隐藏 2显示
                value:'',
                label:'不操作'
            },{
                value:'0',
                label:'商品上架'
            },{
                value:'1',
                label:'商品下架'
            },{
                value:'2',
                label:'设为推荐'
            },{
                value:'3',
                label:'取消推荐'
            },{
                value:'4',
                label:'设为新品'
            },{
                value:'5',
                label:'取消新品'
            },{
                value:'6',
                label:'转移到分类'
            },{
                value:'7',
                label:'移入回收站'
            }],
            ids:[],//批量选择
            typeList:[],
            keyWord:'',//商户账号关键字

            form:{
                xid:'',
                keyWord:'',//商品名称关键字
                type:'',//商品类型
                name:'',//商家名称
                recommend:null,//推荐
                status:null// 上架
            },
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

        ths.getTypeList();//类型下拉列表数据
        ths.getStoreCommodities(ths.form);//获取商品列表
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取商品列表
        getStoreCommodities(formdata){
            let ths = this;
            let params = {
                xid:formdata.xid,//xid
                tk:ths.tk,
                page:ths.page,
                pageSize:ths.pageSize,
                keyWord:formdata.keyWord,//商品名称关键字
                type:formdata.type,//商品类型
                recommend:formdata.recommend,//是否推荐
                status:formdata.status,//是否上架
                name:formdata.name//商家名称
            };

            api.getStoreCommodities(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                ths.isAdvancedSearch = false;
                for (let key in ths.tableData){
                    if (ths.tableData[key].status == '0'){
                        ths.tableData[key].status = true
                    } else {
                        ths.tableData[key].status = false
                    }
                    if (ths.tableData[key].recommend == '0'){
                        ths.tableData[key].recommend = false
                    } else {
                        ths.tableData[key].recommend = true
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //展开高级搜索
        openAdvanced(){
            let ths = this;

            ths.isAdvancedSearch = true;
            this.$refs['form'].resetFields();
        },
        //关闭高级搜索
        closeFn(){
            let ths = this;

            ths.isAdvancedSearch = false;
        },
        //类型下拉列表数据
        getTypeList(){
            let ths = this;
            let params = {};

            api.getTypeList(params).then(res => {
                let list = res.data.data;
                let obj = {id:-1,name:'全部'};

                ths.typeList = [];
                ths.typeList.unshift(obj);
                for (let key in list){
                    if (list[key].name != '婚宴预订'){
                        ths.typeList.push(list[key]);
                    }
                }
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
            ths.getStoreCommodities(ths.form);
        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
            ths.getStoreCommodities(ths.form);
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getStoreCommodities(ths.form);
        },
        //批量选择
        batchSelect(selection){
            let ths = this;

            ths.ids = [];
            for (let key in selection) {
                ths.ids.push(selection[key].id.toString());
            }
        },
        //选择批量的操作
        changeOperate(key){
        },
        //推荐 上下架切换
        updateSwitch(value,type){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:value.id
            };

            switch (type){
            case 'status':
                if (value.status == true){
                    params.status = '0'
                } else {
                    params.status = '1'
                }
                break;
            case 'recommend':
                if (value.recommend == true){
                    params.recommend = 'y'
                } else {
                    params.recommend = 'n'
                }
                break;
            default:
                break;
            }

            api.getStoreUpdateCommodities(params).then(res => {
                ths.$message({
                    message: '更新成功',
                    type: 'success'
                });
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //提交更新信息 推荐 上下架  删除
        //二次确认
        openConfirm(value,type) {
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
                        ths.getCommentBatchOperation();//批量删除
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
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'goodDetail',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('商品详情')//跳转的时候将header的值存入store中
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
        align-items: center;
    }
}

</style>
