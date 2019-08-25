<template>
    <div>
        <div>
            <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox" @wedBtn="wedBtn"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="案例标题">
                                        <el-input v-model="form.keyWord" placeholder="请输入案例标题"></el-input>
                                    </el-form-item>
                                    <el-form-item label="案例类型">
                                        <el-select v-model="form.type" placeholder="请选择">
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
                        <div class="table-btns">
                            <!-- <el-select class="pl12" v-model="value" placeholder="排序方式">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select> -->
                        </div>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="案例ID" width="160"></el-table-column>
                        <el-table-column prop="cover" label="封面图片" width="80">
                            <template slot-scope="scope">
                                <img style="width:50px;height:50px" :src="scope.row.cover" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="160"></el-table-column>
                        <el-table-column prop="type" label="分类" width="100"></el-table-column>
                        <el-table-column prop="storeName" label="所属商家" width="160"></el-table-column>
                        <el-table-column prop="pubTime" label="发布时间" width="100"></el-table-column>
                        <el-table-column label="相关">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">点赞：{{ scope.row.praiseCnt }}</div>
                                <div style="margin-left: 10px">收藏：{{ scope.row.collectCnt }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style="font-size:14px;"
                                @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
                                <!-- <el-button type="text" size="small" style="font-size:14px;"
                                @click.native.prevent="editRow(scope.$index, tableData)">编辑</el-button> -->
                                <el-button type="text" size="small" style="font-size:14px;"
                                @click.native.prevent="storeDeleteWork(scope.$index, tableData)">删除</el-button>
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
            },{
                value:'1',
                label:'启用'
            },{
                value:'2',
                label:'停用'
            }],
            ids:[]//批量选择后的数组
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getTypeList();//商品类型下拉列表数据
        ths.getStoreWorkBackList(ths.form.keyWord,ths.form.type,ths.page);//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //类型下拉列表数据
        getTypeList(){
            let ths = this;
            let params = {};

            api.getTypeList(params).then(res => {
                let list = res.data.data;
                let obj = {id:-1,name:'全部'};

                list.unshift(obj);
                ths.typeList = [];
                for (let key in list){
                    if (list[key].name !== '环球旅拍'){
                        ths.typeList.push(list[key])
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取列表数据
        getStoreWorkBackList(keyWord,type,page){
            let ths = this;
            let params = {
                tk:ths.tk,
                keyWord:keyWord,
                type:type,
                page:page,
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
        //获取列表数据
        storeDeleteWork(index, rows){
            let id = rows[index].id
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:id
            };

            rows.splice(index, 1);//在页面上实时清除这一行
            api.storeDeleteWork(params).then(res => {
                ths.$message.success('已删除成功');
                // ths.tableData = res.data.data;
                // ths.total = res.data.total;
                // for (let key in ths.tableData) { //处理推荐或者不推荐数据
                //     if (ths.tableData[key].recommend == 0){
                //         ths.tableData[key].recommend = false;
                //     } else {
                //         ths.tableData[key].recommend = true;
                //     }
                // }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //商家详情，编辑信息，登录日志
        wedBtn(){},
        // 下拉选择事件
        selectChange(id){
            let ths = this;

            ths.typeId = id;
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getStoreWorkBackList(ths.form.keyWord,ths.form.type,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getStoreWorkBackList(ths.form.keyWord,ths.form.type,val);
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
