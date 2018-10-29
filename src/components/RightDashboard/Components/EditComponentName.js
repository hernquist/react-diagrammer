import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_COMPONENT_NAME } from '../../../graphql/mutations';
import { SubmitButton } from 'components/UI/SubmitButton';
import { 
  InputField,
  Buttons,
  ShowUnassignedText as Text
 } from 'styles';

class EditComponentName extends Component {
  state = { name: '' };

  handleInput = e => this.setState({ name: e.target.value });

  updateName = async ({ _id }, mutation) => {
    const { data } = await mutation({
      variables: { _id, name: this.state.name }
    });
    const parts = this.props.history.location.pathname.split('/').slice(0, 5);
    parts[3] = data.editComponentName.name;
    this.props.updateComponent(data.editComponentName);
    this.props.history.push(parts.join('/'));
  };

  validation = (component, mutation) => {
    const { name } = this.state;
    (/^[a-zA-Z]+$/.test(name)) ? 
      this.updateName(component, mutation)
      : this.props.createNotification('warning', 'invalidName', 'componentName')()
  }

  leave = () =>
    this.props.history.push(
      this.props.history.location.pathname
        .split('/')
        .slice(0, 5)
        .join('/')
    );

  render() {
    const { currentProject, history } = this.props;
    const pieces = history.location.pathname.split('/');
    const name = pieces[3];
    const index = pieces[4];
    const { components } = currentProject;
    if (!components) {
      return <div>No Components</div>;
    }

    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0];

    console.log(currentComponent);

    return (
      <Mutation mutation={EDIT_COMPONENT_NAME}>
        {EditComponentName => (
          <Fragment>
            <InputField>
              <label>Edit name</label>
              <input onChange={this.handleInput} value={this.state.name} />
            </InputField>
            <Text>
              Do you want to update this component's name? 
            </Text>
            <Buttons>
              <SubmitButton
                onClick={() => {
                  this.validation(currentComponent, EditComponentName)
                  // this.updateName(currentComponent, EditComponentName);
                }}
              >
                YES
              </SubmitButton>
              <SubmitButton onClick={this.leave}>NO</SubmitButton>
            </Buttons>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default EditComponentName;
