import React from 'react';
import CustomParallax from "../components/CustomParallax";
import menu_top from "../assets/menu_top.jpg";
import Container from "@material-ui/core/Container";

export default function Terms() {
    return (
        <div>
            <CustomParallax title='Terms of Service' img={menu_top} height={300}/>
            <Container>
                <div className="cell-wrapper layout-widget-wrapper">
                    <p>Terms of Service</p>
                </div>
            </Container>
        </div>
    );
}