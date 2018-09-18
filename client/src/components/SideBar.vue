<template>
  <div class="sidebar">
    <h2>Article Lists</h2>
    <a v-for="(blog) in blogs" :key="blog._id">{{ blog.title }}</a>
    <h3 v-if="logStatus">Create New Blog Post</h3>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: ['blogs', 'logStatus'],
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    this.isLogin = this.logStatus
  }
}
</script>

<style>
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
}
</style>
