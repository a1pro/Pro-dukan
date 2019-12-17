import React, { Component } from 'react'
import config from '../../config'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import ProTabs from './ProTabs';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { destroySession } from '../../Redux/Actions/sessionAction'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'
import store from '../../store'
import { productBrands, productType, productTheme,
    filterData, clearFilter, getSingleProduct,
    clearSingleProduct, filterDataType } from '../../Redux/Actions/getProductsDetail'

class ProductCatalog extends Component {
    
    // Date: 10-sep-19.
	 constructor(props) {
        super(props);
        this.state = {
		  hits: [],
          isLoading: false,
          Loadbrand: false,
          Loadtype: false,
          Loadtheme:false,
          Loadsingle:false,
          SKULoad: false,
          singleP:[],
          singleProductSku: [],
          protheme: [],
          protype: [],
          brand: [],
		  error: null,
      };
        
      this.handlePro = this.handlePro.bind(this);
      this.handleclear = this.handleclear.bind(this);
      this.handleselect = this.handleselect.bind(this);
      this.singlepro = this.singlepro.bind(this);
      
	  
	  
    }
    
    singlepro = (e) => {
        //this.setState({ hits:[],isLoading: false });
       const id = e.target.id;
       store.dispatch(getSingleProduct(id));
	   setTimeout(() => {
		   // cstm_form
		   let scrollTarget = document.getElementById('scrollToHere');
		   scrollTarget.scrollIntoView();
	   }, 1000)
    }

    // clear filter attributes -- Inderjit
    handleclear = (e) => {
		// this.updateHeight();
        document.getElementById('product_name').value='';
        document.getElementById('product_type').value='Select Product Type';
        document.getElementById('product_brand').value='Select Brand';
        document.getElementById('product_theme').value='Select Theme';
        // if(document.getElementById('single_product_div_parent')) {
        //     document.getElementById('single_product_div_parent').remove();
        // }
        store.dispatch(clearFilter());
        store.dispatch(clearSingleProduct());
        
    } 

    // filter by product type, theme ,brand --  
    handleselect = (e) => {
        this.setState({ singleP: [], Loadsingle: false });
        const data  = {
            id: e.target.id,
            val: e.target.value
        }
        store.dispatch(filterData(data));
   }

	// product filter by name -- Inderjit
	handlePro = (e) => {
        e.preventDefault();
        const data  = {
            id: e.target.id,
            val: e.target.value
        }
        var val = e.target.value;
	    if(val.length > 2){
            store.dispatch(filterDataType(data));
        }
        else {
            store.dispatch(clearFilter());
            store.dispatch(clearSingleProduct());
        }
    
	}

    componentDidMount() {
        store.dispatch(productBrands());
        store.dispatch(productType());
        store.dispatch(productTheme());
    }

    render() {
		
        const sessionData = this.props.sessionData;
        const { brand, brandLoad, Loadtype, protype, Loadtheme, protheme, hits, isLoading ,Loadsingle,singleP, singleProductSku, SKULoad } = this.props.productData;
		const { error, Loadbrand, hitsType, isLoadingType } = this.state;
        
        if(SKULoad) {
            var singleproduct = singleP.map( (item) => {
            var fimg = `${config.base_url}images/images/No_image.jpg`;
                // var fimg = window.location.protocol + '//' + window.location.host  + "/images/images/No_image.jpg";
            var imgg =   (typeof item.imagepath === null ||  item.imagepath === null)? fimg:item.imagepath;   
                return  <ProTabs item={item} path={imgg} key={item.itemname}  productSku={singleProductSku} isProductSKU={this.state.SKULoad}  />
            });
        }
        else{
            var singleproduct = '';
        }

        if(Loadtype){
            var typelist = protype.map( (item) => {
                return <option key={item.itemnum}> {item.producttype}</option>
              });
        }else{
            var typelist = <option>No ProductTypes</option>;
        }
       // var themelist = '';
        if(Loadtheme){
            var themelist = protheme.map( (item) => {
                return <option key={item.itemnum}> {item.theme}</option>
              });
        }else{
           var  themelist = <option>No ProductThemes</option>;
        }

        if(brandLoad){
            var brandlist = brand.map( (item) => {
             return <option> {item.brand}</option>
            });
        }
        else{
            var brandlist = <option>No Brand</option>
        }
        var list = '';
		if(isLoading){
            list =  hits.map( (item) => (
              <tr key={item.itemnum} >
                  <td id={item.itemnum} onClick={this.singlepro}>{item.itemnum}</td>
                  <td id={item.itemnum} onClick={this.singlepro}>{item.itemname}</td>
              </tr>
            ));
	    }
		else{
            if(isLoadingType) {
                list =  hitsType.map( (item) => (
                    <tr key={item.itemnum} >
                        <td id={item.itemnum} onClick={this.singlepro}>{item.itemnum}</td>
                        <td id={item.itemnum} onClick={this.singlepro}>{item.itemname}</td>
                    </tr>
                ));
            }
            else {
                list = <tr><td colSpan="2" className="text-center">No Products</td></tr>;
            }
        }
		
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history} />
                                <div className="col-md-9 dash_right" id="dash_right">
                                    <LoginMsgCmp heading="Product Catalog" />

                                    {/* PRODUCT SECTION START HERE */}
                                    <div>
                                        <div className="filter_section">
                                            <div className="row">
                                                <div className="col-md-12 text-left">
                                                    <h4>Product Search Filters</h4>
                                                </div>
                                            </div>
										<div class="row">
										
										<div class="col-lg-2 col-half-offset">
                                            <input type="text" id="product_name" onChange={this.handlePro}  placeholder="Product Name/Num"/>
                                        </div>
								        <div>
										</div>
										<div class="col-lg-2 col-half-offset">
                                            <select id="product_type" onChange={this.handleselect} defaultValue="">
                                                <option>Select Product Type</option>
                                                {typelist}
                                            </select>
										</div>
										<div class="col-lg-2 col-half-offset">
                                        <select id="product_brand" onChange={this.handleselect} defaultValue="">
                                        <option>Select Brand</option>
                                            {brandlist}
                                            </select>
											</div>
                                        
								        <div>
										<div class="col-lg-2 col-half-offset">
                                            <select id="product_theme" onChange={this.handleselect} defaultValue="">
                                                <option>Select Theme</option>
                                                {themelist}
                                            </select>
                                        </div>
										</div>
										<div class="col-lg-2 col-half-offset">
										<div>
                                            <button className="cstm_product_clear" onClick={this.handleclear}>Clear Filters</button>
                                        </div>
										</div>
										
										
										</div>
                                        <div className="parent_search_product">
                                            <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Item Number</th>
                                                        <th>Item Name</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className="search_list_product">
                                                <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                    <tbody>
                                                        {list}
                                                    </tbody>
                                                </table>
												<div id="scrollToHere"></div>
                                            </div>
                                        </div>
									</div>
										
                                    </div> 
									
								    <div>{singleproduct}</div>
                                </div>
                            </div>
                        </div>
                        <Footer history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }
	
}

ProductCatalog.propTypes = {
    sessionData: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    destroySession: PropTypes.func,
    productBrands: PropTypes.func
}

const mapStateToProps = state => ({
    sessionData: state.session.userSession,
    isAuthenticated: state.session,
    productData: state.productDetail
});

export default connect(mapStateToProps, { destroySession, productBrands
    , productType, productTheme, filterData, clearFilter, getSingleProduct,
    clearSingleProduct, filterDataType })(ProductCatalog);