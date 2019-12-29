import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
// import TextFieldGroup from "../common/TextFieldGroup";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render () {
    const { errors } = this.state;

    return (
      <div className="auth-form">
        <form onSubmit={this.onSubmit} className="auth-btn-wrapper">
            <h2 className="start-header">Войдите в ваш аккаунт Stocktaking</h2>
            <input
              className="auth-input"
              name="email"
              placeholder="Введите логин"
              error={errors.email}
              value={this.state.email}
              onChange={this.onChange}
              type="email"
            />
            <input
              className="auth-input"
              name="password"
              placeholder="Введите пароль"
              error={errors.password}
              value={this.state.password}
              onChange={this.onChange}
              type="password"
            />
            <input
              type="submit"
              value="Войти"
              className="auth-input"
            />
        </form>
      </div>
    )
  }
}

Login.propTypes = { // для проверки корректности типов вводимых данных
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect( //ES6 synthax
  mapStateToProps,
  { loginUser } // чтобы вытащить именно одно свойство из класса loginUser
)(Login);
