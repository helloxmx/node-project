<template>
    <div>
        <el-row>
        <!-- 图片上传组件辅助-->
        <el-upload
            class="avatar-uploader"
            action="//up.qbox.me/"
            :data="formData"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
        <quill-editor
            v-model="numberValidateForm.content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
        >
        </quill-editor>

       </el-row>
    </div>
</template>
<script>
import {quillEditor} from 'vue-quill-editor'
import {container} from 'quill-image-extend-module'
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/http/api'
export default {
    components: {quillEditor},
    props: {
        'token': {
            type: null,
            default: ''
        },
        'numberValidateForm': {
            type: null,
            default: ''
        }
    },
    data () {
        return {
            loading: false,//搜索是否展示加载
            formData: { // 存放获取到uptoken 和 key
                token: '', // 需要经过编译，并不是直接复制七牛账号里面的token
                key: 'test', // 这个key是文件资源的名称，key可以重命名上传的文件名，其他作用不太记得了
                config: {useCdnDomain: true, region: null}
            },
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            //   serverUrl: 'http://img.bridegoing.com/avatar20180828120032.jpg', // 这里写你要上传的图片服务器地址
            serverUrl: '//up.qbox.me/',
            header: {token: this.token}, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
            imgs:[],
            commodities: [],
            singleItem:{},
            state4: '',
            timeout:  null,
            editorOption: {
                placeholder: '',
                theme: 'snow', // or 'bubble'
                modules: {
                    toolbar: {
                        container: container, // 工具栏
                        handlers: {
                            'image': function (value) {
                                if (value) {
                                    // 触发input框选择图片文件
                                    document.querySelector('.avatar-uploader input').click()
                                } else {
                                    this.quill.format('image', false)
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    mounted () {
        let ths = this

        api.getToken().then(res => { // 从后台获取七牛的token值，具有时效性
            ths.formData.token = res.data.token
        })
    },
    methods: {
        beforeUpload (file) { // 每次上传文件之前设置key,文件资源的名称
            let ths = this
            let timestamp = (new Date()).valueOf()
            //   let suffix = file.name
            //   let nameString = encodeURI(`${suffix}`)
            //   let lastStr = nameString.split('.')[1]

            ths.formData.key = timestamp
            //   ths.formData.key = timestamp + '.' + lastStr
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isLt2M
        },

        uploadSuccess (res, file) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例

            let quill = this.$refs.myQuillEditor.quill
            // 如果上传成功

            if (res.key !== '') {
                // 获取光标所在位置
                let length = quill.getSelection().index
                // 插入图片  res.info为服务器返回的图片地址
                let url = 'http://img.bridegoing.com/' + res.key

                quill.insertEmbed(length, 'image', url)
                // 调整光标到最后
                quill.setSelection(length + 1);

            } else {
                this.$message.error('图片插入失败')
            }
            // loading动画消失
            this.quillUpdateImg = false
        },

        // 富文本图片上传失败
        uploadError () {
            // loading动画消失
            this.quillUpdateImg = false
            this.$message.error('图片插入3465836失败')
        },
        onEditorChange () {},
        onEditorReady () {}
    }
}
</script>
<style lang="scss" scoped>
.ql-container {
    height:350px;
}
.commodity-box{
    margin-top: 22px;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    .commodity-select{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        span{
            margin-left: 20px;
            color:#FF739E;
            cursor: pointer;
        }
    }
    .commodity-list{
        margin-top:22px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        .single-item{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            padding: 6px 0px;
            span{
                color: red;
                margin-right: 12px;
                cursor: pointer;
            }
        }
    }
}
.btn,.footer{
      border-top:1px solid #ccc;
      margin:30px 30px 20px 30px ;
      position:relative
  }
.footer{
    display:flex;
    justify-content: center;
}
.tixing{
    margin-top: 20px;
    color: #cccccc;
}
</style>
<style>
.ql-editor{
    height: 350px !important;
}
</style>
