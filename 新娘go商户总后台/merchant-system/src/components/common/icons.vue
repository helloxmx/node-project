<template>
    <div class="icons">
        <div v-if="isClose" @click="closeFn"><img src="@/assets/img/icon/close.png" alt=""></div>
    </div>
</template>
<script>
export default {
    props:{
        'isClose':{
            type:Boolean,
            default:false
        }
    },
    methods:{
        closeFn(){
            let ths = this;

            ths.$emit('closeFn');
        }
    }
}
</script>
<style lang="scss" scoped>
.icons{
    img{
        width: 18px;
    }
}
</style>
