<template>
    <div>
        <!-- action="//up.qbox.me/" -->
        <el-upload
            ref="upload"
            class="upload-demo"
            type="drag"
            action="//up.qbox.me/"
            :accept="accepts"
            :before-upload="beforeUpload"
            :on-remove="removeFile"
            :on-success="handleAvatarSuccess"
            :data="formData"
            :limit='1'
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
        </el-upload>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/http/api'
export default {
    props:{
        'type':{
            type:String,
            default:''
        },
        'fileUrl':{
            type:String,
            default:''
        }
    },
    data () {
        return {
            cover: '', // 封面图片地址
            width: 0,
            height: 0,
            content:'',
            fileList:[],
            actionPath: 'http://img.bridegoing.com/',
            loading: false,
            bucketHost: 'http://img.bridegoing.com/', // 上传图片的外链域名,公司申请的七牛空间地址
            formData: { // 存放获取到uptoken 和 key
                token: '', // 需要经过编译，并不是直接复制七牛账号里面的token
                key: 'test', // 这个key是文件资源的名称，key可以重命名上传的文件名，其他作用不太记得了
                config: {useCdnDomain: true, region: null}
            },
            accepts: 'image/jpeg, image/jpg, image/png, image/gif, application/zip, application/x-zip-compressed'
            // 运行上传图片和zip文件
        }
    },
    mounted () {
        let ths = this

        api.getToken().then(res => { // 从后台获取七牛的token值，具有时效性
            ths.formData.token = res.data.token
        })
    },
    computed:{
        ...mapGetters(['headerTitle','tk'])
    },
    methods: {
        ...mapActions([
            'logoLink',//添加商户-上传logo地址
            'licenseLink',//添加商户-上传营业执照地址
            'coverLink'//添加商户-上传封面地址
        ]),
        beforeUpload (file) { // 每次上传文件之前设置key,文件资源的名称
            let ths = this
            let timestamp = (new Date()).valueOf()

            ths.formData.key = timestamp
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            const isSize = new Promise(function (resolve, reject) {
                let myUrl = window.URL || window.webkitURL
                let img = new Image()

                img.onload = function () {
                    ths.width = img.width
                    ths.height = img.height
                    ths.height ? resolve() : reject()
                }
                img.src = myUrl.createObjectURL(file)
            }).then(() => {
                return file
            }, () => {
                this.$message.error('上传的icon必须是等于或大于100*100!')
                return Promise.reject()
            })

            return isLt2M && isSize
        },
        handleAvatarSuccess (res, file) {
            let ths = this
            let obj = {};

            ths.cover = 'http://img.bridegoing.com/' + file.response.key
            obj.width = ths.width;
            obj.height = ths.height;
            obj.imgAddr = ths.cover;
            switch (ths.type) {
            case '0':
                ths.logoLink(obj);
                break;
            case '1':
                ths.licenseLink(obj);
                break;
            case '2':
                ths.coverLink(obj);
                break;
            default:
                break;
            }

        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        removeFile () {
            let ths = this

            ths.cover = ''
        }
    },
    watch: {
        fileUrl() {
            let obj = {};

            obj.name = '';
            obj.url = this.fileUrl;
            this.fileList.push(obj);
        }
    }

}
</script>
<style scope lang='scss'>
.upload-demo{
    width: 360px;
}
</style>
