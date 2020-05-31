<template>
  <div id="book-cancel-check-cmp">
    <div class="main-form">

      <el-table :data="listArr"
                style="width: 100%"
                element-loading-text="拼命加载中"
                border
                fit>
        <el-table-column align="center"
                         label="序号"
                         width="100"
                         type="index">
        </el-table-column>
        <!-- 进行循环的时候 渲染头部里面的字段 -->
        <template v-for="(item,index) in tableHead">
          <el-table-column :prop="item.columnEn"
                           :label="item.columnCn"
                           :key="index"
                           :min-width='160'
                           align="center">
            <!-- 找到对应绑定的 body listArr 的数据 -->
            <template slot-scope="scope">
              <!-- 这里是获取数据 相当于 scope.row.name 这种写法  
              例子 这个就是表示 scope.column.property = name age 等这些属性
              -->
              <div>{{scope.row[scope.column.property]}}</div>

              <!-- 如果有发现头部的columnEn 是合并后的带有,分隔符的话
                我们就进行拆分操作 变为数组 如(name,age)
               -->
              <div v-show="item.columnEn.includes(',')">
                <!-- 循环合并的数组 -->
                <span v-for="jtem in item.columnEn.split(',')"
                      :key="jtem"
                      class="table-concat-text">
                  <!-- scope.row[jtem] 这个等价于 scope.row.age scope.row.sex 这样写法 -->

                  <!-- 进行自定义展示 -->

                  <!-- 不是性别 显示中文名字 -->
                  <span v-if=" jtem!='sex' "
                        class="name-bold">{{scope.row[jtem]}}</span>

                  <!-- 是性别的话 显示图标 -->
                  <img v-if="scope.row[jtem] ==='女' "
                       src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1990878085,321872653&fm=26&gp=0.jpg" />
                  <img v-if="scope.row[jtem] ==='男' "
                       src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1326448946,4046116832&fm=26&gp=0.jpg" />
                </span>
              </div>
            </template>
          </el-table-column>
        </template>

      </el-table>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listArr: [],
      tableHead: [],
    }
  },
  mounted () {
    this.getHead()
    this.getList()
  },
  methods: {
    getList () {
      // 这个是内容（body） 数据 
      // 需要和 头部字段 相对应 才能显示出来
      this.listArr = [
        {
          name: '苹果',
          sex: '女',
          age: 18,
          remark: '行吧',
        },
        {
          name: '香蕉',
          sex: '男',
          age: 25,
          remark: '无',
        },
        {
          name: '橘子',
          sex: '女',
          age: 58,
          remark: '备注87',
        },
        {
          name: '红色',
          sex: '女',
          age: 9,
          remark: '备注哈哈',
        },
        {
          name: '黄色',
          sex: '男',
          age: 48,
          remark: '我是备注',
        },
      ]
    },
    getHead () {
      // 这个是 sortable组件 进行合并后的 表格头部字段 
      // 如果 合并后的表格头部字段 就会用,作为分隔符 进行标示
      this.tableHead = [
        {
          columnEn: "name,age", columnCn: "名字和年龄"
        },
        {
          columnEn: "name,sex", columnCn: "名字和性别"
        },
        {
          columnEn: "age", columnCn: "年龄"
        }
      ]
    }
  },



}
</script>


<style lang="scss">
.main-form {
  img {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }
}
.name-bold {
  font-weight: bold;
  margin: 0 5px;
}
</style>


  