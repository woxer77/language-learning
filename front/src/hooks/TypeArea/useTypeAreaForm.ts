import React from "react";

import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { ISentence } from "../../ts/interfaces/types";
import { createSentence } from "../../services/sentences";
import { addSentence } from "../../redux/slices/currVideoSlice";
import { useAppDispatch, useAppSelector } from "../common/redux";

const useTypeAreaForm = () => {
  const userId = useAppSelector(state => state.userReducer.userId);
  const dispatch = useAppDispatch();

  const divForScrollRef = React.useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors }, resetField } = useForm();

  const sentences = useAppSelector(state => state.currVideoReducer.sentences);
  const videoId = useAppSelector(state => state.currVideoReducer.media.videoId);

  const mutation = useMutation({
    mutationKey: ['createSentence', userId, videoId],
    mutationFn: (sentence: ISentence) => createSentence(sentence),
    onSuccess: (res) => {
      const newSentence = res.data;

      dispatch(addSentence(newSentence));
      resetField('sentence');
    }
  });

  const onSubmit = (formData: FieldValues) => {
    const trimSentence = formData.sentence.trim();

    if (trimSentence === '') return;

    const newSentence = {
      videoId,
      number: (sentences[sentences.length - 1]?.number || 0) + 1,
      sentence: trimSentence,
      userId
    }

    mutation.mutate(newSentence);
  };

  React.useEffect(() => {
    if (!divForScrollRef.current) return;

    divForScrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [sentences]);

  return {
    divForScrollRef,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors
  };
};

export default useTypeAreaForm;
