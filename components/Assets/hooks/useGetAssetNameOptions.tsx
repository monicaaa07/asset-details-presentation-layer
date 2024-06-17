import { useState, useEffect, useContext } from 'react';
import { FilteredAssetsContext } from '../context/FilteredAssetsContext';
import { Asset } from '../types';

export const useGetAssetNameOptions = () => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const { filteredAssets } = useContext(FilteredAssetsContext);

    useEffect(() => {
        if(filteredAssets) {
            const uniqueNames: string[] = Array.from(new Set(filteredAssets.map((item:Asset) => item.name)));
            const optionsList:{value: string; label: string}[] = uniqueNames.map(name => ({ value: name, label: name }));
            setOptions(optionsList);
        }
    }, [filteredAssets]);

    return  options ;
};