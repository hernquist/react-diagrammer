import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { CREATE_COMPONENT } from '../../../graphql/mutations';

export default class CreateComponent extends Component {
  constructor(props) {
    super(props);
    const newProject = !props.currentProject.components;
    this.state = {
      name: newProject ? 'index' : '',
      placement: newProject ? 'root' : 'unassigned',
      style: 'container'
    }
  }

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  saveComponent = async mutation => {
    const projectId = this.props.currentProject._id;
    const { name, placement, style } = this.state;
    const component = { projectId, name, placement, style, iteration: 0 };
    const { data } = await mutation({ variables:  component  });
    this.props.addComponent(data.createComponent);
    this.props.history.push('/main/component/0');
  }

  render() {
    const { style, placement, name } = this.state;
    const { history } = this.props;

    return (
      <Mutation
        mutation={CREATE_COMPONENT}
      >
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
                onClick={() => this.setState({ placement: 'unassigned' })}
                style={{ backgroundColor: placement === 'unassigned' && 'rgba(0, 0, 0, 0.3)' }}
              >
                UNASSIGNED
              </div>
              <div
                onClick={() => this.setState({ placement: 'child' })}
                style={{ backgroundColor: placement === 'child' && 'rgba(0, 0, 0, 0.3)' }}
              >
                CHILD 
              </div>
              <div
                style={{ backgroundColor: placement === 'root' && 'rgba(0, 0, 0, 0.3)' }}
              >
                ROOT
              </div>
              
            </label>
            <button
              className="dashboard-button"
              onClick={() => this.saveComponent(CreateComponent)}
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
    )
  }
}
