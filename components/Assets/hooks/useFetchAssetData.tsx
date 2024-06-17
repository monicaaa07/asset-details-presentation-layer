import { useState, useEffect } from 'react';
import { Asset } from '../types';

interface UseFetchAssetDataResult {
    assets: Asset[] | undefined;
    loading: boolean;
    error: string | null;
}

export const useFetchAssetData = (): UseFetchAssetDataResult => {
    const [assets, setAssets] = useState<Asset[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json() as Asset[];
                setAssets(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { assets, loading, error };
};
