<template>
  <div class="home">
      <!-- <ArticleCard v-for="(blog,index) in blogs" :key="index" :blog="blog" @openingBlog="openBlog" :userId = "idUser" @requestNewData="resetNewPage"></ArticleCard> -->
      <router-view :userId = "idUser" :loginStatus="loginStatus" @update-blog="updateBlog" @finish-delete-data="updateBlog"></router-view>
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
    },
    updateBlog () {
      console.log('mashok')
      this.$emit('update-blog')
    }
  },
  data () {
    return {
      blogs: [],
      baseUrl: 'http://35.240.195.45/',
      logStatus: false
    }
  },
  props: ['idUser', 'loginStatus'],
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
