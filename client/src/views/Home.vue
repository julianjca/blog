<template>
  <div class="home">
    <div class="articles">
      <ArticleCard v-for="(blog,index) in blogs" :key="index" :blog="blog" @openingBlog="openBlog"></ArticleCard>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleCard from '@/components/ArticleCard.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'home',
  methods: {
    openBlog (id) {
      this.$router.push({ name: 'blog', params: { id: id } })
    }
  },
  data () {
    return {
      blogs: [],
      baseUrl: 'http://localhost:3000/',
      logStatus: false
    }
  },
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
      this.logStatus = this.loginStatus
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
