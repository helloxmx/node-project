<template>
    <div>
        <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
        <div class="p22">
            <div class="list-table backgroundfff">
                <div class="table-title">
                    <select-header title="数据列表" :isList="true"></select-header>
                    <div class="table-header-btns">
                        <div class="btn-item">
                            <el-button @click="updateDepart('')">添加</el-button>
                        </div>
                        <div class="btn-item"><el-select v-model="value" placeholder="排序方式">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select></div>
                    </div>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="部门名称" width="160"></el-table-column>
                    <el-table-column prop="note" label="职能描述"></el-table-column>
                    <el-table-column prop="memberNum" label="成员数量" width="100"></el-table-column>
                    <el-table-column prop="createTime" label="添加时间"></el-table-column>
                    <el-table-column label="是否启用" width="120">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" @change="statusSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="showRow(scope.$index, tableData)">权限设置</el-button>
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="updateDepart(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
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
        <update-department v-if="isUpdateDepart" :ruleForm="ruleForm" @submitForm="upDateAuthIOrg" @closeFn="closeFn"></update-department>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import selectHeader from '@/components/common/selectHeader';
import updateDepartment from '@/views/rightManage/department/updateDepartment'
import api from '@/http/api';
export default {
    components:{
        selectHeader,
        headerTitle,
        updateDepartment
    },
    data(){
        return {
            isUpdateDepart:false,//是否增加或者更新部门数据
            id:'',//部门id
            //排序方式
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            ruleForm:{
                name:'',
                note:''
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

        ths.getAuthList();//获取列表数据
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getAuthList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getAuthList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理状态
                    if (ths.tableData[key].status == 0){
                        ths.tableData[key].status = false;
                    } else {
                        ths.tableData[key].status = true;
                    }
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //打开 增加或者更新弹框
        updateDepart(row){
            let ths = this;

            if (row !=''){
                ths.id = row.id;//更新
                ths.ruleForm.name = row.name;
                ths.ruleForm.note = row.note;
            } else {
                ths.id = '';//新增
                ths.ruleForm.name = '';
                ths.ruleForm.note = '';
            }


            ths.isUpdateDepart = true;
        },
        //关闭 增加或者更新弹框
        closeFn(){
            let ths = this;

            ths.isUpdateDepart = false;
        },
        //提交增加或者更新数据
        upDateAuthIOrg(data){
            let ths = this;

            let params = {
                tk:ths.tk,
                name:data.name,
                note:data.note,
                id:ths.id
            };

            api.upDateAuthIOrg(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });

                ths.isUpdateDepart = false;
                ths.getAuthList(); //更新列表数据
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
            ths.getAuthList(ths.keyWord,ths.typeId,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getAuthList(ths.keyWord,ths.typeId,val);
        },
        //启动或者不启动的操作按钮
        statusSwitch(value){
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
        .table-header-btns{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
        }
        .btn-item{
            margin-left: 12px;
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
