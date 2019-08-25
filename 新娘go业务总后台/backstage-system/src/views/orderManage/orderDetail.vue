<template>
    <div class="order-detail">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22 backgroundfff">
            <!-- 步骤进度条 -->
            <div class="step-progress">
                <!-- finish-status="success" -->
                <el-steps :space="200" :active="dataObj.infos.status">
                    <el-step title="提交订单" description=""></el-step>
                    <el-step title="支付订单" description=""></el-step>
                    <el-step title="服务中" description=""></el-step>
                    <el-step title="完成服务" description=""></el-step>
                    <el-step title="完成评价" description=""></el-step>
                </el-steps>
            </div>
            <!-- 步骤状态 -->
            <div class="step-status-btns">
                <div>当前订单状态：<span>{{dataObj.statusName}}</span></div>
                <div>
                    <el-button v-if="dataObj.statusName == '待付款'" @click="closeOrder">关闭订单</el-button>
                    <el-button v-if="dataObj.statusName == '待接单'" @click="cancleOrder">取消订单</el-button>
                    <el-button v-if="dataObj.statusName == '已关闭'" @click="deleteOrder">删除订单</el-button>
                    <el-button @click="remarkOrder">备注订单</el-button>
                    <!-- <el-button @click="cancleOrder">测试取消订单</el-button> -->
                </div>
            </div>
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
                        <el-table-column prop="orderCode" label="订单编号"></el-table-column>
                        <el-table-column prop="orderTime" label="提交时间"></el-table-column>
                        <el-table-column prop="userId" label="用户手机号">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">{{scope.row.tel}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="dataObj.infos.orderType != '婚宴预订' && dataObj.infos.orderType != '环球旅拍' && dataObj.infos.status == 0" prop="serviceArea" label="服务地区"></el-table-column>
                        <el-table-column v-if="dataObj.infos.status != 0 && dataObj.infos.orderType != '环球旅拍'" prop="serviceArea" label="服务地区"></el-table-column>
                        <el-table-column prop="orderType" label="订单类型"></el-table-column>
                        <el-table-column v-if="dataObj.infos.status != 0 " prop="payCoin" label="订单可得金币">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">{{scope.row.getCoin}}个</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="step-box">
                <div class="step-detail">
                    <div class="squareFF739E"></div>
                    <div>用户信息</div>
                </div>
                <div class="step-content">
                    <el-table
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column prop="userName" label="服务用户"></el-table-column>
                        <el-table-column prop="tel" label="手机号码"></el-table-column>
                        <el-table-column prop="sex" label="性别"></el-table-column>
                        <el-table-column prop="marryDate" label="结婚日期"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="step-box">
                <!-- 只有待付款状态下有服务信息 -->
                <div v-if="dataObj.infos.status == 0">
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>服务信息</div>
                    </div>
                    <div>
                        <!-- 婚宴预订 -->
                        <div v-if="dataObj.infos.orderType == '婚宴预订'" class="step-content">
                            <el-table
                            border
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column prop="cover" label="商品图片">
                                    <template slot-scope="scope">
                                        <div class="good-cover">
                                            <img :src="scope.row.cover" alt="">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="storeName" label="服务商家"></el-table-column>
                                <el-table-column prop="commodityName" label="婚宴场地"></el-table-column>
                                <el-table-column prop="groupName" label="套餐种类"></el-table-column>
                                <el-table-column prop="unitPrice" label="单价">
                                    <template slot-scope="scope">
                                        <div style="margin-left: 10px">¥{{scope.row.unitPrice}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="num" label="婚宴桌数"></el-table-column>
                                <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                                <el-table-column prop="price" label="小计">
                                    <template slot-scope="scope">
                                        <div style="margin-left: 10px">¥{{scope.row.price}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- 婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持 -->
                        <div v-if="dataObj.infos.orderType != '婚宴预订' && dataObj.infos.orderType != '环球旅拍' " class="step-content">
                            <el-table
                                border
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column prop="cover" label="商品图片">
                                    <template slot-scope="scope">
                                        <div class="good-cover">
                                            <img :src="scope.row.cover" alt="">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="storeName" label="服务商家"></el-table-column>
                                <el-table-column prop="commodityName" label="套餐名称"></el-table-column>
                                <el-table-column prop="unitPrice" label="单价">
                                    <template slot-scope="scope">
                                        <div style="margin-left: 10px">¥{{scope.row.unitPrice}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                                <el-table-column prop="remoteFee" label="异地服务费">
                                    <template slot-scope="scope">
                                        <div style="margin-left: 10px">¥{{scope.row.remoteFee}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="price" label="小计">
                                    <template slot-scope="scope">
                                        <div style="margin-left: 10px">¥{{scope.row.price}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- 环球旅拍 -->
                        <div v-if="dataObj.infos.orderType == '环球旅拍'" class="step-content">
                            <el-table
                                border
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column prop="cover" label="商品图片">
                                    <template slot-scope="scope">
                                        <div class="good-cover">
                                            <img :src="scope.row.cover" alt="">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="storeName" label="服务商家"></el-table-column>
                                <el-table-column prop="commodityName" label="套餐名称"></el-table-column>
                                <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                                <el-table-column prop="price" label="小计">
                                    <template slot-scope="scope">
                                        <div style="margin-left: 10px">¥{{scope.row.price}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="total-fee">
                        <div>合计：<span>¥{{dataObj.infos.price}}</span></div>
                    </div>
                </div>
                <div v-else>
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>商品信息</div>
                    </div>
                    <div class="step-content">
                        <el-table
                        border
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column prop="cover" label="商品图片">
                                <template slot-scope="scope">
                                    <div class="good-cover">
                                        <img :src="scope.row.cover" alt="">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="storeName" label="服务商家"></el-table-column>
                            <el-table-column prop="commodityName" label="套餐名称"></el-table-column>
                            <el-table-column v-if="dataObj.infos.orderType != '环球旅拍'" prop="depositFee" label="定金">
                                <template slot-scope="scope">
                                    <div style="margin-left: 10px">¥{{scope.row.depositFee}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="dataObj.infos.orderType != '环球旅拍'" prop="remoteFee" label="异地服务费">
                                <template slot-scope="scope">
                                    <div style="margin-left: 10px">¥{{scope.row.remoteFee}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
                            <el-table-column prop="fee" label="小计">
                                <template slot-scope="scope">
                                    <div style="margin-left: 10px">¥{{scope.row.fee}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="total-fee">
                        <div>合计：<span>¥{{dataObj.infos.fee}}</span></div>
                    </div>
                </div>
            </div>

            <div class="step-box">
                <div class="step-detail">
                <div class="squareFF739E"></div>
                    <div>费用信息</div>
                </div>
                <div class="step-content">
                    <el-table
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column prop="fee" label="商品合计">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{scope.row.fee}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="payCoin" label="金币抵扣">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">
                                    <span v-if="scope.row.payCoin && scope.row.payCoin !=0">-{{scope.row.payCoin}}个</span>
                                    <span v-else>/</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="payCash" label="余额抵扣">
                            <template slot-scope="scope">
                                <span v-if="scope.row.payCash && scope.row.payCash !='0.00'">-¥{{scope.row.payCash}}</span>
                                <span v-else>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="payMoney" label="实付款">
                            <template slot-scope="scope">
                                <span v-if="scope.row.payMoney">¥{{scope.row.payMoney}}</span>
                                <span v-else>/</span>
                            </template>
                        </el-table-column>
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
                    <!-- <el-table-column prop="orderStatus" label="付款状态"></el-table-column> -->
                    <el-table-column prop="note" label="备注"></el-table-column>
                </el-table>
            </div>
            <order-bobm1 v-if="isClose" bobmTitle="关闭订单" listTitle="操作"
                @closeFn="closeCloseFn" @submitForm="submitClose"></order-bobm1>
            <order-bobm1 v-if="isRemark" bobmTitle="备注订单" listTitle="操作"
                @closeFn="remarkCloseFn" @submitForm="submitRemark"></order-bobm1>
        </div>
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
            isClose:false,//待付款-关闭
            isCancle:false,//待接单-取消
            isDelete:false,//已关闭-删除
            isRemark:false,//备注

            dataObj:{ //订单详情
                business:1,//订单状态
                readTimes:100,//点赞数
                title:'',//文章标题
                type:'',//文章分类
                userId:'',//商户ID
                cover:'',//封面
                statusName:'待付款'
            },
            tableData: [],//数据
            operatorTableData:[]//操作数据
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.orderId = ths.$route.query.orderId;//详情id
        // let type = ths.$route.query.type;//类型

        // switch (type){
        // case '环球旅拍':
        //     ths.detailType1 = false;//详情-婚宴预订
        //     ths.detailType2 = false;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
        //     ths.detailType3 = true;//详情-环球旅拍
        //     break;
        // case '婚宴预订':
        //     ths.detailType1 = true;//详情-婚宴预订
        //     ths.detailType2 = false;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
        //     ths.detailType3 = false;//详情-环球旅拍
        //     break;
        // case '婚礼策划': case '婚礼摄影': case '婚礼摄像': case '婚礼造型':case '婚礼主持':
        //     ths.detailType1 = false;//详情-婚宴预订
        //     ths.detailType2 = true;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
        //     ths.detailType3 = false;//详情-环球旅拍
        //     break;
        // default:
        //     ths.detailType1 = false;//详情-婚宴预订
        //     ths.detailType2 = true;//婚礼策划、婚礼摄影、婚礼摄像、婚礼造型、婚礼主持
        //     ths.detailType3 = false;//详情-环球旅拍
        //     break;
        // }
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

                if (result.orderCookBook){
                    infos.cookName = result.orderCookBook.name;
                    infos.cookPrice = result.orderCookBook.price;
                    infos.cookTotal = result.orderCookBook.total;
                    infos.hotelcommodityName = result.orderHotel.commodityName;
                    infos.hotelcover = result.orderHotel.cover;
                    infos.hotelname = result.orderHotel.name;
                }
                ths.tableData.push(infos);
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    ths.tableData[key].depositFee = ths.tableData[key].depositFee ? ths.tableData[key].depositFee.toFixed(2) : '0.00';//定金
                    ths.tableData[key].fee = ths.tableData[key].fee ? ths.tableData[key].fee.toFixed(2) : '0.00';
                    ths.tableData[key].payCoin = ths.tableData[key].payCoin || '0';
                    ths.tableData[key].payCash = ths.tableData[key].payCash ? ths.tableData[key].payCash.toFixed(2) : '0.00';
                    ths.tableData[key].price = ths.tableData[key].price ? ths.tableData[key].price.toFixed(2) : '0.00';
                    ths.tableData[key].unitPrice = ths.tableData[key].unitPrice ? ths.tableData[key].unitPrice.toFixed(2) : '0.00';
                    ths.tableData[key].payMoney = ths.tableData[key].payMoney ? ths.tableData[key].payMoney.toFixed(2) : '0.00';
                    ths.tableData[key].remoteFee = ths.tableData[key].remoteFee ? ths.tableData[key].remoteFee.toFixed(2) : '0.00';
                }
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
        // 打开---关闭订单窗口
        closeOrder(){
            let ths = this;

            ths.isClose = true;
        },
        //打开---取消订单窗口
        cancleOrder(){
            let ths = this;

            ths.$router.push({
                name:'orderCancle',
                query:{
                    orderId:ths.orderId,
                    payCash:ths.dataObj.infos.payCash
                }
            });
            ths.changeChildTitle('取消订单');//跳转后的页面title
        },
        //打开---删除订单窗口
        deleteOrder(){
            let ths = this;

            ths.isDelete = true;
        },
        //打开---备注订单窗口
        remarkOrder(){
            let ths = this;

            ths.isRemark = true;
        },
        // 关闭---关闭订单窗口
        CloseCloseFn(){
            let ths = this;

            ths.isClose = false;
        },
        //关闭---备注订单窗口
        remarkCloseFn(){
            let ths = this;

            ths.isRemark = false;
        },
        //提交---关闭订单窗口
        submitClose(content){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.orderId,
                note:content
            };

            api.orderClose(params).then(res => {
                ths.$message.success({
                    message: '提交成功',
                    type: 'success'
                });
                ths.isClose = false;//关闭弹窗

            }).catch(e => {
                ths.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        },
        //提交---备注订单窗口
        submitRemark(content){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.orderId,
                note:content
            };

            api.orderRemark(params).then(res => {
                ths.$message.success({
                    message: '提交成功',
                    type: 'success'
                });
                ths.isRemark = false;//关闭弹窗

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
        margin-top: 22px;
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
            // .userId-tip{
            //     color: #FF739E;
            //     padding-left: 14px;
            // }
            .good-cover{
                width:60px;
                img{
                    width: 100%;
                }
            }
        }
        //合计
        .total-fee{
            display: -webkit-flex;
            display: flex;
            flex-direction: row-reverse;
            padding-top: 22px;
            padding-right: 4px;
            font-size: 20px;
            span{
                color: #FF739E;
            }
        }
    }
}
</style>
