import React from 'react';
import style from './Header-logo.module.scss';
function HeaderLogo() {
  return (
    <div className={style['header-logo']}>
      <img className={style['header-logo-img']} src="/Logo.svg" alt=""></img>
    </div>
  );
}
export default HeaderLogo;
