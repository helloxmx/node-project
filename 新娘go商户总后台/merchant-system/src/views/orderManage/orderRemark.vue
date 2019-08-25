<template>
    <div class="order-cancle">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22 backgroundfff">
        </div>
    </div>
</template>
<script>
import singleComment from '@/components/common/singleComment';
import singleGood from '@/components/common/singleGood';
import headerTitle from '@/components/common/headerTitle';
import api from '@/http/api';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components:{
        singleComment,//评论 单个
        singleGood,//列表单个元素
        headerTitle//标题
    },
    data(){
        return {
            dataobj:{
                collectCnt:100,//收藏数
                readTimes:100,//点赞数
                title:'',//文章标题
                type:'',//文章分类
                userId:'',//商户ID
                cover:'',//封面
                statusName:'待付款'
            },
            pubTime:'',//发布时间
            content:'',//文章内容
            commentList:[{
                content:'哈哈哈，最喜欢看火影了',
                pcontent:'看来大家都是小可爱',
                pubTime:'2018-10-01 12:00:00'
            },
            {
                content:'哈哈哈，最喜欢看火影了',
                pcontent:'看来大家都是小可爱',
                pubTime:'2018-10-01 12:00:00'
            },
            {
                content:'哈哈哈，最喜欢看火影了',
                pcontent:'看来大家都是小可爱',
                pubTime:'2018-10-01 12:00:00'
            }],
            pageSize:10,
            page: 1,
            total:100,
            lists:[{
                cover:require('@/assets/img/userIcon.jpg'),
                storeName:'杭州JW万号酒店婚宴预订',
                price:9999
            }]
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.orderId = ths.$route.query.orderId;
        ths.getArticleComment();
    },
    methods:{
        // ...mapActions([
        //     'changeTitle'//跳转到页面
        // ]),
        //获取article
        //获取评论列表
        getArticleComment(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid,
                pageSize:ths.pageSize,
                page: ths.page,
                itype:0//0资讯；3说说
            };

            api.getArticleComment(params).then(res => {
                ths.commentList = res.data.data;
                ths.total = res.data.total;
            }).catch(e => {
                // alert(e.msg)
            })
        },
        //隐藏或者删除评论
        opreateComment(obj){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:obj.xid,
                type:obj.type//0隐藏；1删除
            };

            api.opreateComment(params).then(res => {
                ths.getArticleComment();
            }).catch(e => {
                // alert(e.msg)
            })
        },
        showAllComment(){

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
        }
    }
}
</script>

<style lang="scss">
.order-detail{
    width: 100%;
    .step-progress{
    }
    .step-status-btns{
        margin-top: 22px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .status-left{
            span{
                color: #FF739E;
            }
        }
        
    }
}
</style>
