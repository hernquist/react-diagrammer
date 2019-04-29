import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_PROJECT } from '../../../graphql/mutations';
import {
  CreateProjectContainer as Container,
  CreateProjectForm as Form,
  FormTitle as Title,
  InputField,
  LabelText,
  Textarea
} from 'styles';
// import { SubmitButton } from '../../UI/SubmitButton';
import { RightDashboardButton as Button } from '../../UI/RightDashboardButton';
import Errors from '../../UI/Errors';

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      name: '',
      description: ''
    };
  }

  onSubmit = async (event, CreateProject) => {
    event.preventDefault();

    const userId = this.props.user._id;
    const { name, description } = this.state;
    const { data } = await CreateProject({
      variables: { name, description, userId }
    });
    this.props.setCurrentProject(data.createProject)();

    this.props.history.push('/main/component/new');
  };

  render() {
    const { name, description, errors } = this.state;
    return (
      <div>
        <Mutation mutation={CREATE_PROJECT}>
          {CreateProject => (
            <Container>
              <Title>Create Project</Title>
              <Form onSubmit={e => this.onSubmit(e, CreateProject)}>
                <InputField>
                  <LabelText>Name</LabelText>
                  <input
                    className='input'
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </InputField>
                <InputField>
                  <label>Description</label>
                  <Textarea
                    value={description}
                    rows={3}
                    placeholder='Add an optional description...'
                    onChange={e =>
                      this.setState({
                        description: e.target.value
                      })
                    }
                  />
                </InputField>
                <Errors errors={errors} from='CreateProject' />
                <Button text="Submit" /> 
              </Form>
            </Container>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateProject;
