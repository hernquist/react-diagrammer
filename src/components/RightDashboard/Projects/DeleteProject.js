import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { DELETE_PROJECT } from '../../../graphql/mutations';
import {
  CreateProjectContainer as Container,
  FormTitle as Title,
  Buttons,
  Message
} from 'styles';
import { SubmitButton } from 'components/UI/SubmitButton';
import Errors from 'components/UI/Errors';

class DeleteProject extends Component {
  state = { errors: [] };

  removeProject = mutation => async () => {
    const { currentProject, history, refetchProject } = this.props;
    const { _id } = currentProject;
    const { data } = await mutation({ variables: { _id } });
    if (data.deleteProject) {
      console.log('Delete project working!');
      await refetchProject();
    } else {
      console.log('Delete project not working!');
    }
    await history.push('/');
  };

  render() {
    const { errors } = this.state;
    return (
      <Mutation mutation={DELETE_PROJECT}>
        {DeleteProject => (
          <Container>
            <Title>Delete Project</Title>
            <Message>
              Are you sure you want to erase this projects and all its related
              components?
            </Message>
            <Errors errors={errors} from='DeleteProject' />
            <Buttons>
              <SubmitButton
                onClick={this.removeProject(DeleteProject)}
                > Yes
              </SubmitButton>
              <Link to='/main'>
                <SubmitButton>No</SubmitButton>
              </Link>
            </Buttons>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default DeleteProject;
