<template>
  <div id="primetree">
    <h1>{{ msg }}</h1>
    <p>
      Vue 2 web project using TypeScript as main language,<br>
      PrimeVue components to diplay de data collected with can-ndjson-stream<br>
      and using Jest testing framework.<br>
      <a href="http://download.obsidiansoft.com/frontend.zip">Download this exercise</a>.
    </p>
    <Tree :value="nodes">
      <template #default="nodes">
        {{ nodes.node.name }}
      </template>
    </Tree>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PrimeTree extends Vue {
  @Prop() private msg!: string;

  // Tree nodes data.
  nodes: any = [
    {'key': 1, 'name': 'node_1', 'children': [
      {'key': 11, 'name': 'node_1.1', 'children': [
        {'key': 111, 'name': 'node_1.1.1', 'children': []}
      ]},
      {'key': 12, 'name': 'node_1.2', 'children': []}
    ]}
  ];
}
</script>

<style scoped>
#primetree a {
  color: #42b983;
}

#primetree .p-tree {
  text-align: left;
  margin: 50px 10%;
}
</style>
