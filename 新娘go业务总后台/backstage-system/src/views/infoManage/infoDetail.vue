<template>
    <div>
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22">
            <div class="single-content">
                <div class="article-content p22 backgroundfff mr22">
                    <div class="article-title">
                        <div class="title">{{article.title}}</div>
                        <div class="second mt22">
                            <div class="second-item-one">文章分类：{{article.type}}</div>
                            <div class="second-item-two">发布时间：{{article.pubTime}}</div>
                        </div>
                    </div>
                    <div class="content mt22">
                        <div v-html="article.content">{{article.content}}施工方容光焕发韩国进口逢年过节可能发生的快过年放假肯定能够激发你家公司 </div>
                        <div class="content-footer">
                            <span>收藏：{{article.collectCnt}}</span>
                            <span>阅读：{{article.readTimes}}</span>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="all-comment" @click="showAllComment">
                            <img src="@/assets/img/icon/comment.png" alt="">
                            <span>查看全部评论{{article.commentCnt}}</span>
                        </div>
                        <div class="comment-box">
                            <single-comment
                            class="single-box"
                            v-for="(item,index) in commentList"
                            :key=index
                            :dataObj="item"
                            @hide="opreateComment"
                            @remove="opreateComment"></single-comment>
                        </div>
                    </div>
                    <div class="comment-footer">
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
                <div class="relate-list p22 backgroundfff">
                    <div class="cover">
                        <div class="cover-title">封面图片</div>
                        <div><img :src="article.cover" alt=""></div>
                    </div>
                    <div class="list-box p22">
                    <single-good
                    class="item-good"
                    v-for="(item,index) in article.commodityList"
                    :key="index"
                    :dataObj="item"
                    ></single-good>
                    <!-- type=0 隐藏 type=1 删除 -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import singleComment from '@/components/common/singleComment';
import singleGood from '@/components/common/singleGood';
import api from '@/http/api';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components:{
        singleComment,//评论 单个
        singleGood//列表单个元素
    },
    data(){
        return {
            article:{
                collectCnt:100,//收藏数
                readTimes:100,//点赞数
                title:'',//文章标题
                type:'',//文章分类
                userId:'',//商户ID
                cover:''//封面
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
        ...mapGetters(['headerTitle','tk'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getArticleDetail();
        ths.getArticleComment();
    },
    methods:{
        // ...mapActions([
        //     'changeTitle'//跳转到页面
        // ]),
        //获取article
        getArticleDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getArticleDetail(params).then(res => {
                ths.article = res.data.data;
            }).catch(e => {
                // alert(e.msg)
            })
        },
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
.single-content{
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction:row;
    // 文章部分
    .article-content{
        width: calc(100% - 302px);
        .article-title{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .title{
            font-size: 24px;
        }
        .second{
            font-size: 16px;
            display:-webkit-flex;
            display: flex;
            flex-direction: row;
            .second-item-one{
                margin-right: 22px;
            }
        }
        .content{
            font-size: 16px;
            padding: 22px 0px;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            img{
                width: 100%;
            }
            .content-footer{
                display: -webkit-flex;
                display: flex;
                flex-direction: row-reverse;
                color: #aaaaaa;
                margin-top: 40px;
                span{
                    margin-left: 22px;
                }
            }
        }
        //评论区
        .comment{
            .all-comment{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin:22px 0px;
                img{
                    width:24px;
                    height: 24px;
                }
                span{
                    display: block;
                    padding: 8px;
                }
            }
            .comment-box{
                .single-box{
                    border-top: 1px solid #d9d9d9;
                    &:last-child{
                        border-bottom: 1px solid #d9d9d9;
                    }
                }
            }
        }
        .comment-footer{
            padding: 22px 0px;
            display: -webkit-flex;
            display: flex;
            flex-direction: row-reverse;
        }
    }
    // 文章相关列表
    .relate-list{
        width: 280px;
        .cover{
            width: 100%;
            padding-bottom: 22px;
            border-bottom:1px solid #d9d9d9;
            .cover-title{
                font-size: 18px;
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
            .item-good{

            }
        }
    }
}
</style>
