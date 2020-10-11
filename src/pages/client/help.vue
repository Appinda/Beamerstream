<template>
  <b-row class="page-help">
    <b-col>
      <div v-for="(h1,h1k) in parseMarkdown(markdowndata)" :key="h1k">
        <h1>{{h1[0]}}</h1>
        <div class="help-grid">
          <div v-for="(h2,h2k) in h1[1]" :key="h2k">
            <h2>{{h2[0]}}</h2>
            <div v-for="(h3,h3k) in h2[1]" :key="h3k">
              <h3
              variant="primary"
              :class="collapse[h3[2]] ? null : 'collapsed'"
              @click="collapse[h3[2]] = !collapse[h3[2]]">{{h3[0]}}</h3>
              <b-collapse :id="'collapse-' + h3[2]" v-model="collapse[h3[2]]" class="mt-2">
                <component :is="h4[0]" v-for="(h4,h4k) in h3[1]" :key="h4k">{{h4[1]}}</component>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "HelpPage",
  layout: "control",
  data: () => ({
    collapse: {
      0: false,
      1: false
    }
  }),
  methods: {
    parseMarkdown(markdowndata){
      let lines = markdowndata.split('\n').filter(e => e.length > 1)
      console.log(lines);
      let returndata = [];
      let latestH1 = null;
      let latestH2 = null;
      let latestH3 = null;
      let collapseCount = 0;
      for(let line of lines){
        let parts = line.split(" ");
        switch(parts[0]){
          case "#":
            latestH1 = [line.substr(2), []];
            returndata.push(latestH1);
            break;
          case "##":
            latestH2 = [line.substr(3), []];
            latestH1[1].push(latestH2);
            break;
          case "###":
            collapseCount++;
            latestH3 = [line.substr(4), [], collapseCount];
            latestH2[1].push(latestH3);
            break;
          case "####":
            latestH3[1].push(['h4', `${line.substr(5)}`]);
            break;
          default:
            if(latestH3[1][latestH3[1].length-1] && latestH3[1][latestH3[1].length-1][0] == "p") latestH3[1][latestH3[1].length-1][1] += `\r\n${line}`;
            else latestH3[1].push(['p', line]);
            break;
        }
      }
      return returndata;
    }
  },
  async asyncData(){
    let markdowndata = await fetch('/help/index.md', {method: "get"})
    .then(res => res.text());
    return {markdowndata}
  }
};
</script>

<style scoped lang="scss">
h1 {
  
}
h2 {
  font-size: 1.6em;
  width: 100%;
  border-bottom: 1px solid #aaa;
  padding-bottom: .3rem;
}
h3 {
  color: $primary;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
h4 {
  font-size: 1rem;
  font-weight: bold;
}
p {
  white-space: pre-wrap;
}
.help-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  > div {
    width: 25%;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 2rem;
  }
}
</style>
