import React, { Component, PropTypes } from 'react';

export default class SelectBoxComponent extends Component {

  componentDidUpdate(){
    const { nextSelectedIndex, isDragging } = this.props;

    // Scroll to keep the selected option in view
    if(isDragging === false) {
      this.optionsContainer.scrollTop = this[`option_${nextSelectedIndex}`].offsetTop;
    }
  }

  render(){
    const { prefix, name, selectedOption, selectedIndex, nextSelectedIndex, isOptionsPanelOpen, options } = this.props;
    return (
      <div
        className={`select-box ${(isOptionsPanelOpen === true) ? 'options-container-visible' : ''}`}
        role="listbox"
        tabIndex="0"
      >
        <div className="label-container">
          {prefix &&
          <span>{prefix}</span>
          }
          <span className="label"> {selectedOption.text}</span>
          <i className="icon fa fa-angle-down" aria-hidden="true"></i>
        </div>
        <div className="options-container" ref={(r) => { this.optionsContainer = r; }}>
          {options.length > 0 &&
            options.map((option, index) => (
              <div
                key={index}
                role="option"
                data-key={index}
                ref={(r) => { this[`option_${index}`] = r; }}
                className={`
                  option
                  ${(selectedIndex === index) ? 'selected' : ''}
                  ${(nextSelectedIndex === index) ? 'nextSelection' : ''}
                `}
              >
                {option.markup || option.text}
              </div>
            ))
          }
        </div>

        {name &&
        <input type="hidden" name={name} value={selectedOption.value} />
        }

      </div>
    );
  }
}

SelectBoxComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  prefix: PropTypes.string,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
  selectedValue: PropTypes.string,
  selectedOption: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  }),
  selectedIndex: PropTypes.number,
  nextSelectedIndex: PropTypes.number,
  isOptionsPanelOpen: PropTypes.bool,
  isDragging: PropTypes.bool
};
