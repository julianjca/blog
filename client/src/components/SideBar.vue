<template>
  <div class="sidebar">
    <h2>Article Lists</h2>
    <a v-for="(blog) in blogs" :key="blog._id" @click="callBlog(blog._id)">{{ blog.title }}</a>
    <h3 v-if="loginStatus" @click="createPost">Create New Blog Post</h3>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: ['blogs', 'loginStatus'],
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    this.isLogin = this.logStatus
  },
  methods: {
    createPost () {
      this.$router.push('/create')
    },
    callBlog (id) {
      this.$router.push({ name: 'blog', params: { id: id } })
    }
  },
  watch: {
    blogs () {
      console.log('hehehe')
    }
  }
}
</script>

<style scoped>
.sidebar a {
  display: block;
  margin-bottom: 20px;
  cursor: pointer;
}
.sidebar h3 {
  color: #ffffff;
  background-color: #2c3e50;
  padding: 2% 1%;
  width: 60%;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  cursor: pointer;
}
</style>
