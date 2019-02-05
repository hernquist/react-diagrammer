import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import styled from "styled-components";
import { EDIT_COMPONENT_NAME } from '../../../graphql/mutations';
import helper from 'helpers/helper';
import { RightDashboardButton } from 'components/UI/RightDashboardButton';
import { InputField, Buttons, ShowUnassignedText as Text } from 'styles';

const Button = styled(RightDashboardButton)`
  &:hover {
    box-shadow: none;
  }
`
const isFileName = /^[a-zA-Z]+$/

export default class EditComponentName extends Component {
  state = { name: '' };

  handleInput = e => this.setState({ name: e.target.value });

  updateURL = ({ name }) => {
    const parts = this.props.history.location.pathname.split('/').slice(0, 5);
    parts[3] = name;
    this.props.history.push(parts.join('/'));
  }

  handleResponse = ({ editComponentName }) => {
    this.props.updateComponent(editComponentName);
    this.updateURL(editComponentName)
  }

  updateName = async ({ _id }, mutation) => {
    const { data } = await mutation({
      variables: { _id, name: this.state.name }
    });
    this.handleResponse(data);
  };

  validation = (component, mutation) => () => 
    isFileName.test(this.state.name) ? 
      this.updateName(component, mutation)
      : this.props.createNotification('warning', 'invalidName', 'componentName')()
  
  render() {
    const { currentProject, history, closeModal } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    const currentComponent = helper.getComponentFromURL(pathname, components);
    
    if (!components) return <div>No Components</div>;

    return (
      <Mutation mutation={EDIT_COMPONENT_NAME}>
        {EditComponentName => (
          <Fragment>
            <InputField >
              <label>Edit name</label>
              <input
                autoFocus 
                onChange={this.handleInput} 
                value={this.state.name} 
              />
            </InputField>
            <Text>
              Do you want to update this component's name? 
            </Text>
            <Buttons>
              <Button
                onClick={this.validation(currentComponent, EditComponentName)}
                text={"YES"}
              />
              <Button onClick={closeModal} text={"NO"} />
            </Buttons>
          </Fragment>
        )}
      </Mutation>
    );
  }
}
