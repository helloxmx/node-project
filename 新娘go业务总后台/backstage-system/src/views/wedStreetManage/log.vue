<template>
<div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="IP">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地区">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
</div>
  </template>

<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '192.168.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '192.168.1',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '192.168.1',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            currentPage4: 4
        }
    },
    methods: {
        handleSizeChange(val) {
        },
        handleCurrentChange(val) {
        }
    }
}
</script>
