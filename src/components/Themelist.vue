<template>
  <div class="h-100 themelist">
    <ul class="bs-select">
      <li
        v-for="(item, index) in items"
        :key="index"
        :data-id="item.id"
        class="interactive"
        :class="{active: selectedItemId==item.id}"
        @dblclick="load"
        @click="select(item.id)"
      >
        <div class="d-flex">
          <div class="thumbnail"><div :style="thumbnailStyle"></div></div>
          <div>{{item.name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Themelist",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    selectedItemId: 0,
    aspectWidth: 4,
    aspectHeight: 3,
    placeholderHeight: 360
  }),
  methods: {
    select(itemid) {
      this.selectedItemId = itemid;
      this.$emit('select', this.selectedItemId);
    },
    load(e) {
      this.$emit('load', this.selectedItemId);
    }
  },
  computed: {
    thumbnailStyle(){
      let placeholderWidth = this.placeholderHeight / this.aspectHeight * this.aspectWidth;
      return {
        width: 'calc(var(--height) / ' + this.aspectHeight + ' * ' + this.aspectWidth + ')',
        backgroundImage: `url('https://via.placeholder.com/${placeholderWidth}x${this.placeholderHeight}')`
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.themelist {
  ul {
    li {
      padding: .5rem;
      div.thumbnail {
        --height: 80px;
        height: var(--height);
        margin-right: 1rem;
        div {
          height: 100%;
          border: 1px solid black;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
      }
    }
  } 
}
</style>