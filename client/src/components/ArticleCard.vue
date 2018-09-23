<template>
  <div class="card">
    <h2 @click="sendId">{{ blog.title }}</h2>
    <h3>{{ blog.user.name }}</h3>
    <p>{{ blog.body }}</p>
    <h3 v-if="userId===blog.user._id" @click="removeBlog(blog._id)" id="remove">delete</h3>
    <h3 v-if="userId===blog.user._id" id="update" @click="toUpdatePage">update</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ArticleCard',
  props: ['blog', 'userId'],
  data () {
    return {
      id: this.blog._id,
      idUser: ''
    }
  },
  methods: {
    sendId () {
      this.$emit('openingBlog', this.id)
    },
    toUpdatePage () {
      this.$router.push(`/update/${this.id}`)
    },
    removeBlog (id) {
      let self = this
      axios({
        method: 'delete',
        url: `http://35.240.195.45/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          setTimeout(() => {
            self.$emit('requestNewData', id)
          }, 500)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    userId () {
      this.idUser = this.userId
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

#update {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: green;
}

#remove {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: red;
}
</style>
