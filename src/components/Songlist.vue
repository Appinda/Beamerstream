<template>
  <div class="h-100">
    <ul class="songlist bs-select">
      <li
        v-for="(item, index) in items"
        :key="index"
        :data-id="item.id"
        class="interactive"
        :class="{active: selectedItemId==item.id}"
        @dblclick="load"
        @click="select(item.id)"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Songlist",
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    selectedItemId: null
  }),
  methods: {
    select(itemid) {
      this.selectedItemId = itemid;
      this.$emit('songSelect', this.selectedItemId);
    },
    load(e) {
      this.$emit('songLoad', this.selectedItemId);
    }
  }
};
</script>

<style lang="scss" scoped>
.songlist {
  > div small {
    color: #888;
  }
  .error {
    color: red;
  }
}
</style>