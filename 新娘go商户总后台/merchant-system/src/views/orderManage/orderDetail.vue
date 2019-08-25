<template>
    <div class="order-detail">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22 backgroundfff">
            <!-- 步骤进度条 -->
            <!-- <div class="step-progress">
                <el-steps :space="200" :active="dataObj.infos.status">
                    <el-step title="提交订单" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="支付订单" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="服务中" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="完成服务" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="完成评价" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
            </div> -->
            <!-- 步骤状态 -->
            <div class="step-status-btns">
                <div>当前订单状态：<span>{{dataObj.infos.statusName}}</span></div>
                <div v-if="dataObj.infos.status == 1">
                    <el-button @click="openRemark('接单')">接单</el-button>
                    <el-button @click="openRemark('拒接订单')">拒接订单</el-button>
                </div>
                <div v-if="dataObj.infos.status == 2 || dataObj.infos.status == 5 || dataObj.infos.status == 6">
                    <el-button @click="openRemark('备注订单')">备注订单</el-button>
                </div>
            </div>
            <!-- 待付款——0 待接单——1 服务中——2 待操作退款——3 待处理提现"——4 待评价——5 已评价——6 已关闭——7 已拒绝——8 已取消——9 已删除——10-->
            <!-- 相关信息 -->
            <div class="step-box">
                <div class="step-detail">
                    <div class="squareFF739E"></div>
                    <div>基本信息</div>
                </div>
                <div class="step-content">
                    <el-table
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column prop="orderCode" label="序号"></el-table-column>
                        <el-table-column prop="createTime" label="提交时间"></el-table-column>
                        <el-table-column prop="userName" label="用户昵称"></el-table-column>
                        <el-table-column prop="commodityName" label="商品名称"></el-table-column>
                        <el-table-column prop="fee" label="订单金额">
                            <template slot-scope="scope">
                                ¥<span>{{scope.row.fee}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div v-if="dataObj.infos.status == 2 || dataObj.infos.status == 5">
                <!-- 用户信息 -->
                <div class="step-box">
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>用户信息</div>
                    </div>
                    <div class="step-content">
                        <el-table
                            border
                            ref="multipleTable"
                            :data="tableData2"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column prop="userName" label="服务用户"></el-table-column>
                            <el-table-column prop="tel" label="手机号码"></el-table-column>
                            <el-table-column prop="sex" label="性别"></el-table-column>
                            <el-table-column prop="marryTime" label="结婚日期"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 服务信息 -->
                <div class="step-box">
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>服务信息</div>
                    </div>
                    <div>
                        <!-- 婚宴预订 -->
                        <div v-if="detailType1" class="step-content">
                            <el-table
                            border
                                ref="multipleTable"
                                :data="tableData3"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column prop="cover" label="商品图片" width="100">
                                    <template slot-scope="scope">
                                        <div class="good-cover">
                                            <img :src="scope.row.cover" alt="">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="storeName" label="服务商家"></el-table-column>
                                <el-table-column prop="hotelcommodityName" label="婚宴场地"></el-table-column>
                                <el-table-column prop="cookName" label="套餐种类"></el-table-column>
                                <el-table-column prop="cookPrice" label="价格">
                                    <template slot-scope="scope">
                                        ¥<span>{{scope.row.fee}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cookTotal" label="婚宴桌数"></el-table-column>
                                <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                                <el-table-column prop="remoteFee" label="异地服务费"></el-table-column>
                                <el-table-column prop="payMoney" label="小计">
                                    <template slot-scope="scope">
                                        ¥<span>{{scope.row.fee}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- 婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持 -->
                        <div v-if="detailType2" class="step-content">
                            <el-table
                                border
                                ref="multipleTable"
                                :data="tableData3"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column prop="cover" label="商品图片" width="100">
                                    <template slot-scope="scope">
                                        <div class="good-cover">
                                            <img :src="scope.row.cover" alt="">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="commodityName" label="商品名称"></el-table-column>
                                <el-table-column prop="downFee" label="定金">
                                    <template slot-scope="scope">
                                        ¥<span>{{scope.row.downFee}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="remoteFee" label="异地服务费">
                                    <template slot-scope="scope">
                                        ¥<span>{{scope.row.remoteFee}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                                <el-table-column prop="fee" label="小计">
                                    <template slot-scope="scope">
                                        ¥<span>{{scope.row.fee}}</span>
                                    </template></el-table-column>
                            </el-table>
                        </div>
                        <!-- 环球旅拍 -->
                        <div v-if="detailType3" class="step-content">
                            <el-table
                                border
                                ref="multipleTable"
                                :data="tableData3"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column prop="cover" label="商品图片" width="100">
                                    <template slot-scope="scope">
                                        <div class="good-cover">
                                            <img :src="scope.row.cover" alt="">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="storeName" label="服务商家"></el-table-column>
                                <el-table-column prop="type" label="商品类型"></el-table-column>
                                <el-table-column prop="fee" label="定金"></el-table-column>
                                <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                                <el-table-column prop="payCash" label="小计"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="step-box">
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>操作信息</div>
                    </div>
                    <div class="step-content">
                        <el-table
                            border
                            ref="multipleTable"
                            :data="operatorTableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column prop="operator" label="操作者"></el-table-column>
                            <el-table-column prop="operateTime" label="操作时间"></el-table-column>
                            <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
                            <el-table-column prop="note" label="备注"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <order-bobm1
        v-if="isRemark"
        :bobmTitle="bobmTitle"
        :hasBobmSecTitle="hasBobmSecTitle"
        :bobmSecTitle="bobmSecTitle"
        :listTitle="listTitle"
        :isInput="isInput"
        :bobmContent="bobmContent"
        @closeFn="remarkCloseFn"
        @submitForm="orderDealOrder"></order-bobm1>
    </div>
</template>
<script>
import singleComment from '@/components/common/singleComment';
import singleGood from '@/components/common/singleGood';
import headerTitle from '@/components/common/headerTitle';
import orderBobm1 from '@/views/orderManage/orderBobm1';//关闭订单/备注订单
import api from '@/http/api';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components:{
        singleComment,//评论 单个
        singleGood,//列表单个元素
        headerTitle,//标题
        orderBobm1//订单操作弹框--关闭订单/备注订单
    },
    data(){
        return {
            // 不同类型的详情不同
            detailType1:false,//详情-婚宴预订
            detailType2:true,//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
            detailType3:false,//详情-环球旅拍

            //不同状态线显示的可操作按钮不同
            isRemark:false,//备注
            itype:'',//处理订单不同的状态 0 接单 1 拒接单 2备注订单 5完成订单
            bobmTitle:'',//窗口标题
            hasBobmSecTitle:false,//是否有副标题
            isInput:false,
            bobmContent:'',//内容
            bobmSecTitle:'',//窗口副标题
            listTitle:'',//窗口内容标题
            dataObj:{},//订单详情
           
            tableData: [],//基本信息
            tableData2:[],//用户信息
            tableData3:[],//服务信息
            operatorTableData:[]//操作数据

        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.orderId = ths.$route.query.orderId;//详情id
        let type = ths.$route.query.type;//类型

        switch (type){
        case '环球旅拍':
            ths.detailType1 = false;//详情-婚宴预订
            ths.detailType2 = false;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
            ths.detailType3 = true;//详情-环球旅拍
            break;
        case '婚宴预订':
            ths.detailType1 = true;//详情-婚宴预订
            ths.detailType2 = false;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
            ths.detailType3 = false;//详情-环球旅拍
            break;
        case '婚礼策划': case '婚礼摄影': case '婚礼摄像': case '婚礼造型':case '婚礼主持':
            ths.detailType1 = false;//详情-婚宴预订
            ths.detailType2 = true;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
            ths.detailType3 = false;//详情-环球旅拍
            break;
        default:
            ths.detailType1 = false;//详情-婚宴预订
            ths.detailType2 = true;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
            ths.detailType3 = false;//详情-环球旅拍
            break;
        }
        //  detailType1:false,//详情-婚宴预订
        //     detailType2:true,//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
        //     detailType3:false
        ths.getOrderDetail();//获取详细信息
    },
    methods:{
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取详情数据
        getOrderDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.orderId
            };

            api.getOrderDetail(params).then(res => {

                let result = res.data;

                ths.dataObj = result;

                ths.tableData = [];//清除原来的数据

                let infos = result.infos;
                let userInfo = result.userInfo;
                let service = result.service;

                if (result.orderCookBook){
                    infos.cookName = result.orderCookBook.name;
                    infos.cookPrice = result.orderCookBook.price;
                    infos.cookTotal = result.orderCookBook.total;
                    infos.hotelcommodityName = result.orderHotel.commodityName;
                    infos.hotelcover = result.orderHotel.cover;
                    infos.hotelname = result.orderHotel.name;
                }
                ths.tableData.push(infos);
                ths.tableData2.push(userInfo);
                ths.tableData3.push(service);
                ths.operatorTableData = result.logs;

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 2 === 0) {
                if (columnIndex === 0) {
                    return [1, 2];
                } else if (columnIndex === 1) {
                    return [0, 0];
                }
            }
        },
        //打开二次确认订单---0 接单 1 拒接单 2备注订单
        openRemark(type){
            let ths = this;

            ths.isRemark = true;
            switch (type){
            // itype 0 接单 1 拒接单 2备注订单
            case '接单':
                ths.hasBobmSecTitle = true;
                ths.isInput = false;
                ths.bobmContent = '';//内容
                ths.bobmTitle = '接单';//窗口标题
                ths.bobmSecTitle = '确认接单吗？';//窗口副标题
                ths.itype = 0;
                break;
            case '拒接订单':
                ths.hasBobmSecTitle = true;
                ths.isInput = true;
                ths.bobmTitle = '拒接订单';//窗口标题
                ths.bobmSecTitle = '真的要拒接订单吗？';//窗口副标题
                ths.listTitle = '拒接理由';//窗口内容标题
                ths.itype = 1;
                break;
            case '备注订单' :
                ths.hasBobmSecTitle = false;
                ths.isInput = true;
                ths.bobmTitle = '备注订单';//窗口标题
                ths.listTitle = '操作备注';//窗口内容标题
                ths.itype = 2;
                break;
            default :
                break;
            }
        },
        //关闭---备注订单窗口
        remarkCloseFn(){
            let ths = this;

            ths.isRemark = false;
        },
        //提交---备注订单窗口
        orderDealOrder(content){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.orderId,
                itype:ths.itype, // 0 接单 1 拒接单 2备注订单
                note:content
            };

            api.orderDealOrder(params).then(res => {
                ths.$message.success({
                    message: '提交成功',
                    type: 'success'
                });
                ths.isRemark = false;//关闭弹窗
                ths.$router.push({
                    name:'orderList',
                    query:{}
                });
                ths.changeChildTitle('订单列表')//跳转的时候将header的值存入store中
            }).catch(e => {
                ths.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        }
    }
}
</script>

<style lang="scss">
.order-detail{
    .step-progress{

    }
    .step-status-btns{
        font-size: 16px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        span{
            color: #FF739E;
        }
    }
    .step-box{
        margin: 22px 0px;
        .step-detail{
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
        .step-content{
            .good-cover{
                width:60px;
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>
