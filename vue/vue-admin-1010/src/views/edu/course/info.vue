<template>
  <div>
    <h2 align="center">发布新课程</h2>
    <el-steps :active="1" finish-status="success" align-center >
      <el-step title="填写课程信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>
    <el-form label-width="120px" >
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>
      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类"
                   @change="subjectOneChange">
          <el-option :key="subject.id" :label="subject.title"
                     :value="subject.id" v-for="subject in subjectOneist"/>
        </el-select>
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option :key="subject.id" :label="subject.title"
                     :value="subject.id" v-for="subject in subjectTwoist"/>
        </el-select>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option :key="teacher.id" :label="teacher.name" :value="teacher.id" v-for="teacher in teacherList"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>
      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介" >
        <tinymce :height="250"  v-model="courseInfo.description"/>
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss'"
          class="avatar-uploader" >
          <img :src="courseInfo.cover" class="avatar">
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>
      <el-form-item>
        <el-button style="margin-top: 30px;margin-left: 165px" @click="next" >保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce' //引入富文本组件
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
export default {
  name: 'info',
  components: { Tinymce }, //声明组件
  created() {
    this.init();
  },
  watch:{
    $route(to,from){ //监听 路由变化时执行
      this.init();
    }
  },
  data() {
    return {
      courseInfo: { //课程信息
        title: '',
        subjectId: '',//二级分类
        subjectParentId: '',//一级分类
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/01.jpg',
        price: 0
      },
      teacherList: {},//讲师列表
      subjectOneist: [],//一节分类
      subjectTwoist: [],//二级分类
      BASE_API: process.env.BASE_API, // 接口API地址
    }
  },
  methods: {
    init(){ //初始化页面
      this.findAllTeacher(); //获取所有讲师
      this.getAllSubject();//获取所有一级分类
      if(this.$route.params&&this.$route.params.id){
        this.getCourseInfo();
      }else{
        this.courseInfo = {
          cover: '/static/01.jpg',
        };
      }
    },
    beforeAvatarUpload(file){
    },
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    next() {//下一步
      if(!(this.$route.params&&this.$route.params.id)) this.saveCourse();
      else this.updateCourse();
    },
    saveCourse(){//添加课程
      course.addCourseInfo(this.courseInfo).then(res=>{
        this.$message.success("添加成功!");
        this.$router.push({path:'/course/chapter/'+res.data.courseId});
      })
    },
    updateCourse(){//修改课程
      course.updateCourseInfo(this.courseInfo).then(res=>{
        this.$message.success("修改成功!");
        this.$router.push({path:'/course/chapter/'+this.$route.params.id});
      })
    },
    findAllTeacher(){//查询所有讲师
      course.findAllTeacher().then(res=>{
        this.teacherList = res.data.items;
      })
    },
    getAllSubject(){//获取所有的一级分类
      subject.getAllSubject().then(res=>{
        this.subjectOneist =res.data.list;
      })
    },
    subjectOneChange(id){ //一级分类改变时执行 参数是一级分类的id
      for(let i=0;i<this.subjectOneist.length;i++)
        if(this.subjectOneist[i].id===id)
          this.subjectTwoist = this.subjectOneist[i].children;
        this.courseInfo.subjectId = '';
    },
    getCourseInfo(){ //根据课程id获取课程信息
      course.getCourseInfo(this.$route.params.id).then(res=>{
        this.courseInfo = res.data.courseInfoVo;
        this.getTwo(this.courseInfo.subjectParentId);
      });
    },
    getTwo(id){
      for(let i=0;i<this.subjectOneist.length;i++)
        if(this.subjectOneist[i].id===id)
          this.subjectTwoist = this.subjectOneist[i].children;
    }
  }
}
</script>

<style scoped>

</style>

<style scoped>
.tinymce-container {
  width: 1100px;
  line-height: 29px;
}
.avatar {
  width: 250px;
  height: 250px;
  display: block;
}
</style>
