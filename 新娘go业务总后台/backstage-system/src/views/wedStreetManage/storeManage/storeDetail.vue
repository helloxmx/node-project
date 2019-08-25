<template>
    <div class="business-detail">
        <!-- title按钮 -->
        <div class="parent-header">
            <div><header-title :isParent="false" :isBtns="true" :btns="btnsList" @btnFn="btnFn"  :hasback="true"></header-title></div>
        </div>
        <!-- 第一部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>基本信息</div>
            </div>
            <div class="detail-one">
                <!-- 第一部分第一列 -->
                <div class="one-box p22">
                    <div class="one-content">
                        <img :src="dataObj.logo" alt="">
                        <div class="store-level">{{dataObj.level}}</div>
                        <div class="store-name">{{dataObj.name}}</div>
                    </div>
                </div>
                <!-- 第一部分第二列 -->
                <div class="two-box">
                    <div class="two-content">
                        <div class="one-row">
                            <div class="one-row-left">商户ID</div>
                            <div class="one-row-right">{{dataObj.id}}</div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">商户账号</div>
                            <div class="one-row-right">{{dataObj.storeCode}}</div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">商户类型</div>
                            <div class="one-row-right">{{dataObj.business}}</div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">机构种类</div>
                            <div class="one-row-right">{{dataObj.type}}</div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">推广码</div>
                            <div class="one-row-right">{{dataObj.inviteCodes}}</div>
                        </div>
                    </div>
                </div>
                <!-- 第一部分第三列 -->
                <div class="two-box three-box">
                    <div class="two-content">
                        <div class="one-row">
                            <div class="one-row-left">返佣比例</div>
                            <div class="one-row-right">{{dataObj.remaidRatio}}%</div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">联系电话</div>
                            <div class="one-row-right">{{dataObj.tel}}</div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">开户时间</div>
                            <div class="one-row-right">{{dataObj.createTime}}</div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">商户等级</div>
                            <div class="one-row-right">{{dataObj.level}}</div>
                            <div @click="iconBtn()">
                                <img src="@/assets/img/icon/content.png" alt="">
                            </div>
                        </div>
                        <div class="one-row">
                            <div class="one-row-left">商户地址</div>
                            <div class="one-row-right">{{dataObj.address}}</div>
                            <div @click="iconBtn()">
                                <img src="@/assets/img/icon/content.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第二部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>统计信息</div>
            </div>
            <div class="detail-two">
                <div class="one-column">
                    <div class="one-column-up">成交金额</div>
                    <div class="one-column-down">{{dataObj.doneMoney}}</div>
                </div>
                <div class="one-column">
                    <div class="one-column-up">成交单量</div>
                    <div class="one-column-down">{{dataObj.doneOrders}}</div>
                </div>
                <div class="one-column">
                    <div class="one-column-up">账户余额</div>
                    <div class="one-column-down">{{dataObj.money}}</div>
                </div>
                <div class="one-column">
                    <div class="one-column-up">获得评价</div>
                    <div class="one-column-down">{{dataObj.comment}}</div>
                </div><div class="one-column">
                    <div class="one-column-up">邀请用户</div>
                    <div class="one-column-down">{{dataObj.inviteUser}}</div>
                </div>
                <div class="one-column">
                    <div class="one-column-up">案例数</div>
                    <div class="one-column-down">{{dataObj.workNum}}</div>
                </div>
                <div v-if="dataObj.type !='环球旅拍'" class="one-column">
                    <div class="one-column-up">收藏人数</div>
                    <div class="one-column-down">{{dataObj.collectNum}}</div>
                </div>
                <div class="one-column">
                    <div class="one-column-up">好评率</div>
                    <div class="one-column-down">{{dataObj.goodComment}}%</div>
                </div>
                <div v-if="dataObj.type =='环球旅拍'" class="one-column">
                    <div class="one-column-up"></div>
                    <div class="one-column-down"></div>
                </div>
                <div class="one-column">
                    <div class="one-column-up"></div>
                    <div class="one-column-down"></div>
                </div>
                <div class="one-column">
                    <div class="one-column-up"></div>
                    <div class="one-column-down"></div>
                </div>
                <div class="one-column">
                    <div class="one-column-up"></div>
                    <div class="one-column-down"></div>
                </div>
                <div class="one-column">
                    <div class="one-column-up"></div>
                    <div class="one-column-down"></div>
                </div>
            </div>
        </div>
        <!-- 第三部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>其他信息</div>
            </div>
            <div class="detail-three">
                <div class="one-column">
                    <div class="one-column-left">商户标签</div>
                    <div class="one-column-right">
                        <span v-for="(item,index) in dataObj.labels" :key="index">#{{item}}</span>
                    </div>
                </div>
                <div class="one-column">
                    <div class="one-column-left">营业执照</div>
                    <div class="one-column-right theme-color" @click="iconBtn()">查看</div>
                </div>
                <div class="one-column">
                    <div class="one-column-left">商家简介</div>
                    <div class="one-column-right theme-color" @click="showStoreInfo(dataObj.id,dataObj.name)">查看</div>
                </div>
                <div class="one-column">
                    <div class="one-column-left"></div>
                    <div class="one-column-right"></div>
                    <div class="one-column-right theme-color" @click="iconBtn()"></div>
                </div>
            </div>
        </div>
        <!-- 第四部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>商品信息</div>
            </div>
            <div class="detail-four">
            <el-table :data="CommodityArray" style="width: 100%">
                    <el-table-column prop="id" label="商品ID" width="180"></el-table-column>
                    <el-table-column prop="cover" label="商品封面图" width="180">
                        <template slot-scope="scope">
                            <img style="width:50px;height:50px" :src="scope.row.cover" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
                    <el-table-column prop="storeName" label="商家名称"></el-table-column>
                    <el-table-column prop="recommend" label="其他">
                        <template slot-scope="scope">
                            上架：
                            <el-switch v-model="scope.row.recommend" @change="recommendSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                        </template>
                        <template slot-scope="scope">
                            推荐：
                            <el-switch v-model="scope.row.recommend" @change="recommendSwitch" active-color="#FF739E" inactive-color="#d8d8d8"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="onum" label="品类排序"></el-table-column>
                    <el-table-column prop="cnt" label="销量"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" style=""
                        @click.native.prevent="showRow(scope.$index, tableData)">查看</el-button>
                        <!-- <el-button type="text" size="small" style=""
                        @click.native.prevent="editRow(scope.$index, tableData)">编辑</el-button> -->
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
        <!-- 第五部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>商家案例</div>
            </div>
            <div class="detail-four">
            <el-table :data="tableData" style="width: 100%">
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
        <!-- 第六部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>订单记录</div>
            </div>
            <div class="detail-four">
            <el-table :data="tableData2" style="width: 100%">
                <el-table-column prop="orderCode" label="订单编号" width="160"></el-table-column>
                    <el-table-column prop="userId" label="用户账号" width="160"></el-table-column>
                    <el-table-column prop="type" label="订单类型"></el-table-column>
                    <el-table-column prop="storeName" label="商户名称" width="100"></el-table-column>
                    <el-table-column prop="fee" label="订单金额" width="100"></el-table-column>
                    <el-table-column prop="status" label="订单状态" width="100"></el-table-column>
                    <el-table-column prop="createTime" label="提交时间"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" style=""
                            @click.native.prevent="showRow(scope.$index, tableData)">查看订单</el-button>
                            <!-- 待付款状态的订单可以关闭 -->
                            <el-button v-if="scope.row.status == '待付款'" type="text" size="small" style=""
                            @click.native.prevent="showRow(scope.$index, tableData)">关闭订单</el-button>
                            <!-- 待接单状态的订单可以取消 -->
                            <el-button v-if="scope.row.status == '待接单'" type="text" size="small" style=""
                            @click.native.prevent="showRow(scope.$index, tableData)">取消订单</el-button>
                            <!-- 已关闭状态的订单可以删除 -->
                            <el-button v-if="scope.row.status == '已关闭'" type="text" size="small" style=""
                            @click.native.prevent="closeRow(scope.$index, tableData)">删除订单</el-button>
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
        <div v-if="isLicense" class="license-box">
            <div class="iconbox">
                <icons :isClose="true" @closeFn="closeFn"></icons>
            </div>
            <div class="imgbox">
                <img :src="dataObj.licenseUrl" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import icons from '@/components/common/icons';
