import React, { Component, Fragment } from 'react';
import { WideButton } from 'components/UI/SubmitButton';
import { 
  AccordionTitle as Title,
  AccordionText as Text 
} from 'styles';

export default class CallbackForm extends Component {
  state = { section: '' }

  showSection = section => () => this.setState({ section })

  validation = name => {
    const mapping = {
      functionArgs: ['callback arguments', 'argName', 'typeName'],
      setState: ['setState', 'stateField', 'stateChange']
    }
    const [first, second] = [this.props[mapping[name][1]].length, this.props[mapping[name][2]].length]
    const message = first === 0 || second === 0 ? 'emptyFields' : null;
    
    message ? this.props.createNotification('warning', message, message, mapping[name][0])()
      : this.props.addElement(name);
  }

  render() {
    const {
      callback, 
      create,
      currentComponent,
      mutation
    } = this.props;
    const { section } = this.state;

    const expand = isExpanded => isExpanded ? '-' : '+';
    const basics = section === 'basics';
    const args = section === 'arguments';
    const setStates = section === 'setStates';
    
    return (
      <Fragment>
        <Title onClick={this.showSection('basics')}>
          <Text>CALLBACK BASICS</Text> 
          <Text>{expand(basics)}</Text>
        </Title>
        <Basics
          visible={basics}
          {...this.props}
        />
        <Title onClick={this.showSection('arguments')}>
          <Text>CALLBACK ARGUMENTS</Text> 
          <Text>{expand(args)}</Text>
        </Title>
        <Arguments
          visible={args}
          validation={this.validation}
          {...this.props}
        />
        <Title onClick={this.showSection('setStates')}>
          <Text>CALLBACK SETSTATES</Text> 
          <Text>{expand(setStates)}</Text>
        </Title>
        <SetStates
          visible={setStates}
          validation={this.validation}
          {...this.props}
        />
        {create && 
          <WideButton onClick={() => callback(currentComponent, mutation)}>
            SAVE CALLBACK
          </WideButton>
        }
      </Fragment>
    )
  }
}
