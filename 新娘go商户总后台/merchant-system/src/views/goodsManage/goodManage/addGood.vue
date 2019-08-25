<template>
    <div class="add-box backgroundfff">
        <header-title :isParent="false" :title="headerChildTitle"></header-title>
        <div class="step-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="142px" class="demo-ruleForm">
                <div v-show="isStepOne" class="step-item">
                    <div class="step-content">
                        <!-- 婚宴预订 -->
                        <div v-if="business == 1">
                            <div class="detail-title">
                                <div class="squareFF739E"></div>
                                    <div>基本信息</div>
                            </div>
                            <div class="content-form">
                                <el-form-item label="婚宴厅名称" prop="name" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="最低消费" prop="price" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.price"></el-input>
                                </el-form-item>
                                <el-form-item label="可容纳桌数" prop="capacity" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.capacity"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div v-else>
                            <div class="detail-title">
                                <div class="squareFF739E"></div>
                                    <div>基本信息</div>
                            </div>
                            <div class="content-form">
                                <el-form-item label="商品名称" prop="name" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="商品售价" prop="price" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.price"></el-input>
                                </el-form-item>
                                <el-form-item label="商品原价" prop="originPrice" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.originPrice"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="本地服务区域" prop="locationId">
                                    <el-radio-group v-model="ruleForm.locationId">
                                        <el-radio v-for="item in locationList" :key="item.label" :label="item.label">{{item.value}}</el-radio>
                                    </el-radio-group>
                                </el-form-item> -->
                                <el-form-item label="异地服务费" prop="isRemote">
                                    <el-select v-model="ruleForm.isRemote" placeholder="请选择">
                                        <el-option label="否" value="0"></el-option>
                                        <el-option label="是" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <div v-if="ruleForm.isRemote == '1'">
                                    <el-form-item label="省内" prop="remoteInpro" style="width:400px;">
                                        <el-input clearable v-model="ruleForm.remoteInpro"></el-input>
                                    </el-form-item>
                                    <el-form-item label="国内" prop="remoteIncut" style="width:400px;">
                                        <el-input clearable v-model="ruleForm.remoteIncut"></el-input>
                                    </el-form-item>
                                    <el-form-item label="海外" prop="remoteInwrd" style="width:400px;">
                                        <el-input clearable v-model="ruleForm.remoteInwrd"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-content">
                        <div class="content-form">
                            <el-form-item label="商品介绍" prop="description">
                            <editor class="editor" :originContent="editorContent"></editor>
                            </el-form-item>
                        </div>
                        <div class="detail-title">
                            <div class="squareFF739E"></div>
                            <div>档期信息</div>
                        </div>
                        <div class="content-form">
                            <div v-if="xid ==''" >
                                <el-form-item label="档期设置" prop="stockList">
                                    <el-date-picker
                                    style="width:600px;"
                                    v-model="ruleForm.stockList"
                                    type="dates"
                                    align="right"
                                    unlink-panels
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                <div class="schedule-tip">该设置只对单品有效，当商户存在多规格货品时为不可编辑状态，展示档期取决于当前商品设置档期。</div>
                                <el-form-item label="单日可接纳订单数" prop="stockValue" style="width:400px;">
                                    <el-input clearable v-model="ruleForm.stockValue"></el-input>
                                </el-form-item>
                            </div>
                            <div v-else>
                                <el-button type="primary" @click="openSchedule(xid)">查看档期详情</el-button>
                            </div>
                        </div>
                        <div class="btn-Box">
                            <el-button v-if="business == 1"
                            :disabled="!(ruleForm.name != '' && ruleForm.price != '' && ruleForm.capacity != '' && editorContent != '' )"
                            type="primary" @click="stepNext()">下一步，填写商品属性</el-button>
                            <el-button v-else
                            :disabled="!(ruleForm.name != '' && ruleForm.price != '' && ruleForm.isRemote != '' && editorContent != '' )"
                            type="primary" @click="stepNext()">下一步，填写商品属性</el-button>
                        </div>
                    </div>
                </div>
                <div v-show="!isStepOne" class="step-item">
                    <div class="step-content">
                        <!-- 商品元素 -->
                        <div class="detail-title">
                            <div class="squareFF739E"></div>
                            <div>商品元素</div>
                        </div>
                        <div class="content-form">
                            <el-form-item label="风格：" prop="elementCatagory">
                                <el-radio-group v-model="ruleForm.elementCatagory">
                                    <el-radio v-for="item in radioList1" :key="item.label" :label="item.label">{{item.value}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="颜色：" prop="elementColor">
                                <el-radio-group v-model="ruleForm.elementColor">
                                    <el-radio v-for="item in radioList2" :key="item.label" :label="item.label">{{item.value}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <!-- 0——婚礼策划 1——婚宴预订 2——婚礼摄影 3——婚礼摄像 4——婚礼造型 5——婚礼主持 6——环球旅拍 -->
                        <div class="detail-title">
                            <div class="squareFF739E"></div>
                            <div>商品内容</div>
                        </div>
                        <div class="content-form">
                            <!-- 0——婚礼策划 -->
                            <div v-if="business == 0">
                                <div class="good-table">
                                    <div class="good-row">
                                        <div class="good-column-left">类型</div>
                                        <div class="good-column">具体内容</div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">团队</div>
                                        <div class="good-column">
                                            <el-form-item label="主持人" prop="dataPlanZero" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataPlanZero">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="化妆师" prop="dataPlanOne" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataPlanOne">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="摄影师" prop="dataPlanTwo" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataPlanTwo">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="摄像师" prop="dataPlanThree" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataPlanThree">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">会场布置</div>
                                        <div class="good-column">
                                            <div>签到背景墙个性主题定制设计（提供效果图）</div>
                                            <el-form-item label="迎宾区" prop="dataPlanFour">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPlanFour" closable :disable-transitions="false" @close="handleClose(tag,'PlanFour')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPlanFour" v-model="inputPlanFourValue" ref="savePlanFourInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PlanFour')" @blur="handleInputConfirm('PlanFour')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PlanFour')">添加</el-button>
                                            </el-form-item>
                                            <el-form-item label="仪式区" prop="dataPlanFive">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPlanFive" closable :disable-transitions="false" @close="handleClose(tag,'PlanFive')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPlanFive" v-model="inputPlanFiveValue" ref="savePlanFiveInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PlanFive')" @blur="handleInputConfirm('PlanFive')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PlanFive')">添加</el-button>
                                            </el-form-item>
                                            <el-form-item label="婚宴区" prop="dataPlanSix">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPlanSix" closable :disable-transitions="false" @close="handleClose(tag,'PlanSix')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPlanSix" v-model="inputPlanSixValue" ref="savePlanSixInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PlanSix')" @blur="handleInputConfirm('PlanSix')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PlanSix')">添加</el-button>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">花艺装饰</div>
                                        <div class="good-column">
                                            <el-form-item label="花艺装饰" prop="dataPlanSeven">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPlanSeven" closable :disable-transitions="false" @close="handleClose(tag,'PlanSeven')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPlanSeven" v-model="inputPlanSevenValue" ref="savePlanSevenInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PlanSeven')" @blur="handleInputConfirm('PlanSeven')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PlanSeven')">添加</el-button>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">灯光舞美</div>
                                        <div class="good-column">
                                            <el-form-item label="婚礼灯光" prop="dataPlanEight">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPlanEight" closable :disable-transitions="false" @close="handleClose(tag,'PlanEight')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPlanEight" v-model="inputPlanEightValue" ref="savePlanEightInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PlanEight')" @blur="handleInputConfirm('PlanEight')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PlanEight')">添加</el-button>
                                            </el-form-item>
                                            <el-form-item label="舞美道具" prop="dataPlanNine">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPlanNine" closable :disable-transitions="false" @close="handleClose(tag,'PlanNine')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPlanNine" v-model="inputPlanNineValue" ref="savePlanNineInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PlanNine')" @blur="handleInputConfirm('PlanNine')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PlanNine')">添加</el-button>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">补充说明</div>
                                        <div class="good-column">
                                            <el-form-item label="补充说明" prop="dataPlanTen" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataPlanTen"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 1——婚宴预订 -->
                            <div v-if="business == 1">
                                <div class="good-table">
                                    <div class="good-row">
                                        <div class="good-column-left">参数类型</div>
                                        <div class="good-column">具体内容</div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">形状</div>
                                        <div class="good-column">
                                            <el-form-item label="形状" prop="dataBanquetZero">
                                                <el-radio-group v-model="ruleForm.dataBanquetZero">
                                                    <el-radio label="0">长方形</el-radio>
                                                    <el-radio label="1">正方形</el-radio>
                                                    <el-radio label="2">圆形</el-radio>
                                                    <el-radio label="3">椭圆形</el-radio>
                                                    <el-radio label="4">不规则形状</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">面积</div>
                                        <div class="good-column good-column-banq">
                                            <el-form-item label="宴会厅面积" prop="dataBanquetOne" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataBanquetOne"></el-input>
                                            </el-form-item>
                                            <span>m²</span>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">层高</div>
                                        <div class="good-column good-column-banq">
                                            <el-form-item label="宴会厅层高" prop="dataBanquetTwo" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataBanquetTwo"></el-input>
                                            </el-form-item>
                                            <span>m</span>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">立柱</div>
                                        <div class="good-column good-column-banq">
                                            <el-form-item label="立柱数" prop="dataBanquetThree" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataBanquetThree"></el-input>
                                            </el-form-item>
                                            <span>个</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 2——婚礼摄影 -->
                            <div v-if="business == 2">
                                <div class="good-table">
                                    <div class="good-row">
                                        <div class="good-column-left">类型</div>
                                        <div class="good-column">具体内容</div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">团队</div>
                                        <div class="good-column">
                                            <el-form-item label="摄影机位" prop="dataPhotographyZero" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataPhotographyZero"></el-input>
                                            </el-form-item>
                                            <el-form-item label="摄影团队" prop="dataPhotographyOne" style="width:400px;">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPhotographyOne" closable :disable-transitions="false" @close="handleClose(tag,'PhotographyOne')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPhotographyOne" v-model="inputPhotographyOneValue" ref="savePhotographyOneInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PhotographyOne')" @blur="handleInputConfirm('PhotographyOne')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PhotographyOne')">添加</el-button>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">拍摄</div>
                                        <div class="good-column">
                                            <el-form-item label="摄影器材" prop="dataPhotographyTwo" style="width:480px;">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataPhotographyTwo" closable :disable-transitions="false" @close="handleClose(tag,'PhotographyTwo')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputPhotographyTwo" v-model="inputPhotographyTwoValue" ref="savePhotographyTwoInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('PhotographyTwo')" @blur="handleInputConfirm('PhotographyTwo')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('PhotographyTwo')">添加</el-button>
                                            </el-form-item>
                                            <div class="good-column-danwei">
                                                <el-form-item label="摄影时长" prop="dataPhotographyThree" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataPhotographyThree"></el-input>
                                                </el-form-item>
                                                <span>分钟</span>
                                            </div>
                                            <el-form-item label="摄影内容" prop="dataPhotographyFour" style="width:600px;">
                                                <el-input type="textarea" :rows="5"  clearable v-model="ruleForm.dataPhotographyFour"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">成品</div>
                                        <div class="good-column">
                                            <div class="good-column-danwei">
                                                <el-form-item label="拍摄张数" prop="dataPhotographyFive" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataPhotographyFive"></el-input>
                                                </el-form-item>
                                                <span>张</span>
                                            </div>
                                            <div class="good-column-danwei">
                                                <el-form-item label="精修张数" prop="dataPhotographySix" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataPhotographySix"></el-input>
                                                </el-form-item>
                                                <span>张</span>
                                            </div>
                                            <el-form-item label="成品说明" prop="dataPhotographySeven" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataPhotographySeven"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">补充说明</div>
                                        <div class="good-column">
                                            <el-form-item label="补充说明" prop="dataPhotographyEight" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataPhotographyEight"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 3——婚礼摄像 -->
                            <div v-if="business == 3">
                                <div class="good-table">
                                    <div class="good-row">
                                        <div class="good-column-left">类型</div>
                                        <div class="good-column">具体内容</div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">团队</div>
                                        <div class="good-column">
                                            <el-form-item label="摄像机位" prop="dataCameraZero" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataCameraZero"></el-input>
                                            </el-form-item>
                                            <el-form-item label="摄像团队" prop="dataCameraOne">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataCameraOne" closable :disable-transitions="false" @close="handleClose(tag,'CameraOne')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputCameraOne" v-model="inputCameraOneValue" ref="saveCameraOneInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('CameraOne')" @blur="handleInputConfirm('CameraOne')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('CameraOne')">添加</el-button>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">拍摄</div>
                                        <div class="good-column">
                                            <el-form-item label="摄像器材" prop="storeName">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataCameraTwo" closable :disable-transitions="false" @close="handleClose(tag,'CameraTwo')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputCameraTwo" v-model="inputCameraTwoValue" ref="saveCameraTwoInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('CameraTwo')" @blur="handleInputConfirm('CameraTwo')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('CameraTwo')">添加</el-button>
                                            </el-form-item>
                                            <div class="good-column-danwei">
                                                 <el-form-item label="摄像时长" prop="dataCameraThree" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataCameraThree"></el-input>
                                                </el-form-item>
                                                <span>分钟</span>
                                            </div>
                                            <el-form-item label="摄像内容" prop="dataCameraFour"  style="width:600px;">
                                                <el-input  type="textarea" :rows="5" clearable v-model="ruleForm.dataCameraFour"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">成品</div>
                                        <div class="good-column">
                                            <div class="good-column-danwei">
                                                <el-form-item label="全程录像" prop="dataCameraFive" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataCameraFive"></el-input>
                                                </el-form-item>
                                                <span>分钟</span>
                                            </div>
                                            <div class="good-column-danwei">
                                                <el-form-item label="MV时长" prop="dataCameraSix" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataCameraSix"></el-input>
                                                </el-form-item>
                                                <span>分钟</span>
                                            </div>
                                            <el-form-item label="成品说明" prop="dataCameraSeven" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataCameraSeven"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">补充说明</div>
                                        <div class="good-column">
                                            <el-form-item label="补充说明" prop="dataCameraEight" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataCameraEight"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 4——婚礼造型 -->
                            <div v-if="business == 4">
                                <div class="good-table">
                                    <div class="good-row">
                                        <div class="good-column-left">类型</div>
                                        <div class="good-column">具体内容</div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">团队</div>
                                        <div class="good-column">
                                            <el-form-item label="化妆师" prop="dataModelZero" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelZero"></el-input>
                                            </el-form-item>
                                            <el-form-item label="化妆助理" prop="dataModelOne" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelOne"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">新娘跟妆</div>
                                        <div class="good-column">
                                            <el-form-item label="新娘造型" prop="dataModelTwo" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelTwo"></el-input>
                                            </el-form-item>
                                            <el-form-item label="新娘妆面" prop="dataModelThree" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelThree"></el-input>
                                            </el-form-item>
                                            <el-form-item label="跟妆时间" prop="dataModelFour" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelFour"></el-input>
                                            </el-form-item>
                                            <el-form-item label="化妆品" prop="dataModelFive" style="width:400px;">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataModelFive" closable :disable-transitions="false" @close="handleClose(tag,'ModelFive')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputModelFive" v-model="inputModelFiveValue" ref="saveModelFiveInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('ModelFive')" @blur="handleInputConfirm('ModelFive')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('ModelFive')">添加</el-button>
                                            </el-form-item>
                                            <el-form-item label="饰品" prop="dataModelSix">
                                                <el-tag :key="tag"  v-for="tag in ruleForm.dataModelSix" closable :disable-transitions="false" @close="handleClose(tag,'ModelSix')">{{tag}}</el-tag>
                                                <el-input class="input-new-tag" v-if="inputModelSix" v-model="inputModelSixValue" ref="saveModelSixInput" size="medium"
                                                @keyup.enter.native="handleInputConfirm('ModelSix')" @blur="handleInputConfirm('ModelSix')"></el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput('ModelSix')">添加</el-button>
                                            </el-form-item>


                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">新娘试妆</div>
                                        <div class="good-column">
                                            <el-form-item label="试妆服务" prop="dataModelSeven" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelSeven"></el-input>
                                            </el-form-item>
                                            <el-form-item label="试妆说明" prop="dataModelEight" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelEight"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">亲友妆发</div>
                                        <div class="good-column">
                                            <el-form-item label="伴娘妆" prop="dataModelNine" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelNine"></el-input>
                                            </el-form-item>
                                            <el-form-item label="妈妈妆" prop="dataModelTen" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataModelTen"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">补充说明</div>
                                        <div class="good-column">
                                            <el-form-item label="补充说明" prop="dataModelEleven" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataModelEleven"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 5——婚礼主持 -->
                            <div v-if="business == 5">
                                <div class="good-table">
                                    <div class="good-row">
                                        <div class="good-column-left">类型</div>
                                        <div class="good-column">具体内容</div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">团队</div>
                                        <div class="good-column">
                                            <el-form-item label="主持人" prop="dataHostZero" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataHostZero"></el-input>
                                            </el-form-item>
                                            <el-form-item label="音乐督导" prop="dataHostOne" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataHostOne"></el-input>
                                            </el-form-item>
                                            <el-form-item label="现场督导" prop="dataHostTwo" style="width:400px;">
                                                <el-input clearable v-model="ruleForm.dataHostTwo"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">服务</div>
                                        <div class="good-column">
                                            <el-form-item label="服务内容" prop="dataHostThree" style="width:480px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataHostThree"></el-input>
                                            </el-form-item>
                                            <el-form-item label="服务特色" prop="dataHostFour" style="width:400px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataHostFour"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">补充说明</div>
                                        <div class="good-column">
                                            <el-form-item label="补充说明" prop="dataHostFive" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataHostFive"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 6——环球旅拍 -->
                            <div v-if="business == 6">
                                <div class="good-table">
                                    <div class="good-row">
                                        <div class="good-column-left">类型</div>
                                        <div class="good-column">具体内容</div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">造型</div>
                                        <div class="good-column">
                                            <div class="good-column-danwei">
                                                <el-form-item label="新娘服装" prop="dataTravelZero" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelZero"></el-input>
                                                </el-form-item>
                                                <span>套</span>
                                            </div>
                                            <div class="good-column-danwei">
                                                <el-form-item label="新郎服装" prop="dataTravelOne" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelOne"></el-input>
                                                </el-form-item>
                                                <span>套</span>
                                            </div>
                                            <el-form-item label="服装说明" prop="dataTravelTwo" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataTravelTwo"></el-input>
                                            </el-form-item>
                                            <el-form-item label="造型说明" prop="dataTravelThree" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataTravelThree"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">场景</div>
                                        <div class="good-column">
                                            <el-form-item label="拍摄场景" prop="dataTravelFour" style="width:480px;">
                                                <el-input clearable v-model="ruleForm.dataTravelFour"></el-input>
                                            </el-form-item>
                                            <div class="good-column-danwei">
                                                <el-form-item label="内景数量" prop="dataTravelFive" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelFive"></el-input>
                                                </el-form-item>
                                                <span>个</span>
                                            </div>
                                            <el-form-item label="内景说明" prop="dataTravelSix" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataTravelSix"></el-input>
                                            </el-form-item>
                                            <div class="good-column-danwei">
                                                <el-form-item label="外景数量" prop="dataTravelSeven" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelSeven"></el-input>
                                                </el-form-item>
                                                <span>个</span>
                                            </div>
                                            <el-form-item label="外景说明" prop="dataTravelEight" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataTravelEight"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">拍摄</div>
                                        <div class="good-column">
                                            <div class="good-column-danwei">
                                                <el-form-item label="拍摄天数" prop="dataTravelNine" style="width:480px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelNine"></el-input>
                                                </el-form-item>
                                                <span>天</span>
                                            </div>
                                            <div class="good-column-danwei">
                                                <el-form-item label="拍摄张数" prop="dataTravelten" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelten"></el-input>
                                                </el-form-item>
                                                <span>张</span>
                                            </div>
                                            <div class="good-column-danwei">
                                                <el-form-item label="精修张数" prop="dataTravelEleven" style="width:600px;">
                                                    <el-input placeholder="请输入内容" v-model="ruleForm.dataTravelEleven"></el-input>
                                                </el-form-item>
                                                <span>张</span>
                                            </div>
                                            <div class="good-column-danwei">
                                                <el-form-item label="入册张数" prop="dataTravelTwelve" style="width:400px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelTwelve"></el-input>
                                                </el-form-item>
                                                <span>张</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">成品</div>
                                        <div class="good-column">
                                            <div class="good-column-danwei">
                                                <el-form-item label="相册数量" prop="dataTravelThirteen" style="width:480px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelThirteen"></el-input>
                                                </el-form-item>
                                                <span>本</span>
                                            </div>
                                            <el-form-item label="相册说明" prop="dataTravelFourTeen" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataTravelFourTeen"></el-input>
                                            </el-form-item>
                                            <div class="good-column-danwei">
                                                <el-form-item label="相框数量" prop="dataTravelFifteen" style="width:480px;">
                                                    <el-input clearable v-model="ruleForm.dataTravelFifteen"></el-input>
                                                </el-form-item>
                                                <span>个</span>
                                            </div>
                                            <el-form-item label="相框说明" prop="dataTravelSixteen" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataTravelSixteen"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">团队</div>
                                        <div class="good-column">
                                            <el-form-item label="摄影师" prop="dataTravelSeventeen" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataTravelSeventeen">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="化妆师" prop="dataTravelEighteen" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataTravelEighteen">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="灯光师" prop="dataTravelNineteen" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataTravelNineteen">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="化妆助理" prop="dataTravelTwenty" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataTravelTwenty">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="微电影拍摄" prop="dataTravelTwentyOne" style="width:400px;">
                                                <el-radio-group v-model="ruleForm.dataTravelTwentyOne">
                                                    <el-radio label="0">不包含</el-radio>
                                                    <el-radio label="1">包含</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="good-row">
                                        <div class="good-column-left">补充说明</div>
                                        <div class="good-column">
                                            <el-form-item label="补充说明" prop="dataTravelTwentyTwo" style="width:600px;">
                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.dataTravelTwentyTwo"></el-input>
                                            </el-form-item>
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
                        <div class="content-form">
                            <el-form-item label="商品封面" prop="cover">
                                <my-upload type='2' :fileUrl=fileUrl></my-upload>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="btn-Box">
                        <el-button type="primary" plain @click="stepPre">上一步，填写商品信息</el-button>
                        <el-button :disabled="!(ruleForm.remaidRatio!= '')" type="primary"
                        @click="openConfirm('ruleForm')">完成，提交商品</el-button>
                    </div>
                </div>
            </el-form>
        </div>
         <!-- 更新档期弹框 -->
        <div v-if="isStock" class="pop-bg">
            <div class="stock-box bobm-box backgroundfff">
                <div class="box-title">
                    <div class="title-name">编辑商品档期</div>
                    <icons :isClose="true" @closeFn="closeFn"></icons>
                </div>
                <div class="stock-content">
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
                    <el-form :model="stockForm" label-position="left" ref="stockForm" label-width="80px">
                        <el-form-item label="档期设置" prop="stockList">
                            <el-date-picker
                            v-model="stockForm.stockList"
                            style="width:480px;"
                            type="dates"
                            align="right"
                            unlink-panels
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :default-value="initDate">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="单日可接纳订单数" prop="stockValue" style="width:400px;">
                            <el-input clearable v-model="stockForm.stockValue"></el-input>
                        </el-form-item>
                        <div class="advanced-btn">
                            <div>
                                <el-button @click="closeFn('stockForm')">取消或关闭</el-button>
                                <el-button type="primary" @click="commodityUpdateStocks('stockForm')">确定</el-button>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import editor from '@/components/editor'//富文本编辑器
