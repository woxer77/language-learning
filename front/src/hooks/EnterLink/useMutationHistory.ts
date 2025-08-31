import { useMutation } from "@tanstack/react-query";

import { setHistory } from "../../services/user";
import { setHistory as setReduxHistory } from "../../redux/slices/userSlice";
import { UserIdType } from "../../ts/interfaces/types";
import { Dispatch } from "@reduxjs/toolkit";

interface MutationHistoryProps {
    dispatch: Dispatch;
}

export interface SetHistoryProps {
    userId: UserIdType;
    playlistId: string;
}

const useMutationHistory = ({ dispatch }: MutationHistoryProps) => {
    return useMutation({
        mutationKey: ['setHistory'],
        mutationFn: (data: SetHistoryProps) => setHistory(data),
        onSuccess: (res) => {
            const history: string[] = res.data;

            dispatch(setReduxHistory(history));
        },
        onError: (err) => {
            console.log(err);
        }
    });
};

export { useMutationHistory };
