<template>
  <div class="comment-section">
    <h3>{{singleComment.user.name}}</h3>
    <h5>{{singleComment.comment}}</h5>
    <h3 v-if="userId===singleComment.user._id" @click="removeComment(singleComment._id)" id="remove">delete</h3>
  </div>
</template>

<script>
export default {
  props: ['singleComment', 'userId'],
  data () {
    return {}
  },
  methods: {
    removeComment (id) {
      this.$emit('removeComment', id)
    }
  }
}
</script>

<style>
.comment-section {
  border: 1px solid black;
  padding: 3% 3%;
  margin-bottom: 20px;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
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
