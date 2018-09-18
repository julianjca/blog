<template>
  <div class="card">
    <h2>{{ blog.title }}</h2>
    <h3>{{ blog.user.name }}</h3>
    <p>{{ blog.body }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['blog']
}
</script>

<style>
.card {
  width: 500px;
  min-height: 200px;
  border: 2px solid black;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}
</style>
