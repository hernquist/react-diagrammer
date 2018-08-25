const helper = {
  unassigned: components => components.filter(component => component.placement === 'unassigned'),
  root: components => components.filter(component => component.placement === 'root'),
  childs: components => components.filter(component => component.placement === 'child'),
  currComp: (components, name, index) => components
    .filter(c => c.name === name)
    .filter(c => c.iteration === Number(index))[0],
  find: (components, id) => components.filter(c => c._id === id)
}

export default helper;