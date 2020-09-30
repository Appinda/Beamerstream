<template>
  <b-row class="h-100">
    <b-col class="h-100">
      <b-row class="py-4 h-100">
        <b-col md="3" sm="12" class="h-100">
          <b-card class="h-100">
            <template v-slot:header>
              <h6 class="mb-0">Songlist</h6>
            </template>
            <bs-songlist :songlist="songlist" @songSelect="onSongSelect" @songLoad="onSongLoad"/>
            <template v-slot:footer>
              <b-btn :variant="songSelected?'danger':'light'" aria-label="Delete song" :aria-disabled="!songSelected" :disabled="!songSelected"><b-icon icon="trash">trash</b-icon></b-btn>
              <b-btn :variant="songSelected?'success':'light'" aria-label="Edit song" :aria-disabled="!songSelected" :disabled="!songSelected"><b-icon icon="pencil">edit</b-icon></b-btn>
            </template>
          </b-card>
        </b-col>
        <b-col md="9" sm="12" class="h-100">
          <b-card class="h-100">
            <template v-slot:header>
              <h6 class="mb-0">Edit song</h6>
            </template>
            Edit
            <template v-slot:footer></template>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import queries from "@/plugins/helpers/queries";

export default {
  name: "ControlPage",
  layout: "control",
  data: () => ({
    songSelected: false
  }),
  computed: {
    
  },
  methods: {
    onSongSelect(id){
      this.songSelected = true;
    },
    onSongLoad(id){
      // this.songSelected = false;
    }
  },
  apollo: {
    songlist: queries.query.songlist
  },
}
</script>

<style scoped lang="scss">

</style>
