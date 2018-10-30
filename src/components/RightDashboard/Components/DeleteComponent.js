import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  CreateProjectContainer as Container,
  FormTitle as Title,
  Buttons,
  Message,
  Errors
} from '../../../styles';
import { SubmitButton } from 'components/UI/SubmitButton';
import { DELETE_COMPONENT } from '../../../graphql/mutations';

class DeleteComponent extends Component {
  state = { errors: [] };

  removeComponent = async mutation => {
    console.log('remove component', mutation);
  }

  // removeProject = async mutation => {
  //   const { currentProject, history, refetchProject } = this.props;
  //   const { _id } = currentProject;
  //   const { data } = await mutation({ variables: { _id } });
  //   if (data.deleteProject) {
  //     console.log('Delete project working!');
  //     await refetchProject();
  //   } else {
  //     console.log('Delete project not working!');
  //   }
  //   await history.push('/');
  // };

  render() {
    const { errors } = this.state;
    return (
      <Mutation mutation={DELETE_COMPONENT}>
        {DeleteComponent => (
          <Container>
            <Title>Delete Component</Title>
            <Message>
              Select a component to  
            </Message>
            <Errors >
              {errors.map(error => (
                <div key={error}>SIGNUP: {error}</div>
              ))}
            </Errors>
            <Buttons>
              <SubmitButton
                onClick={() => this.removeComponent(DeleteComponent)}
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

export default DeleteComponent;
