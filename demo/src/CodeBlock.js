import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CodeBlock extends Component {

  state = { isExpanded: false };

  render () {
    const { isExpanded } = this.state;
    const { children } = this.props;

    return (
      <div className="code-block__expander">
        <button
          className="code-block__expander__button"
          onClick={() => { this.setState({ isExpanded: !isExpanded }); }}
          type="button"
        >
          {!isExpanded ? 'Expand' : 'Close'}
        </button>

        <div className={`code-block ${isExpanded ? 'code-block--expanded' : ''}`}>
          <pre>
            <code className="language-javascript --margin-bottom-2">{children}</code>
          </pre>
        </div>
      </div>
    );
  }
}

CodeBlock.propTypes = {
  children: PropTypes.string
};
