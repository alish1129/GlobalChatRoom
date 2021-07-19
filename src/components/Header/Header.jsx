import React from 'react';
import {AmplifySignOut} from '@aws-amplify/ui-react';
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav} from "mdbreact";
const Header = () => {

    return (
        <MDBNavbar color="unique-color-dark" dark expand="md">
            <MDBNavbarBrand>
                <strong className="white-text">ChatApp</strong>
            </MDBNavbarBrand>
            <MDBNavbarNav left>
            </MDBNavbarNav>
            <MDBNavbarNav right>
                <AmplifySignOut className="signoutButton float-right" />
            </MDBNavbarNav>
        </MDBNavbar>
    )
}

export default Header;