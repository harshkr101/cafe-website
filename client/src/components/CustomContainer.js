import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

export default function CustomContainer() {
    return (
        <Container className='h-auto my-4 pt-3'>
            <Row className='h-100'>
                <Col className="text-center m-auto">
                    <h2 className='text-uppercase'>a destination</h2>
                    <p className='m-auto w-75 pb-lg-5'>Our cafe ambience is fitted to suit all your needs.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}