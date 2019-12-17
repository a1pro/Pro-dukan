import React from 'react'
import { Tabs, Tab, Panel } from '@bumaga/tabs' 

export default (props) => (
  <Tabs>
    <div>
      <Tab><button>Product Details</button></Tab>
      <Tab><button>Product Image</button></Tab>
      <Tab><button>Product Sku</button></Tab>
    </div>

    <Panel><div><label>Name</label> <input type="text" id="name" value={this.props.item.itemname} placeholder="Product Name"/></div>
    <div><label>Brand</label> <input type="text" id="brand" value={this.props.item.brand} placeholder="Product Brand"/></div>
    <div><label>Product Type</label> <input type="text" id="type" value={this.props.item.producttype} placeholder="Product Type"/></div>
    <div><label>Product Theme</label> <input type="text" id="theme" value={this.props.item.theme} placeholder="Product Theme"/></div>
    <div><textarea id="description" placeholder="description">{this.props.item.description}</textarea></div>
    </Panel>
    <Panel><div><img src={this.props.path} width="30%" height="30%"/>  </div></Panel>
    <Panel><p>No Sku</p></Panel>
  </Tabs>
);