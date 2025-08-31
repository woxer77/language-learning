import React from 'react';

import { Link } from 'react-router-dom';

import Field from '../../UI/Field/Field';
import Button from '../../UI/Button/Button';
import Alert from '../../UI/Alert/Alert';

import { login } from '../../../services/auth';
import { emailOptions, passwordOptions } from '../../../helpers/AuthForm/authForm';
import useAuth from '../../../hooks/common/useAuth';
import { IUser } from '../../../ts/interfaces/types';
import { useAlert } from '../../../hooks/common/useAlert';

import formStyles from '../../../assets/styles/scss/common/AuthForm.module.scss';
import styles from '../../../assets/styles/scss/common/Auth.module.scss';

const Login: React.FC = () => {
  const { isActive, message, type, activateAlert } = useAlert();

  const mutationFn = (user: IUser) => login(user);
  const { formHook, onSubmit, isPending } = useAuth('login', mutationFn, activateAlert);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formHook;

  return (
    <>
      <Alert message={message} type={type} isActive={isActive} />
      <div className={styles.auth}>
        <h1 className={`title ${styles.title}`}>Sign In</h1>
        <h2 className={`subtitle ${styles.subtitle}`}>Welcome back, you've been missed!</h2>
        <div className={styles.content}>
          <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
            <Field
              register={register}
              name="email"
              options={emailOptions}
              error={typeof errors?.email?.message === 'string' ? errors?.email?.message : ''}
              className={formStyles.field}
              startIconId="email"
              placeholder="Email (email for test: test@gmail.com)"
            />
            <Field
              register={register}
              name="password"
              options={passwordOptions}
              error={typeof errors?.password?.message === 'string' ? errors?.password?.message : ''}
              className={formStyles.field}
              startIconId="password"
              placeholder="Password (password for test: Qwerty123)"
              isSecret
            />
            <Button isLoading={isPending}>Sign In</Button>
          </form>
          <div className={styles.signUp}>
            You haven't any account?{' '}
            <Link to="/registration" className="link">
              Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
