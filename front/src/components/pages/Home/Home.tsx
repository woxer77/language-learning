import React from 'react';

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import TypeArea from "../../elements/TypeArea/TypeArea";
import YTVideo from "../../elements/YTVideo/YTVideo";
import NumberSection from "../../elements/NumberSection/NumberSection";
import ExpressionsContainer from "../../../containers/elements/Expressions/ExpressionsContainer";
import WordsContainer from "../../../containers/elements/Words/WordsContainer";
import HomeSvgSelector from "../../../assets/images/icons/home/HomeSvgSelector";

import { useAppDispatch, useAppSelector } from "../../../hooks/common/redux";
import { logout } from "../../../services/auth";
import { resetAll as resetAllMedia } from "../../../redux/slices/mediaSlice";
import { resetAll as resetCurrVideo } from "../../../redux/slices/currVideoSlice";
import { resetAll as resetUser } from "../../../redux/slices/userSlice";

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const media = useAppSelector(state => state.mediaReducer);
  const videoId = useAppSelector(state => state.currVideoReducer.media.videoId);
  const userId = useAppSelector(state => state.userReducer.userId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  const mutation = useMutation({
    mutationKey: ['logout', userId],
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('lastVisitedVideos');
      deleteCookie('refreshToken');

      dispatch(resetAllMedia());
      dispatch(resetCurrVideo());
      dispatch(resetUser());
    },
    onError(error) {
      console.log('User logout error:', error);
    }
  });

  const toEnterLink = () => navigate('/enter-link');
  const logoutHandler = () => mutation.mutate();

  return (
    <div className={styles.home}>
      <aside className={styles.aside}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <HomeSvgSelector iconId="settings"/>
            <p className={styles.title}>Expressions</p>
          </div>
          <ExpressionsContainer userId={userId} />
        </div>
      </aside>
      <div className={styles.main}>
        <div className={styles.header}>
          {media.videoCount > 1 &&
            <NumberSection/>
          }
        </div>
        <YTVideo videoId={videoId} />
        <TypeArea userId={userId} videoId={videoId} />
      </div>
      <aside className={styles.aside}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <HomeSvgSelector iconId="settings"/>
            <p className={styles.title}>Words</p>
          </div>
         <WordsContainer userId={userId} />
        </div>
      </aside>
      <div className={styles.buttons}>
        <button className={styles.btnBack} type="button" onClick={toEnterLink}>Enter Link</button>
        <button className={styles.btnBack} type="button" onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
