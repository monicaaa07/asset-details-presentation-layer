import { useEffect, useContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { FilteredAssetsContext } from '../context/FilteredAssetsContext';
import { Asset } from '../types';
import min from 'dayjs/plugin/minMax';


dayjs.extend(min);

export const useGetMinCreatedDate = (): Dayjs | null => {
    const { filteredAssets } = useContext(FilteredAssetsContext);
    const [minimumCreated, setMinimumCreated] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (filteredAssets && filteredAssets.length > 0) {
            const dates = filteredAssets.map((item: Asset) => dayjs(item.created));
            const minDate = dayjs.min(dates);
            setMinimumCreated(minDate); // Update state instead of assigning directly to minimumCreated
        } else {
            setMinimumCreated(null); // Reset to null if filteredAssets is empty
        }
    }, [filteredAssets]);

    return minimumCreated;
};
