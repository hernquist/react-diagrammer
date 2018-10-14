import React, { Component, Fragment } from "react";
import ProjectList from "./Features/ProjectList";
import CreateOptions from "./Features/CreateOptions";
import DeleteOptions from "./Features/DeleteOptions";
import { SmallFlatButton as FlatButton } from "../UI/FlatButton";
import {
  TopDashboardContainer as Container,
  CurrentProjectTitle as Title,
  ButtonsContainer
} from "styles";

class LeftDashboard extends Component {
  initialState = {
    changeProject: false,
    createOptions: false,
    deleteOptions: false
  };

  state = this.initialState;

  componentDidMount() {
    this.props.needsSetting &&
      this.props.setCurrentProject(this.props.currentProject);
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

  render() {
    const { layout, projects, currentProject, setCurrentProject } = this.props;
    const content = {
      "full-screen": "SHOW DASHBOARD",
      "logged-in": "HIDE DASHBOARD"
    };
    const classNames = {
      "full-screen": "dashboard-button showable",
      "logged-in": "dashboard-button hideable"
    };
    const { changeProject, createOptions, deleteOptions } = this.state;
    const project =
      currentProject.name.length > 12
        ? `${currentProject.name}`
        : `PROJECT ${currentProject.name}`;

    return (
      <Fragment>
        <Container>
          <Title>{project}</Title>
          <ButtonsContainer>
            <FlatButton
              onClick={
                changeProject
                  ? this.deactivateSelector
                  : () => this.activateSelector("changeProject")
              }
            >
              SWITCH PROJECT
            </FlatButton>
            <FlatButton
              onClick={
                createOptions
                  ? this.deactivateSelector
                  : () => this.activateSelector("createOptions")
              }
            >
              {" "}
              CREATE
            </FlatButton>
            <FlatButton
              className="dashboard-button selector"
              onClick={
                deleteOptions
                  ? this.deactivateSelector
                  : () => this.activateSelector("deleteOptions")
              }
            >
              DELETE
            </FlatButton>
            <FlatButton
              className={classNames[layout]}
              onClick={this.handleSwitch}
            >
              {content[layout]}
            </FlatButton>
          </ButtonsContainer>
        </Container>
        {changeProject && (
          <ProjectList
            deactivateSelector={this.deactivateSelector}
            projects={projects}
            setCurrentProject={setCurrentProject}
          />
        )}
        {createOptions && (
          <CreateOptions deactivateSelector={this.deactivateSelector} />
        )}
        {deleteOptions && (
          <DeleteOptions deactivateSelector={this.deactivateSelector} />
        )}
      </Fragment>
    );
  }
}

export default LeftDashboard;
