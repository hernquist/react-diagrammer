import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { DELETE_PROJECT } from "../../../graphql/mutations";
import {
  CreateProjectContainer as Container,
  FormTitle as Title,
  Buttons,
  Message
} from "styles";
import { RightDashboardButton as Button } from "../../UserInterface/RightDashboardButton";
import Errors from "components/UserInterface/Errors";

class DeleteProject extends Component {
  state = { errors: [] };

  removeProject = mutation => async () => {
    const { currentProject, history, refetchProject } = this.props;
    const { _id } = currentProject;
    const { data } = await mutation({ variables: { _id } });

    data.deleteProject
      ? await refetchProject()
      : console.error("Delete project not working!");

    await history.push("/");
  };

  navigateToMain = () => this.props.history.push("/main");

  render() {
    const { errors } = this.state;

    return (
      <Mutation mutation={DELETE_PROJECT}>
        {DeleteProject => (
          <Container>
            <Title>Delete Project</Title>
            <Message>
              Are you sure you want to erase this project and all its related
              components?
            </Message>
            <Errors errors={errors} from="DeleteProject" />
            <Buttons>
              <Button onClick={this.removeProject(DeleteProject)} text="Yes" />
              <Button text="No" onClick={this.navigateToMain} />
            </Buttons>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default DeleteProject;
