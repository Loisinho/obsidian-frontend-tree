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
import Tree from 'primevue/tree';
import fetch from 'node-fetch';

@Component({
  components: {
    "Tree": Vue.extend(Tree)
  }
})
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

<style lang="sass">
@import "../assets/primeicons/primeicons.css"

#primetree
  a
    color: #42b983

  // Primevue & Primeicon classes
  $accent-color: #41b883
  $icon-size: 1.5rem

  .p-tree
    text-align: left
    margin: 50px 10%

    .p-tree-toggler-icon
      background-repeat: no-repeat
      background-position: center
      background-size: 100%

    // Tree Node Icon
    .p-treenode-icon:before
      font-family: 'primeicons'
      display: inline-block
      content: "\e963"
      width: $icon-size
      line-height: $icon-size
      text-align: center

    .p-treenode-label
      margin-left: .4rem

    .p-tree-container
      padding: 4px

      // Main Node
      > .p-treenode
        > .p-treenode-content
          > .p-tree-toggler > .p-tree-toggler-icon
            &.pi-chevron-right
              background-image: url('../assets/svgs/plus5.svg')

            &.pi-chevron-down
              background-image: url('../assets/svgs/minus5.svg')

          > .p-treenode-icon:before
            content: "\e993"
            color: $accent-color

          > .p-treenode-label
            color: $accent-color

      // Children Nodes
      .p-treenode
        > .p-treenode-children
          padding: 0 0 0 $icon-size

        &:not(:last-child) > .p-treenode-children
          padding: 0
          border-left: $icon-size solid transparent
          border-image: url('../assets/svgs/line1.svg') 0 18 round
          // border-image-source: url('../assets/svgs/line1.svg')
          // border-image-slice: 0 18
          // border-image-repeat: round

        .p-treenode-content
          display: flex
          align-items: center

          &:focus
            outline: none

            > .p-treenode-label
              outline: 2px solid $accent-color
              outline-offset: 2px

        .p-tree-toggler
          background: none
          padding: 0
          border: none
          border-radius: 50%

          &:focus
            outline: none
            box-shadow: 0 0 1px 2px $accent-color

          .p-tree-toggler-icon
            display: inline-block
            content: ""
            width: $icon-size
            height: $icon-size

            &.pi-chevron-right
              background-image: url('../assets/svgs/plus3.svg')

            &.pi-chevron-down
              background-image: url('../assets/svgs/minus3.svg')

        // No Children Nodes
        &.p-treenode-leaf
          .p-treenode-icon:before
            content: "\e958"

          .p-tree-toggler
            visibility: visible

            .p-tree-toggler-icon
              &.pi-chevron-right
                background-image: url('../assets/svgs/line3.svg')

              &.pi-chevron-down
                background-image: url('../assets/svgs/line3.svg')

      // Last Child Node
      .p-treenode-children
        > .p-treenode:last-child
          > .p-treenode-content > .p-tree-toggler
            > .pi-chevron-right
              background-image: url('../assets/svgs/plus2.svg')

            > .pi-chevron-down
              background-image: url('../assets/svgs/minus2.svg')

        // Last No Children Node
        > .p-treenode.p-treenode-leaf:last-child
          > .p-treenode-content > .p-tree-toggler
            > .pi-chevron-right
              background-image: url('../assets/svgs/line2.svg')

            > .pi-chevron-down
              background-image: url('../assets/svgs/line2.svg')
</style>
