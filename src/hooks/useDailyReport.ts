import api, { ApiResponse } from "../api/api";
import { setSimpleReport } from "../redux/report/reportSlice";
import { useAppDispatch } from "./useAppDispatch";

export function useDailyReport () {
    const dispatch = useAppDispatch();

    const report = async(): Promise<ApiResponse> => {
        return await api(`/api/analysis/day/3`, 'get', undefined, 'administrator')
    };

    report().then((res: ApiResponse) => {
        dispatch(setSimpleReport({
            carpets: res.data?.numberOfCarpet,
            tracks: res.data?.numberOfTracks,
            clients: res.data?.numberOfClients,
            price: res.data?.totalPrice,
            surface: res.data?.totalSurface
        }))
    });
};