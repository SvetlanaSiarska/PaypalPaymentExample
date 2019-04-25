import { SIZE_S, SIZE_M, SIZE_L, SIZE_XL } from '../actions/types';

export function getSizeText(size) {
    switch(size) {
        case SIZE_S: 
        default:
            return "S";
        case SIZE_M: 
            return "M";
        case SIZE_L: 
            return "L";
        case SIZE_XL: 
            return "XL";
    }
}