import api from '@/http/api';
export default {
    components:{
        headerTitle,
        icons
    },
    data(){
        return {
            xid:'',//xid
            page: 1,
            pageSize:10,
            total:0,
            dataObj:{},//详情数据
            CommodityArray:[],//商品列表数据
            tableData: [],//案例
            tableData2: [],//订单
            caseForm:{
                page:1,
                pageSize:15,
                name:'',
                xTime:'',
                type:'',
                status:''
            },
            btnsList:[{
                key:'storeDetail',
                name:'商户详情',
                autofocus:true
            },
            {
                key:'editInfo',
                name:'编辑资料',
                autofocus:false
            },
            {
                key:'loginLog',
                name:'登录日志',
                autofocus:false
            }],
            isLicense:false
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getStoreDetail(ths.xid);
        ths.getStoreCommodities(ths.xid);
        ths.getStoreWorkBackList();// 获取案例详情列表数据
        ths.getOrderList();//获取订单列表数据

    },
    methods:{
        //获取商户详情数据
        getStoreDetail(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid//商户Id
            };

            api.getStoreDetail(params).then(res => {
                ths.dataObj = res.data.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取案例详情列表数据
        getStoreWorkBackList(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid,
                name:ths.caseForm.name,
                xTime:ths.caseForm.xid,
                status:ths.caseForm.status,
                keyWord:ths.caseForm.keyWord,
                type:ths.caseForm.type,
                page:ths.caseForm.page,
                pageSize:ths.caseForm.pageSize
            };

            api.getStoreWorkBackList(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取列表数据
        getOrderList(data){
            let ths = this;
            let params = {
                tk:ths.tk,
                rUser:'',
                orderId:'',
                status:'',
                type:'',
                cTime:'',
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getOrderList(params).then(res => {
                ths.tableData2 = res.data.data;
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
        //获取商品列表
        getStoreCommodities(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid//商户Id
            };

            api.getStoreCommodities(params).then(res => {
                ths.CommodityArray = res.data.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        recommendSwitch(){},
        //打开营业执照
        iconBtn(){
            let ths = this;

            ths.isLicense = true;
        },
        //关闭营业执照
        closeFn(){
            let ths = this;

            ths.isLicense = false;
        },
        //商户简介
        showStoreInfo(xid){
            let ths = this;

            this.$router.push({
                name: 'storeInfo',
                query: {
                    xid:xid,//商户id
                    name:ths.dataObj.name//商户名称
                }
            })
            ths.changeChildTitle('商户简介')//跳转的时候将header的值存入store中
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'infoDetail',
                query: {
                    xid:ths.xid
                }
            })
            ths.changeChildTitle('资讯详情')//跳转的时候将header的值存入store中
        },
        //编辑
        editRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'publishArticles',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('发布资讯')//跳转的时候将header的值存入store中
        },
        //删除
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        handleSizeChange(){},
        handleCurrentChange(){}

    }
}
</script>
<style lang="scss" scoped>
.business-detail{
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
    //第一部分
    .detail-one{
        border: 1px solid #d9d9d9;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 200px;
        font-size: 14px;
        color: #4a4a4a;
        //第一列
        .one-box{
            border-right: 1px solid #d9d9d9;
            width: 220px;
            height: 100%;
        }
        .one-content{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        img{
            width: 100px;
            height: 100px;
        }
        .store-level{
            margin-top: 8px;
            padding: 6px 16px;
            border-radius: 16px;
            background: #FF739E;
            color: #ffffff;
        }
        .store-name{
            margin-top: 8px;
        }
        //第二列
        .two-box{
            border-right: 1px solid #d9d9d9;
            width: calc(40% - 110px);
            height: 100%;
            &:last-child{
                border-right:none;
            }
        }
        .three-box{
            border-right: 1px solid #d9d9d9;
            width: calc(60% - 110px);
            height: 100%;
            &:last-child{
                border-right:none;
            }
        }
        .two-content{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            width: 100%;
        }
        .one-row{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 40px;
            border-bottom: 1px solid #d9d9d9;
            &:last-child{
                border-bottom: none;
            }
            img{//icon
                width: 20px;
                height: 20px;
            }
            .one-row-left{
                width: 88px;
                height: 38px;
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px 12px;
                background: #f6f8fb;
            }
            .one-row-right{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px 12px;
                height: 40px;
                border-left: 1px solid #d9d9d9;
            }
        }
    }
    //第二部分
    .detail-two{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        .one-column{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 16.666%;
            border-left: 1px solid #d9d9d9;
            border-top: 1px solid #d9d9d9;
            &:last-child{
                border-bottom: none;
            }
            img{//icon
                width: 20px;
                height: 20px;
            }
            .one-column-up{
                width: 100%;
                height: 40px;
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px 12px;
                border-bottom: 1px solid #d9d9d9;
                background: #f6f8fb;
            }
            .one-column-down{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px 12px;
                height: 40px;
            }
        }
    }
    //第三部分
    .detail-three{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        .one-column{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 50%;
            border-left: 1px solid #d9d9d9;
            border-top: 1px solid #d9d9d9;
            &:last-child{
                border-bottom: none;
            }
            img{//icon
                width: 20px;
                height: 20px;
            }
            .one-column-left{
                width: 88px;
                height: 40px;
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px 12px;
                border-right: 1px solid #d9d9d9;
                background: #f6f8fb;
            }
            .one-column-right{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px 12px;
                height: 40px;
            }
        }
    }
    .license-box{
        position: absolute;
        width: 100%;
        top: 0px;
        background: rgba($color: #000000, $alpha: 0.65);
        height: 100%;
        min-height: 100vh;
        z-index: 10;
        padding-top: 100px;
        .iconbox{
            display: -webkit-flex;
            display: flex;
            flex-direction: row-reverse;
            padding-right: 100px;
        }
        .imgbox{
            width: 100%;
            text-align: center;
            padding-top: 80px;
            img{
                width: 600px;
            }
        }

    }
}
.footer-page{
    width: 100%;
    padding: 16px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row-reverse;
}
</style>
