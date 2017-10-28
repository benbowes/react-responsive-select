import PropTypes from 'prop-types';

export const SingleSelectOptionProps = {
  index: PropTypes.number.isRequired,
  isOptionsPanelOpen: PropTypes.bool.isRequired,
  nextPotentialSelectionIndex: PropTypes.number,
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    markup: PropTypes.element
  }).isRequired,
  singleSelectSelectedIndex: PropTypes.number
};
