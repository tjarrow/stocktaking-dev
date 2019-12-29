import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
// import input from "../common/input";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      company_name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // Send to the main page
      this.props.history.push("/view");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // Send to the main page
      this.props.history.push("/view");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      company_name: this.state.company_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render () {
    const { errors } = this.state;

    return (
      <div className="auth-form">
      <form onSubmit={this.onSubmit} className="auth-btn-wrapper">
          <h2 className="start-header">Зарегистрируйтесь в Stocktaking</h2>
          <input
            className="auth-input"
            name="company_name"
            error={errors.company_name}
            value={this.state.company_name}
            onChange={this.onChange}
            placeholder="Введите название организации"
          />
          <input
            className="auth-input"
            name="email"
            error={errors.email}
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Введите логин"
          />
          <input
            className="auth-input"
            name="password"
            error={errors.password}
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Введите пароль"
            type="password"
          />
          <input
            className="auth-input"
            name="password2"
            error={errors.password2}
            value={this.state.password2}
            onChange={this.onChange}
            placeholder="Повторите пароль"
            type="password"
          />
          <input
            type="submit"
            value="Зарегистрироваться"
            className="auth-input"
          />
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateProps,
  { registerUser }
)(withRouter(Register));
