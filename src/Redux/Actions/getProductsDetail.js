import { GET_PRODUCT_SINGLE_SKU, PRODUCTS_BRANDS, PRODUCTS_TYPE,
    PRODUCTS_THEME, FILTER_DATA, CLEAR_FILTER, SINGLE_PRODUCT_GET,
    CLEAR_PRODUCT_GET } from './types'
import axios from 'axios'

export const productBrands = () => dispatch => {
    axios
        .get("http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/productBrands")
        .then(res => dispatch({
                type: PRODUCTS_BRANDS,
                payload: res.data
            })
        )
       .catch(error => this.setState({ error, Loadbrand: false }));
}

export const productType = () => dispatch => {
    axios
       .get("http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/productTypes")
       .then(res => dispatch({
           type: PRODUCTS_TYPE,
           payload: res.data
       }))
      .catch(error => this.setState({ error, Loadtype: false }));
}

export const productTheme = () => dispatch => {
    axios
    .get("http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/productThemes")
    .then(res => dispatch({
        type: PRODUCTS_THEME,
        payload: res.data
    }))
   .catch(error => this.setState({ error, Loadtheme: false }));
}

export const filterData = (data) => dispatch => {
    // console.log(data);
    switch (data.id) {
        case 'product_type':
            var url = "http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/searchProductTypes/"+data.val;
            axios
            .get(url)
            .then(res => dispatch({
                type: FILTER_DATA,
                payload: res.data
            }))
           .catch(error =>  dispatch({
               type: FILTER_DATA,
               payload: error.data
           }));

          break;
        case 'product_brand':
         
            var url = "http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/searchBrands/"+data.val;
            axios
            .get(url)
            .then(res => dispatch({
                type: FILTER_DATA,
                payload: res.data
            }))
           .catch(error =>  dispatch({
               type: FILTER_DATA,
               payload: error.data
           }));

          break;
        case 'product_theme':

            var url = "http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/searchThemes/"+data.val;
            axios
            .get(url)
            .then(res => dispatch({
                type: FILTER_DATA,
                payload: res.data
            }))
           .catch(error =>  dispatch({
               type: FILTER_DATA,
               payload: error.data
           }));

          break;
      }
}

export const filterDataType = (data) => dispatch => {
    var value = data.val;
    var url = "http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/searchProducts/"+value.trim();
    axios
    .get(url)
    .then(res => dispatch({
        type: FILTER_DATA,
        payload: res.data
    }))
    .catch(error =>  dispatch({
        type: FILTER_DATA,
        payload: error.data
    }));
}

export const clearFilter = () => {
    return {
        type: CLEAR_FILTER
    }
}

export const getSingleProduct = (id) => dispatch => {
    var url ="http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/products/"+id;
        axios
        .get(url)
        .then(res => {
            axios
                .get(`http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/productSkus/${res.data[0].itemnum}`)
                .then(resSKU => dispatch({
                    type: SINGLE_PRODUCT_GET,
                    payload: res.data,
                    payloadSKU: resSKU.data
                }))
                .catch(error => dispatch({
                    type: SINGLE_PRODUCT_GET,
                    payload: error.data
                }));
        })
       .catch(error => dispatch({
            type: SINGLE_PRODUCT_GET,
            payload: error.data
        }));
}

export const clearSingleProduct = () => {
    return {
        type: CLEAR_PRODUCT_GET
    }
}

export const getSingleProductSku = (id) => dispatch => {
    axios
        .get(`http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/productSkus/${id}`)
        .then(res => dispatch({
           type: GET_PRODUCT_SINGLE_SKU,
           payload: res.data
        }))
        .catch(error => dispatch({
            type: GET_PRODUCT_SINGLE_SKU,
            payload: error.data
        }));
}