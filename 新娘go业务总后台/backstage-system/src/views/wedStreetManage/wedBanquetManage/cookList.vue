<template>
    <div>
        <div>
            <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="list-table backgroundfff">
                    <div class="table-title">
                        <select-header title="数据列表" :isList="true"></select-header>
                        <div class="table-btns">
                            <my-button class="pl12" :isAddCook="true" @addCookFn="addCookFn"></my-button>
                        </div>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="batchSelect">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="菜单名称" width="200"></el-table-column>
                        <el-table-column prop="price" label="套餐金额" width="160">
                            <template slot-scope="scope">
                                ¥{{scope.row.price}}元/桌
                            </template>
                        </el-table-column>
                        <el-table-column label="是否上架" width="120">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.showStatus" @change="singleUpdate(scope.row,'status')" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="total" label="销量"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
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
            tableData: [],
            pageSize:10,
            page: 1,
            total:0,

            ids:[],//批量选择
            operate:'',
            options:[//批量操作选项
                {//0删除 1隐藏 2显示
                    value:'',
                    label:'不操作'
                },{
                    value:'0',
                    label:'删除'
                },{
                    value:'1',
                    label:'菜品上架'
                },{
                    value:'2',
                    label:'菜品下架'
                }
                // ,{
                //     value:'3',
                //     label:'推荐商品'
                // },{
                //     value:'4',
                //     label:'取消推荐'
                // }
            ]

        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getCbookStoreBackList();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //添加商品
        addCookFn(){
            let ths = this;

            ths.$router.push({
                name:'addCook',
                query:{}
            });
            ths.changeChildTitle('添加商品')//跳转的时候将header的值存入store中
        },
        //获取列表数据
        getCbookStoreBackList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getCbookStoreBackList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //上架或者不上架
                    if (ths.tableData[key].showStatus == 0){
                        ths.tableData[key].showStatus = true;
                    } else {
                        ths.tableData[key].showStatus = false;
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getCbookStoreBackList(val);
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows[index];//当前选中行的数据[{}]

            this.$router.push({
                name: 'cookDetail',
                query: {
                    xid:row.xid
                }
            })
            ths.changeChildTitle('菜单详情')//跳转的时候将header的值存入store中
        },
        //单条信息操作 是否推荐 是否上下架 是否删除
        singleUpdate(value,type){
            let ths = this;
            let id = value.xid.toString();

            ths.ids=[];
            switch (type){
            case 'status'://上下架
                if (value.showStatus == true){
                    ths.operate = '1'//上架
                } else {
                    ths.operate = '2'//下架
                }
                ths.ids.push(id);
                ths.cbookGroupBatchOperation();
                break;
            case 'recommend':
                if (value.recommend == true){
                    ths.operate = '3'//推荐
                } else {
                    ths.operate = '4'//不推荐
                }
                ths.ids.push(id);
                ths.cbookGroupBatchOperation();
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
                ths.ids.push(selection[key].xid.toString());
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
                        ths.cbookGroupBatchOperation();
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
                ths.getCbookStoreBackList()
            });
        },
        // 提交 0删除1上架2下架3推荐4不推荐
        cbookGroupBatchOperation(){
            let ths = this;
            let params = {
                tk:ths.tk,
                type:ths.operate,
                ids:ths.ids
            };

            api.cbookGroupBatchOperation(params).then(res => {
                ths.$message({
                    message: '操作成功',
                    type: 'success'
                });
                ths.getCbookStoreBackList();
                ths.operate = '';
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
