<template>
    <div>
        <edit></edit>
        {{editorContent}}
    </div>
</template>
<script>
import edit from '@/components/editor.vue';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    components:{
        edit
    },
    data(){
        return {
            value:''
        }
    },
    computed:{
        ...mapGetters(['editorContent'])
    },
    mounted(){

    }
}
</script>
