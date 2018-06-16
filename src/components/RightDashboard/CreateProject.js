import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { CREATE_PROJECT } from '../../graphql/mutations';
import { GET_AUTH_USER } from '../../graphql/queries';


class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      name: "",
      description: ""
    };
  }

  onSubmit = async (event, CreateProject, user) => {
    event.preventDefault();
    const userId = user._id;
    const { name, description } = this.state;
    await CreateProject({ variables: { name, description, userId } });
  };
  
  render() {
    const { name, description, errors } = this.state;
    return (
      <div>
        <Query query={GET_AUTH_USER} fetchPolicy='cache'>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`
            const user = data.getAuthUser;

            return <div>
              <h3>CreateProject</h3>
              <Mutation mutation={CREATE_PROJECT}>
                {CreateProject => <form onSubmit={e=>this.onSubmit(e, CreateProject, user)}>
                  <div className="input-field">
                    <label>Project Name</label>
                    <input value={name} onChange={e => this.setState({
                      name: e.target.value
                    })} />
                  </div>
                  <div className="input-field">
                    <label>Description</label>
                    <input value={description} onChange={e => this.setState({
                      description: e.target.value
                    })} />
                  </div>

                  <div className="errors">
                    {errors.map(error => <div key={error}>SIGNUP: {error}</div>)}
                  </div>
                  <button variant="raised">Submit</button>
                </form>}
              </Mutation>
            </div>
          }}
        </Query>
      </div>
    );
  }
}

export default CreateProject;