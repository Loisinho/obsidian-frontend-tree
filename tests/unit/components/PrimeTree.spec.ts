import { mount } from '@vue/test-utils'
import PrimeTree from '@/components/PrimeTree.vue'

let wrapper: any
let spy: jest.SpyInstance<any, unknown[]>

const msg = 'Obsidian Title'
const nodes = [
  {'key': 1, 'id': 1, 'name': 'node_1', 'children': [
    {'key': 11, 'id': 11, 'name': 'node_1.1', 'children': [
      {'key': 111, 'id': 111, 'name': 'node_1.1.1', 'children': []}
    ]},
    {'key': 12, 'id': 12, 'name': 'node_1.2', 'children': []}
  ]}
]

beforeEach(() => {
  wrapper = mount(PrimeTree, {
    propsData: {
      msg
    },
    data() {
      return {
        nodes: nodes
      }
    }
  })

  spy = jest
    .spyOn(wrapper.vm, 'getNodes')
    .mockImplementation(() => nodes)
})

afterEach(() => {
  spy.mockRestore()
})

describe('PrimeTree.vue', () => {
  test('Snapshot', async () => {
    const result = wrapper.vm.getNodes()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(result).toBe(nodes)
    expect(wrapper).toMatchSnapshot()
  })

  test('Tree first node is individually expanded', async () => {
    expect(wrapper.html()).not.toContain('aria-expanded="true"')
    await wrapper.findAll('.p-tree-container > li > div > button').at(0).trigger('click')
    expect(wrapper.text()).toContain(nodes[0].children[0].name)
    expect(wrapper.text()).not.toContain(nodes[0].children[0].children[0].name)
  })
})
