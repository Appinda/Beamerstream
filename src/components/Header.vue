<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">Beamerstream</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/client">Control</b-nav-item>
          <b-nav-item to="/client/songs">Songs</b-nav-item>
          <b-nav-item to="/client/settings"><b-icon-gear-fill/></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
nav {
  border-bottom: 1px solid #ddd;
}
</style>