import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { CREATE_COMPONENT, ADD_CHILD } from '../../../graphql/mutations';
import ComponentList from './Workings/ComponentList';
import helper from '../../../Helper/helper';

export default class CreateComponent extends Component {
  constructor(props) {
    super(props);
    const newProject = !props.currentProject.components;
    this.state = {
      name: newProject ? 'index' : '',
      placement: newProject ? 'root' : 'unassigned',
      style: 'container',
      highlighted: ''
    };
  }

  handleParent = id => {
    this.setState({ highlighted: id });
    this.props.setParent(id)
  }

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleRoot = () => console.log("Are you sure you want this to be a root?")
  

  handleUnassigned = () => {
    this.setState({ placement: 'unassigned' });
  }

  handleChild = () => {
    this.setState({ placement: 'child'});
  }

  addChild = async (childId, mutation) => {
    const components = this.props.currentProject.components || [];
    const parentComponent = helper.find(components, this.state.highlighted);
    const success = await mutation({ variables: { _id: parentComponent._id, childId } })
    if (success.data.addChild) {
      const children = [...parentComponent.children, childId];
      const updatedParent = Object.assign({}, parentComponent, { children })
      console.log('updatedParent:', updatedParent);
      this.props.updateComponent(updatedParent);
    } else {
      console.log('failure')
    }
  }

  saveComponent = async (mutation, addChild) => {
    const projectId = this.props.currentProject._id;
    const { name, placement, style } = this.state;
    const component = { projectId, name, placement, style };
    const { data } = await mutation({ variables:  component  });
    this.props.addComponent(data.createComponent);

    if (data.createComponent.placement === 'child') this.addChild(data.createComponent._id, addChild);
    this.props.setParent('')
    this.props.history.push(`/main/component/${name}/0`);
  }

  render() {
    const { style, placement, name, highlighted } = this.state;
    const { history, currentProject, setParent } = this.props;
    const components = currentProject.components || [];
    const root = helper.root(components);
    const childs = helper.childs(components);
    const doesRootExist = root.length === 1;

    return (
      <Mutation mutation={ADD_CHILD}>
        {AddChild => (
          <Mutation mutation={CREATE_COMPONENT}>
            {CreateComponent => (
              <div>
                <label>
                  Component Name
                  <input onChange={(e) => this.handleChange(e, 'name')} value={name} />
                </label>
                <br />
                <br />
                <label>
                  Component Type
                  <div
                    onClick={() => this.setState({ style: 'container' })}
                    style={{backgroundColor: style === 'container' && 'rgba(0, 0, 0, 0.3)' }} 
                    >
                    CONTAINER
                  </div>
                  <div 
                    onClick={() =>this.setState({style: 'presentational'})}
                    style={{ backgroundColor: style === 'presentational' && 'rgba(0, 0, 0, 0.3)' }} 
                    >
                    PRESENTATIONAL
                  </div>
                </label>
                <br />
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
                      chooseComponent={this.handleParent}
                      highlighted={highlighted}
                      text="Choose a parent?"
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
                <button
                  className="dashboard-button"
                  onClick={() => this.saveComponent(CreateComponent, AddChild)}
                  >
                  DONE
                </button>
                <button
                  className="dashboard-button"
                  onClick={()=> history.push('/main')}
                  >
                  CANCEL 
                </button>
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}
