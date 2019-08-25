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
                                    <el-form-item label="输入搜索">
                                        <el-input v-model="form.keyWord" placeholder="请输入关键字搜索"></el-input>
                                    </el-form-item>
                                    <el-form-item label="输入用户">
                                        <el-input v-model="form.name" placeholder="用户手机号或昵称"></el-input>
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
                        <el-table-column prop="code" label="订单号" width="160"></el-table-column>
                        <el-table-column prop="tel" label="用户手机号" width="120"></el-table-column>
                        <el-table-column prop="name" label="商品名称"></el-table-column>
                        <el-table-column label="评价" width="100">
                            <template slot-scope="scope">
                                <star :starts="scope.row.start"></star>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" label="评价时间"></el-table-column>
                        <!-- <el-table-column label="显示" width="80">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.showStatus" @change="recommendSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                            </template>
                        </el-table-column> -->
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
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
import star from '@/components/common/star';//评价
import api from '@/http/api';
export default {
    components:{
        selectHeader,
        myButton,
        headerTitle,
        star//评价
    },
    data(){
        return {
            isAdvancedSearch:false,//高级搜索
            isOpen:true,//是否打开筛选框

            form:{
                keyWord:'',//关键字
                name:'',//名称
                type:''
            },

            typeList: [],
            value: '',
            operate:'',//操作的元素
            options:[{//0删除 1隐藏 2显示
                value:'',
                label:'不操作'
            },{
                value:'0',
                label:'删除'
            },{
                value:'1',
                label:'隐藏'
            },{
                value:'2',
                label:'显示'
            }],
            ids:[],//批量选择后的数组

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

        ths.getCommentCommodity();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getCommentCommodity(){
            let ths = this;
            let params = {
                tk:ths.tk,
                keyWord:ths.form.keyWord,
                name:ths.form.name,
                type:ths.form.type,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getCommentCommodity(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    if (ths.tableData[key].showStatus == 0){
                        ths.tableData[key].showStatus = false;
                    } else {
                        ths.tableData[key].showStatus = true;
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
            ths.getCommentCommodity();

        },
        //每页显示的数目
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;//每页的数目
            ths.getCommentCommodity();
        },
        //改变当前页
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;//当前页码
            ths.getCommentCommodity();
        },
        batchSelect(selection){
            let ths = this;

            ths.ids = [];
            for (let key in selection) {
                ths.ids.push(selection[key].id.toString());
            }
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'goodRateDetail',//评价详情
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('评价详情')//跳转的时候将header的值存入store中
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
        },
        //批量评价提交
        getCommentBatchOperation(){
            let ths = this;
            let params = {
                tk:ths.tk,
                ids:ths.ids,//批量数组
                type:ths.operate//0删除 1隐藏 2显示
            };

            api.getCommentBatchOperation(params).then(res => {
                ths.$message.success('已成功执行！')
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
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
                    h('span', null, '是否执行操作？')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') { //确定
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            ths.getCommentBatchOperation();//批量删除
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 200);
                        }, 1000);
                    } else {
                        done();//取消
                    }
                }
            }).then(action => {
                ths.getCommentCommodity();//刷新列表
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
