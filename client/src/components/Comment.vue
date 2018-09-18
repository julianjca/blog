<template>
  <div class="comment-section">
    <h2>{{singleComment.user.name}}</h2>
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
</style>
