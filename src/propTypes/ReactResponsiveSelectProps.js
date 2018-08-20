import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const ReactResponsiveSelectProps = {
  caretIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  customLabelRenderer: PropTypes.func,
  disabled: PropTypes.bool,
  multiselect: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSubmit: PropTypes.func,
  prefix: PropTypes.string,
  selectedValue: PropTypes.string,
  noSelectionLabel: PropTypes.string,
  selectedValues: PropTypes.arrayOf(PropTypes.string.isRequired),
};
