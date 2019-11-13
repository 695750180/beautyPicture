<template>
  <div class="root">
    <div class="imageShow">
      <img :src="base64Data" v-if="base64Data" :style="psPictrue"/>
    </div>

    <div class="oparetor">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="对比度">
                <el-input v-model="formInline.contrast" type="number" placeholder="对比度值"></el-input>
            </el-form-item>
            <el-form-item label="亮度">
                 <el-input v-model="formInline.brightness" type="number" placeholder="亮度值"></el-input>
            </el-form-item>
            <el-form-item label="灰度">
                 <el-input v-model="formInline.grayscale" type="number" placeholder="灰度"></el-input>
            </el-form-item>
            <el-form-item label="透明度">
                 <el-input v-model="formInline.opacity" type="number" placeholder="透明度"></el-input>
            </el-form-item>
            <el-form-item label="饱和度">
                 <el-input v-model="formInline.saturate" type="number" placeholder="饱和度"></el-input>
            </el-form-item>
        </el-form>
    </div>
        
    <div class="upload">
      <el-upload
        class="upload-demo"
        action="#"
        :before-upload="handlePreview"
        :on-change="handleChange"
        :auto-upload="false"
        :show-file-list="false"
        ref="fileUpload"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fileReader: new FileReader(),//文件读取对象
      base64Data : "",
      file : {},
      formInline:{
        contrast : 100,
        brightness : 100,
        grayscale : 0,
        opacity : 100,
        saturate: 100,
      }
    };
  },

  mounted() {

  },

  methods: {
    handleChange(file, fileList) {
      if (file.raw.type.indexOf("image") == -1) {
        this.$message({
          type: "warning",
          message: `文件格式不正确`
        });
        this.$refs.fileUpload.clearFiles();
        return false;
      }
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.file = file;
      this.$emit("input", file.name);
      this.getBase64Str();
    },
    handlePreview(file) {

    },
    getBase64Str() {
      let vm = this;
      return new Promise((resolve, reject) => {
        let file = this.file.raw;
        if (file) {
          this.fileReader.readAsDataURL(file);
          let base64Str = "";
          this.fileReader.onload = () => {
            base64Str = this.fileReader.result;
          };
          this.fileReader.onerror = function(error) {
            reject(error);
          };
          this.fileReader.onloadend = function() {
            let res = {
              fileName: file.name,
              base64Str: base64Str
            };
            vm.base64Data = base64Str;
            resolve(res);
          };
        } else {
          if (vm.base64Data) {
            let res = {
              fileName: vm.value,
              base64Str: vm.base64Data
            };
            resolve(res);
          } else {
            reject("未选择文件");
          }
        }
      });
    }
  },

  watch: {},

  computed: {
      psPictrue:function(){
          return{
              filter: `contrast(${this.formInline.contrast}%) brightness(${this.formInline.brightness}%) grayscale(${this.formInline.grayscale}%) opacity(${this.formInline.opacity}%) saturate(${this.formInline.saturate}%)`
          }
      }
  },

  components: {}
};
</script>

<style lang="scss"  scoped>
.root{
    text-align: center;
}
.imageShow {
  border: 1px solid #ccc;
  height: 50vh;
  width: 60vw;
  overflow: auto;
  display: inline-block;
  img {
    height: 100%;
  }
}
</style>

