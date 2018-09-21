<template>
<div class="create-post">
  <input type="text" v-model="title" placeholder="Title">
  <textarea name="" id="" cols="30" rows="10" v-model="body" placeholder="Write Your Blogpost Here"></textarea>
  <button @click="addBlogPost">Submit</button>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'update-post',
  data () {
    return {
      body: '',
      title: '',
      baseUrl: `http://localhost:3000/`
    }
  },
  props: ['id'],
  methods: {
    addBlogPost () {
      let self = this
      const token = localStorage.getItem('token')
      axios({
        method: 'put',
        url: `${this.baseUrl}articles/${self.id}`,
        data: {
          title: this.title,
          body: this.body
        },
        headers: {
          token: token
        }
      })
        .then(response => {
          self.$emit('updateBlog', {
            title: this.title,
            body: this.body
          })
          this.$router.push('/')
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.create-post {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  margin-top: 50px;
}
.create-post input {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  width: 600px;
  height: 50px;
  margin-bottom: 30px;
}
.create-post textarea {
  width: 600px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  margin-bottom: 30px;
}

button {
  width: 300px;
  height: 80px;
  border-radius: 10px;
}
</style>
