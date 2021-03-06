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
  mutation CreateProject(
    $userId: String!
    $name: String!
    $description: String!
  ) {
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
  mutation CreateComponent(
    $name: String!
    $projectId: String!
    $style: ComponentType!
    $placement: Placement!
  ) {
    createComponent(
      name: $name
      projectId: $projectId
      style: $style
      placement: $placement
    ) {
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
  mutation CopyComponent(
    $name: String!
    $projectId: String!
    $cloneId: String!
    $iteration: Int!
    $style: ComponentType!
    $placement: Placement!
    $children: [String]
  ) {
    copyComponent(
      name: $name
      projectId: $projectId
      cloneId: $cloneId
      style: $style
      iteration: $iteration
      placement: $placement
      children: $children
    ) {
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
      cloneId
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

const COPY_CHILDREN = gql`
  mutation CopyChildren($childrenData: [InputChildrenData]) {
    copyChildren(childrenData: $childrenData) {
      _id
      cloneId
      projectId
      iteration
      name
      placement
      style
      state {
        statetype
        name
      }
      props {
        name
        proptype
      }
      callbacks {
        name
        description
        functionArgs {
          name
          typeName
        }
        setState {
          stateField
          stateChange
        }
      }
    }
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

const DELETE_COMPONENT = gql`
  mutation DeleteComponent($_id: String!, $parentId: String!) {
    deleteComponent(_id: $_id, parentId: $parentId) 
  }
`;

const DELETE_UNASSIGNED_COMPONENT = gql`
  mutation DeleteUnassignedComponent($_id: String!) {
    deleteUnassignedComponent(_id: $_id)
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
    addCallback(callback: $callback) {
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
  mutation DeleteCallback($_id: String!) {
    deleteCallback(_id: $_id)
  }
`;

const EDIT_CALLBACK = gql`
  mutation EditCallback(
    $_id: String!
    $name: String
    $description: String
    $functionArgs: [InputArgument]
    $setState: [InputSetStateParams]
  ) {
    editCallback(
      _id: $_id
      name: $name
      description: $description
      functionArgs: $functionArgs
      setState: $setState
    ) {
      _id
      componentId
      name
      description
      setState {
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

const UNASSIGN_COMPONENT = gql`
  mutation UnassignComponent($_id: String!, $parentId: String!) {
    unassignComponent(_id: $_id, parentId: $parentId) {
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

const ASSIGN_COMPONENT = gql`
  mutation AssignComponent($_id: String!, $parentId: String!) {
    assignComponent(_id: $_id, parentId: $parentId) {
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

export {
  ADD_CALLBACK,
  ADD_CHILD,
  ADD_PROP,
  ADD_STATE,
  ASSIGN_COMPONENT,
  COPY_CHILDREN,
  COPY_COMPONENT,
  CREATE_COMPONENT,
  CREATE_PROJECT,
  DELETE_CALLBACK,
  DELETE_COMPONENT,
  DELETE_PROJECT,
  DELETE_PROP,
  DELETE_STATE,
  DELETE_UNASSIGNED_COMPONENT,
  EDIT_CALLBACK,
  EDIT_COMPONENT_NAME,
  EDIT_PROP,
  EDIT_STATE,
  LOGIN,
  SIGNUP,
  TOGGLE_COMPONENT_STYLE,
  UNASSIGN_COMPONENT,
};
