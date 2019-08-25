<template>
    <div class="single-good">
        <div class="list-img"><img :src="dataObj.cover" alt=""></div>
        <div class="list-name">{{dataObj.name}}</div>
        <div class="list-price theme-color">¥{{dataObj.price}}</div>
    </div>
</template>
<script>
export default {
    props:{
        'dataObj':{
            type:null,
            default:function(){
                return {
                    cover:require('@/assets/img/userIcon.jpg'),
                    name:'杭州JW万号酒店婚宴预订',
                    price:9999
                }
            }
        }
    },
    data(){
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
    .single-good{
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .list-img{
            width: 160px;
            img{
                width: 160px;
            }
        }
        .list-name{
            width: 220px;
            font-size: 18px;
            padding: 22px 0px;
            text-align: center;
        }
        .list-price{
            width: 220px;
            font-size: 18px;
            padding-bottom: 22px;
            text-align: center;
        }
    }
</style>
