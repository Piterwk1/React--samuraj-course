import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { default as LoginFormStyles } from './LoginForm.module.scss';
import Modal from '../Modal/Modal';
import { StoreContext } from '../../store/StoreProvider';
import request from '../../helpers/request';

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [validateMessage, setValidateMessage] = useState('');

  const { setUser } = useContext(StoreContext);
  const handleOnChangeLogin = ({ target }) => setLogin(target.value);
  const handleOnChangePassword = ({ target }) => setPassword(target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
    // resetStateOfInput();
  };

  const resetStateOfInput = () => {
    setLogin('');
    setPassword('');
    setValidateMessage('');
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { data, status } = await request.post('/users', { login, password });

    if (status === 200) {
      setUser(data.user);
      resetStateOfInput();
      handleOnClose();
    } else {
      setValidateMessage(data.message);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInput();
    }
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={style('validate-message')}>{validateMessage}</p>
  ) : null;

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeClosedOnOutsideClick
    >
      {validateMessageComponent}
      <form className={style()} method="post" onSubmit={handleOnSubmit}>
        <div className={style('row')}>
          <label>
            Login:
            <input type="text" value={login} onChange={handleOnChangeLogin} />
          </label>
        </div>
        <div className={style('row')}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handleOnChangePassword}
            />
          </label>
        </div>
        <div className={style('row')}>
          <label>
            <button type="submit">Zaloguj</button>
            <button onClick={handleOnCloseModal} type="button">
              Anuluj
            </button>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
