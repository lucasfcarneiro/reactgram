import { resetMessage } from "../slices/photoSlice";

export const useResetComponentMessage = (dispatch) => { //Custom Hook
    return () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000);
    }
}