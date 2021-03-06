// NOTE: we make extensive use of property initialiser for binding methods to the class instance:
// onChange, getSuggestionValue etc.

import React, {Component, PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';

import styles from './index.scss';

function getSuggestions (value, items = []) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return items
    .filter(item => item && item.toLowerCase().slice(0, inputLength) === inputValue)
    .map(item => ({value: item}));
}

export default class ComboboxComponent extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string,
    inputStyles: PropTypes.string,
    inputValue: PropTypes.string,
    items: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool
  };

  static defaultProps = {
    error: null,
    inputStyles: 'inline',
    inputValue: '',
    placeholder: '',
    required: false
  };

  state = {
    showError: false,
    suggestions: getSuggestions('', this.props.items),
    value: this.props.inputValue
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.showError();
    if (nextProps.inputValue !== this.props.inputValue) {
      this.setState({
        value: nextProps.inputValue
      });
    }
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.items)
    });
  };

  onChange = (event, {newValue}) => {
    this.hideError();
    this.setState({
      value: newValue
    });
  };

  getSuggestionValue = suggestion => suggestion.value;

  handleSelection = (e, {method}) => {
    if (method === 'enter') {
      e.preventDefault();
    }
  };

  showError () {
    this.setState({showError: true});
  }

  hideError () {
    this.setState({showError: false});
  }

  renderSuggestion = suggestion => <span>{suggestion.value}</span>;

  render () {
    const {
      name,
      id,
      label,
      error,
      required,
      inputStyles,
      placeholder,
      disabled
    } = this.props;

    return (
      <div className={`form-group ${styles[inputStyles]}`}>
        <label
          className="control-label"
          htmlFor="city">

          {label}
        </label>

        <div className={styles.container}>
          <Autosuggest
            suggestions={this.state.suggestions}
            theme={styles}
            onSuggestionSelected={this.handleSelection}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            shouldRenderSuggestions={() => true}
            onSuggestionsClearRequested={() => true}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={{
              disabled,
              id,
              name,
              onChange: this.onChange,
              placeholder,
              required,
              value: this.state.value
            }} />

          <span className={styles.handle}>
            <i className="fa fa-caret-down" aria-hidden="true" />
          </span>

          {this.state.showError &&
            <span className={`${styles.error} label-danger`}>{error}</span>}
        </div>
      </div>
    );
  }
}
