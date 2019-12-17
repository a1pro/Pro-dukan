import React, { Component } from 'react';
import { Tabs, Tab, Panel } from '@bumaga/tabs'
import axios from 'axios'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../../store'
import { getSingleProduct } from '../../Redux/Actions/getProductsDetail'
import config from '../../config'

class ProTabs extends Component {

  state = {
    itemid: this.props.item.itemnum,
    name: this.props.item.itemname,
    brand: this.props.item.brand,
    type: this.props.item.producttype,
    theme: this.props.item.theme,
    description: this.props.item.description,
    keywords: this.props.item.keywords,
    ingredients: this.props.item.ingredients,
    usage: this.props.item.usage,
    weight: this.props.item.weight,
    productSKU: this.props.productSku,
    countSKU: 0,
    modal: false,
    newSKU: '',
    errors: null,
    isError: false,
    successMsg: '',
    isSuccess: false,
    imagePathProduct: `${config.base_url}images/images/No_image.jpg`,
    imagePathAPI: 'images/images/No_image.jpg'
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  updateValue = (e) => {
    this.setState({ [ e.target.id ]: e.target.value  });
    this.setState({ errors: null });
    this.setState({ isError: false });
	this.setState({ successMsg: null });
    this.setState({ isSuccess: false });
  }
  
  // Update product details i.e. name brand etc --- Rahul kumar
  updateProduct = (e) => {
    e.preventDefault();
	this.setState({ errors: null });
	this.setState({ isError: false });
	this.setState({ successMsg: null });
    this.setState({ isSuccess: false });
      const productData = {
		  "itemNum": this.state.itemid,
		  "itemName": this.state.name,
		  "description": this.state.description,
		  "ingredients": this.state.ingredients,
		  "usage": this.state.usage,
		  "brand": this.state.brand,
		  "theme": this.state.theme,
		  "productType": this.state.type,
		  "weight": this.state.weight,
		  "keywords": this.state.keywords

	}
      axios
        .post('http://API-URL-HERE/updateProduct', JSON.stringify(productData), {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(res => {
			if(res.status === 201) {
				this.setState({ successMsg: res.data });
				this.setState({ isSuccess: true });
				setTimeout(() => {
					store.dispatch(getSingleProduct(productData.itemNum));
					this.setState({ successMsg: null });
					this.setState({ isSuccess: false });
				}, 2000);
			}
			else {
				this.setState({ errors: res.data });
				this.setState({ isError: true });
			}
		})
        .catch(error => {
			this.setState({ errors: error.data });
			this.setState({ isError: true });
		});
  }
  
  // ADD function for PRODUCT SKU. --- RAHUL KUMAR
  addSKU = (e) => {
    e.preventDefault();
    const arraySKU = this.props.productSku;
    for(let i = 0; i < arraySKU.length; i++) {
      if(this.state.newSKU === arraySKU[i].altsku) {
        this.setState({ errors: 'Please enter unique SKU for the product.' });
        this.setState({ isError: true });
        return false;
      }
    }
    
    if(this.state.newSKU === this.state.itemid) {
      this.setState({ errors: 'Please enter SKU different from item no.' });
      this.setState({ isError: true });
      return false;
    }
    const insertDataSKU = {
            "itemNum" : this.state.itemid,
    			  "altSku" : this.state.newSKU
    }
    this.setState({ errors: null });
    this.setState({ isError: false });
    axios
      .post('http://API-URL-HERE/addAltSku', insertDataSKU,{
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
      .then(response => {
        this.setState({ errors: response.data });
        store.dispatch(getSingleProduct(this.state.itemid));
        this.toggle();
        this.setState({ newSKU: '' });
      })
      .catch(error => {
        this.setState({
          errors: error.data,
          isError: true
        });
      });
  }

  // DELETE function for PRODUCT SKU. --- RAHUL KUMAR
  deleteSKU = (e) => {
    const url = `http://API-URL-HERE/deleteAltSku/${e.target.id}`;
    axios
      .delete(url)
      .then(res => {
        this.setState({ errors: res.data });
        store.dispatch(getSingleProduct(this.state.itemid));
      })
      .catch(err => {
        this.setState({
          errors: err.data,
          isError: true
        });
      });
  }

  // GET IMAGE function for product. --- RAHUL KUMAR
  getImageData = () => {
    axios
      .get(`http://API-URL-HERE/productImages/${this.state.itemid}`, {
        header: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.data.length < 1) {
          this.setState({ imagePathProduct: `${config.base_url}images/images/No_image.jpg` });
          this.setState({ imagePathAPI: 'images/images/No_image.jpg' });
        }
        else {
          this.setState({ imagePathProduct: `https://ik.imagekit.io/85dyse7bf/${res.data[0].imagepath}` });
          this.setState({ imagePathAPI: res.data[0].imagepath });
        }
        // console.log(res.data[0].imagepath)
      })
      .catch(error => console.log(error));
  }
  
  onActive = (elem) => {
	  // console.log(elem);
		for (var i = 1; i <= 3; i++) {
			if(document.getElementById('list'+[i]+'')) {
				document.getElementById('list'+[i]+'').classList.remove('active');
			}
			
    }
    if(elem === 'list2') {
      this.getImageData();
    }
		var a = document.getElementById(elem)
		a.classList.add('active');
		this.setState({ errors: null });
		this.setState({ isError: false });
		this.setState({ successMsg: null });
		this.setState({ isSuccess: false });
  }
  
	toggleFun(e) {
		let dropDownL = document.getElementsByClassName('accordion')[e];
        dropDownL.classList.toggle('active');
        let showDivDrop = dropDownL.nextElementSibling;
        if(showDivDrop.style.display === 'block') {
            showDivDrop.style.display = 'none';
        }
        else {
            showDivDrop.style.display = 'block';
        }
	}
	
  	render() {
		
		const { isProductSKU, productSku } = this.props;
		const { isError, erors } = this.state;
        return (
          <Tabs>
		  
            <div id="single_product_div_parent">
              <div className="row">
				
				<ul>
				<li onClick={() => this.onActive('list1')} id="list1" className="li active">
                  <Tab>
                    <button className="cstm_product">Product Details</button>
                  </Tab>
				  </li>
					<li onClick={() => this.onActive('list2')} id="list2" className="li">  
                  <Tab><button className="cstm_product">Product Image</button></Tab>
				  </li>
				<li onClick={() => this.onActive('list3')} id="list3" className="li">
                  <Tab><button className="cstm_product">Product Sku</button></Tab>
				  </li>
				  
             	</ul>
               
			      
              <Panel>
               
                <form className="cstm_form" onSubmit={this.updateProduct}>
					{ this.state.isSuccess ? <div className="row">
						<div className="col-md-12">
							<p className="alert alert-success">{this.state.successMsg}</p>
						</div>
					</div> : '' }
					{ isError ? <div className="row">
						<div className="col-md-12">
							<p className="alert alert-danger">{this.state.errors}</p>
						</div>
					</div> : '' }
				    <div className="row">
						<div className="col-md-6">
						  <label>Name</label> 
						  <input type="text" id="name" value={this.state.name} onChange={this.updateValue} placeholder="Product Name"/>
						</div>

						<div className="col-md-6">
						  <label>Brand</label> 
						  <input type="text" id="brand" value={this.state.brand} onChange={this.updateValue} placeholder="Product Brand"/>
						</div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>Product Type</label> 
                        <input type="text" id="type" value={this.state.type} onChange={this.updateValue} placeholder="Product Type"/>
                      </div>
            
                      <div className="col-md-6">
                        <label>Product Theme</label> 
                        <input type="text" id="theme" value={this.state.theme} onChange={this.updateValue} placeholder="Product Theme"/>
                      </div>
                    </div>
					
					<div className="row">
					<div className="col-md-6">
					  <label>Keywords</label> 
						<input type="text" id="keywords" value={this.state.keywords} onChange={this.updateValue} placeholder=" Keywords"/>
					</div>
					<div className="col-md-6">
					  <label>Ingredients</label> 
						<input type="text" id="ingredients" value={this.state.ingredients} onChange={this.updateValue} placeholder=" Ingredients"/>
					</div>
					</div>
					
					<div className="row">
					<div className="col-md-6">
                        <label>Product Details</label>
                        <textarea id="description" placeholder="description" onChange={this.updateValue} rows="6" cols="50" defaultValue={this.state.description}></textarea>
                      </div>
					<div className="col-md-6">
					  <label>Usage</label> 
						<textarea id="usage" placeholder="usage" onChange={this.updateValue} rows="6" cols="50" defaultValue={this.state.usage}></textarea>
					</div>
					</div>
					
					
					
                    <div className="row">
					<div className="col-md-6">
					  <label>Weight</label> 
						<input type="text" id="weight" value={this.state.weight} onChange={this.updateValue} placeholder=" Weight"/>
					</div>
          <div class="col-md-6"> <button class="update-details-btn" type="submit">Update Details</button></div>   
            
                   
                    </div>
                
                  </form>
                
              </Panel>
			  
              <Panel>
               
				 <div className="cstm_Img_sec">
				<div className="row">
				<div className="col-md-5">
			<form className="browse-button">
  <h5>From Computer</h5> <input type="file" name="myFile" placeholder="file-name"/>
  <p>Select destination folder on aws</p>       
</form>
 <div className = "accord-section">
<button class="accordion" onClick={this.toggleFun.bind(this, 0)}>Folder 1 <span class="add-section"><i class="fa fa-plus" aria-hidden="true"></i>
</span> </button>

<div class="panel">
 <p>sub-folder</p>
</div>

<button class="accordion" onClick={this.toggleFun.bind(this, 1)}>Folder 2<span class="add-section"><i class="fa fa-plus" aria-hidden="true"></i>
</span> </button>
<div class="panel">
</div>

<button class="accordion" onClick={this.toggleFun.bind(this, 2)}>Folder 3<span class="add-section"><i class="fa fa-minus" aria-hidden="true"></i>
</span> </button>
<div class="panel">
  <p>sub-folder</p>
</div>
<button class="accordion" onClick={this.toggleFun.bind(this, 1)}>Folder 4<span class="add-section"><i class="fa fa-plus" aria-hidden="true"></i>
</span> </button>
<div class="panel">
</div>
	</div>

  <h3 className="directory-section">OR<br/> Aws Storage</h3>
    <div className = "accord-section">
<button class="accordion1" onClick={this.toggleFun.bind(this, 0)}>Folder 1 <span class="add-section"><i class="fa fa-plus" aria-hidden="true"></i>
</span> </button>

<div class="panel">
 <p>sub-folder</p>
</div>

<button class="accordion" onClick={this.toggleFun.bind(this, 1)}>Folder 2<span class="add-section"><i class="fa fa-plus" aria-hidden="true"></i>
</span> </button>
<div class="panel">
</div>

<button class="accordion" onClick={this.toggleFun.bind(this, 2)}>Folder 3<span class="add-section"><i class="fa fa-minus" aria-hidden="true"></i>
</span> </button>
<div class="panel">
  <p>sub-folder</p>
</div>
<button class="accordion" onClick={this.toggleFun.bind(this, 1)}>Folder 4<span class="add-section"><i class="fa fa-plus" aria-hidden="true"></i>
</span> </button>
<div class="panel">
</div>
	</div>
	</div>
				<div className="col-md-1"></div>
				<div className="col-md-5">
				   <div className="upload_img_img_sec">
				   <p>Image path</p>
				    <input type="text" name="imagePathAPI" value={this.state.imagePathAPI}/>
				
				  <img src={this.state.imagePathProduct}  />
				 
				</div>
				<div className="col-md-1"></div>
				</div>
				
				</div>
        <div className="row">
          
          <div className="col-md-6"> <button className="image_upload-lo_btn" type="submit" >Upload Image</button></div>
        </div><div className="col-md-6"></div>
                 
                  
                  </div>
               
              </Panel>
			  
			  
              <Panel>
               
                <div className="parent_search_product product_sku_sec">
                  
				  <div className="row">
				  
				  <div className="col-md-3 text-left new_skus">
				  
				  <Form onSubmit={this.addSKU}>
                                <FormGroup>
                                  <Label for='sku'>New Sku </Label>
                                  <Input
                                    type='text'
                                    name='newSKU'
                                    id='newSKU'
                                    placeholder='Enter Product SKU'
                                    className="form-control"
                                    value={this.state.newSKU} 
                                    onChange={this.updateValue}
                                  />
								  { isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : '' }
								  <Button color='dark' style={{ marginTop: '2rem', backgroundColor: '#e82234', color: 'white' }} block>
                                         Add Alt Sku
                                      </Button>
                                  
                                </FormGroup>
                              </Form>
				  
				  </div>
				  
				  <div className="col-md-3"></div>
				  
                     <div className="col-md-6 sku_add_add">
                    	<Label for='sku'>Alt Skus </Label>
					<div className="sku_list_product">
				
                        <table className="product_filter cstm_ul table table-hover text-left">
                            <tbody>
                              { (productSku.length > 0) ? 
                                productSku.map((SKU) => (
                                  <tr key={SKU.altsku}>
                                    <td>{SKU.altsku}</td>
                                    <td><button id={SKU.altsku} onClick={this.deleteSKU} className="cstm_product" type="submit" >Delete</button></td>
                                  </tr>
                                ))
                                : 
                                <tr>
                                  <td colSpan="2">No Alt Skus available.</td>
                                </tr>
                              }
                            </tbody>
                        </table>
                    </div>
					 </div>
					 
					 </div>
                    
                  </div>
                
              </Panel>
			      </div>
          </div>
        </Tabs>
      );
  	}
}

ProTabs.propTypes = {
  getSingleProduct: PropTypes.func
}

const mapStateToProps = state => ({
  productData: state.productDetail
});

export default connect(mapStateToProps, { getSingleProduct })(ProTabs);
