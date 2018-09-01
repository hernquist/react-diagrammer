import gql from "graphql-tag";

const SIGNUP = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password)
  }
`;

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateProject($userId: String!, $name: String!, $description: String!){
    createProject(userId: $userId, name: $name, description: $description) {
      _id
      userId
      name
      description
      dateCreated
      dateVisited
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($_id: String!) {
    deleteProject(_id: $_id)
  }
`;

const CREATE_COMPONENT = gql`
  mutation CreateComponent ($name: String!, $projectId: String!, $style: ComponentType!, $placement: Placement!) {
    createComponent(name: $name, projectId: $projectId, style: $style, placement: $placement) {
      _id
      projectId
      cloneId
      name
      iteration
      style
      placement
      children
      state {
        _id
        componentId
        name
        statetype
      }
      props {
        _id
        componentId
        name
        proptype
      }
      callbacks {
        _id
        componentId
        name
        functionArgs {
          name
          typeName
        }
        setState {
          stateField
          stateChange
        }
        description
      }
    }
  }
`;

const COPY_COMPONENT = gql`
  mutation CopyComponent($name: String!, $projectId: String!, $iteration: Int!, $style: ComponentType!, $placement: Placement!, $children: [String], $state: [InputState], $props: [InputProp], $callbacks: [InputCallback]) {
    copyComponent(name: $name, projectId: $projectId, iteration: $iteration, style: $style, placement: $placement, children: $children, state: $state, props: $props, callbacks: $callbacks) {
      _id
      name
      projectId
      iteration
      style
      placement
      children
      state {
        _id
        statetype
        name
        componentId
      }
      props {
        _id
        name
        proptype
        componentId
      }
      callbacks {
        _id
        name
        functionArgs {
          name
          typeName
        }
        setState {
          stateField
          stateChange
        }
        description
      }
    }
  }
`;

const TOGGLE_COMPONENT_STYLE = gql`
  mutation ToggleComponentStyle($_id: String!) {
    toggleComponentStyle(_id: $_id) {
      _id
      name
      projectId
      style
      state {
        _id
        name
        statetype
        componentId
      }
      iteration
      placement
      props {
        _id
        name
        proptype
        componentId
      }
      callbacks {
        _id
        name
        functionArgs {
          name
          typeName
        }
        setState {
          stateField
          stateChange
        }
        description
      }
      children
    }
  }
`;

const ADD_CHILD = gql`
  mutation AddChild($_id: String!, $childId: String!) {
    addChild(_id: $_id, childId: $childId) 
  }
`;

const EDIT_COMPONENT_NAME = gql`
  mutation EditComponentName($_id: String!, $name: String!) {
    editComponentName(_id: $_id, name: $name) {
      _id
      name
      projectId
      style
      state {
        _id
        name
        statetype
        componentId
      }
      iteration
      placement
      props {
        _id
        name
        proptype
        componentId
      }
      callbacks {
        _id
        name
        functionArgs {
          name
          typeName
        }
        setState {
          stateField
          stateChange
        }
        description
      }
      children
    }
  }
`;

const ADD_PROP = gql`
  mutation AddProp($prop: InputProp) {
    addProp(prop: $prop) {
      _id
      props {
        _id
        name
        proptype
      }
    }
  }
`;

const DELETE_PROP = gql`
  mutation DeleteProp($_id: String!) {
    deleteProp(_id: $_id)
  }
`;

const EDIT_PROP = gql`
  mutation EditProp($_id: String, $name: String, $proptype: PropType) {
    editProp(_id: $_id, name: $name, proptype: $proptype) {
      _id
      name
      proptype
      componentId
    }
  }
`;

const ADD_STATE = gql`
  mutation AddState($state: InputState) {
    addState(state: $state) {
      _id
      state {
        _id
        componentId
        name
        statetype
      }
    }
  }
`;

const DELETE_STATE = gql`
  mutation DeleteState($_id: String!) {
    deleteState(_id: $_id)
  }
`;

const EDIT_STATE = gql`
  mutation EditState($_id: String, $name: String, $statetype: StateType) {
    editState(_id: $_id, name: $name, statetype: $statetype) {
      _id
      name
      statetype
      componentId
    }
  }
`;

const ADD_CALLBACK = gql`
  mutation AddCallback($callback: InputCallback) {
    addCallback (callback: $callback) {
      _id
      componentId
      name
      setState {
        stateField
        stateChange
      }
      functionArgs {
        name
        typeName
      }
      description
    }
  }
`;

const DELETE_CALLBACK = gql`
  mutation DeleteCallback ($_id: String!) {
    deleteCallback(_id: $_id)
  }
`;

const EDIT_CALLBACK = gql`
  mutation EditCallback(
    $_id: String!,
    $name: String,
    $functionArgs: [InputArgument], 
    $setState: [InputSetStateParams],
    $description: String
  ) {
    editCallback(
      _id: $_id,
      name: $name,
      functionArgs: $functionArgs,
      setState: $setState,
      description: $description
    ) {
      _id
      name
      description
      setState{
        stateField
        stateChange
      }
      functionArgs {
        name
        typeName
      }
    }
  }
`;

export { 
  SIGNUP, 
  LOGIN, 
  CREATE_PROJECT,
  DELETE_PROJECT,
  CREATE_COMPONENT,
  COPY_COMPONENT,
  TOGGLE_COMPONENT_STYLE,
  ADD_CHILD,
  EDIT_COMPONENT_NAME,
  ADD_PROP,
  DELETE_PROP,
  EDIT_PROP,
  ADD_STATE,
  DELETE_STATE,
  EDIT_STATE,
  ADD_CALLBACK,
  DELETE_CALLBACK,
  EDIT_CALLBACK
};
