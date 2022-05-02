<template xmlns:border-radius="http://www.w3.org/1999/xhtml">
  <div>
    <el-card class="box-card">
      <h2 align="center">发布新课程</h2>
      <el-steps :active="2" finish-status="success" align-center >
        <el-step title="填写课程信息"></el-step>
        <el-step title="创建课程大纲"></el-step>
        <el-step title="最终发布"></el-step>
      </el-steps>
      <el-row >
        <el-button @click="dialogForm" type="primary"  plain
                   style="margin-top: 20px;margin-left: 10px">添加章节
        </el-button>
      </el-row>
      <ul class="chanpterList" >
        <li v-for="chapter in chapterVideoList" :key="chapter.id" style="margin-top:15px;margin-left: 10px">
          {{chapter.title}}
          <span class="acts">
              <el-button type="primary" size="mini" @click="openVideo(chapter.id)">添加小节</el-button>
             <el-button type="success" size="mini" @click="openEditChater(chapter.id)">编辑</el-button>
             <el-button type="danger" size="mini" @click="removeChapter(chapter.id)">删除</el-button>
          </span>
          <ul class="chanpterList videoList">
            <li v-for="VideVo in chapter.children" :key="VideVo.id" style="margin-top:15px;margin-left: 10px">
              {{VideVo.title}}
              <span class="acts">
             <el-button type="success" size="mini"  @click="openEditVideo(VideVo.id)">编辑</el-button>
             <el-button type="danger" size="mini" @click="removeVideo(VideVo.id)">删除</el-button>
          </span>
            </li>
          </ul>
        </li>
      </ul>
      <el-row >
        <el-button style="margin-top: 30px;margin-left: 165px" @click="previons" >上一步</el-button>
        <el-button style="margin-top: 30px;margin-left: 15px" @click="next" >保存并下一步</el-button>
      </el-row>
    </el-card>
    <el-dialog title="章节信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="章节标题" label-width="120px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" label-width="120px">
          <el-input-number v-model="form.sort" :min="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVideoFormVisible" title="课时信息">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="0">免费</el-radio>
            <el-radio :label="1">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
          <el-upload
            class="upload-demo"
            :action="BASE_API+'/eduvod/video/uploadAlyiVideo'"
            :on-success="ok"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">上传视频</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
export default {
  data() {
    return {
      active: 0,
      chapterVideoList:[],
      dialogFormVisible:false,
      form:{
        title:'',
        sort:0,
        courseId:'',
      },
      dialogVideoFormVisible:false,
      video:{
        title:'',
        sort:0,
        free:0,
        videoSourceId:'',
        videoOriginalName:'',//视频名称
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      fileList:[], //上传文件列表
    };
  },
  created() {
    //获取路由里的参数
    if(this.$route.params&&this.$route.params.id){
      this.form.courseId =  this.$route.params.id
      this.getChapterById(this.form.courseId);
    }
  },
  methods: {
    handlePreview(){},//上传视频之前
    ok(res,file,fileList){ //上传视频成功
        this.video.videoSourceId = res.data.videoId;
        this.video.videoOriginalName = file.name;
    },
    beforeRemove(file,fileList){ //删除之前(点击删除时)
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(){ //删除之后
      video.deleteAliyunvod(this.video.videoSourceId).then(res=>{
        this.$message("删除视频成功!");
        this.fileList = []; //把文件清空
        this.video.videoOriginalName = ""; //上传视频名称
        this.video.videoSourceId = ""; //上传视频id
      })
    },
  //=================小节操作==========================
    saveOrUpdateVideo(){
      if(this.video.id) this.editVideo();
      else this.saveVideo();
    },
    openVideo(chapterId){ //小节弹窗
        this.fileList = []; //把文件清空
        this.video.videoOriginalName = ""; //上传视频名称
        this.video.videoSourceId = ""; //上传视频id
        this.video.title='',
        this.video.free=0,
        this.video.sort=0,
        this.video.videoSourceId='',
        this.dialogVideoFormVisible = true;
        this.video.chapterId = chapterId;
        this.video.courseId = this.form.courseId;
    },
    saveVideo(){ //添加小节
      video.addVideo(this.video).then(res=>{
        this.dialogVideoFormVisible = false;
        this.$message.success("添加成功!");
        this.getChapterById(this.form.courseId);
      })
    },
    removeVideo(id){//删除小节
      video.deleteVideo(id).then(res=>{
        this.$message.success("删除成功!");
        this.getChapterById(this.form.courseId);
      })
    },
    getVideo(id){//获取小节信息
      video.getVideoById(id).then(res=>{
        this.video = res.data.video;
      })
    },
    openEditVideo(id){//打开编辑小节弹窗
      this.dialogVideoFormVisible = true;
      this.getVideo(id);
    },
    editVideo(){//修改小节信息
      video.updateVideo(this.video).then(res=>{
        this.$message.success("修改成功!");
        this.dialogVideoFormVisible = false;
        this.getChapterById(this.form.courseId);
      })
    },
  //=================章节操作==========================
    next() {
      this.$router.push({path:'/course/publish/'+this.form.courseId})
    },
    previons(){
      this.$router.push({path:'/course/info/'+this.form.courseId})
    },
    getChapterById(id){ //根据课程id查章节小节
      chapter.getChapterById(id).then(res=>{
        this.chapterVideoList = res.data.allChapterVideo;
      })
    },
    saveOrUpdate(){//添加or修改章节
      if(!this.form.id) this.isAddChapter();
      else this.updateChapter();
    },
    dialogForm(){//弹框
        this.form.title = '',
        this.form.sort = 0,
        this.dialogFormVisible = true;
    },
    isAddChapter() { //添加章节
        chapter.addChapter(this.form).then(res=>{
        this.dialogFormVisible = false;
        this.$message.success("添加成功!");
        this.getChapterById(this.form.courseId);
      })
    },
    updateChapter(){//修改章节的方法
      chapter.eduChapter(this.form).then(res=>{
        this.dialogFormVisible = false;
        this.$message.success("修改成功!");
        this.getChapterById(this.form.courseId);
      })
    },
    openEditChater(id){ //根据章节id显示章节
        chapter.getChapterInfo(id).then(res=>{
        this.form = res.data.chapter;
        this.dialogFormVisible = true;
      })
    },
    removeChapter(id){ //根据章节id删除章节
      this.$confirm('此操作将永久删除该章节记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapter.deleteChapter(id).then(res=>{
          this.$message.success("删除成功!");
          this.getChapterById(this.form.courseId);
        })
      })
    },
  }
}
</script>
<style>
  .chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .chanpterList li{
    position: relative;
  }
  .chanpterList p{
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }
  .chanpterList .acts {
    position:absolute;
    float: right;
    font-size: 14px;
    right:100px;
  }

  .videoList{
    padding-left: 50px;
  }
  .videoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }
  ul{
    position:relative;
  }
</style>
