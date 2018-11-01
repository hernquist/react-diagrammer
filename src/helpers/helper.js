const helper = {
  unassigned: components =>
    components.filter(component => component.placement === 'unassigned'),
  root: components =>
    components.filter(component => component.placement === 'root'),
  childs: components =>
    components.filter(component => component.placement === 'child'),
  find: (components, id) => {
    let c = components.filter(c => c._id === id);
    return c[0];
  },
  getParent: (components, _id) => components.filter(component =>
    component.children.some(id => id === _id)
  ),
  screenWidth: () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
  getComponentFromURL: (pathname, components) => {
    const [name, iteration] = pathname.split('/').slice(3);
    return components.filter(
      component =>
        component.iteration === Number(iteration) && component.name === name
    )[0];
  },
  trimURL: (url, numberOfPaths) => url
    .split('/')
    .slice(0, numberOfPaths)
    .join('/'),
};

export default helper;
