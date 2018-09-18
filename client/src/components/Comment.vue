<template>
  <div class="comment-section">
    <h3>{{singleComment.user.name}}</h3>
    <h5>{{singleComment.comment}}</h5>
  </div>
</template>

<script>
export default {
  props: ['singleComment'],
  data () {
    return {}
  }
}
</script>

<style>
.comment-section {
  border: 1px solid black;
  padding: 3% 3%;
  margin-bottom: 20px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
</style>
