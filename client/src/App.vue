<template>
  <div id="app">
    <div id="nav">
      <div>
        <h1 @click="goToHome" id="logo">BLOG</h1>
      </div>
      <div class="menu">
        <router-link id="navi" to="/">Home</router-link>
        <router-link id = "navi" to="/about">About</router-link>
        <a id="loginButton" @click="showLogin = true" v-show="!isLogin">Login</a>
        <a id="loginButton" @click="logout" v-if="isLogin">Logout</a>
      </div>
    </div>
    <LoginModal @sending-login = "login" @close-login="showLogin = false" v-if="showLogin"></LoginModal>

    <div class="page-template">
      <div class="left-bar">
        <SideBar :blogs="blogs" :loginStatus="isLogin"></SideBar>
      </div>
      <div class="page">
        <router-view @update-blog="fetchBlog" :idUser="userId" :loginStatus = "isLogin"  />
      </div>
    </div>

  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import SideBar from '@/components/SideBar.vue'

import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      showLogin: false,
      isLogin: false,
      userId: '',
      baseUrl: 'http://35.240.195.45/',
      blogs: []
    }
  },
  components: {
    LoginModal,
    SideBar
  },
  methods: {
    goToHome () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('token')
      this.userId = ''
      this.isLogin = false
    },
    login (data) {
      this.showLogin = false
      let self = this
      axios({
        method: 'POST',
        data: data,
        url: `${this.baseUrl}users/login`
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          self.isLogin = true
          const token = response.data.token
          setTimeout(() => {
            axios({
              method: 'GET',
              url: `${this.baseUrl}users/auth`,
              headers: {
                token: token
              }
            })
              .then(response => {
                console.log(response)
                localStorage.setItem('userId', response.data.data._id)
                self.userId = response.data.data._id
                self.isLogin = true
              })
              .catch(err => {
                console.log(err)
              })
          }, 200)
        })
        .catch(err => {
          console.error('error', err)
        })
    },

    fetchBlog () {
      console.log('masuk fetch blog')
      let self = this
      axios({
        method: `GET`,
        url: `${this.baseUrl}articles`
      })
        .then(response => {
          console.log('ini respon fetch blog', response.data.data)
          self.blogs = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  },

  created () {
    console.log('woeeeeeeeeee')
    const token = localStorage.getItem('token')
    let self = this
    axios({
      method: 'GET',
      url: `${this.baseUrl}users/auth`,
      headers: {
        token: token
      }
    })
      .then(response => {
        console.log(response)
        localStorage.setItem('userId', response.data.data._id)
        self.userId = response.data.data._id
        self.isLogin = true
      })
      .catch(err => {
        console.log(err)
      })
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
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

#navi {
  text-decoration: none;
  margin-right: 40px;
}

.menu {
  padding-top: 3%;
  margin-right: 15%;
  margin-left: auto;
  display: inline-block;
}

.menu a {
  cursor: pointer;
  font-weight: 500;
}

#loginButton {
  color: #fff;
  background-color: #2c3e50;
  padding: 7px 15px;
  border-radius: 5px;
}
.page-template {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 100px;
}

#logo {
  cursor: pointer;
}
</style>
