import React from 'react';

import { Controller } from "react-hook-form";

import HomeSvgSelector from "../../../assets/images/icons/home/HomeSvgSelector";
import Field from '../../UI/Field/Field';
import Alert from "../../UI/Alert/Alert";

import { numberSectionOptions } from "../../../helpers/NumberSection/NumberSection";
import { useMutationState } from "../../../hooks/NumberSection/useMutationState";
import { useFormHandler } from "../../../hooks/NumberSection/useFormHandler";
import { useAlert } from "../../../hooks/common/useAlert";

import styles from './NumberSection.module.scss';

const NumberSection: React.FC = () => {
  const { isActive, message, type, activateAlert } = useAlert();

  const { mutation } = useMutationState(activateAlert);
  const {
    handleSubmit,
    register,
    control,
    errors,
    disableBtn,
    nextVideo,
    prevVideo,
    video
  } = useFormHandler(mutation, activateAlert);

  const arrowBtnStyles = `${styles.arrowBtn} ${disableBtn ? styles.disableBtn : ''}`;

  return (
    <>
      <Alert message={message} type={type} isActive={isActive}/>
      <button className={arrowBtnStyles} type="button" onClick={prevVideo}>
        <HomeSvgSelector iconId="arrowLeft"/>
      </button>
      <div className={styles.numberSection}>
        <form onSubmit={handleSubmit}>
          <Controller
            name='videoNumber'
            control={control}
            rules={numberSectionOptions}
            defaultValue={video.position + 1}
            render={({ field: { onChange, value, name } }) => (
              <Field
                register={register}
                name={name}
                error={typeof errors.videoNumber?.message === 'string' ? errors.videoNumber.message : ''}
                className={styles.numberInput}
                startIconId="tag"
                value={value}
                onChange={onChange}
                isLoading={mutation.isPending}
              />
            )}
          />
          <button type="submit" hidden/>
        </form>
      </div>
      <button className={arrowBtnStyles} type="button" onClick={nextVideo}>
        <HomeSvgSelector iconId="arrowRight"/>
      </button>
    </>
  );
}

export default NumberSection;
