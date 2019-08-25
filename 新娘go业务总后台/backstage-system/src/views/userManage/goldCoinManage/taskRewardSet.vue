<template>
    <div>
        <div>
            <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="detail backgroundfff p22">
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>
                            新手任务
                            <span>新手任务每个用户只奖励一次，相关值必须为大于0的整数</span>
                        </div>
                    </div>
                    <div>
                        <div class="single-item">
                            <div class="item-left">新手欢迎奖励</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">完善个人信息</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">首次发布新人说</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">首次留言评论</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">首次点赞</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">首次分享商品或攻略</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">首次收藏商品或攻略</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">首次购物成功</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">首次完成商品评价</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail backgroundfff p22">
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>
                            日常任务
                            <span>日常任务可以奖励多次，相关值必须为大于0的整数</span>
                        </div>
                    </div>
                    <div>
                        <div class="single-item">
                            <div class="item-left">每日签到</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">分享商品或攻略</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">发布新人说</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">留言评论</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                        <div class="single-item">
                            <div class="item-left">点赞</div>
                            <div class="item-right">金币：
                                <el-input style="width:200px" placeholder="请输入内容" v-model="input10" clearable></el-input>
                                <span>个</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="submit-box">
                    <div class="task-submit" @click="taskSubmitFn">提交</div>
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
            input10:'',

            keyWord:'',//商户账号关键字
            options: [{
                value: '选项1',
                label: '婚礼策划'
            }, {
                value: '选项2',
                label: '婚宴预定'
            }, {
                value: '选项3',
                label: '婚礼摄影'
            }, {
                value: '选项4',
                label: '婚礼摄像'
            }, {
                value: '选项5',
                label: '婚礼造型'
            }, {
                value: '选项6',
                label: '婚礼主持'
            }],
            value:'',
            value1: '',

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

        ths.getArticleTypeList();//资讯文章类型下拉列表数据
        ths.getArticleLists(ths.keyWord,null,ths.page);//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //资讯文章类型下拉列表数据
        getArticleTypeList(){
            let ths = this;
            let params = {};

            api.getArticleTypeList(params).then(res => {
                ths.typeList = res.data;
                let obj = {id:-1,name:'全部'};

                ths.typeList.unshift(obj);
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取列表数据
        getArticleLists(keyWord,type,page){
            let ths = this;
            let params = {
                tk:ths.tk,
                keyWord:keyWord,
                type:type,
                page:page,
                pageSize:ths.pageSize
            };

            api.getArticleLists(params).then(res => {
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
        taskSubmitFn(){

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
            ths.getArticleLists(ths.keyWord,ths.typeId,1);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getArticleLists(ths.keyWord,ths.typeId,val);
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
            rows.splice(index, 1);
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
.detail{
    margin-bottom: 22px;
    .detail-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        margin-bottom: 22px;
        .squareFF739E{
            width: 16px;
            height: 16px;
            background: #FF739E;
            margin-right: 8px;
        }
    }
}
.single-item{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    width: 100%;
    border: 1px solid #d9d9d9;
    border-bottom: none;
    &:last-child{
        border-bottom: 1px solid #d9d9d9;
    }
    .item-left{
        width:170px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        padding: 12px;
        border-right: 1px solid #d9d9d9;
        background: #f6f8fb;
    }
    .item-right{
        width:calc(100% - 200px);
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 12px;
        span{
            margin-left: 12px;
        }
    }
}
.submit-box{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.task-submit{
    padding: 12px 22px;
    background: #FF739E;
    color: #ffffff;
    border-radius: 4px;
}
</style>
