<template>
  <nav class="topText" >
    <router-link to="/">变化折线图</router-link> |
    <router-link to="/version">app发布历程图</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
}

.topText{
  text-align: center;
}

.topText a {
  font-weight: bold;
  color: #2c3e50;
}

.topText a.router-link-exact-active {
  color: #42b983;
}
</style>
