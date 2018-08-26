import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { DELETE_PROJECT } from '../../../graphql/mutations';
// import '../../styles/DeleteProject.css';


class DeleteProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  removeProject = async mutation => {
    const { currentProject, setCurrentProject, history, refetchProject } = this.props;
    const { _id } = currentProject;
    const { data } = await mutation({ variables: { _id } });
    if (data.deleteProject) {
      console.log("Delete project working!");
      // await setCurrentProject({});
      await refetchProject();
    } else {
      console.log("Delete project not working!");
    }
    await history.push('/');
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Mutation mutation={DELETE_PROJECT}>
          {DeleteProject => (
            <div className="delete-project-container">
              <div className="form-title">
                Delete Project
              </div>
              <div>
                Are you sure you want to erase this projects and all its related components?
              </div>
                <div className="errors">
                  {errors.map(error => <div key={error}>SIGNUP: {error}</div>)}
                </div>
                <button 
                  className="button"
                  onClick={() => this.removeProject(DeleteProject)}
                >
                  Yes
                </button>
                <Link to='/main'>
                  <button className="button">No</button>
                </Link>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default DeleteProject;