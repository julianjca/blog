<template>
  <div id="app">
    <div id="nav">
      <div>
        <h1>BLOG</h1>
      </div>
      <div class="menu">
        <router-link id="navi" to="/">Home</router-link>
        <router-link id = "navi" to="/about">About</router-link>
        <a id="loginButton" @click="showLogin = true" v-if="!isLogin">Login</a>
        <a id="loginButton" @click="logout" v-if="isLogin">Logout</a>
      </div>
    </div>
    <LoginModal @sending-login = "login" @close-login="showLogin = false" v-if="showLogin"></LoginModal>
    <router-view :loginStatus = "isLogin"/>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      showLogin: false,
      isLogin: false,
      userId: '',
      baseUrl: 'http://localhost:3000/',
      blogs: []
    }
  },
  components: {
    LoginModal
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
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
        })
        .catch(err => {
          console.error('error', err)
        })
    }
  },

  created () {
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
</style>
