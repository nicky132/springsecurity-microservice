<template>
  <div>
    <h2 align="center">发布新课程</h2>
    <el-steps :active="3" finish-status="success" align-center >
      <el-step title="填写课程信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>
    <template>
      <div class="app-container">
        <div class="ccInfo">
          <img :src="publishCourse.cover">
          <div class="main">
            <h2>{{ publishCourse.title }}</h2>
            <p class="gray"><span>共{{ publishCourse.lessonNum }}课时</span></p>
            <p><span>所属分类：{{ publishCourse.subjectLevelOne }} — {{ publishCourse.subjectLevelTwo }}</span></p>
            <p>课程讲师：{{ publishCourse.teacherName }}</p>
            <h3 class="red">￥{{ publishCourse.price }}</h3>
          </div>
        </div>
        <el-row >
          <el-button style="margin-top: 30px;margin-left: 165px" @click="previons" >返回修改</el-button>
          <el-button style="margin-top: 30px;margin-left: 15px" @click="next" >发布课程</el-button>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import course from '@/api/edu/course'
export default {
  data() {
    return {
      courseId: 0,
      publishCourse:{},
    };
  },
  created() {
      this.courseId = this.$route.params.id;
      this.getPublishCourseInfo();
  },
  methods: {
    next() {
      course.updateStatus(this.publishCourse).then(res=>{
        this.$message.success("发布成功!");
        this.$router.push({path:'/course/list'});
      })
    },
    previons(){
      this.$router.push({path:'/course/chapter/'+this.$route.params.id})
    },
    getPublishCourseInfo(){//根据id查询课程信息
      course.getPublishCourseInfo(this.courseId).then(res=>{
        this.publishCourse = res.data.publishCoures;
      })
    }
  }
}
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}
.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
