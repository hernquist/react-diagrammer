import React, { Component } from 'react';
import DisplayFields from './StateAndProps/DisplayFields';
import EditField from './StateAndProps/EditField';
import AddField from './StateAndProps/AddField';
import NoStateAllowed from './StateAndProps/NoStateAllowed';

class UpdateComponentWorkings extends Component {
  initialState = {
    value1: "",
    value2: "string",
    showAddField: false,
    highlighted: null,
    onHover: true
  }

  state = this.initialState;

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  displayAddField = () => this.setState({ showAddField: true });

  discardField = () => this.setState({ ...this.initialState});
  
  editField = field => {
    if (this.state.onHover) this.setState({ highlighted: field });
  };

  exitComponent = () => {
    const match = this.props.match.url.split("/").slice(0, 5).join("/");
    this.props.history.push(match);
  }

  resetHighlight = () => {
    if (this.state.onHover) this.setState({ highlighted: null});
  };

  setHighlight = () => this.setState({ onHover: false});

  render() {
    const { 
      showAddField, 
      value1,
      value2, 
      highlighted,
      onHover
    } = this.state;
    const { 
      currentProject, 
      history, 
      updateComponent, 
      type
    } = this.props;
    const { components } = currentProject;
    if (!components) return <div>No Components</div>

    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];    
    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0];


    if (currentComponent.style === 'presentational' && type === "state") return (
      <NoStateAllowed exit={this.exitComponent}/>
    )

    return (
      <div>
        <DisplayFields 
          currentComponent={currentComponent}
          updateComponent={updateComponent}
          editField={this.editField}
          resetHighlight={this.resetHighlight}
          setHighlight={this.setHighlight}
          type={type}
        />
        {showAddField ? 
          <AddField 
            type={type}
            currentComponent={currentComponent}
            updateComponent={updateComponent}
            handleChange={this.handleChange}
            discardField={this.discardField}
            value1={value1}
            value2={value2}
          /> : 
          <button 
            className="dashboard-button"
            onClick={this.displayAddField}
          >
            ADD A NEW {type}
          </button>
        }
        {highlighted && (
          <EditField
            field={highlighted} 
            edit={!onHover} 
            reset={this.discardField}
            currentComponent={currentComponent}
            updateComponent={updateComponent}
            type={type}
          />
        )} 
        <button
          className="dashboard-button"
          onClick={this.exitComponent}
        >
          DONE
        </button>

      </div>
    );
  }
}

export default UpdateComponentWorkings;