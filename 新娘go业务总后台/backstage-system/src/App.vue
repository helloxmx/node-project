<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App'
}
</script>

<style lang="scss">
#app{
    font-family: 'Helvetica Neue', 'Helvetica', 'Microsoft Yahei', sans-serif;
}
</style>
