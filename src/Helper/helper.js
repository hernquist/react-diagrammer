const helper = {
  unassigned: components => components.filter(component => component.placement === 'unassigned'),
  root: components => components.filter(component => component.placement === 'root'),
  child: components => components.filter(component => component.placement === 'child'),
}

export default helper;