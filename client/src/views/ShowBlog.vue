<template>
  <div>
    <h1>{{blog.title}}</h1>
    <h4>{{blog.user.name}}</h4>
    <p>{{blog.body}}</p>
    <div class="create-comment" v-if="loginStatus">
      <textarea name="" id="" cols="30" rows="10" v-model="comment" placeholder="Write Your Comment Here"></textarea>
      <br>
      <button @click="addComment">Submit</button>
    </div>
    <div>
      <h3>List of Comments</h3>
      <Comment v-for="com in comments" :key="com._id" :singleComment="com" :userId = "userId" @removeComment = "removingComment"></Comment>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'
import Comment from '@/components/Comment.vue'

export default {
  name: 'ViewBlog',
  props: ['id', 'loginStatus', 'userId'],
  data () {
    return {
      baseUrl: `http://35.240.195.45/`,
      blog: [],
      comment: '',
      comments: []
    }
  },
  components: {
    SideBar,
    Comment
  },
  methods: {
    addComment () {
      let self = this
      const token = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: `${this.baseUrl}comments`,
        data: {
          comment: this.comment,
          postId: this.id
        },
        headers: {
          token: token
        }
      })
        .then(response => {
          self.comment = ''
          axios({
            method: 'get',
            url: `${this.baseUrl}articles/${this.id}`
          })
            .then(response => {
              console.log(response.data.data[0].comments)
              self.blog = response.data.data[0]
              self.comments = response.data.data[0].comments
            })
            .catch(err => {
              console.err(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    removingComment (id) {
      let self = this
      const token = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: `${this.baseUrl}comments/${id}`,
        headers: {
          token: token
        }
      })
        .then(response => {
          setTimeout(() => {
            axios({
              method: 'get',
              url: `${this.baseUrl}articles/${this.id}`
            })
              .then(response => {
                console.log(response.data.data[0].comments)
                self.blog = response.data.data[0]
                self.comments = response.data.data[0].comments
              })
              .catch(err => {
                console.err(err)
              })
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: `${this.baseUrl}articles/${this.id}`
    })
      .then(response => {
        console.log(response.data.data[0])

        self.blog = response.data.data[0]
        self.comments = response.data.data[0].comments
      })
      .catch(err => {
        console.err(err)
      })
  },
  watch: {
    id () {
      let self = this
      axios({
        method: 'get',
        url: `${this.baseUrl}articles/${this.id}`
      })
        .then(response => {
          self.blog = response.data.data[0]
          self.comments = response.data.data.comments
        })
        .catch(err => {
          console.err(err)
        })
    }
  }
}
</script>

<style scoped>
.create-comment {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  margin-top: 50px;
}
.create-comment input {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  width: 200px;
  height: 50px;
  margin-bottom: 30px;
}
.create-comment textarea {
  width: 50%;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  margin-bottom: 30px;
}

button {
  width: 20%;
  height: 40px;
  border-radius: 10px;
}

h3 {
  padding-bottom: 20px;
  border-bottom: solid 1px black;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

p {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  text-align: justify;
}
</style>
