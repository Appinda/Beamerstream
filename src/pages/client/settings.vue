<template>
  <b-row class="h-100">
    <b-col class="h-100 px-0">
      <b-tabs pills card vertical no-fade class="h-100">
        <b-tab title="Local" disabled></b-tab>
        <b-tab title="General" active>
          <b-card-text>General settings</b-card-text>
        </b-tab>
        <b-tab title="Songs">
          <b-card-text>Songs settings</b-card-text>
        </b-tab>
        <b-tab title="Themes">
          <b-card-text>Themes settings</b-card-text>
        </b-tab>
        <b-tab title="Global" disabled></b-tab>
        <b-tab title="Remote">
          <b-card-text>
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group id="input-group-4">
                <b-form-checkbox v-model="settings.remote.enable">Enable remote</b-form-checkbox>
                <b-form-checkbox
                  class="ml-4"
                  :disabled="!settings.remote.enable"
                  v-model="settings.remote.enableClient"
                >Client</b-form-checkbox>
                <b-form-checkbox
                  class="ml-4"
                  :disabled="!settings.remote.enable"
                  v-model="settings.remote.enableLive"
                >Live</b-form-checkbox>
              </b-form-group>

              <b-button type="reset" size="sm" variant="warning">Reset</b-button>
              <b-button type="submit" size="sm" variant="primary">Save</b-button>
            </b-form>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "SettingsPage",
  layout: "control",
  data: () => ({
    showAdvanced: false,
    settings: {},
    savedSettings: {
      remote: {
        enable: false,
        enableClient: false,
        enableLive: false
      }
    }
  }),
  methods: {
    setShowAdvanced(value) {
      this.showAdvanced = value;
    },
    onSubmit() {},
    onReset() {}
  },
  created() {
    this.settings = JSON.parse(JSON.stringify(this.savedSettings));
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  $background: $primary;

  background-color: $background;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: $background;
  }
  &::-webkit-scrollbar-thumb {
    background: darken($primary, 7%);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: darken($primary, 12%);
  }
}
</style>
