import React, { Component, Fragment } from 'react';
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
  state = {
    highlighted: '', 
    errors: [] 
  };

  removeComponent = async mutation => {
    const { currentProject, updateComponent, history} = this.props;
    const _id = this.state.highlighted;
    const { components } = currentProject;
    console.log( _id)
    console.log(components);
    let parent = components.filter(component =>
      component.children.some(id => id === _id)
    );

    console.log(parent);
    const { data } = await mutation({ 
      variables: { _id, parentId: parent[0]._id }})
      
    console.log('remove component', data);
    
    if (data.deleteComponent) {
      const children = parent.children(id => id !== _id)
      const updatedComponent = Object.assign({}, parent, { children })
      updateComponent(updatedComponent);
      // make deleteComponent or have some route which will reset the tree get the project from mongo
      // deleteComponent(currentProject, _id); 
    }
  }

  updateHighlight = highlighted => () => this.setState({ highlighted }) 


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
    const { errors, highlighted } = this.state;
    const { currentProject } = this.props;
    const { components } = currentProject;

    return (
      <Mutation mutation={DELETE_COMPONENT}>
        {DeleteComponent => (
          <Container>
            <Title>Delete Component</Title>
            <Message>
              Select a component to delete 
            </Message>
            <Errors >
              {errors.map(error => (
                <div key={error}>SIGNUP: {error}</div>
              ))}
            </Errors>
            {components.map(component => (
              <div 
                key={component._id}
                onClick={this.updateHighlight(component._id)}
              >
                {component.name}
              </div>
            ))}
            
            {highlighted && (
              <Fragment>
                <Message>
                  Do you want to delete the selected 
                </Message>
                <Buttons>
                  <SubmitButton
                    onClick={() => this.removeComponent(DeleteComponent)}
                    > Yes
                  </SubmitButton>
                  <Link to='/main'>
                    <SubmitButton>No</SubmitButton>
                  </Link>
                </Buttons>
              </Fragment>
            )}
          </Container>
        )}
      </Mutation>
    );
  }
}

export default DeleteComponent;
