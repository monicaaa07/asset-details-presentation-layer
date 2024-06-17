import React from 'react';
import { Tag, Owner } from './types';
import { icons } from './locale';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const renderCreatedDate = (created: string): string => {
    const date = dayjs.utc(created); 
    return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : 'Invalid Date';
};


export const renderTags = (tags: Tag[]) => {
    const uniqueTags = Array.from(new Set(tags.map(tag => tag.value))); // Extract unique tag values
    return uniqueTags.join(', '); // Join unique tag values with comma
};


export const renderOwnerName = (owner: Owner) => {
    return owner && owner.name ? owner.name : 'Unknown'; // Default to 'Unknown' if owner or name is missing
};


export const renderCrownJewelIcon = (isCrownJewel: boolean, crownJewelIndicator: string) => {
    if (isCrownJewel && crownJewelIndicator === 'OVERRIDE') {
        return <img src={icons.red} alt="Red Icon" style={{ width: 20, height: 20 }} />;
    } else if (isCrownJewel) {
        return <img src={icons.green} alt="Green Icon" style={{ width: 20, height: 20 }} />;
    } else if (!isCrownJewel && crownJewelIndicator === 'OVERRIDE') {
        return <img src={icons.blue} alt="Blue Icon" style={{ width: 20, height: 20 }} />;
    } else {
        return <img src={icons.gray} alt="Gray Icon" style={{ width: 20, height: 20 }} />;
    }
};
