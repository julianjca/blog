<template>
  <div class="card">
    <h2 @click="sendId">{{ blog.title }}</h2>
    <h3>{{ blog.user.name }}</h3>
    <p>{{ blog.body }}</p>
    <h3 v-if="userId===blog.user._id" @click="removeBlog(blog._id)">delete</h3>
    <h3 v-if="userId===blog.user._id">update</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ArticleCard',
  props: ['blog', 'userId'],
  data () {
    return {
      id: this.blog._id
    }
  },
  methods: {
    sendId () {
      this.$emit('openingBlog', this.id)
    },
    removeBlog (id) {
      let self = this
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          self.$emit('requestNewData', id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.card {
  width: 600px;
  min-height: 200px;
  border: 2px solid black;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}

h2 {
  cursor: pointer;
}
</style>