import icons from '@/components/common/icons';
import myUpload from '@/components/common/myUpload'//上传按钮
import api from '@/http/api';
export default {
    components:{
        headerTitle,
        editor,
        myUpload,
        icons
    },
    data () {
        return {
            xid:'',
            isStepOne:true,//是否是第一步
            fileUrl:'',//封面图片初始化

            locationList:[
                {
                    label:'330100',
                    value:'全城'
                },
                {
                    label:'330102',
                    value:'上城区'
                },
                {
                    label:'330103',
                    value:'下城区'
                },
                {
                    label:'330104',
                    value:'江干区'
                },
                {
                    label:'330105',
                    value:'拱墅区'
                },
                {
                    label:'330106',
                    value:'西湖区'
                },
                {
                    label:'330108',
                    value:'滨江区'
                },
                {
                    label:'330109',
                    value:'萧山区'
                },
                {
                    label:'330110',
                    value:'余杭区'
                },
                {
                    label:'330122',
                    value:'桐庐区'
                },
                {
                    label:'330127',
                    value:'淳安区'
                },
                {
                    label:'330182',
                    value:'建德区'
                },
                {
                    label:'330183',
                    value:'富阳区'
                },
                {
                    label:'330185',
                    value:'临安区'
                }
            ],

            // 档期读取及更新的所有参数
            isStock:false,//是否打开更新档期的弹窗
            stockForm:{
                stockValue:'',//订单数
                stockList:[]//档期时间
            },
            stockId:'',//选中更新档期id
            stockpage:0,//档期当前月份
            stockOrignalList:[],//后台返回的未编辑之前的数据
            initDate:'',//默认打开日期选择器的时间，显示的是当前月
            initYM:'',//当前年月份

            radioList1:[
                {
                    label:'1',
                    value:'经典'
                },
                {
                    label:'2',
                    value:'中式'
                },
                {
                    label:'3',
                    value:'教堂'
                },
                {
                    label:'4',
                    value:'海岛'
                },
                {
                    label:'5',
                    value:'草坪'
                },
                {
                    label:'6',
                    value:'森系'
                },
                {
                    label:'7',
                    value:'户外'
                },
                {
                    label:'8',
                    value:'酒店'
                },
                {
                    label:'9',
                    value:'梦幻'
                },
                {
                    label:'10',
                    value:'韩式'
                },
                {
                    label:'11',
                    value:'童话'
                },
                {
                    label:'12',
                    value:'复古'
                },
                {
                    label:'13',
                    value:'摩登'
                },
                {
                    label:'14',
                    value:'田园'
                },
                {
                    label:'15',
                    value:'古堡'
                },
                {
                    label:'16',
                    value:'奢华'
                },
                {
                    label:'17',
                    value:'个性'
                },
                {
                    label:'18',
                    value:'简约'
                },
                {
                    label:'19',
                    value:'特殊'
                }
            ],
            radioList2:[
                {
                    label:'1',
                    value:'蓝色'
                },
                {
                    label:'2',
                    value:'红色'
                },
                {
                    label:'3',
                    value:'绿色'
                },
                {
                    label:'4',
                    value:'黄色'
                },
                {
                    label:'5',
                    value:'白色'
                },
                {
                    label:'6',
                    value:'粉色'
                },
                {
                    label:'7',
                    value:'紫色'
                },
                {
                    label:'8',
                    value:'黑色'
                },
                {
                    label:'9',
                    value:'金色'
                },
                {
                    label:'10',
                    value:'银色'
                },
                {
                    label:'11',
                    value:'橘黄色'
                },
                {
                    label:'12',
                    value:'特殊'
                }
            ],
            ruleForm: {
                name:'',//商品名称
                price:'',//价格
                originPrice:'',//原价
                // locationId:'',//服务地区id
                isRemote:'0',//是否支持异地服务0不支持1支持
                remoteInpro:'',//省内异地费
                remoteIncut:'',//国内异地费
                remoteInwrd:'',//海外异地费
                stockList:[],//档期安排
                stockValue:'',//单日可接受订单值
                elementCatagory:'',//风格
                elementColor:'',//颜色
                capacity:'',//可容纳桌数
                cityId:'',//环球旅拍的目的地
                serviceType:'',//旅拍服务类型
                contents:[],//商品内容,格式较复杂，单独分类
                videoList:[],//视频集

                // 0——婚礼策划contents
                dataPlanZero:'',//主持人
                dataPlanOne:'',//化妆师
                dataPlanTwo:'',//摄影师
                dataPlanThree:'',//摄像师
                dataPlanFour:[],//迎宾区
                dataPlanFive:[],//仪式区
                dataPlanSix:[],//婚宴区
                dataPlanSeven:[],//花艺装饰
                dataPlanEight:[],//婚礼灯光
                dataPlanNine:[],//舞美道具
                dataPlanTen:'',//补充说明
                // 1——婚宴预订contents
                dataBanquetZero:'',//形状
                dataBanquetOne:'',//面积
                dataBanquetTwo:'',//层高
                dataBanquetThree:'',//立柱
                // 2——婚礼摄影
                dataPhotographyZero:'',//摄影机位
                dataPhotographyOne:[],//摄影团队
                dataPhotographyTwo:[],//摄影器材
                dataPhotographyThree:'',//摄像时长
                dataPhotographyFour:'',//摄影内容
                dataPhotographyFive:'',//拍摄张数
                dataPhotographySix:'',//精修张数
                dataPhotographySeven:'',//成品说明
                dataPhotographyEight:'',//补充说明
                // 3——婚礼摄像
                dataCameraZero:'',//摄影机位
                dataCameraOne:[],//摄影团队
                dataCameraTwo:[],//摄影器材
                dataCameraThree:'',//摄像时长
                dataCameraFour:'',//摄影内容
                dataCameraFive:'',//全程录像
                dataCameraSix:'',//MV时长
                dataCameraSeven:'',//成品说明
                dataCameraEight:'',//补充说明
                // 4——婚礼造型
                dataModelZero:'',//化妆师
                dataModelOne:'',//化妆助理
                dataModelTwo:'',//新娘造型
                dataModelThree:'',//新娘妆面
                dataModelFour:'',//跟妆时间
                dataModelFive:[],//化妆品
                dataModelSix:[],//饰品
                dataModelSeven:'',//试妆服务
                dataModelEight:'',//试妆说明
                dataModelNine:'',//伴娘妆
                dataModelten:'',//妈妈妆
                dataModelEleven:'',//补充说明
                // 5——婚礼主持
                dataHostZero:'',//主持人
                dataHostOne:'',//音乐督导
                dataHostTwo:'',//现场督导
                dataHostThree:'',//服务内容
                dataHostFour:'',//服务特色
                dataHostFive:'',//补充说明
                // 6——环球旅拍
                dataTravelZero:'',//新娘服装
                dataTravelOne:'',//新郎服装
                dataTravelTwo:'',//服装说明
                dataTravelThree:'',//造型说明
                dataTravelFour:'',//拍摄场景
                dataTravelFive:'',//内景数量
                dataTravelSix:'',//内景说明
                dataTravelSeven:'',//外景数量
                dataTravelEight:'',//外景说明
                dataTravelNine:'',//拍摄天数
                dataTravelten:'',//拍摄张数
                dataTravelEleven:'',//精修张数
                dataTravelTwelve:'',//入册张数
                dataTravelThirteen:'',//相册数量
                dataTravelFourTeen:'',//相册说明
                dataTravelFifteen:'',//相册数量
                dataTravelSixteen:'',//相册说明
                dataTravelSeventeen:'',//摄影师
                dataTravelEighteen:'',//化妆师
                dataTravelNineteen:'',//灯光师
                dataTravelTwenty:'',//化妆助理
                dataTravelTwentyOne:'',//微电影拍摄
                dataTravelTwentyTwo:''//补充说明

            },
            // 添加多个标签的数据
            // 0——婚礼策划
            inputPlanFour: false,
            inputPlanFourValue: '',
            inputPlanFive: false,
            inputPlanFiveValue: '',
            inputPlanSix: false,
            inputPlanSixValue: '',
            inputPlanSeven: false,
            inputPlanSevenValue: '',
            inputPlanEight: false,
            inputPlanEightValue: '',
            inputPlanNine: false,
            inputPlanNineValue: '',
            // 2——婚礼摄影
            inputPhotographyOne: false,
            inputPhotographyOneValue: '',
            inputPhotographyTwo: false,
            inputPhotographyTwoValue: '',
            // 3——婚礼摄像
            inputCameraOne: false,
            inputCameraOneValue: '',
            inputCameraTwo: false,
            inputCameraTwoValue: '',
            //4-婚礼造型
            inputModelFive: false,
            inputModelFiveValue: '',
            inputModelSix: false,
            inputModelSixValue: '',

            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }//商品名称
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
            'business',
            'editorContent',//富文本
            'editorImgs',//富文本图片集合
            'coverAddress'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid || '';

        if (ths.xid != '') {
            ths.getCommodityDetail();//详情数据
            ths.initOriginalDate();
        } else {
            ths.storeEditorContent('')//清空富文本信息
        }
    },
    methods:{
        ...mapActions([
            'coverLink',//添加商品-上传封面地址
            'storeEditorContent',//存储富文本信息
            'storeEditorImgs',//储存图片数组
            'changeChildTitle'
        ]),
        //返回第一步
        stepPre(){
            let ths = this;

            ths.isStepOne = true;
        },
        //第二步
        stepNext(){
            let ths = this;

            if (ths.ruleForm.isRemote == '1'){
                if (ths.ruleForm.remoteInpro == '' || ths.ruleForm.remoteIncut == '' || ths.ruleForm.remoteInwrd == ''){
                    ths.$message({
                        message: '支持异地服务费，必须填写全部异地服务费',
                        type: 'warning'
                    });
                    return false
                }
            }
            if (ths.ruleForm.isRemote == '1'){
                if (ths.ruleForm.remoteInpro == '' || ths.ruleForm.remoteIncut == '' || ths.ruleForm.remoteInwrd == ''){
                    ths.$message({
                        message: '支持异地服务费，必须填写全部异地服务费',
                        type: 'warning'
                    });
                    return false
                }
            }

            ths.isStepOne = false;
        },
        //编辑状态回写详情数据
        getCommodityDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getCommodityDetail(params).then(res => {
                let result = res.data;
                let content = res.data.content;//商品内容单独处理
                let obj = {};

                obj.width = result.width;
                obj.height = result.height;
                obj.imgAddr = result.cover;
                ths.fileUrl = result.cover;

                ths.coverLink(obj);//商户-上传封面地址初始化
                ths.storeEditorContent(result.description);//富文本信息初始化

                let categoryTemp = '',colorTemp = '';

                switch (result.category){
                case '经典':
                    categoryTemp = '1'
                    break;
                case '中式':
                    categoryTemp = '2'
                    break;
                case '教堂':
                    categoryTemp = '3'
                    break;
                case '海岛':
                    categoryTemp = '4'
                    break;
                case '草坪':
                    categoryTemp = '5'
                    break;
                case '森系':
                    categoryTemp = '6'
                    break;
                case '户外':
                    categoryTemp = '7'
                    break;
                case '酒店':
                    categoryTemp = '8'
                    break;
                case '梦幻':
                    categoryTemp = '9'
                    break;
                case '韩式':
                    categoryTemp = '10'
                    break;
                case '童话':
                    categoryTemp = '11'
                    break;
                case '复古':
                    categoryTemp = '12'
                    break;
                case '摩登':
                    categoryTemp = '13'
                    break;
                case '田园':
                    categoryTemp = '14'
                    break;
                case '古堡':
                    categoryTemp = '15'
                    break;
                case '奢华':
                    categoryTemp = '16'
                    break;
                case '个性':
                    categoryTemp = '17'
                    break;
                case '简约':
                    categoryTemp = '18'
                    break;
                case '特殊':
                    categoryTemp = '19'
                    break;
                default:
                    break;
                }
                ths.ruleForm.elementCatagory = categoryTemp;//风格
                switch (result.color){
                case '蓝色':
                    colorTemp = '1'
                    break;
                case '红色':
                    colorTemp = '2'
                    break;
                case '绿色':
                    colorTemp = '3'
                    break;
                case '黄色':
                    colorTemp = '4'
                    break;
                case '白色':
                    colorTemp = '5'
                    break;
                case '粉色':
                    colorTemp = '6'
                    break;
                case '紫色':
                    colorTemp = '7'
                    break;
                case '黑色':
                    colorTemp = '8'
                    break;
                case '金色':
                    colorTemp = '9'
                    break;
                case '银色':
                    colorTemp = '10'
                    break;
                case '橘黄色':
                    colorTemp = '11'
                    break;
                case '特殊':
                    colorTemp = '12'
                    break;
                default:
                    break;
                }
                ths.ruleForm.elementColor = colorTemp;//颜色

                ths.ruleForm.name = result.commodityName;//商品名称
                ths.ruleForm.price = result.price;//价格
                ths.ruleForm.originPrice = result.originPrice;//原价
                // ths.ruleForm.locationId = result.locationId;//服务地区id
                ths.ruleForm.isRemote = result.isRemote.toString();//是否支持异地服务0不支持1支持
                ths.ruleForm.remoteInpro = result.remoteInPro;//省内异地费
                ths.ruleForm.remoteIncut = result.remoteInCut;//国内异地费
                ths.ruleForm.remoteInwrd = result.remoteInWrd;//海外异地费
                // ths.ruleForm.stockList:[];//档期安排
                // ths.ruleForm.stockValue = result.;//单日可接受订单值
                ths.ruleForm.capacity = result.capacity;//可容纳桌数
                ths.ruleForm.cityId = result.cityId;//环球旅拍的目的地
                ths.ruleForm.serviceType = result.serviceType;//旅拍服务类型
                switch (ths.business){
                // 0——婚礼策划contents
                case '0':case 0:
                    ths.ruleForm.dataPlanZero = content[0].value;//主持人
                    ths.ruleForm.dataPlanOne = content[1].value;//化妆师
                    ths.ruleForm.dataPlanTwo = content[2].value;//摄影师
                    ths.ruleForm.dataPlanThree = content[3].value;//摄像师
                    ths.ruleForm.dataPlanFour = content[4].value.split('，');//迎宾区
                    ths.ruleForm.dataPlanFive = content[5].value.split('，');//仪式区
                    ths.ruleForm.dataPlanSix = content[6].value.split('，');//婚宴区
                    ths.ruleForm.dataPlanSeven = content[7].value.split('，');//花艺装饰
                    ths.ruleForm.dataPlanEight = content[8].value.split('，');//婚礼灯光
                    ths.ruleForm.dataPlanNine = content[9].value.split('，');//舞美道具
                    ths.ruleForm.dataPlanTen = content[10].value;//补充说明
                    break;
                // 1——婚宴预订contents
                case '1':case 1:
                    ths.ruleForm.dataBanquetZero = content[0].value;//形状
                    ths.ruleForm.dataBanquetOne = content[1].value;//面积
                    ths.ruleForm.dataBanquetTwo = content[2].value;//层高
                    ths.ruleForm.dataBanquetThree = content[3].value;//立柱
                    break;
                // 2——婚礼摄影
                case '2':case 2:
                    ths.ruleForm.dataPhotographyZero = content[0].value;//摄影机位
                    ths.ruleForm.dataPhotographyOne = content[1].value.split('，');//摄影团队
                    ths.ruleForm.dataPhotographyTwo = content[2].value.split('，');//摄影器材
                    ths.ruleForm.dataPhotographyThree = content[3].value;//摄像时长
                    ths.ruleForm.dataPhotographyFour = content[4].value;//摄影内容
                    ths.ruleForm.dataPhotographyFive = content[5].value;//拍摄张数
                    ths.ruleForm.dataPhotographySix = content[6].value;//精修张数
                    ths.ruleForm.dataPhotographySeven = content[7].value;//成品说明
                    ths.ruleForm.dataPhotographyEight = content[8].value;//补充说明
                    break;
                case '3':case 3:
                    // 3——婚礼摄像
                    ths.ruleForm.dataCameraZero = content[0].value;//摄影机位
                    ths.ruleForm.dataCameraOne = content[1].value.split('，');//摄影团队
                    ths.ruleForm.dataCameraTwo = content[2].value.split('，');//摄影器材
                    ths.ruleForm.dataCameraThree = content[3].value;//摄像时长
                    ths.ruleForm.dataCameraFour = content[4].value;//摄影内容
                    ths.ruleForm.dataCameraFive = content[5].value;//全程录像
                    ths.ruleForm.dataCameraSix = content[6].value;//MV时长
                    ths.ruleForm.dataCameraSeven = content[7].value;//成品说明
                    ths.ruleForm.dataCameraEight = content[8].value;//补充说明
                    break;
                case '4':case 4:
                // 4——婚礼造型
                    ths.ruleForm.dataModelZero = content[0].value;//化妆师
                    ths.ruleForm.dataModelOne = content[1].value;//化妆助理
                    ths.ruleForm.dataModelTwo = content[2].value;//新娘造型
                    ths.ruleForm.dataModelThree = content[3].value;//新娘妆面
                    ths.ruleForm.dataModelFour = content[4].value;//跟妆时间
                    ths.ruleForm.dataModelFive = content[5].value.split('，');//化妆品
                    ths.ruleForm.dataModelSix = content[6].value.split('，');//饰品
                    ths.ruleForm.dataModelSeven = content[7].value;//试妆服务
                    ths.ruleForm.dataModelEight = content[8].value;//试妆说明
                    ths.ruleForm.dataModelNine = content[9].value;//伴娘妆
                    ths.ruleForm.dataModelten = content[10].value;//妈妈妆
                    ths.ruleForm.dataModelEleven = content[11].value;//补充说明
                    break;
                case '5':case 5:
                // 5——婚礼主持
                    ths.ruleForm.dataHostZero = content[0].value;//主持人
                    ths.ruleForm.dataHostOne = content[1].value;//音乐督导
                    ths.ruleForm.dataHostTwo = content[2].value;//现场督导
                    ths.ruleForm.dataHostThree = content[3].value;//服务内容
                    ths.ruleForm.dataHostFour = content[4].value;//服务特色
                    ths.ruleForm.dataHostFive = content[5].value;//补充说明
                    break;
                case '6':case 6:
                // 6——环球旅拍
                    ths.ruleForm.dataTravelZero = content[0].value;//新娘服装
                    ths.ruleForm.dataTravelOne = content[1].value;//新郎服装
                    ths.ruleForm.dataTravelTwo = content[2].value;//服装说明
                    ths.ruleForm.dataTravelThree = content[3].value;//造型说明
                    ths.ruleForm.dataTravelFour = content[4].value;//拍摄场景
                    ths.ruleForm.dataTravelFive = content[5].value;//内景数量
                    ths.ruleForm.dataTravelSix = content[6].value;//内景说明
                    ths.ruleForm.dataTravelSeven = content[7].value;//外景数量
                    ths.ruleForm.dataTravelEight = content[8].value;//外景说明
                    ths.ruleForm.dataTravelNine = content[9].value;//拍摄天数
                    ths.ruleForm.dataTravelten = content[10].value;//拍摄张数
                    ths.ruleForm.dataTravelEleven = content[11].value;//精修张数
                    ths.ruleForm.dataTravelTwelve = content[12].value;//入册张数
                    ths.ruleForm.dataTravelThirteen = content[13].value;//相册数量
                    ths.ruleForm.dataTravelFourTeen = content[14].value;//相册说明
                    ths.ruleForm.dataTravelFifteen = content[15].value;//相册数量
                    ths.ruleForm.dataTravelSixteen = content[16].value;//相册说明
                    ths.ruleForm.dataTravelSeventeen = content[17].value;//摄影师
                    ths.ruleForm.dataTravelEighteen = content[18].value;//化妆师
                    ths.ruleForm.dataTravelNineteen = content[19].value;//灯光师
                    ths.ruleForm.dataTravelTwenty = content[20].value;//化妆助理
                    ths.ruleForm.dataTravelTwentyOne = content[21].value;//微电影拍摄
                    ths.ruleForm.dataTravelTwentyTwo = content[22].value//补充说明
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
        //完成提交
        submitCommodityI(formName){
            let ths = this;
            let contents = [];
            let obj0 = {}, obj1 = {},obj2 = {},obj3 = {},obj4 = {},obj5 = {},obj6 = {},obj7 = {},obj8 = {},obj9 = {},
                obj10 = {},obj11 = {},obj12 = {},obj13 = {},obj14 = {},obj15 = {},obj16 = {},obj17 = {},obj18 = {},obj19 = {},
                obj20 = {},obj21 = {},obj22 = {};
            let str1 = '',str2 = '',str3 = '',str4 = '',str5 = '',str6 = '',str7 = '',str8 = '';

            switch (ths.business) {
            case 0: case '0'://婚礼策划
                obj0.name = '主持人';
                obj0.value = ths.ruleForm.dataPlanZero;
                obj0.category = '团队';
                obj1.name = '化妆师';
                obj1.value = ths.ruleForm.dataPlanOne;
                obj1.category = '团队';
                obj2.name = '摄影师';
                obj2.value = ths.ruleForm.dataPlanTwo;
                obj2.category = '团队';
                obj3.name = '摄像师';
                obj3.value = ths.ruleForm.dataPlanThree;
                obj3.category = '团队';
                str1 = ths.ruleForm.dataPlanFour.join('，');
                obj4.name = '迎宾区';
                obj4.value = str1;
                obj4.category = '会场布置';
                str2 = ths.ruleForm.dataPlanFive.join('，');
                obj5.name = '仪式区';
                obj5.value = str2;
                obj5.category = '会场布置';
                str3 = ths.ruleForm.dataPlanSix.join('，');
                obj6.name = '婚宴区';
                obj6.value = str3;
                obj6.category = '会场布置';
                str4 = ths.ruleForm.dataPlanSeven.join('，');
                obj7.name = '花艺装饰';
                obj7.value = str4;
                obj7.category = '花艺装饰';
                str5 = ths.ruleForm.dataPlanEight.join('，');
                obj8.name = '婚礼灯光';
                obj8.value = str5;
                obj8.category = '灯光舞美';
                str6 = ths.ruleForm.dataPlanNine.join('，');
                obj9.name = '舞美道具';
                obj9.value = str6;
                obj9.category = '灯光舞美';
                obj10.name = '补充说明';
                obj10.value = ths.ruleForm.dataPlanTen;
                obj10.category = '补充说明';
                contents[0]=obj0;
                contents[1]=obj1;
                contents[2]=obj2;
                contents[3]=obj3;
                contents[4]=obj4;
                contents[5]=obj5;
                contents[6]=obj6;
                contents[7]=obj7;
                contents[8]=obj8;
                contents[9]=obj9;
                contents[10]=obj10;
                break;
            case 1: case '1'://婚宴预订
                obj0.name = '形状';
                obj0.value = ths.ruleForm.dataBanquetZero;
                obj0.category = '形状';
                obj1.name = '宴会厅面积';
                obj1.value = ths.ruleForm.dataBanquetOne;
                obj1.category = '面积';
                obj2.name = '宴会厅层高';
                obj2.value = ths.ruleForm.dataBanquetTwo;
                obj2.category = '层高';
                obj3.name = '立柱数';
                obj3.value = ths.ruleForm.dataBanquetThree;
                obj3.category = '立柱';
                contents[0]=obj0;
                contents[1]=obj1;
                contents[2]=obj2;
                contents[3]=obj3;
                break;
            case 2: case '2'://婚礼摄影
                obj0.name = ' 摄影机位';
                obj0.value = ths.ruleForm.dataPhotographyZero;
                obj0.category = '团队';
                str1 = ths.ruleForm.dataPhotographyOne.join('，');
                obj1.name = '摄影团队';
                obj1.value = str1;
                obj1.category = '团队';
                str2 = ths.ruleForm.dataPhotographyTwo.join('，');
                obj2.name = ' 摄影器材';
                obj2.value = str2;
                obj2.category = '拍摄';
                obj3.name = '摄影时长';
                obj3.value = ths.ruleForm.dataPhotographyThree;
                obj3.category = '拍摄';
                obj4.name = '摄影内容';
                obj4.value = ths.ruleForm.dataPhotographyFour;
                obj4.category = '拍摄';
                obj5.name = '拍摄张数';
                obj5.value = ths.ruleForm.dataPhotographyFive;
                obj5.category = '成品';
                obj6.name = '精修张数';
                obj6.value = ths.ruleForm.dataPhotographySix;
                obj6.category = '成品';
                obj7.name = '成品说明';
                obj7.value = ths.ruleForm.dataPhotographySeven;
                obj7.category = '成品';
                obj8.name = '补充说明';
                obj8.value = ths.ruleForm.dataPhotographyEight;
                obj8.category = '补充说明';
                contents[0]=obj0;
                contents[1]=obj1;
                contents[2]=obj2;
                contents[3]=obj3;
                contents[4]=obj4;
                contents[5]=obj5;
                contents[6]=obj6;
                contents[7]=obj7;
                contents[8]=obj8;
                break;
            case 3: case '3'://婚礼摄像
                obj0.name = '摄像机位';
                obj0.value = ths.ruleForm.dataCameraZero;
                obj0.category = '团队';
                str1 = ths.ruleForm.dataCameraOne.join('，');
                obj1.name = '摄像团队';
                obj1.value = str1;
                obj1.category = '团队';
                str2 = ths.ruleForm.dataCameraTwo.join('，');
                obj2.name = '摄像器材';
                obj2.value = str2;
                obj2.category = '拍摄';
                obj3.name = '摄像时长';
                obj3.value = ths.ruleForm.dataCameraThree;
                obj3.category = '拍摄';
                obj4.name = '摄像内容';
                obj4.value = ths.ruleForm.dataCameraFour;
                obj4.category = '拍摄';
                obj5.name = '全程录像';
                obj5.value = ths.ruleForm.dataCameraFive;
                obj5.category = '成品';
                obj6.name = 'MV时长';
                obj6.value = ths.ruleForm.dataCameraSix;
                obj6.category = '成品';
                obj7.name = '成品说明';
                obj7.value = ths.ruleForm.dataCameraSeven;
                obj7.category = '成品';
                obj8.name = '补充说明';
                obj8.value = ths.ruleForm.dataCameraEight;
                obj8.category = '补充说明';
                contents[0]=obj0;
                contents[1]=obj1;
                contents[2]=obj2;
                contents[3]=obj3;
                contents[4]=obj4;
                contents[5]=obj5;
                contents[6]=obj6;
                contents[7]=obj7;
                contents[8]=obj8;
                break;
            case 4: case '4'://婚礼造型
                obj0.name = '化妆师';
                obj0.value = ths.ruleForm.dataModelZero;
                obj0.category = '团队';
                obj1.name = '化妆助理';
                obj1.value = ths.ruleForm.dataModelOne;
                obj1.category = '团队';
                obj2.name = '新娘造型';
                obj2.value = ths.ruleForm.dataModelTwo;
                obj2.category = '新娘跟妆';
                obj3.name = '新娘妆面';
                obj3.value = ths.ruleForm.dataModelThree;
                obj3.category = '新娘跟妆';
                obj4.name = '跟妆时间';
                obj4.value = ths.ruleForm.dataModelFour;
                obj4.category = '新娘跟妆';
                str1 = ths.ruleForm.dataModelFive.join('，');
                obj5.name = '化妆品';
                obj5.value = str1;
                obj5.category = '新娘跟妆';
                str2 = ths.ruleForm.dataModelSix.join('，');
                obj6.name = '饰品';
                obj6.value = str2;
                obj6.category = '新娘跟妆';
                obj7.name = '试妆服务';
                obj7.value = ths.ruleForm.dataModelSeven;
                obj7.category = '新娘试妆';
                obj8.name = '试妆说明';
                obj8.value = ths.ruleForm.dataModelEight;
                obj8.category = '新娘试妆';
                obj9.name = '伴娘妆';
                obj9.value = ths.ruleForm.dataModelNine;
                obj9.category = '亲友妆发';
                obj10.name = '妈妈妆';
                obj10.value = ths.ruleForm.dataModelTen;
                obj10.category = '亲友妆发';
                obj11.name = '补充说明';
                obj11.value = ths.ruleForm.dataModelEleven;
                obj11.category = '补充说明';
                contents[0]=obj0;
                contents[1]=obj1;
                contents[2]=obj2;
                contents[3]=obj3;
                contents[4]=obj4;
                contents[5]=obj5;
                contents[6]=obj6;
                contents[7]=obj7;
                contents[8]=obj8;
                contents[9]=obj9;
                contents[10]=obj10;
                contents[11]=obj11;
                break;
            case 5: case '5'://婚礼主持
                obj0.name = '主持人';
                obj0.value = ths.ruleForm.dataHostZero;
                obj0.category = '团队';
                obj1.name = '音乐督导';
                obj1.value = ths.ruleForm.dataHostOne;
                obj1.category = '团队';
                obj2.name = '现场督导';
                obj2.value = ths.ruleForm.dataHostTwo;
                obj2.category = '团队';
                obj3.name = '服务内容';
                obj3.value = ths.ruleForm.dataHostThree;
                obj3.category = '服务';
                obj4.name = '服务特色';
                obj4.value = ths.ruleForm.dataHostFour;
                obj4.category = '服务';
                obj5.name = '补充说明';
                obj5.value = ths.ruleForm.dataHostFive;
                obj5.category = '补充说明';
                contents[0]=obj0;
                contents[1]=obj1;
                contents[2]=obj2;
                contents[3]=obj3;
                contents[4]=obj4;
                contents[5]=obj5;
                break;
            case 6: case '6'://环球旅拍

                obj0.name = '新娘服装';
                obj0.value = ths.ruleForm.dataTravelZero;
                obj0.category = '造型';
                obj1.name = '新郎服装';
                obj1.value = ths.ruleForm.dataTravelOne;
                obj1.category = '造型';
                obj2.name = '服装说明';
                obj2.value = ths.ruleForm.dataTravelTwo;
                obj2.category = '造型';
                obj3.name = '造型说明';
                obj3.value = ths.ruleForm.dataTravelThree;
                obj3.category = '造型';
                obj4.name = '拍摄场景';
                obj4.value = ths.ruleForm.dataTravelFour;
                obj4.category = '场景';
                obj5.name = '内景数量';
                obj5.value = ths.ruleForm.dataTravelFive;
                obj5.category = '场景';
                obj6.name = '内景说明';
                obj6.value = ths.ruleForm.dataTravelSix;
                obj6.category = '场景';
                obj7.name = '外景数量';
                obj7.value = ths.ruleForm.dataTravelSeven;
                obj7.category = '场景';
                obj8.name = '外景说明';
                obj8.value = ths.ruleForm.dataTravelEight;
                obj8.category = '场景';
                obj9.name = '拍摄天数';
                obj9.value = ths.ruleForm.dataTravelNine;
                obj9.category = '拍摄';
                obj10.name = '拍摄张数';
                obj10.value = ths.ruleForm.dataTravelten;
                obj10.category = '拍摄';
                obj11.name = '精修张数';
                obj11.value = ths.ruleForm.dataTravelEleven;
                obj11.category = '拍摄';
                obj12.name = '入册张数';
                obj12.value = ths.ruleForm.dataTravelTwelve;
                obj12.category = '拍摄';
                obj13.name = '相册数量';
                obj13.value = ths.ruleForm.dataTravelThirteen;
                obj13.category = '成品';
                obj14.name = '相册说明';
                obj14.value = ths.ruleForm.dataTravelFourTeen;
                obj14.category = '成品';
                obj15.name = '相框数量';
                obj15.value = ths.ruleForm.dataTravelFifteen;
                obj15.category = '成品';
                obj16.name = '相框说明';
                obj16.value = ths.ruleForm.dataTravelSixteen;
                obj16.category = '成品';
                obj17.name = '摄像师';
                obj17.value = ths.ruleForm.dataTravelSeventeen;
                obj17.category = '团队';
                obj18.name = '化妆师';
                obj18.value = ths.ruleForm.dataTravelEighteen;
                obj18.category = '团队';
                obj19.name = '灯光师';
                obj19.value = ths.ruleForm.dataTravelNineteen;
                obj19.category = '团队';
                obj20.name = '化妆助理';
                obj20.value = ths.ruleForm.dataTravelTwenty;
                obj20.category = '团队';
                obj21.name = '微电影拍摄';
                obj21.value = ths.ruleForm.dataTravelTwentyOne;
                obj21.category = '团队';
                obj22.name = '补充说明';
                obj22.value = ths.ruleForm.dataTravelTwentyTwo;
                obj22.category = '补充说明';
                contents[0]=obj0;
                contents[1]=obj1;
                contents[2]=obj2;
                contents[3]=obj3;
                contents[4]=obj4;
                contents[5]=obj5;
                contents[6]=obj6;
                contents[7]=obj7;
                contents[8]=obj8;
                contents[9]=obj9;
                contents[10]=obj10;
                contents[11]=obj11;
                contents[12]=obj12;
                contents[13]=obj13;
                contents[14]=obj14;
                contents[15]=obj15;
                contents[16]=obj16;
                contents[17]=obj17;
                contents[18]=obj18;
                contents[19]=obj19;
                contents[20]=obj20;
                contents[21]=obj21;
                contents[22]=obj22;
                break;
            default:
                break;
            }

            let params = {
                tk:ths.tk,
                name:ths.ruleForm.name,//商品名称
                price:ths.ruleForm.price,//价格
                originPrice:ths.ruleForm.originPrice,//原价
                // locationId:ths.ruleForm.locationId,//服务地区id
                isRemote:ths.ruleForm.isRemote,//是否支持异地服务0不支持1支持
                remoteInpro:ths.ruleForm.remoteInpro,//省内异地费
                remoteIncut:ths.ruleForm.remoteIncut,//国内异地费
                remoteInwrd:ths.ruleForm.remoteInwrd,//海外异地费
                stockList:ths.ruleForm.stockList,//档期安排
                stockValue:ths.ruleForm.stockValue,//单日可接受订单值
                elementCatagory:ths.ruleForm.elementCatagory,//风格
                elementColor:ths.ruleForm.elementColor,//颜色
                capacity:ths.ruleForm.capacity,//可容纳桌数
                area:ths.ruleForm.dataBanquetTwo,//酒店大厅面积

                videoList:[],//视频集
                cityId:4,//环球旅拍的目的地
                // serviceType:6,//旅拍服务类型
                // 6种不同的商家
                contents:contents,//商品内容,格式较复杂，单独分类
                // vuex存储
                description:ths.editorContent,//描述
                imageList:ths.editorImgs,//图片集
                width:ths.coverAddress.width,//封面宽度
                height:ths.coverAddress.height,//封面高度
                cover:ths.coverAddress.imgAddr//封面
            };

            if (ths.xid != ''){
                params.commodityId = ths.xid;//编辑状态
                params.stockList = [];
                params.stockValue = '';
            }
            api.submitCommodityI(params).then(res => {
                ths.coverLink({});//清空商户-上传封面地址
                ths.storeEditorContent('');//清空富文本信息
                ths.storeEditorImgs([])//清空图片数组信息
                ths.$refs[formName].resetFields();//清空数据
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });

                ths.$router.push({
                    name: 'goodsList',
                    query: {}
                })
                ths.changeChildTitle('商品列表')//跳转的时候将header的值存入store中
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },

        //二次确认
        openConfirm(formName) {
            let ths = this;
            const h = this.$createElement;

            if (ths.ruleForm.elementCatagory == ''){
                ths.$message({
                    message: '请选择商品的风格',
                    type: 'warning'
                });
                return false
            }
            if (ths.ruleForm.elementColor == ''){
                ths.$message({
                    message: '请选择商品的颜色',
                    type: 'warning'
                });
                return false
            }

            if (ths.coverAddress.imgAddr && ths.coverAddress.imgAddr !=''){
                let a = {};
            } else {
                ths.$message({
                    message: '请上传商品封面',
                    type: 'warning'
                });
                return false
            }

            this.$msgbox({
                title: '是否确认',
                message: h('p', null, [
                    h('span', null, '提交所有内容 ')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') { //确定
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '提交中...';
                        setTimeout(() => {
                            done();
                            ths.submitCommodityI(formName);//提交
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 200);
                        }, 1000);
                    } else {
                        done();//取消
                    }
                }
            }).then(action => {
            });
        },
        //关闭标签
        handleClose(tag,valueType) {
            let ths = this;

            switch (valueType){
            case 'PlanFour':
                ths.ruleForm.dataPlanFour.splice(ths.ruleForm.dataPlanFour.indexOf(tag), 1);
                break;
            case 'PlanFive':
                ths.ruleForm.dataPlanFive.splice(ths.ruleForm.dataPlanFive.indexOf(tag), 1);
                break;
            case 'PlanSix':
                ths.ruleForm.dataPlanSix.splice(ths.ruleForm.dataPlanSix.indexOf(tag), 1);
                break;
            case 'PlanSeven':
                ths.ruleForm.dataPlanSeven.splice(ths.ruleForm.dataPlanSeven.indexOf(tag), 1);
                break;
            case 'PlanEight':
                ths.ruleForm.dataPlanEight.splice(ths.ruleForm.dataPlanEight.indexOf(tag), 1);
                break;
            case 'PlanNine':
                ths.ruleForm.dataPlanNine.splice(ths.ruleForm.dataPlanNine.indexOf(tag), 1);
                break;
            case 'PhotographyOne':
                ths.ruleForm.dataPhotographyOne.splice(ths.ruleForm.dataPhotographyOne.indexOf(tag), 1);
                break;
            case 'PhotographyTwo':
                ths.ruleForm.dataPhotographyTwo.splice(ths.ruleForm.dataPhotographyTwo.indexOf(tag), 1);
                break;
            case 'CameraOne':
                ths.ruleForm.dataCameraOne.splice(ths.ruleForm.dataCameraOne.indexOf(tag), 1);
                break;
            case 'CameraTwo':
                ths.ruleForm.dataCameraTwo.splice(ths.ruleForm.dataCameraTwo.indexOf(tag), 1);
                break;
            case 'ModelFive':
                ths.ruleForm.dataModelFive.splice(ths.ruleForm.ModelFive.indexOf(tag), 1);
                break;
            case 'ModelSix':
                ths.ruleForm.dataModelSix.splice(ths.ruleForm.ModelSix.indexOf(tag), 1);
                break;
            default:
                break;
            }
        },
        //增加标签输入框
        showInput(valueType) {
            let ths = this;

            switch (valueType){
            case 'PlanFour':
                ths.inputPlanFour = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePlanFourInput.$refs.input.focus();
                });
                break;
            case 'PlanFive':
                ths.inputPlanFive = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePlanFiveInput.$refs.input.focus();
                });
                break;
            case 'PlanSix':
                ths.inputPlanSix = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePlanSixInput.$refs.input.focus();
                });
                break;
            case 'PlanSeven':
                ths.inputPlanSeven = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePlanSevenInput.$refs.input.focus();
                });
                break;
            case 'PlanEight':
                ths.inputPlanEight = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePlanEightInput.$refs.input.focus();
                });
                break;
            case 'PlanNine':
                ths.inputPlanNine = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePlanNineInput.$refs.input.focus();
                });
                break;
            case 'PhotographyOne':
                ths.inputPhotographyOne = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePhotographyOneInput.$refs.input.focus();
                });
                break;
            case 'PhotographyTwo':
                ths.inputPhotographyTwo = true;
                ths.$nextTick(_ => {
                    ths.$refs.savePhotographyTwoInput.$refs.input.focus();
                });
                break;
            case 'CameraOne':
                ths.inputCameraOne = true;
                ths.$nextTick(_ => {
                    ths.$refs.saveCameraOneInput.$refs.input.focus();
                });
                break;
            case 'CameraTwo':
                ths.inputCameraTwo = true;
                ths.$nextTick(_ => {
                    ths.$refs.saveCameraTwoInput.$refs.input.focus();
                });
                break;
            case 'ModelFive':
                ths.inputModelFive = true;
                ths.$nextTick(_ => {
                    ths.$refs.saveModelFiveInput.$refs.input.focus();
                });
                break;
            case 'ModelSix':
                ths.inputModelSix = true;
                ths.$nextTick(_ => {
                    ths.$refs.saveModelSixInput.$refs.input.focus();
                });
                break;
            default:
                break;
            }

        },
        //标签输入完毕确认
        handleInputConfirm(valueType) {
            let ths = this;

            switch (valueType){
            case 'PlanFour':
                if (ths.inputPlanFourValue) {
                    ths.ruleForm.dataPlanFour.push(ths.inputPlanFourValue);
                }
                ths.inputPlanFour = false;
                ths.inputPlanFourValue = '';
                break;
            case 'PlanFive':
                if (ths.inputPlanFiveValue) {
                    ths.ruleForm.dataPlanFive.push(ths.inputPlanFiveValue);
                }
                ths.inputPlanFive = false;
                ths.inputPlanFiveValue = '';
                break;
            case 'PlanSix':
                if (ths.inputPlanSixValue) {
                    ths.ruleForm.dataPlanSix.push(ths.inputPlanSixValue);
                }
                ths.inputPlanSix = false;
                ths.inputPlanSixValue = '';
                break;
            case 'PlanSeven':
                if (ths.inputPlanSevenValue) {
                    ths.ruleForm.dataPlanSeven.push(ths.inputPlanSevenValue);
                }
                ths.inputPlanSeven = false;
                ths.inputPlanSevenValue = '';
                break;
            case 'PlanEight':
                if (ths.inputPlanEightValue) {
                    ths.ruleForm.dataPlanEight.push(ths.inputPlanEightValue);
                }
                ths.inputPlanEight = false;
                ths.inputPlanEightValue = '';
                break;
            case 'PlanNine':
                if (ths.inputPlanNineValue) {
                    ths.ruleForm.dataPlanNine.push(ths.inputPlanNineValue);
                }
                ths.inputPlanNine = false;
                ths.inputPlanNineValue = '';
                break;
            case 'PhotographyOne':
                if (ths.inputPhotographyOneValue) {
                    ths.ruleForm.dataPhotographyOne.push(ths.inputPhotographyOneValue);
                }
                ths.inputPhotographyOne = false;
                ths.inputPhotographyOneValue = '';
                break;
            case 'PhotographyTwo':
                if (ths.inputPhotographyTwoValue) {
                    ths.ruleForm.dataPhotographyTwo.push(ths.inputPhotographyTwoValue);
                }
                ths.inputPhotographyTwo = false;
                ths.inputPhotographyTwoValue = '';
                break;
            case 'CameraOne':
                if (ths.inputCameraOneValue) {
                    ths.ruleForm.dataCameraOne.push(ths.inputCameraOneValue);
                }
                ths.inputCameraOne = false;
                ths.inputCameraOneValue = '';
                break;
            case 'CameraTwo':
                if (ths.inputCameraTwoValue) {
                    ths.ruleForm.dataCameraTwo.push(ths.inputCameraTwoValue);
                }
                ths.inputCameraTwo = false;
                ths.inputCameraTwoValue = '';
                break;
            case 'ModelFive':
                if (ths.inputModelFiveValue) {
                    ths.ruleForm.dataModelFive.push(ths.inputModelFiveValue);
                }
                ths.inputModelFive = false;
                ths.inputModelFiveValue = '';
                break;
            case 'ModelSix':
                if (ths.inputModelSixValue) {
                    ths.ruleForm.dataModelSix.push(ths.inputModelSixValue);
                }
                ths.inputModelSix = false;
                ths.inputModelSixValue = '';
                break;
            default:
                break;
            }
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
        },
        //关闭更新档期弹窗
        closeFn(formName){
            let ths = this;

            ths.isStock = false;
            ths.stockId = '';
        },
        // 提交更新档期的数据信息
        commodityUpdateStocks(formName){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.stockId,
                list:ths.stockForm.stockList,
                stockValue:ths.stockForm.stockValue//单日可接受订单数
            };

            api.commodityUpdateStocks(params).then(res => {
                ths.$message({
                    message: '操作成功',
                    type: 'success'
                });
                ths.openSchedule(ths.stockId);
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        }

    },
    watch:{
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
    .step-item{
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
                .schedule-tip{
                    margin : 0px 0px 22px 48px;
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
        padding: 14px;
        .good-column-danwei{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
        }
        span{
            margin-top: 12px;
            margin-left: 12px;
        }
    }
    .good-column-banq{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
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
    width: 150px;
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
