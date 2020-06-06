<template>
  <b-row>
    <b-col>
      <b-row class="justify-content-md-center">
        <b-col col md="12" lg="8">
          <b-row class="justify-content-center mt-4 mb-4">
            <b-col col cols="5">
              <b-button-group size="sm w-100">
                <b-button
                  @click="setShowAdvanced(false)"
                  :variant="showAdvanced?'light':'primary'"
                >Simple</b-button>
                <b-button
                  @click="setShowAdvanced(true)"
                  :variant="!showAdvanced?'light':'primary'"
                >Advanced</b-button>
              </b-button-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card no-body>
                <b-tabs pills card vertical>
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

                        <b-button type="reset"  size="sm" variant="warning">Reset</b-button>
                        <b-button type="submit" size="sm" variant="primary">Save</b-button>
                      </b-form>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
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
label {
}
</style>
