import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext } from '../../store/StoreProvider';

import { default as HeaderStyles } from './Header.module.scss';
import LoginForm from '../LoginForm/LoginForm';

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(StoreContext);

  const handleOnClose = () => setIsModalOpen(false);

  const handleOnClick = () => {
    if (user) {
      setUser(null);
    } else {
      setIsModalOpen(true);
    }
  };

  const setProperlyLabel = user ? 'Wyloguj sie' : 'Zaloguj sie';

  return (
    <header className={style()}>
      <div className={style('__logo-wrapper')}>
        <h1 className={style('__title')}>Super kursy dla programistów</h1>
        <button onClick={handleOnClick}>{setProperlyLabel}</button>
        <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
      </div>
    </header>
  );
};

export default Header;
