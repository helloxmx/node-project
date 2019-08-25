<template>
    <div class="minHeight100">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="case-content minHeight100">
            <div class="detail-content p22 backgroundfff">
                <div class="case-title">
                    <div class="main-title">{{dataObj.title}}</div>
                    <div class="second-title">
                        <span>案例分类：{{dataObj.business}}</span>
                        <span>发布时间：{{dataObj.pubTime}}</span>
                    </div>
                </div>
                <div class="content">
                    <div v-html="dataObj.content"></div>
                </div>
            </div>
            <div class="relate-list p22 backgroundfff">
                <div class="cover">
                    <div class="cover-title">简介图片</div>
                </div>
                <div class="list-box">
                    <img :src="dataObj.cover" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import singleGood from '@/components/common/singleGood';
import api from '@/http/api';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components:{
        headerTitle,//标题栏
        singleGood//列表单个元素
    },
    data(){
        return {
            dataObj:{},

            pubTime:'',//发布时间
            content:'',//文章内容
            pageSize:10,
            page: 1,
            total:100,
            lists:[{
                cover:require('@/assets/img/userIcon.jpg'),
                caseName:'杭州JW万号酒店婚宴预订',
                price:9999
            }]
        }
    },
    computed:{
        ...mapGetters(['headerTitle','headerChildTitle','tk'])
    },
    mounted(){
        let ths = this;
        let xid = ths.$route.query.xid;

        ths.name = ths.$route.query.name;
        ths.getStoreWorkDetail(xid);
    },
    methods:{
        ...mapActions([
            'editorContent',//富文本
            'editorImgs',//富文本图片集合
            'coverAddress'//跳转到页面
        ]),
        //获取dataObj
        getStoreWorkDetail(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid
            };

            api.getStoreWorkDetail(params).then(res => {
                ths.dataObj = res.data;
                
            }).catch(e => {
                // alert(e.msg)
            })
        }
    }
}
</script>

<style lang="scss">
.case-content{
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    // 详情
    .detail-content{
        width: calc(100% - 302px);
        color: #4a4a4a;
        .case-title{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            .main-title{
                padding: 22px 0px;
            }
            .second-title{
                font-size: 16px;
                color: #9b9b9b;
            }
        }
        .title{
            font-size: 24px;
            padding-bottom: 22px;
        }
        .content{
            font-size: 16px;
            line-height: 1.6;
            padding: 22px 0px;
            img{
                width: 100%;
            }
        }
    }
    // 相关图片列表
    .relate-list{
        width: 280px;
        margin-left: 22px;
        .cover{
            width: 100%;
            .cover-title{
                font-size: 24px;
                padding-bottom: 22px;
            }
            img{
                width: 100%;
            }
        }
        .list-box{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img{
                width: 100%;
            }
        }
    }
}

</style>
