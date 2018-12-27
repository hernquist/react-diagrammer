import React, { Fragment } from 'react'
import styled from 'styled-components';
import { ShowComponentField as Field } from 'styles';

const IndentedField = styled(Field)`
  padding-left: 20px;
`;

const TwiceIndentedField = styled(Field)`
  padding-left: 35px;
`;

const getStyles = ({highlighted, order}) => ({
  order, 
  background: highlighted ? 'lightblue': 'lightgrey',
  border: highlighted ? '1px solid teal' : '1px solid darkgrey',
  padding: '5px 5px 0 5px',
  fontSize: highlighted ? '17px' : '16px'
})

export const ShowState = props => 
  <div style={getStyles(props)}>
    state = {`{`}
    {props.state.map(obj => <Field key={obj.name + obj.statetype}>{obj.name}: <i>{obj.statetype}</i></Field>)}
    {`}`}
  </div>

export const ShowProps = props => 
  <div style={getStyles(props)}>
    props = {`{`}
    {props.props.map(obj => <Field key={obj.name +obj.proptype}>{obj.name}: <i>{obj.proptype}</i></Field>)}
    {`}`}
  </div>

const NoFunctionArgs = () => <TwiceIndentedField>This callback has no function arguments</TwiceIndentedField>

const FunctionArgsList = ({ args }) => args.map(arg => 
  <TwiceIndentedField key={arg.name + arg.typeName}>{arg.name}: <em>{arg.typeName}</em></TwiceIndentedField>
)

const NoStateChanges = () => <TwiceIndentedField>This callback does not use this.setState()</TwiceIndentedField>

const SetStateList = ({ stateChanges }) => stateChanges.map(state => 
  <TwiceIndentedField key={state.stateField}>{state.stateField} -- {state.stateChange}</TwiceIndentedField>
)

const Callback = ({ obj }) => 
  <Fragment>
    <Field><b>&#8226; {obj.name}</b></Field>
    <IndentedField>{obj.description ? obj.description : `no description`} </IndentedField>
    <IndentedField>(function arguments)</IndentedField>
    {obj.functionArgs.length === 0 ? <NoFunctionArgs /> : <FunctionArgsList args={obj.functionArgs} />}
    <IndentedField>(state changes)</IndentedField>
    {obj.setState.length === 0 ? <NoStateChanges /> : <SetStateList stateChanges={obj.setState} />}
  </Fragment>

export const ShowCallbacks = props => {
  const length = props.callbacks.length;

  return (
    <div style={getStyles(props)}>
      {length} callback{length !== 1 && `s`}
      {props.callbacks.map(obj => <Callback obj={obj} key={obj.name + obj.statetype}/>)}
    </div>
  )
}
