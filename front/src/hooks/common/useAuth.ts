import { AxiosResponse } from "axios";
import { type FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { AlertTypeEnum } from "../../ts/enums/enums";
import { IUser } from '../../ts/interfaces/types';
import { ActivateAlertProps } from "../../ts/interfaces/types";
import { setAuth, setUserId } from "../../redux/slices/userSlice";
import { useAppDispatch } from "./redux";
import { setHistory } from "../../redux/slices/userSlice";

interface AuthHookReturn {
  formHook: UseFormReturn;
  onSubmit: (formData: FieldValues) => void;
  isPending?: boolean;
}

const useAuth = (
    mutationKey: string,
    mutationFn: MutationFunction<AxiosResponse<any, any>, IUser>,
    activateAlert?: ActivateAlertProps,
  ): AuthHookReturn => {
  const formHook = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    onSuccess: (res) => {
      const { userId, history } = res.data?.user;
      const { accessToken } = res.data;

      localStorage.setItem('accessToken', accessToken);

      dispatch(setAuth(true));
      dispatch(setUserId(userId));
      dispatch(setHistory(history || []));

      navigate('/enter-link');
    },
    onError: (err) => {
      if (activateAlert) {
        activateAlert(err.message, AlertTypeEnum.Error, 4000);
      }
      console.error(err);
    }
  });

  const onSubmit = (formData: FieldValues) => {
    const user = {
      email: formData.email,
      password: formData.password
    } as IUser;
    mutation.mutate(user);
  };

  return { formHook, onSubmit, isPending: mutation.isPending };
};

export default useAuth;
