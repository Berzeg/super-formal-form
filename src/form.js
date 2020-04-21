import React from 'react';
import PropTypes from 'prop-types';

import ChainReaction from './chainReaction';
import {identity} from './misc';

class Form extends React.Component {
  getPropsForSubComponent(id) {
    let adapter = this.props.adapters.hasOwnProperty(id) ? this.props.adapters[id] : identity;
    let state = this.props.state.hasOwnProperty(id) ? this.props.state[id] : {};
    let reactions = this.props.reactions.hasOwnProperty(id) ? this.props.reactions[id] : {};

    let reactionFunctions = {};
    for (let key in reactions) {
      reactionFunctions[key] = ChainReaction.resolve(reactions[key]).toFunction();
    }

    let adapterInput = {}
    Object.assign(adapterInput, state);
    Object.assign(adapterInput, reactionFunctions);

    return adapter(adapterInput);
  }

  render() {
    let FormComponent = this.props.builders.hasOwnProperty(this.props.formID) ? this.props.builders[this.props.formID] : 'form';
    let formProps = this.getPropsForSubComponent(this.props.formID);

    return (
      <FormComponent {...formProps}>
        {this.props.structure.map(item => {
          let Field = this.props.builders[item.type];
          let fieldProps = this.getPropsForSubComponent(item.id);

          return (
            <Field key={item.id} {...fieldProps} />
          );

        })}
      </FormComponent>
    );
  }
}

Form.propTypes = {
  structure: PropTypes.array.isRequired,
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(ChainReaction),

  formID: PropTypes.string,
};

Form.defaultProps = {
  formID: 'form',
};

export default Form;
