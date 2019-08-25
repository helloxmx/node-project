<template>
    <div>
        <el-row>
        <!-- 图片上传组件辅助-->
        <el-upload
            class="avatar-uploader"
            action="//up.qbox.me/"
            multiple
            accept="image/*"
            :data="formData"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload1">
        </el-upload>
        <!-- 上传视频组件辅助 -->
        <el-upload
            class="avatar1-uploader"
            action="//up.qbox.me/"
            :data="formData"
            multiple
            accept="video/*"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload2">
        </el-upload>
        <!--富文本编辑器组件-->
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)">
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
        'originContent':{
            type: String,
            default: ''
        }
    },
    data () {
        return {
            formData: { // 存放获取到uptoken 和 key
                token: '', // 需要经过编译，并不是直接复制七牛账号里面的token
                key: '', // 这个key是文件资源的名称，key可以重命名上传的文件名，其他作用不太记得了
                config: {useCdnDomain: true, region: null}
            },
            content:'',
            uploadType:'image',//上传类型
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            //   serverUrl: 'http://img.bridegoing.com/avatar20180828120032.jpg', // 这里写你要上传的图片服务器地址
            serverUrl: '//up.qbox.me/',
            header: {token: this.token}, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
            editorOption: {
                placeholder: '',
                theme: 'snow', // or 'bubble'
                modules: {
                    toolbar: {
                        container: container, // 工具栏
                        handlers: {
                            'image': function (value) { //改成自己的image上传控件
                                if (value) {
                                    // 触发input框选择图片文件
                                    document.querySelector('.avatar-uploader input').click();

                                } else {
                                    this.quill.format('image', false)
                                }
                            },
                            'video': function (value) { //改成自己的video上传控件
                                if (value) {
                                    // 触发input框选择图片文件
                                    document.querySelector('.avatar1-uploader input').click()
                                } else {
                                    this.quill.format('video', false)
                                }
                            }
                        }
                    }
                }
            },
            width:'',
            height:''

        }
    },
    computed:{
        ...mapGetters([])
    },
    mounted () {
        let ths = this

        api.getToken().then(res => { // 从后台获取七牛的token值，具有时效性
            ths.formData.token = res.data.token;
        });
        ths.content = ths.originContent;
    },
    methods: {
        ...mapActions([
            'storeEditorContent',//存储富文本信息
            'storeEditorImgs'//储存图片数组
        ]),
        beforeUpload1 (file) { // 每次上传文件之前设置key,文件资源的名称
            let ths = this
            let timestamp = (new Date()).valueOf();

            this.uploadType = 'image';
            ths.formData.key = timestamp;//时间戳
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }

            // const isSize = new Promise(function (resolve, reject) {
            //     let myUrl = window.URL || window.webkitURL
            //     let img = new Image()

            //     img.onload = function () {
            //         ths.width = img.width
            //         ths.height = img.height
            //         ths.height ? resolve() : reject()
            //     }
            //     img.src = myUrl.createObjectURL(file)

            // }).then(() => {
            //     return file
            // }, () => {
            //     this.$message.error('上传的icon必须是等于或大于100*100!')
            //     return Promise.reject()
            // })

            return isLt2M
        },
        beforeUpload2 (file) { // 每次上传文件之前设置key,文件资源的名称
            let ths = this
            let timestamp = (new Date()).valueOf();

            this.uploadType = 'video';
            ths.formData.key = timestamp
        },

        uploadSuccess (res, file) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例
            let quill = this.$refs.myQuillEditor.quill;

            // 如果上传成功
            if (res.key !== '') {
                // 获取光标所在位置
                let length = quill.getSelection().index
                // 插入图片  res.info为服务器返回的图片地址
                let url = 'http://img.bridegoing.com/' + res.key;

                if (this.uploadType == 'image') { //插入图片
                    quill.insertEmbed(length, 'image', url)
                } else { //插入视频
                    quill.insertEmbed(length, 'video', url)
                    // quill.insertText(0, '<video src="'+url+'" controls="controls"></video>', true);
                    // quill.insertText(0, '<p>43583689</p>', true);
                }
                // 调整光标到最后
                quill.setSelection(length + 1);

            } else {
                this.$message.error('插入失败')
            }
            // loading动画消失
            this.quillUpdateImg = false
        },

        // 富文本图片上传失败
        uploadError () {
            // loading动画消失
            this.quillUpdateImg = false
            this.$message.error('插入失败')
        },
        onEditorChange (e) {
            let ths = this;
            // let strList = ths.content.match(/src="(.*?)"/g);//获取成对src里面的图片地址

            // for (let key in strList){
            //     strList[key]= strList[key].match(/src="(\S*)"/)[1]//获取富文本编辑器内所有图片，存入数组，便于图片点击放大使用
            // }
            ths.storeEditorContent(ths.content);//富文本数据存入vuex中
            // ths.storeEditorImgs(strList);
            let myImg = document.getElementsByTagName('img');
            let imgList = [];
            let sum = 0;//图片个数

            // for (let key in myImg){
            //     myImg[key].src = new Image();
            //     myImg[key].src.onload = function (){
            //         sum++
            //         if (sum == myImg.length){
            //             console.log('加载完毕')
            //         }
            //     }
            // }

            for (let key in myImg){
                let complete = myImg[key].complete;//是否加载完毕
                let temp = myImg[key].src;
                let obj = {};

                if (temp) {
                    let signal = temp.slice(11,21);

                    if (signal == 'bridegoing'){
                        let myurl = new Image();

                        myurl.src = myImg[key].src;
                        myurl.onload = function () {
                            obj.url = myurl.src;
                            obj.width = myurl.width;
                            obj.height = myurl.height;
                        }
                        imgList.push(obj);
                    }
                }
                // let signal = temp.subStr(temp.length-6,6);
            }
            ths.storeEditorImgs(imgList);

        },
        onEditorReady (e) {
            let ths = this;

        }
    },
    watch: {
        //初始化富文本编辑器的内容
        originContent() {
            this.content = this.originContent
        }
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
