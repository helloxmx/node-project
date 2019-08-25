import { Quill } from 'vue-quill-editor'

// 源码中是import直接倒入，这里要用Quill.import引入
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

class Video extends BlockEmbed {
    static create (value) {
        const node = super.create(value)
        let imgCoverUrl = value + '?vframe/jpg/offset/0';//
        // 添加video标签所需的属性
        // var imgA = document.createElement('img');//创建需要增加的元素节点小图标
        // var divA = document.createElement('div');//创建需要增加的元素节点小图标的外面
        // var imgB = document.createElement('img');//创建需要增加的元素节点小图标

        // imgA.setAttribute('src','http://img.bridegoing.com/h5_20190220112424.png')
        // imgA.setAttribute('style','width:50px;position:absolute;')
        // imgB.setAttribute('src',value)
        // imgB.setAttribute('style','')
        // divA.appendChild(imgA);//添加至父节点内
        // divA.appendChild(imgB);
        // divA.setAttribute('style','position:absolute;top:0px;display:flex;flex-direction:row;justify-content: center;align-items: center;')

        // node.appendChild(imgB);//添加至父节点内
        // node.appendChild(divA);//添加至父节点内

        node.setAttribute('controls', 'controls')
        node.setAttribute('type', 'video/mp4')
        node.setAttribute('style', '')
        node.setAttribute('src',value)
        node.setAttribute('poster',imgCoverUrl)
        // node.setAttribute('data-cover', )


        console.log(node)
        return node
    }

    static formats (domNode) {
        return ATTRIBUTES.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute)
            }
            return formats
        }, {})
    }

    static sanitize (url) {
        return Link.sanitize(url) // eslint-disable-line import/no-named-as-default-member
    }

    static value (domNode) {
        return domNode.getAttribute('src')
    }

    format (name, value) {
        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value)
            } else {
                this.domNode.removeAttribute(name)
            }
        } else {
            super.format(name, value)
        }
    }

    html () {
        const { video } = this.value()

        return `<a href="${video}">${video}</a>`
    }
}
Video.blotName = 'video' // 这里不用改，楼主不用iframe，直接替换掉原来，如果需要也可以保留原来的，这里用个新的blot
Video.className = 'ql-video'
Video.tagName = 'video' // 用video标签替换iframe

export default Video