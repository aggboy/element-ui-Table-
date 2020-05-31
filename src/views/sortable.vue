<template>
  <div>

    <div class="main-form">

      <div class="right-table">
        <div class="right-table-content">
          <el-table ref="selectedStaffTable"
                    row-key="id"
                    :data="listArr"
                    border
                    fit>
            <el-table-column label="序号"
                             type="index"
                             align="center"
                             width="70">
            </el-table-column>
            <el-table-column label="字段"
                             align="center">
              <template slot-scope="{row,$index}">
                <span v-if="!row.editFlag">{{ row.columnEn }}</span>
                <div v-if='row.editFlag'
                     class="table-input-item">
                  <el-input size="medium"
                            v-model="listArr[$index]['columnEn']"
                            placeholder="请输入"
                            clearable>
                  </el-input>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="字段名称"
                             align="center">
              <template slot-scope="{row,$index}">
                <span v-if='!row.editFlag'>{{ row.columnCn }}</span>
                <div v-if='row.editFlag'
                     class="table-input-item">
                  <el-input size="medium"
                            v-model="listArr[$index]['columnCn']"
                            placeholder="请输入"
                            clearable>
                  </el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="220px">
              <template slot-scope="scope">
                <div class="handle-box">
                  <span @click="clickUp(scope.$index,scope.row)">上</span>
                  <span @click="clickDown(scope.$index,scope.row)">下</span>
                  <span @click="breakName(scope.$index,scope.row)">拆分</span>
                  <span @click="editName(scope.$index,scope.row)"
                        v-if='!scope.row.editFlag'>编辑</span>
                  <span @click="finishName(scope.$index,scope.row)"
                        v-if='scope.row.editFlag'>保存</span>
                </div>

              </template>
            </el-table-column>

          </el-table>
          <div class="tips-box">
            <span class="text">
              注：1. 可拖动合并字段展示
            </span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  data () {
    return {
      listArr: [],

    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 模拟发送请求 请求回来再初始化排序功能
    initList () {
      setTimeout(() => {
        this.listArr = [
          { id: 1, columnEn: 'sex', columnCn: '性别', editFlag: false },
          { id: 2, columnEn: 'age', columnCn: '年龄', editFlag: false },
          { id: 3, columnEn: 'name', columnCn: '名字', editFlag: false },
          { id: 4, columnEn: 'remark', columnCn: '备注', editFlag: false },
        ],
          this.rowDrop();
      }, 1000);
    },
    editName (index, row) {
      this.listArr[index]['editFlag'] = true
      this.sortableControl.destroy()
    },
    finishName (index, row) {
      this.listArr[index]['editFlag'] = false
      this.rowDrop()
    },
    breakName (index, row) {
      let columnEnArr = row.columnEn.split(',')
      let columnCnArr = row.columnCn.split(',')
      let oldArr = []
      columnEnArr.map((item, index) => {
        oldArr.push(
          {
            columnEn: columnEnArr[index],
            columnCn: columnCnArr[index],
            id:parseInt(Math.random()*100*72),
            editFlag: false,
          }
        )
      })
      this.listArr.splice(index, 1)
      this.listArr = [...this.listArr, ...oldArr]
    },
    clickUp (index, row) {
      let arr = this.listArr
      if (index == 0) {//第一个节点不移动
      } else {
        let curObj = arr[index];//当前位置对象
        let preObj = arr[index - 1];//上一个位置对象
        arr.splice(index, 1, preObj);//上一个节点移动到当前节点
        arr.splice(index - 1, 1, curObj);//当前节点往上移动
      }
    },
    clickDown (index, row) {
      let arr = this.listArr
      if (index == arr.length - 1) {//最后节点不移动
      } else {
        let curObj = arr[index];//当前位置对象
        let downObj = arr[index + 1];//下一个位置对象
        arr.splice(index, 1, downObj);//下一个节点移动到当前节点
        arr.splice(index + 1, 1, curObj);//当前节点往下移动
      }
    },
    rowDrop () {
      const tbody = document.querySelector('.right-table .el-table__body-wrapper tbody')
      const that = this
      this.sortableControl = Sortable.create(tbody, {
        onEnd ({ newIndex, oldIndex }) {
          if (newIndex !== oldIndex) {
            let list = that.listArr
            list[oldIndex] = {
              ...list[oldIndex],
              columnEn: `${list[oldIndex]['columnEn']},${list[newIndex]['columnEn']}`,
              columnCn: `${list[oldIndex]['columnCn']},${list[newIndex]['columnCn']}`,
            }
            list.splice(newIndex, 1)
          }

          // console.log(newIndex);
          // console.log(oldIndex);
          // const currRow = _this.staffList.splice(oldIndex, 1)[0]
          // _this.staffList.splice(newIndex, 0, currRow)
        },

      })
    },
  },
}
</script>

<style lang="scss">
.main-form {
  margin-top: 16px;
  display: flex;
  .left-table,
  .right-table {
    background: #fff;
    &-header {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      .line {
        background: #007aff;
        width: 3px;
        height: 14px;
      }
      .title {
        margin-left: 5px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .left-table {
    width: 40%;
    &-content {
      padding: 12px 16px 40px 16px;
    }
  }
  .right-table {
    width: 100%;
    .handle-box {
      display: flex;
      justify-content: space-around;
    }
    .table-input-item {
      display: inline-block;
      margin-right: 16px;
      .el-input {
        width: 240px;
        display: inline-block;
        text-align: center;
      }

      .el-input--medium .el-input__inner {
        width: 240px;
        text-align: center;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 0px solid;
        opacity: 1;
        display: inline-block;
      }

      .el-input--medium .el-input__icon {
        line-height: 30px;
      }
    }
    .tips-box {
      margin-top: 12px;
      margin-bottom: 12px;
      .text {
        margin-left: 8px;
        color: #999;
        font-size: 12px;
      }
    }
  }
  .btn-box {
    width: 62px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .el-button--primary {
      width: 30px;
      height: 30px;
      padding: 0;
    }
  }
}
</style>