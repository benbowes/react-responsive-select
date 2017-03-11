import React, { Component, PropTypes } from 'react';

export default class SelectBoxComponent extends Component {

  componentDidUpdate(){
    const { nextSelectedIndex, isDragging } = this.props;
    // Scroll to keep the selected option in view
    if(isDragging === false)
      this.optionsContainer.scrollTop = this[`option_${nextSelectedIndex}`].offsetTop;
  }

  render(){
    const { prefix, name, selectedOption, selectedIndex, nextSelectedIndex, isOptionsPanelOpen, options } = this.props;
    return (
      <div
        className={`
          select-box
          ${(isOptionsPanelOpen === true) ? 'options-container-visible' : ''}
        `}
        role="listbox"
        tabIndex="0"
      >
        <div className="label-container">
          {prefix}:
          <span className="label"> {selectedOption.displayText}</span>
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
              {option.displayText}
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
      displayText: PropTypes.string,
      value: PropTypes.string
    })
  ),
  prefix: PropTypes.string.isRequired,
  name: PropTypes.string,
  selectedValue: PropTypes.string,
  selectedOption: PropTypes.shape({
    displayText: PropTypes.string,
    value: PropTypes.string
  }),
  selectedIndex: PropTypes.number,
  nextSelectedIndex: PropTypes.number,
  isOptionsPanelOpen: PropTypes.bool,
  isDragging: PropTypes.bool
};
