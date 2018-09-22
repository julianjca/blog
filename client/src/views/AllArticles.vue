<template>
    <div class="articles">
      <ArticleCard v-for="(blog,index) in blogs" :key="index" :blog="blog" @openingBlog="openBlog" :userId="userId" @requestNewData="resetNewPage"></ArticleCard>
    </div>
</template>

<script>
import axios from 'axios'
import ArticleCard from '@/components/ArticleCard.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'all-article',
  methods: {
    openBlog (id) {
      this.$router.push({ name: 'blog', params: { id: id } })
    },
    resetNewPage (id) {
      // for (let i = 0; i < this.blogs.length; i++) {
      //   if (this.blogs[i]._id === id) {
      //     this.blogs.splice(i, 1)
      //   }
      // }
      let self = this
      axios({
        method: `GET`,
        url: `${this.baseUrl}articles`
      })
        .then(response => {
          console.log(response)
          self.blogs = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  data () {
    return {
      blogs: [],
      baseUrl: 'http://localhost:3000/',
      logStatus: false,
      idUser: ''
    }
  },
  props: ['userId', 'loginStatus'],
  components: {
    ArticleCard,
    SideBar
  },
  created () {
    let self = this
    axios({
      method: `GET`,
      url: `${this.baseUrl}articles`
    })
      .then(response => {
        self.blogs = response.data.data
      })
      .catch(error => {
        console.error(error)
      })
  },
  watch: {
    loginStatus () {
      this.idUser = this.userId
      this.logStatus = this.loginStatus
    },
    userId () {
      this.idUser = this.userId
    }
  }
}
</script>

<style>
/* .home {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 100px;
} */
</style>
