<template>
    <div class="single-comment">
        <div class="comment-user mr22">
            <img :src="dataObj.avatar" alt="">
        </div>
        <div class="comment-word">
            <div>{{dataObj.nickName}}</div>
            <div>评论了：{{dataObj.content}}</div>
            <div>
                <span>{{dataObj.pubTime}}</span>
                <span class="pub-btn theme-color" @click="hide(dataObj.id,0)">{{dataObj.showStatus | changeName}}</span>
                <span class="pub-btn theme-color" @click="remove(dataObj.id,1)">删除</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        dataObj:{
            type:null,
            default:function(){
                return {
                    avatar:'http://img.bridegoing.com/avatorImage1534909235',
                    content:'母女装',
                    id:5146283368873985,
                    nickName:'R-one',
                    pubTime:'2018-08-31 10:36:57',
                    showStatus:1
                }
            }
        }
    },
    filters:{
        changeName(value){
            let txt = '';

            switch (value) {
            case 0:
                txt = '显示';
                break;
            case 1:
                txt = '隐藏'
                break;
            default:
                break;
            }
            return txt;
        }
    },
    methods:{
        //隐藏
        hide(xid,type){
            let ths = this;
            let obj = {};

            obj.xid = xid;
            obj.type = type
            ths.$emit('hide',obj);
        },
        //删除
        remove(xid,type){
            let ths = this;
            let obj = {};

            obj.xid = xid;
            obj.type = type
            ths.$emit('remove',obj);
        }
    }
}
</script>
<style lang="scss" scoped>
.single-comment{
    display: -webkit-flex;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding: 22px 0px;
    .comment-user{
        width: 68px;
        height: 68px;
        border:1px solid #d9d9d9;
        border-radius: 2px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 2px;
        }
    }
    .comment-word{
        line-height: 36px;
        font-size: 16px;
        .pub-btn{
            cursor: pointer;
        }
    }
}
</style>
