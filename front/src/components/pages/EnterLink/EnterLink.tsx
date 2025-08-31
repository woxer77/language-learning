import React from 'react';

import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Field from "../../UI/Field/Field";
import Button from "../../UI/Button/Button";
import EnterLinkSvgSelector from "../../../assets/images/icons/enter-link/EnterLinkSvgSelector";
import HistoryDialog from "../../elements/HistoryDialog/HistoryDialog";

import { getId, linkOptions } from "../../../helpers/EnterLink/enterLink";
import { useMutationVideo } from "../../../hooks/EnterLink/useMutationVideo";
import { useMutationPlaylist } from "../../../hooks/EnterLink/useMutationPlaylist";
import { useAppDispatch, useAppSelector } from "../../../hooks/common/redux";
import { useMutationHistory } from "../../../hooks/EnterLink/useMutationHistory";

import styles from './EnterLink.module.scss';

const EnterLink: React.FC = () => {
  const userId = useAppSelector((state) => state.userReducer.userId);
  const history = useAppSelector((state) => state.userReducer.history);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mutationPlaylist = useMutationPlaylist({ dispatch, navigate });
  const mutationHistory = useMutationHistory({ dispatch });
  const mutationVideo = useMutationVideo({ dispatch, navigate });

  const onSubmit = (data: FieldValues) => {
    const { link } = data;
    const id = getId(link);

    if (link.includes('v=')) { // video
      mutationVideo.mutate(id);
    } else { // playlist
      mutationPlaylist.mutate(id);

      if (!history?.includes(id)) {
        mutationHistory.mutate({ userId, playlistId: id });
      }
    }
  };

  const openHistory = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className={styles.enterLink}>
      <HistoryDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} history={history} />
      <h1 className={`title ${styles.title}`}>Start learning English</h1>
      <h2 className={`subtitle ${styles.subtitle}`}>Provide a YouTube link to a playlist or a single video</h2>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Field
            register={register}
            name="link"
            placeholder="YouTube link"
            startIconId="link"
            className={styles.field}
            error={typeof errors?.link?.message === 'string' ? errors?.link?.message : ''}
            options={linkOptions}
          />
          <button
            className={styles.history}
            type='button'
            onClick={history?.length > 0 ? openHistory : () => {}}
            style={{ opacity: history?.length > 0 ? 1 : 0.4 }}
          >
            <EnterLinkSvgSelector iconId="history"/> History
          </button>
          <Button className={styles.button} isLoading={mutationPlaylist.isPending || mutationVideo.isPending}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EnterLink;
