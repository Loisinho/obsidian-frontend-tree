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
import ndjsonStream from 'can-ndjson-stream';

@Component
export default class PrimeTree extends Vue {
  @Prop() private msg!: string;

  // Tree nodes data.
  nodes: any = [];

  // Add an unique 'key' field for each node in the tree.
  setKey(values: any[]): any[] {
    values.map(i => {
      i.key = i.id;
      if (i.children !== undefined) {
        if (i.children.length) this.setKey(i.children);
      }
    });
    return values;
  }

  // Get tree data through provided server.
  async getNodes(): Promise<any> {
    try {
      const response = await fetch( "http://localhost:3000/treedata" );
      const stream = await ndjsonStream( response.body );
      const reader = stream.getReader();
      let read;
      const result = await reader.read();
      if (result.done) {
        return;
      }
      reader.read().then( read );
      return this.setKey( [ result.value ] );
    } catch( err ) {
      return;
    }
  }

  async mounted() {
    this.nodes = await this.getNodes();
  }
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
