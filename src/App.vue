<template>

  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/test">Test</router-link>
    </div>

    <router-view/>
    
  </div>

</template>

<style lang="stylus">

html
  background-color #272727
  color coral

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color coral
  position relative

#nav
  padding 20px
  
  a
    font-weight bold
    color coral
    &.router-link-exact-active
      color #42b983

</style>
