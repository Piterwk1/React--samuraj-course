import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import UserMenu from './subcomponents/UserMenu';
import AdminMenu from './subcomponents/AdminMenu';

import { default as AsideMenuStyle } from './AsideMenu.module.scss';
import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModules(AsideMenuStyle);

const ADMIN_TYPE = 1;

const AsideMenu = () => {
  const { user } = useContext(StoreContext);

  const adminMenuComponent =
    user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null;

  return (
    <section className={style()}>
      <div className={style('nav-wrapper')}>
        <UserMenu isUserLogged={Boolean(user)} />
        {adminMenuComponent}
      </div>
    </section>
  );
};

export default AsideMenu;
