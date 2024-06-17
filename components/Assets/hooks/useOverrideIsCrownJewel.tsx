import { useContext } from 'react';
import { SourceAssetsContext } from '../context/SourceAssetsContext';

const useOverrideIsCrownJewel = () => {
    const { sourceAssets, setSourceAssets } = useContext(SourceAssetsContext);

    const handleCrownJewelOverride = (assetId: string, newValue: boolean) => {
        if (sourceAssets) {
            const updatedAssets = sourceAssets.map(asset => {
                if (asset._id === assetId) {
                    return { ...asset, enrich: { ...asset.enrich, isCrownJewel: newValue } };
                }
                return asset;
            });
            setSourceAssets(updatedAssets);
        }
    };

    return { handleCrownJewelOverride };
};

export default useOverrideIsCrownJewel;
