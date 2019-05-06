import React, { Component, Fragment } from "react";
import ProjectList from "./Features/ProjectList";
import CreateOptions from "./Features/CreateOptions";
import DeleteOptions from "./Features/DeleteOptions";
import { SmallFlatButton as FlatButton } from "../UserInterface/FlatButton";
import { Menu } from "../UserInterface/Menu";
import {
  TopDashboardContainer as Container,
  CurrentProjectTitle as Title,
  ButtonsContainer
} from "styles";

class TopDashboard extends Component {
  initialState = {
    changeProject: false,
    createOptions: false,
    deleteOptions: false
  };

  state = this.initialState;

  componentDidMount() {
    this.props.needsSetting &&
      this.props.setCurrentProject(this.props.currentProject)();
  }

  handleSwitch = () => {
    this.setState({ ...this.initialState });
    this.props.layout === "full-screen"
      ? this.props.switchLayout("logged-in")
      : this.props.switchLayout("full-screen");
  };

  activateSelector = async key => {
    this.setState({
      ...this.initialState,
      [key]: true
    });
    await this.props.refetch();
  };

  deactivateSelector = () => this.setState({ ...this.initialState });

  handleClick = selector =>
    this.state[selector]
      ? this.deactivateSelector
      : () => this.activateSelector(selector);

  render() {
    const { projects, currentProject, setCurrentProject } = this.props;
    const { changeProject, createOptions, deleteOptions } = this.state;
    const project =
      currentProject.name.length > 16
        ? `${currentProject.name}`
        : `PROJECT ${currentProject.name}`;

    return (
      <Fragment>
        <Container>
          <Title>{project}</Title>
          <ButtonsContainer>
            <FlatButton onClick={this.handleClick("changeProject")}>
              SWITCH PROJECT
            </FlatButton>
            <FlatButton
              onClick={this.handleClick("createOptions")}
              style={{ width: 78 }}
            >
              CREATE
            </FlatButton>
            <FlatButton
              onClick={this.handleClick("deleteOptions")}
              style={{ width: 78 }}
            >
              DELETE
            </FlatButton>
            <Menu handleClick={this.handleSwitch} />
          </ButtonsContainer>
        </Container>
        <ProjectList
          visible={changeProject}
          deactivateSelector={this.deactivateSelector}
          projects={projects}
          setCurrentProject={setCurrentProject}
        />
        <CreateOptions
          visible={createOptions}
          deactivateSelector={this.deactivateSelector}
        />
        <DeleteOptions
          visible={deleteOptions}
          deactivateSelector={this.deactivateSelector}
        />
      </Fragment>
    );
  }
}

export default TopDashboard;
