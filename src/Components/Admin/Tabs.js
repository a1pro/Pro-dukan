import React, { Component } from 'react';


class ProTabs extends Component {
	constructor(props) {
		super(props)
		
	}
	
  	render() {
          return <div key={this.props.item.itemnum} id={this.props.item.itemnum} > <div>Name - {this.props.item.itemname} </div><div><img src={this.props.path} width="30%" height="30%"   alt="productImage" /></div><div>Brand - {this.props.item.brand}</div> <div>Description - {this.props.item.description}</div><div>Product Type - {this.props.item.producttype}</div><div>keywords - {this.props.item.keywords}</div> </div>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Home">
    <Sonnet />
  </Tab>
  <Tab eventKey="profile" title="Profile">
    <Sonnet />
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
    <Sonnet />
  </Tab>
</Tabs>
          ;
  	}
}

export default ProTabs;
