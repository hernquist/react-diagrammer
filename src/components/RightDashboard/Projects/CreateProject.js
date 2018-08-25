import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_PROJECT } from '../../../graphql/mutations';
import '../../../styles/CreateProject.css';


class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      name: "",
      description: ""
    };
  }

  onSubmit = async (event, CreateProject) => {
    event.preventDefault();
    const userId = this.props.user._id;
    const { name, description } = this.state;
    const { data } = await CreateProject({ variables: { name, description, userId } });
    this.props.setCurrentProject(data.createProject);
    this.props.history.push('/main/component/index/0');
  };
  
  render() {
    const { name, description, errors } = this.state;
    return (
      <div>
        <Mutation mutation={CREATE_PROJECT}>
          {CreateProject => (
            <div className="create-project-container">
              <div className="form-title">
                Create Project
              </div>
              <form 
                className="create-project-form" 
                onSubmit={e=>this.onSubmit(e, CreateProject)}>
                <div className="input-field">
                  <div>Name</div>
                  <input 
                    className="input"
                    value={name} 
                    onChange={e => this.setState({ name: e.target.value})} 
                  />
                </div>
                <div className="input-field">
                  <label>Description</label>
                  <textarea value={description} onChange={e => this.setState({
                    description: e.target.value
                  })} />
                </div>

                <div className="errors">
                  {errors.map(error => <div key={error}>SIGNUP: {error}</div>)}
                </div>
                <button className="button">Submit</button>
              </form>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateProject;