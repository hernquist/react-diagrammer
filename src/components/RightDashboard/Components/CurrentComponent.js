import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { TOGGLE_COMPONENT_STYLE } from '../../../graphql/mutations';
import helper from '../../../helpers/helper';
import ModalContainer from '../../UI/ModalContainer';
import ComponentHeader from './ComponentHeader';
import EditComponentName from './EditComponentName';             
import UnassignComponent from './UnassignComponent';
import { RightDashboardContainer as Container } from 'styles';
import { WideButton } from '../../UI/SubmitButton';

const Button = styled(WideButton)`
  width: 90%;
  margin: 3% 5% 2% 5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class CurrentComponent extends Component {
  updateStyle = async ({ _id }, mutation) => {
    const { data } = await mutation({ variables: { _id } });
    this.props.updateComponent(data.toggleComponentStyle);
  };

  render() {
    const { currentProject, history } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    if (!components) return <div>No Components</div>;

    const currentComponent = helper.getComponentFromURL(pathname, components);

    if (!currentComponent) {
      return null
    }

    const isPresentational = currentComponent.style === "presentational";
    const isUnassigned = currentComponent.placement === "unassigned";
    // later will add some functionality for unassigning a root, although oof
    const isRoot = currentComponent.placement === "root";
    const buttonText = `${isUnassigned ? `ASSIGN` : `UNASSIGN`} COMPONENT`;
    // const Assignment = isUnassigned ? AssignComponent : UnassignComponent;
    const toggleText = `MAKE ${
      isPresentational ? `CONTAINER` : `PRESENTATIONAL`
    }`;

    return (
      <Container>
        <ComponentHeader currentComponent={currentComponent} />
        <Button
          disabled={isPresentational}
          onClick={() =>
            this.props.history.push(this.props.match.url + "/update-state")
          }
        >
          UPDATE STATE
        </Button>
        <Button
          onClick={() =>
            this.props.history.push(this.props.match.url + "/update-props")
          }
        >
          UPDATE INCOMING PROPS
        </Button>
        <Button
          disabled={isPresentational}
          onClick={() =>
            this.props.history.push(this.props.match.url + "/update-callbacks")
          }
        >
          UPDATE CALLBACKS
        </Button>
        <Mutation mutation={TOGGLE_COMPONENT_STYLE}>
          {ToggleComponentStyle => (
            <Button
              onClick={() =>
                this.updateStyle(currentComponent, ToggleComponentStyle)
              }
            >
              {toggleText}
            </Button>
          )}
        </Mutation>
        <ModalContainer text={"EDIT NAME"} button={Button}>
          <EditComponentName
            currentProject={currentProject}
            {...this.props}            
          />
        </ModalContainer>
        {isUnassigned ? (
          <Button
            disabled={isRoot}
            onClick={() =>
              this.props.history.push(
                this.props.match.url +
                  `/${isUnassigned ? `` : `un`}assign-component`
              )
            }
          >
            {buttonText}
          </Button>
        ) : 
          <ModalContainer text={buttonText} button={Button} disabled={isRoot}>
            <UnassignComponent
              currentProject={currentProject}
              {...this.props}
            />
          </ModalContainer>
        }
      </Container>
    );
  }
}

export default CurrentComponent;
