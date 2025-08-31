import React from "react";

import { Link } from "react-router-dom";

import Field from "../../UI/Field/Field";
import Button from "../../UI/Button/Button";

import { registration } from "../../../services/auth";
import {
  confirmPasswordOptions, emailOptions, passwordOptions
} from "../../../helpers/AuthForm/authForm";
import useAuth from "../../../hooks/common/useAuth";
import { IUser } from "../../../ts/interfaces/types";

import formStyles from "../../../assets/styles/scss/common/AuthForm.module.scss";
import styles from "../../../assets/styles/scss/common/Auth.module.scss";

const Registration: React.FC = () => {
  const mutationFn = (user: IUser) => registration(user);
  const { formHook, onSubmit, isPending } = useAuth('registration', mutationFn);
  const { register, getValues, handleSubmit, formState: { errors } } = formHook;

  return (
    <div className={styles.auth}>
      <h1 className={`title ${styles.title}`}>Getting Started</h1>
      <h2 className={`subtitle ${styles.subtitle}`}>Create an account to save your learning progress</h2>
      <div className={styles.content}>
        <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={formStyles.fields}>
            <Field
                register={register}
                name='email'
                options={emailOptions}
                error={typeof errors?.email?.message === 'string' ? errors?.email?.message : ''}
                className={formStyles.field}
                startIconId="email"
                placeholder="Email"
            />
            <Field
                register={register}
                name='password'
                options={passwordOptions}
                error={typeof errors?.password?.message === 'string' ? errors?.password?.message : ''}
                className={formStyles.field}
                startIconId="password"
                placeholder="Password"
                isSecret
            />
            <Field
                register={register}
                name='confirmPassword'
                options={confirmPasswordOptions(getValues("password"))}
                error={typeof errors?.confirmPassword?.message === 'string' ? errors?.confirmPassword?.message : ''}
                className={formStyles.field}
                startIconId="confirmPassword"
                placeholder="Confirm Password"
                isSecret
            />
          </div>
          <Button isLoading={isPending}>Sign Up</Button>
        </form>
        <div className={styles.signUp}>
          Already have an account? <Link to="/login" className="link">Sign In!</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
