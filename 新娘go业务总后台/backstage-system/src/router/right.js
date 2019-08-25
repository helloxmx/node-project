// 设置
import departmentList from '@/views/rightManage/department/departmentList'//部门权限
import memberList from '@/views/rightManage/member/memberList'//成员权限

let res = [
    {
        path: '/index/departmentList',
        name: 'departmentList',
        component: departmentList,
        meta: {
            title: '部门权限'
        }
    },
    {
        path: '/index/memberList',
        name: 'memberList',
        component: memberList,
        meta: {
            title: '成员权限'
        }
    }
]

export default res