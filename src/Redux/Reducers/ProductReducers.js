import { GET_PRODUCT_SINGLE_SKU, PRODUCTS_BRANDS, PRODUCTS_TYPE,
    PRODUCTS_THEME, FILTER_DATA, CLEAR_FILTER, SINGLE_PRODUCT_GET,
    CLEAR_PRODUCT_GET } from '../Actions/types'

const initialState = {
    singleProductSku: [],
    brand: [],
    brandLoad: false,
    protype: [],
    Loadtype: false,
    protheme: [],
    Loadtheme: false,
    hits: [],
    isLoading: false,
    singleP: [],
    Loadsingle: false,
    SKULoad: false,
    error: null,
    Loaderror: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCT_SINGLE_SKU:
            return {
                ...state,
                singleProductSku: action.payload,
                SKULoad: true
            }

        case PRODUCTS_BRANDS:
            return {
                ...state,
                brand: action.payload,
                brandLoad: true
            }
        case PRODUCTS_TYPE:
            return {
                ...state,
                protype: action.payload,
                Loadtype: true
            }
        case PRODUCTS_THEME:
            return {
                ...state,
                protheme: action.payload,
                Loadtheme: true
            }
        case FILTER_DATA:
            return {
                ...state,
                hits: action.payload,
                isLoading: true
            }
        case CLEAR_FILTER:
            return {
                ...state,
                hits: [],
                isLoading: false
            }
        case SINGLE_PRODUCT_GET:
            return {
                ...state,
                singleP: action.payload,
                Loadsingle: true,
                singleProductSku: action.payloadSKU,
                SKULoad: true
            }
        case CLEAR_PRODUCT_GET:
            return {
                ...state,
                singleP: [],
                Loadsingle: false
            }
        default:
            return state;
    }
}