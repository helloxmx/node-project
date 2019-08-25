<template>
    <div class="header">
        <span >{{title}}</span>
        <div class="right">
            <p v-if="isBack" @click="backFn">
                <img src="@/assets/img/icon/back.png" alt="">
                返回
            </p>
            <p v-else @click="refreshFn">
                <img class="refresh" src="@/assets/img/icon/refresh.png" alt="">
                刷新
            </p>
        </div>
    </div>
</template>

<script>
export default {
// 27px
    props: ['title', 'isBack'],
    data () {
        return {
        }
    },
    methods: {
        backFn () { // 返回
            history.go(-1)
        },
        refreshFn () { // 刷新
            location.reload()
        }
    }
}
</script>

<style scope lang='scss'>
.header{
    padding-left:27px;
    margin-bottom:21px;
    height:50px;
    width:100%;
    // position: absolute;
    // left: 0px;
    // top: 0px;
    -ms-overflow-x: hidden;
    overflow-x: hidden;
    -ms-overflow-y: hidden;
    overflow-y: hidden;
    background-color: rgba(243, 243, 243, 1);
    background-image: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
        span{
            // border-top: 0px;
            // border-right: 0px;
            // border-bottom: 0px;
            // border-radius: 0px;
            // border-left-width: 5px;
            // border-left-color:#FF739E;;
            // border-left-style: solid;
            // padding-left:10px;
            font-weight: 400;
            font-style: normal;
            color: #999999;
            text-align: left;
            font-size:14px;
        }
    .right{
        padding-right:27px;
        font-size:14px;
        p{
            margin:0;
            width:80px;
            height:30px;
            display: flex;
            border-radius:40px;
            align-items: center;
            color:#666666;
            background: inherit;
            background-color: rgba(255, 255, 255, 1);
            box-sizing: border-box;
            border-width: 1px;
            border-style: solid;
            border-color: rgba(204, 204, 204, 1);
            // border-color:#FE6494;
            border-radius: 10px;
            -moz-box-shadow: none;
            -webkit-box-shadow: none;
            box-shadow: none;
            font-weight: 400;
            font-style: normal;
            font-size: 12px;
            text-align: right;
            // color:#FE6494
        }
        p:hover{
            cursor: pointer;
            // background:#FE6494;
            // color:#fff
        }
        img{
            width:24px;
            height:24px;
            margin-left:10px;
            margin-right:4px;
        }
        .refresh{
            width:16px;
            height:16px;
            margin-right:8px;
        }
    }
}
</style>
