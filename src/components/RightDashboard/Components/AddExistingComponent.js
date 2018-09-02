import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { COPY_COMPONENT, ADD_CHILD } from '../../../graphql/mutations';
import ComponentList from './Workings/ComponentList';
import helper from '../../../Helper/helper';
import KeepChildren from './Workings/KeepChildren';

export default class AddExistingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: '',
      placement: '',
      copiedComponent: {},
      keepChildren: false,
    };
  };

  chooseParent = id => {
    this.setState({ highlighted: id });
    this.props.setParent(id)
  };

  chooseComponent = id => {
    this.setState({ 
      highlighted: id,
    });
    this.props.setParent(id);
  };

  setCopiedComponent = () => {
    const copiedComponent = helper.find(this.props.currentProject.components, this.state.highlighted);
    console.log('copiedComponent', copiedComponent);
    this.props.setParent('');
    this.setState({copiedComponent, highlighted: ''});
  }

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleRoot = () => console.log("Are you sure you want this to be a root?");

  handleUnassigned = () => {
    this.setState({ placement: 'unassigned' });
  }

  handleChild = () => {
    this.setState({ placement: 'child'});
  }

  findIteration = id => {
    const components = this.props.currentProject.components;
    const matched = components.filter(component => component.cloneId === id)
    return matched.length
  }

  addChild = async (childId, mutation) => {
    const components = this.props.currentProject.components || [];
    const parentComponent = helper.find(components, this.state.highlighted);
    const success = await mutation({ variables: { _id: parentComponent._id, childId } })
    if (success.data.addChild) {
      const children = [...parentComponent.children, childId];
      const updatedParent = Object.assign({}, parentComponent, { children })
      this.props.updateComponent(updatedParent);
    } else {
      console.log('failure')
    }
  }
  
  saveComponent = async (mutation, addChild) => {
    const { placement, keepChildren, copiedComponent } = this.state;
    
    console.log('keepChildren', keepChildren);
    
    const { cloneId } = copiedComponent
    const iteration = this.findIteration(cloneId)
    const component = keepChildren ? 
      Object.assign({}, copiedComponent, { placement }, { cloneId }, { iteration })
      : Object.assign({}, copiedComponent, { placement }, { cloneId }, { iteration }, { children: [] });
    delete component._id;
    
    console.log('component', component);

    const { data } = await mutation({ variables:  component });
    this.props.addComponent(data.copyComponent);
    
    console.log('data', data)
    
    if (data.copyComponent.placement === 'child') this.addChild(data.copyComponent._id, addChild);
    this.props.setParent('');
    const { name } = data.copyComponent;
    this.props.history.push(`/main/component/${name}/0`);
  }

  handleKeepChildren = value => this.setState({ keepChildren: value })

  render() {
    const { placement, highlighted, keepChildren, copiedComponent } = this.state;
    const { history, currentProject, setParent } = this.props;
    const components = currentProject.components || [];
    const root = helper.root(components);
    const childs = helper.childs(components);
    const doesRootExist = root.length === 1;

    return (
      <Mutation mutation={ADD_CHILD}>
        {AddChild => (
          <Mutation mutation={COPY_COMPONENT}>
            {CopyComponent => (
              <div>
                {Object.keys(this.state.copiedComponent).length > 0 ?
                  <div>
                    <label>
                      Placement
                      {/* 'end' placement was removed, 'end' is a 'child' with no children */}
                      <div
                        onClick={() => this.handleUnassigned('unassigned')}
                        style={{ backgroundColor: placement === 'unassigned' && 'rgba(0, 0, 0, 0.3)' }}
                        >
                        UNASSIGNED
                      </div>
                      {doesRootExist && (
                        <div 
                          onClick={() => this.handleChild('child')}
                          style={{ 
                            backgroundColor: placement === 'child' && 'rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          CHILD 
                        </div>
                      )}
                      {placement === 'child' && (
                        <ComponentList 
                          childs={[...root, ...childs]} 
                          chooseComponent={this.chooseParent}
                          highlighted={highlighted}
                        />
                      )}
                      {!doesRootExist && (
                        <div
                        onClick={() => this.handleRoot('root')}
                        style={{ backgroundColor: placement === 'root' && 'rgba(0, 0, 0, 0.3)' }}
                        >
                          ROOT
                        </div>
                      )}
                    </label>
                    <hr/>

                    {placement === 'child' && 
                      <KeepChildren 
                        haschildren={!!copiedComponent.children.length}
                        keepChildren={keepChildren}
                        setKeepChildren={this.handleKeepChildren}
                      />
                    }
                    
                    <hr/>

                    <button
                      className="dashboard-button"
                      onClick={() => this.saveComponent(CopyComponent, AddChild)}
                    >
                      DONE
                    </button>
                    <button
                      className="dashboard-button"
                      onClick={() => {
                        setParent('');
                        history.push('/main')
                      }}
                      >
                      CANCEL 
                    </button>
                  </div>
                :
                <div>
                  <ComponentList
                    childs={[...root, ...childs]}
                    chooseComponent={this.chooseComponent}
                    highlighted={highlighted}
                    text="Which component?"
                  />
                  <button onClick={this.setCopiedComponent}>
                    CONTINUE
                  </button>
                </div>
                }
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}
