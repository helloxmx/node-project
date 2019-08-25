
<template>
    <div class="add-box backgroundfff">
        <header-title :isParent="false" :title="headerChildTitle"></header-title>
        <div class="step-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="142px" class="demo-ruleForm">
                <!-- 基础信息 -->
                <div class="step-content">
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>基本信息</div>
                    </div>
                    <div class="content-form">
                        <el-form-item label="商品类型：" prop="type" style="width:400px;">{{ruleForm.type}}</el-form-item>
                        <div>
                            <div v-if="ruleForm.type == '婚宴预订'">
                                <el-form-item label="婚宴厅名称：" prop="name" style="width:400px;">{{ruleForm.commodityName}}</el-form-item>
                                <el-form-item label="最低消费：" prop="price" style="width:400px;">¥{{ruleForm.price}}</el-form-item>
                                <el-form-item label="可容纳桌数：" prop="capacity" style="width:400px;">0到{{ruleForm.capacity}}桌</el-form-item>
                            </div>
                            <div v-else>
                                <div>
                                    <div v-if="ruleForm.type == '婚礼策划'">
                                        <el-form-item label="套餐名称：" prop="name" style="width:400px;">{{ruleForm.commodityName}}</el-form-item>
                                        <el-form-item label="商家ID：" prop="storeId" style="width:400px;">{{ruleForm.storeId}}</el-form-item>
                                    </div>
                                    <div v-else>
                                        <el-form-item label="商品名称：" prop="name" style="width:400px;">{{ruleForm.commodityName}}</el-form-item>
                                    </div>
                                </div>
                                <el-form-item label="商品售价：" prop="price" style="width:400px;">¥{{ruleForm.price}}</el-form-item>
                                <el-form-item label="商品原价：" prop="originPrice" style="width:400px;">¥{{ruleForm.originPrice}}</el-form-item>
                                <!-- <el-form-item label="本地服务区域：" prop="locationId">{{ruleForm.locationId | locationFn}}</el-form-item> -->
                                <el-form-item label="异地服务费：" prop="isRemote">{{ruleForm.isRemote | remoteFn}}</el-form-item>
                                </div>
                        </div>
                        <div v-if="ruleForm.isRemote == '1'">
                            <el-form-item label="省内：" prop="remoteInpro" style="width:400px;">¥{{ruleForm.remoteInPro}}</el-form-item>
                            <el-form-item label="国内：" prop="remoteIncut" style="width:400px;">¥{{ruleForm.remoteInCut}}</el-form-item>
                            <el-form-item label="海外：" prop="remoteInwrd" style="width:400px;">¥{{ruleForm.remoteInWrd}}</el-form-item>
                        </div>
                    </div>
                    <div class="content-form">
                        <el-form-item label="商品介绍：" prop="description">
                            <div v-html="ruleForm.description"></div>
                        </el-form-item>
                    </div>
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>档期信息：</div>
                    </div>
                    <div class="content-form">
                        <div class="stock-pages">
                            <el-button type="text" icon="el-icon-caret-left" :disabled="stockpage <= 0" @click="preStockpage(stockpage)">上个月</el-button>
                            <div>
                                <div v-if="stockOrignalList.length != 0">
                                    <div v-for="item in stockOrignalList" :key="item.date">{{item.date}}：可接受{{item.num}}个订单</div>
                                </div>
                                <div v-else>{{initYM}}月暂无档期安排</div>
                            </div>
                            <el-button type="text" @click="nextStockpage(stockpage)">下个月<i class="el-icon-caret-right el-icon--right"></i></el-button>
                        </div>
                        <!-- <div>
                            <el-form-item label="单日可接订单数：" prop="remoteInwrd" style="width:400px;">¥{{ruleForm.remoteInWrd}}</el-form-item>
                        </div> -->
                    </div>
                </div>
                <!-- 区别信息 -->
                <div class="step-content">
                    <!-- 商品元素 -->
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>商品元素</div>
                    </div>
                    <div class="content-form">
                        <el-form-item label="风格：" prop="elementCatagory">{{ruleForm.category}}</el-form-item>
                        <el-form-item label="颜色：" prop="elementColor">{{ruleForm.color}}</el-form-item>
                    </div>
                    <!-- 0——婚礼策划 1——婚宴预订 2——婚礼摄影 3——婚礼摄像 4——婚礼造型 5——婚礼主持 6——环球旅拍 -->
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>商品内容</div>
                    </div>
                    <div class="content-form">
                        <!-- 0——婚礼策划 -->
                        <div v-if="ruleForm.type == '婚礼策划'">
                            <div class="good-table">
                                <div class="good-row">
                                    <div class="good-column-left">类型</div>
                                    <div class="good-column">具体内容</div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">团队</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.team" :key="item.name" :label="item.name">：{{item.value}}位</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">会场布置</div>
                                    <div class="good-column">
                                        <div>签到背景墙个性主题定制设计（提供效果图）</div>
                                        <el-form-item v-for="item in dataList0.scene" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">花艺装饰</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.model" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">灯光舞美</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.works" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">补充说明</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.other" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 1——婚宴预订 -->
                        <div v-if="ruleForm.type == '婚宴预订'">
                            <div class="good-table">
                                <div class="good-row">
                                    <div class="good-column-left">参数类型</div>
                                    <div class="good-column">具体内容</div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">形状</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.team" :key="item.name" :label="item.name">：{{item.value | shapeFn}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">面积</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.scene" :key="item.name" :label="item.name">：{{item.value}}<span>m²</span></el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">层高</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.model" :key="item.name" :label="item.name">：{{item.value}}<span>m</span></el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">立柱</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList0.works" :key="item.name" :label="item.name">：{{item.value}}<span>个</span></el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 2——婚礼摄影 -->
                        <div v-if="ruleForm.type == '婚礼摄影'">
                            <div class="good-table">
                                <div class="good-row">
                                    <div class="good-column-left">类型</div>
                                    <div class="good-column">具体内容</div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">团队</div>
                                    <div class="good-column">
                                       <el-form-item v-for="item in dataList2.team" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">拍摄</div>
                                    <div class="good-column">
                                       <el-form-item v-for="item in dataList2.shot" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">成品</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList2.works" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">补充说明</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList2.other" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 3——婚礼摄像 -->
                        <div v-if="ruleForm.type == '婚礼摄像'">
                            <div class="good-table">
                                <div class="good-row">
                                    <div class="good-column-left">类型</div>
                                    <div class="good-column">具体内容</div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">团队</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList2.team" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">拍摄</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList2.shot" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">成品</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList2.works" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">补充说明</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList2.other" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 4——婚礼造型 -->
                        <div v-if="ruleForm.type == '婚礼造型'">
                            <div class="good-table">
                                <div class="good-row">
                                    <div class="good-column-left">类型</div>
                                    <div class="good-column">具体内容</div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">团队</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList4.team" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">新娘跟妆</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList4.model" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">新娘试妆</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList4.works" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">亲友妆发</div>
                                    <div class="good-column">
                                       <el-form-item v-for="item in dataList4.scene" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">补充说明</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList4.other" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 5——婚礼主持 -->
                        <div v-if="ruleForm.type == '婚礼主持'">
                            <div class="good-table">
                                <div class="good-row">
                                    <div class="good-column-left">类型</div>
                                    <div class="good-column">具体内容</div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">团队</div>
                                    <div class="good-column">
                                       <el-form-item v-for="item in dataList5.team" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">服务</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList5.model" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">补充说明</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList5.other" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 6——环球旅拍 -->
                        <div v-if="ruleForm.type == '环球旅拍'">
                            <div class="good-table">
                                <div class="good-row">
                                    <div class="good-column-left">类型</div>
                                    <div class="good-column">具体内容</div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">造型</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList6.model" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">场景</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList6.scene" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">拍摄</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList6.shot" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">成品</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList6.works" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">团队</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList6.team" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                                <div class="good-row">
                                    <div class="good-column-left">补充说明</div>
                                    <div class="good-column">
                                        <el-form-item v-for="item in dataList6.other" :key="item.name" :label="item.name">：{{item.value}}</el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 商品封面 -->
                    <div class="detail-title">
                        <div class="squareFF739E"></div>
                        <div>商品封面</div>
                    </div>
                    <div class="content-form content-form-cover">
                        <el-form-item label="商品封面" prop="cover">
                            <img :src="ruleForm.cover" alt="">
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import editor from '@/components/editor'//富文本编辑器
import myUpload from '@/components/common/myUpload'//上传按钮
import api from '@/http/api';
export default {
    components:{
        headerTitle,
        editor,
        myUpload
    },
    data () {
        return {
            xid:'',//商品id

            // 档期读取及更新的所有参数
            stockForm:{
                stockValue:'',//订单数
                stockList:[]//档期时间
            },
            stockId:'',//选中更新档期id
            stockpage:0,//档期当前月份
            stockOrignalList:[],//后台返回的未编辑之前的数据
            initDate:'',//默认打开日期选择器的时间，显示的是当前月
            initYM:'',//当前年月份

            ruleForm: {},
            dataList0:{
                team:[],//团队
                scene:[],//会场
                model:[],//花艺装饰
                works:[],//灯光舞美
                other:[]//补充说明
            },//婚礼策划
            dataList1:{
                team:[],//形状
                scene:[],//面积
                model:[],//花艺层高
                works:[]//立柱
            },//婚礼策划
            dataList2:{
                team:[],//团队
                shot:[],//拍摄
                works:[],//成品
                other:[]//补充说明
            },//婚礼摄影//婚礼摄像
            dataList4:{
                team:[],//团队
                model:[],//新娘跟妆
                works:[],//新娘试妆
                scene:[],//亲友妆发
                other:[]//补充说明
            },//婚礼造型
            dataList5:{
                team:[],//团队
                model:[],//新娘跟妆
                other:[]//补充说明
            },//婚礼主持
            dataList6:{
                team:[],
                model:[],
                works:[],
                scene:[],
                shot:[],
                other:[]
            },//环球旅拍
            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }//商品名称
                ],
                type:[
                    { required: true, message: '请输入商户类型', trigger: 'blur' }//商品名称
                ],
                storeId:[
                    { required: true, message: '请输入商户ID', trigger: 'blur' }//商品名称
                ],
                price: [
                    { required: true, message: '请输入商品售价', trigger: 'blur' }//商品售价
                ],
                isRemote:[
                    { required: true, message: '请选择是否支持异地服务', trigger: 'change' }
                ],
                remoteInpro:[
                    { required: true, message: '请输入省内异地费', trigger: 'blur' }
                ],
                remoteIncut: [
                    { required: true, message: '请输入国内异地费', trigger: 'blur' }
                ],
                remoteInwrd: [
                    { required: true, message: '请输入海外异地费', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入商户简介', trigger: 'blur' }
                ],
                stockList:[
                    { required: true, message: '请选择档期', trigger: 'blur' }
                ],
                stockValue: [
                    { required: true, message: '请输入单日可接受订单', trigger: 'blur' }
                ],
                elementCatagory: [
                    { required: true, message: '请选择风格', trigger: 'blur' }
                ],
                elementColor: [
                    { required: true, message: '请选择颜色', trigger: 'blur' }
                ],
                cover: [
                    { required: true, message: '请上传封面', trigger: 'blur' }
                ],
                capacity: [
                    { required: true, message: '请输入可容纳桌数', trigger: 'blur' }
                ],
                // locationId: [
                //     { required: true, message: '请选择服务地址', trigger: 'change' }
                // ],
                cityId:[
                    { required: true, message: '请选择环球旅拍的目的地', trigger: 'change' }//数组
                ],
                serviceType:[
                    { required: true, message: '请选择旅拍服务类型', trigger: 'change' }//数组
                ],
                // 0——婚礼策划
                dataPlanZero:[
                    { required: true, message: '请选择是否包含主持人', trigger: 'blur' }//数组
                ],
                dataPlanOne:[
                    { required: true, message: '请选择是否包含化妆师', trigger: 'blur' }//数组
                ],
                dataPlanTwo:[
                    { required: true, message: '请选择是否包含摄影师', trigger: 'blur' }//数组
                ],
                dataPlanThree:[
                    { required: true, message: '请选择是否包含摄像师', trigger: 'blur' }//数组
                ],
                dataPlanFour:[
                    { required: true, message: '请至少添加一个迎宾区', trigger: 'blur' }//数组
                ],
                dataPlanFive:[
                    { required: true, message: '请至少添加一个仪式区', trigger: 'blur' }//数组
                ],
                dataPlanSix:[
                    { required: true, message: '请至少添加一个婚宴区', trigger: 'blur' }//数组
                ],
                dataPlanEight:[
                    { required: true, message: '请至少添加一个婚礼灯光说明', trigger: 'blur' }//数组
                ],
                dataPlanNine:[
                    { required: true, message: '请至少添加一个舞美道具说明', trigger: 'blur' }//数组
                ],
                dataBanquetOne:[
                    { required: true, message: '请输入面积', trigger: 'blur' }//数组
                ],//面积
                dataBanquetTwo:[
                    { required: true, message: '请输入层高', trigger: 'blur' }//数组
                ],//层高
                dataBanquetThree:[
                    { required: true, message: '请输入立柱数量', trigger: 'blur' }//数组
                ],//立柱
                // 6——环球旅拍
                dataTravelSeventeen:[
                    { required: true, message: '请选择是否包含', trigger: 'blur' }
                ],//摄影师
                dataTravelEighteen:[
                    { required: true, message: '请选择是否包含', trigger: 'blur' }
                ],//化妆师
                dataTravelNineteen:[
                    { required: true, message: '请选择是否包含', trigger: 'blur' }
                ],//灯光师
                dataTravelTwenty:[
                    { required: true, message: '请选择是否包含', trigger: 'blur' }
                ],//化妆助理
                dataTravelTwentyOne:[
                    { required: true, message: '请选择是否包含', trigger: 'blur' }
                ]//微电影拍摄
                // contents:[],//商品内容,格式较复杂，单独分类
            }
        }
    },
    computed:{
        ...mapGetters([
            'tk',
            'headerChildTitle',
            'business'])
    },
    filters: {
        locationFn (value) {
            let txt = '';

            switch (value) {
            case '330100' :
                txt = '全城'
                break;
            case '330102' :
                txt = '上城区'
                break;
            case '330103' :
                txt = '下城区'
                break;
            case '330104' :
                txt = '江干区'
                break;
            case '330105' :
                txt = '拱墅区'
                break;
            case '330106' :
                txt = '西湖区'
                break;
            case '330108' :
                txt = '滨江区'
                break;
            case '330109' :
                txt = '萧山区'
                break;
            case '330110' :
                txt = '余杭区'
                break;
            case '330122' :
                txt = '桐庐区'
                break;
            case '330127' :
                txt = '淳安区'
                break;
            case '330182' :
                txt = '建德区'
                break;
            case '330183' :
                txt = '富阳区'
                break;
            case '330185' :
                txt = '临安区'
                break;
            default:
                break;
            }
            return txt
        },
        //是否支持异地服务
        remoteFn (value) {
            let txt = '';

            switch (value) {
            case '0' : case 0 :
                txt = '不支持异地服务'
                break;
            case '1' : case 1 :
                txt = '支持异地服务'
                break;
            default:
                break;
            }
            return txt
        },
        shapeFn(value){
            let txt = '';

            switch (value) {
            case '0' :
                txt = '长方形'
                break;
            case '1' :
                txt = '正方形'
                break;
            case '2' :
                txt = '圆形'
                break;
            case '3' :
                txt = '椭圆形'
                break;
            case '4' :
                txt = '不规则形状'
                break;
            default:
                break;
            }
            return txt
        }
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getCommodityDetail();
        ths.initOriginalDate();
        ths.openSchedule(ths.xid);
    },
    methods:{
        ...mapActions([]),
        getCommodityDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getCommodityDetail(params).then(res => {
                ths.ruleForm = res.data;
                let content = res.data.content;

                // 0——婚礼策划 1——婚宴预订 2——婚礼摄影 3——婚礼摄像 4——婚礼造型 5——婚礼主持 6——环球旅拍
                switch (ths.ruleForm.type) {
                case '婚礼策划':
                    for (let key in content){
                        if (content[key].category == '团队'){
                            ths.dataList0.team.push(content[key]);
                        } else if (content[key].category == '会场布置'){
                            ths.dataList0.scene.push(content[key]);
                        } else if (content[key].category == '花艺装饰'){
                            ths.dataList0.model.push(content[key]);
                        } else if (content[key].category == '灯光舞美'){
                            ths.dataList0.works.push(content[key]);
                        } else if (content[key].category == '补充说明'){
                            ths.dataList0.other.push(content[key]);
                        }
                    }
                    break;
                case '婚宴预订':
                    for (let key in content){
                        if (content[key].category == '形状'){
                            ths.dataList0.team.push(content[key]);
                        } else if (content[key].category == '面积'){
                            ths.dataList0.scene.push(content[key]);
                        } else if (content[key].category == '层高'){
                            ths.dataList0.model.push(content[key]);
                        } else if (content[key].category == '立柱'){
                            ths.dataList0.works.push(content[key])
                        }
                    }
                    break;
                case '婚礼摄影': case '婚礼摄像':
                    for (let key in content){
                        if (content[key].category == '团队'){
                            ths.dataList2.team.push(content[key]);
                        } else if (content[key].category == '拍摄'){
                            ths.dataList2.shot.push(content[key]);
                        } else if (content[key].category == '成品'){
                            ths.dataList2.works.push(content[key]);
                        } else if (content[key].category == '补充说明'){
                            ths.dataList2.other.push(content[key]);
                        }
                    }
                    break;
                case '婚礼造型':
                    for (let key in content){
                        if (content[key].category == '团队'){
                            ths.dataList4.team.push(content[key]);
                        } else if (content[key].category == '新娘跟妆'){
                            ths.dataList4.model.push(content[key]);
                        } else if (content[key].category == '新娘试妆'){
                            ths.dataList4.works.push(content[key]);
                        } else if (content[key].category == '亲友妆发'){
                            ths.dataList4.scene.push(content[key]);
                        } else if (content[key].category == '补充说明'){
                            ths.dataList4.other.push(content[key]);
                        }
                    }
                    break;
                case '婚礼主持':
                    for (let key in content){
                        if (content[key].category == '团队'){
                            ths.dataList5.team.push(content[key]);
                        } else if (content[key].category == '服务'){
                            ths.dataList5.model.push(content[key]);
                        } else if (content[key].category == '补充说明'){
                            ths.dataList5.other.push(content[key]);
                        }
                    }
                    break;
                case '环球旅拍':
                    for (let key in content){
                        if (content[key].category == '团队'){
                            if (content[key].value == '0'){
                                content[key].value = '不包含'
                            } else {
                                content[key].value = '包含'
                            }
                            ths.dataList6.team.push(content[key]);
                        } else if (content[key].category == '造型'){
                            ths.dataList6.model.push(content[key]);
                        } else if (content[key].category == '成品'){
                            ths.dataList6.works.push(content[key]);
                        } else if (content[key].category == '场景'){
                            ths.dataList6.scene.push(content[key]);
                        } else if (content[key].category == '拍摄'){
                            ths.dataList6.shot.push(content[key]);
                        } else if (content[key].category == '补充说明'){
                            ths.dataList6.other.push(content[key]);
                        }
                    }
                    break;
                default:
                    break;
                }
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        initOriginalDate(){
            let ths = this;
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            ths.initYM = year + '年的' + month;
            ths.initDate = year + '-' + month + '-' + day;
        },
        //打开档期弹窗
        openSchedule(xid){
            let ths = this;

            ths.isStock = true;
            ths.stockId = xid.toString();
            ths.stockForm.stockList = [];
            ths.stockForm.stockValue = '';
            // 获取档期信息
            let params = {
                tk:ths.tk,
                xid:ths.stockId,
                page:ths.stockpage
            };

            api.commodityStocks(params).then(res => {
                ths.stockOrignalList = res.data;
                let list = res.data;

                if (list.length !=0){
                    for (let key in list){
                        ths.stockForm.stockList.push(list[key].date);
                    }
                }

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //查询上一个月
        preStockpage(num){
            let ths = this;

            ths.stockpage = num - 1;
            ths.openSchedule(ths.stockId);
            ths.initDate = ths.getPreMonth(ths.initDate);
        },
        //查询下一个月
        nextStockpage(num){
            let ths = this;

            ths.stockpage = num + 1;
            ths.openSchedule(ths.stockId);
            ths.initDate = ths.getNextMonth(ths.initDate);
        },
        //上一个月的日期
        getPreMonth(date) {
            let arr = date.split('-');
            let year = arr[0]; //获取当前日期的年份
            let month = arr[1]; //获取当前日期的月份
            let day = arr[2]; //获取当前日期的日
            let days = new Date(year, month, 0);

            days = days.getDate(); //获取当前日期中月的天数
            let year2 = year;
            let month2 = parseInt(month) - 1;

            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            let day2 = day;
            let days2 = new Date(year2, month2, 0);

            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            this.initYM = year2 + '年的' + month2;
            let t2 = year2 + '-' + month2 + '-' + day2;

            return t2;
        },
        //下一个月的日期
        getNextMonth(date) {
            let arr = date.split('-');
            let year = arr[0]; //获取当前日期的年份
            let month = arr[1]; //获取当前日期的月份
            let day = arr[2]; //获取当前日期的日
            let days = new Date(year, month, 0);

            days = days.getDate(); //获取当前日期中的月的天数
            let year2 = year;
            let month2 = parseInt(month) + 1;

            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
            let day2 = day;
            let days2 = new Date(year2, month2, 0);

            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            this.initYM = year2 + '年的' + month2;
            let t2 = year2 + '-' + month2 + '-' + day2;

            return t2;
        }
    }
}
</script>

<style lang="scss" scoped>
.add-box{
    min-height: 100%;
}
//内容部分
.step-box{
    padding: 22px;
    // 公共部分
    .step-content{
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
        .content-form{
            margin-bottom: 22px;
            .stock-pages{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
            }
            .schedule-tip{
                margin : 0px 0px 22px 48px;
            }
        }
        .content-form-cover{
            img{
                width: 300px;
            }
        }
    }
    .btn-Box{
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 22px;
    }
}
//商品内容
.good-table{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    width: 100%;
    .good-row{
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        border-top:1px solid #dcdfe6;
        border-left:1px solid #dcdfe6;
        border-right:1px solid #dcdfe6;
        &:last-child{
            border-bottom:1px solid #dcdfe6;
        }
    }
    .good-column-left{
        width: 100px;
        padding: 14px;
        border-right:1px solid #dcdfe6;
    }
    .good-column{
        width: calc(100% - 100px);
        padding: 14px;
    }
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.stock-box{
    padding: 36px;
    width: 660px;
    .box-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .title-name{
            font-size: 18px;
        }
        padding-bottom: 12px;
    }
    .stock-content{
        padding: 12px;
        .stock-pages{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 22px;
        }
    }
    .advanced-btn{
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>
