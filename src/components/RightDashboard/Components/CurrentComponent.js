import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { TOGGLE_COMPONENT_STYLE } from '../../../graphql/mutations';
import helper from '../../../helpers/helper';
import ModalContainer from '../../UI/ModalContainer';
import ComponentHeader from './ComponentHeader';
import EditComponentName from './EditComponentName';             
import { RightDashboardContainer as Container } from 'styles';
import { WideButton } from '../../UI/SubmitButton';
import ShowComponent from './ShowComponent';

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
    const { currentProject, history, match } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    if (!components) return <div>No Components</div>;

    const currentComponent = helper.getComponentFromURL(pathname, components);

    if (!currentComponent) return null;

    const isPresentational = currentComponent.style === "presentational";
    const isUnassigned = currentComponent.placement === "unassigned";
    const isRoot = currentComponent.placement === "root";
    const buttonText = `${isUnassigned ? `ASSIGN` : `UNASSIGN`} COMPONENT`;
    const toggleText = `MAKE ${ isPresentational ? `CONTAINER` : `PRESENTATIONAL`}`;

    return (
      <Container>
        <ComponentHeader currentComponent={currentComponent} />
        <Button
          disabled={isPresentational}
          onClick={() => history.push(match.url + "/update-state")}
        >
          UPDATE STATE
        </Button>
        <Button
          onClick={() => history.push(match.url + "/update-props")}
        >
          UPDATE INCOMING PROPS
        </Button>
        <Button
          disabled={isPresentational}
          onClick={() => history.push(match.url + "/update-callbacks")}
        >
          UPDATE CALLBACKS
        </Button>
        <Mutation mutation={TOGGLE_COMPONENT_STYLE}>
          {ToggleComponentStyle => (
            <Button onClick={() => this.updateStyle(currentComponent, ToggleComponentStyle)}>
              {toggleText}
            </Button>
          )}
        </Mutation>
        <ModalContainer text={"EDIT NAME"} button={Button}>
          <EditComponentName {...this.props} />
        </ModalContainer>
        <Button
          disabled={isRoot}
          onClick={() => history.push(match.url + `/${isUnassigned ? `` : `un`}assign-component`)}
        >
          {buttonText}
        </Button>
        <ModalContainer text={"COMPONENT DETAILS"} button={Button} large>
          <ShowComponent {...this.props} />
        </ModalContainer>
      </Container>
    );
  }
}

export default CurrentComponent;
