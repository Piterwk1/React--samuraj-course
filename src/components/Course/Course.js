import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import { default as CourseStyles } from './Course.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import request from '../../helpers/request';

const style = bemCssModules(CourseStyles);

const Course = ({ authors, id, isUserContext = false, img, price, title }) => {
  const { user, setUser } = useContext(StoreContext);
  const history = useHistory();

  const AllAuthors = authors.join(', ');
  const isUserLogged = Boolean(user);

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch('/users', {
        login: user.login,
        courseId: id,
      });

      if (status === 202) {
        setUser(data.user);
        history.push('/my-courses');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

  return (
    <li>
      <article className={style()}>
        <h3 className={style('title')}>{title}</h3>
        <img alt={title} className={style('image')} src={img} />
        <p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
        <p className={style('authors')}>{`Autorzy kursu: ${AllAuthors}`}</p>
        {shouldBeBuyButtonVisible && (
          <button onClick={handleOnClick}>Kup ten kurs</button>
        )}
      </article>
    </li>
  );
};

export default Course;
