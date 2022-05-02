<template>
    <div style="margin: 20px">
      <el-form :inline="false" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item label="讲师名称">
          <el-input v-model="formInline.name" placeholder="讲师名称"></el-input>
        </el-form-item>
        <el-form-item label="讲师资历">
          <el-input v-model="formInline.career" placeholder="讲师资历"></el-input>
        </el-form-item>
        <el-form-item label="讲师排序">
            <template slot-scope="scope">
              <el-input-number v-model="formInline.sort" controls-position="right" :min="0" :max="10"></el-input-number>
            </template>
        </el-form-item>
        <el-form-item label="讲师头衔">
          <el-select v-model="formInline.level" placeholder="讲师头衔">
            <el-option label="高级讲师" :value="1"></el-option>
            <el-option label="首席讲师" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="formInline.intro" placeholder="讲师简介" type="textarea" cols="100%" rows="8"></el-input>
        </el-form-item>
        <!--讲师头像-->
        <el-form-item label="讲师头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="formInline.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">
            更换头像
          </el-button>
          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 -->
          <image-cropper
            v-show="imagecropperShow"
            :width="300"
            :height="300"
            :key="imagecropperKey"
            :url="BASE_API+'/eduoss/fileoss'"
            field="file"
            @close="close"
            @crop-upload-success="cropSuccess"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateOrAdd">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data(){
    return{
      formInline:{
      },
      imagecropperShow:false,//是否显示弹窗
      imagecropperKey:0, //上传组件的key
      BASE_API:process.env.BASE_API,//获取ip端口号
    }
  },
  created() {
    this.init();
  },
  watch:{
    $route(to,from){ //监听 路由变化时执行
      this.init();
    }
  },
  methods:{
    init(){
      if(this.$route.params&&this.$route.params.id){
        this.getInfo(this.$route.params.id);
      }else{
        this.formInline = {};
      }
    },
    updateOrAdd(){
      if(this.formInline.id){
        this.updateTeacher();
      }else{
        this.saveTeacher();
      }
    },
    saveTeacher(){
      teacher.addTeacher(this.formInline).then(res=>{
        this.$message.success("添加成功");
        this.$router.push({path:'/teacher/table'})
      })
    },
    getInfo(id){
      teacher.getTeacher(id)
        .then(res=>{
          this.formInline = res.data.teacher;
      })
    },
    updateTeacher(){
      teacher.updateTeacher(this.formInline).then(res=>{
        this.$message.success("修改成功");
        this.$router.push({path:'/teacher/table'})
      })
    },
    close(){ //关闭上传弹窗
      this.imagecropperShow = false;
      this.imagecropperKey ++;
    },
    cropSuccess(data){ //上传成功
      this.formInline.avatar = data.url;
      this.close();
    },
  }
}

</script>
