import React, { Component } from "react";
import Axios from "axios";

export default class Info extends Component {
  signal = Axios.CancelToken.source();

  state = {
    user: {},
    error: false,
    isLoading: true
  };

  componentDidMount() {
    this.onLoadUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.pathname !== prevProps.pathname) {
      this.signal.cancel("Api is being canceled");
      this.onLoadUser();
    }
  }

  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
  }

  onLoadUser = async () => {
    try {
      this.setState({ isLoading: true, error: false });
      const response = await Axios.get(`/api/${this.props.pathname}`, {
        cancelToken: this.signal.token
      });
      this.setState({ user: response.data, isLoading: false });
    } catch (err) {
      if (Axios.isCancel(err)) {
      } else {
        this.setState({ isLoading: false, error: true });
      }
    }
  };

  render() {
    if (this.state.isLoading) return <p>Загрузка...</p>;
    if (this.state.error) return <p>Ошибка</p>;
    return (
      <ul>
        <li>Имя: {this.state.user.name}</li>
        <li>Фамилия: {this.state.user.lastname}</li>
        <li>Дата рождения:</li>
        <li>Email: {this.state.user.email}</li>
      </ul>
    );
  }
}
