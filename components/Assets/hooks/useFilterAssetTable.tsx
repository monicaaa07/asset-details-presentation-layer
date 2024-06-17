import { useEffect, useContext } from 'react';
import dayjs,{Dayjs} from 'dayjs';
import { SourceAssetsContext } from '../context/SourceAssetsContext';
import { FilteredAssetsContext } from '../context/FilteredAssetsContext';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

type UseFilterAssetTableProps = {
    filterDates: [Dayjs | null, Dayjs | null];
    searchText: string;
    selectedAssetTypes: string[];
};

const useFilterAssetTable = ( {filterDates, searchText, selectedAssetTypes} : UseFilterAssetTableProps) => {
    const { sourceAssets } = useContext(SourceAssetsContext)
    const { setFilteredAssets } = useContext(FilteredAssetsContext)

    useEffect(() => {
        let filtered = sourceAssets;

        // Filter by date range
        if (filterDates && filterDates.length === 2) {
            const [start, end] = filterDates;
            filtered = filtered?.filter(item => {
                const createdDate = dayjs(item.created);
                return start ? (end ? createdDate.isBetween(start, end, null, '[]') : createdDate.isAfter(start)) : (end ? createdDate.isBefore(end) : true);
            });
        }

        // Filter by asset name
        if (searchText) {
            filtered = filtered?.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        // Filter by asset types
        if (selectedAssetTypes && selectedAssetTypes.length > 0) {
            filtered = filtered?.filter(item => selectedAssetTypes.includes(item.enrich.assetType));
        }

        setFilteredAssets(filtered || []);
    }, [sourceAssets, setFilteredAssets, filterDates, searchText, selectedAssetTypes]);
};

export default useFilterAssetTable;
