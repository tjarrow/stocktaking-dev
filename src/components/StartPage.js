import React from 'react';
import { Link } from "react-router-dom";

class StartPage extends React.Component{
  render () {
    return (
      <div className="start-page">
        <h1 className="start-header">Приложение для просмотра оборудования в офисах</h1>
        <div className="start-btn-wrapper">
          <Link to="/login" className="login-button">Войти</Link>
          <Link to="/register" className="signup-button">Зарегистрироваться</Link>
        </div>
      </div>
    )
  }
}

export default StartPage;
