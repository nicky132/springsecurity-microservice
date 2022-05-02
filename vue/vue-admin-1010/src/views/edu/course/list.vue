<template>
  <div class="app-container">
    <el-form :inline="true" :model="courseQuery" ref="ruleForm" class="demo-form-inline">
      <el-form-item prop="title" label="课程名称">
        <el-input v-model="courseQuery.title" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item prop="level" label="课程状态">
        <el-select v-model="courseQuery.status" placeholder="课程状态">
          <el-option label="已发布" value="Normal"></el-option>
          <el-option label="未发布" value="Draft"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="begin" >
        <el-date-picker
          v-model="courseQuery.gmtCreate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始日期时间"
          default-time="00:00:00">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="end">
        <el-date-picker
          v-model="courseQuery.gmtModified"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束日期时间"
          default-time="00:00:00">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          {{scope.$index+1+limit*(page-1)}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="status" label="课程状态">
        <template slot-scope="scope">
          {{scope.row.status=="Draft"?"未发布":"已发布"}}
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="开始时间"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <router-link :to="'/course/info/'+scope.row.id" >
                <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
              </router-link>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="removeByDataId(scope.row.id)">删除</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page.sync="page"
                   :page-sizes="[1, 3, 5, 10]" :page-size="limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>

</template>


<script>

//引入调用teacher.js
import course from '@/api/edu/course'

export default { //写核心代码
  data(){ //定义变量 初始值
    return{
      list:null,//查询之后接口返回的集合
      page:1,//当前页
      limit:10,//每页记录数
      total:0,//总记录数
      courseQuery:{//条件封装对象
      },
    }
  },
  created(){ //页面渲染之前执行 一般调用methods方法
    this.getList()
  } ,
  methods:{ //具体方法
    getList(page = 1){//获取课程列表的方法
      this.page = page;
      course.getCourseList(this.page,this.limit,this.courseQuery)
        .then(response=>{ //请求成功 response表示接口返回的数据
          this.list = response.data.rows;
          this.total = response.data.total;
        })
        .catch(error=>{console.log(error)})//请求失败
    },
    handleSizeChange(limit=this.limit){//当前页最大数改变
      this.limit = limit;
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },
    removeByDataId(id){
      this.$confirm('此操作将永久删除该课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteById(id).then(res=>{
          this.$message.success("删除成功!");
          this.getList();
        })
      })
    },
  },
}

</script>
