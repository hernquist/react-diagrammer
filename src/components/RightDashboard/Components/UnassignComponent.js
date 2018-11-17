import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { UNASSIGN_COMPONENT } from 'graphql/mutations';
import helper from 'helpers/helper';
import { SubmitButton } from '../../UI/SubmitButton';
import ModalContainer from '../../UI/ModalContainer';
import { 
  UnassignedPrompt as Prompt, 
  Buttons, 
  Message,
  RightDashboardTitle as Title,
} from 'styles';

const Warning = ({name}) => {
  return (
    <Prompt>
      Removing components with children breaks a react tree. Please remove
      all children components to unassign {name.toUpperCase()}.
    </Prompt>
  )
}

export default class UnassignComponent extends Component {
  updateComponents = (mutation, component) => async () => {
    const { refetchProject, currentProject, history } = this.props;
    const { _id } = component;
    const { components } = currentProject;
    const parent = components.filter(component =>
      component.children.some(id => id === _id)
    );

    await mutation({ variables: { _id, parentId: parent[0]._id } });
    await refetchProject();
    await history.push('/');
  };

  handleCancel = () => {
    const { history } = this.props;
    const { pathname } = history.location;
    const url = helper.trimURL(pathname, 4);
    history.push(url);
  }

  render() {
    const { history, currentProject } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    const component = helper.getComponentFromURL(pathname, components);
    const { name = '' } = component;
    const hasChildren = component.children.length > 0

    return (
      <Mutation mutation={UNASSIGN_COMPONENT}>
        {UnassignComponent => (
          <Fragment>
            <Title>Unassign Component</Title>
            <Message style={{margin: '20px 10px 10px'}}>
              Are you sure you want to remove {name.toUpperCase()} from the
              react tree?
            </Message>
            <Buttons>
              {hasChildren ?
                <ModalContainer button={SubmitButton} text="YES">
                  <Warning name={name} {...this.props} />
                </ModalContainer>
                : 
                <SubmitButton
                  onClick={this.updateComponents(UnassignComponent, component)}
                > 
                  YES
                </SubmitButton>
              }
              <SubmitButton onClick={this.handleCancel}>No</SubmitButton>
            </Buttons>
          </Fragment>
        )}
      </Mutation>
    );
  }
}
