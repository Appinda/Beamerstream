<template>
  <div class="header">
    <b-navbar toggleable="lg" :type="headerColor[1]" :variant="headerColor[0]">
      <b-navbar-brand href="#">Beamerstream</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/client">Control</b-nav-item>
          <b-nav-item to="/client/songs">Songs</b-nav-item>
          <b-nav-item to="/client/themes">Themes</b-nav-item>
          <b-nav-item to="/client/settings"><b-icon-gear-fill/></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    headerColor(){
      switch(this.$route.name){
        case "client":
          return ["primary", "dark"];
        case "client-songs":
          return ["success", "dark"];
        case "client-themes":
          return ["warning", "light"];
        case "client-settings":
          return ["dark", "dark"];        
        default:
          return ["light", "light"];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 56px;
  nav {
    border-bottom: 1px solid #ddd;
  }
}
</style>