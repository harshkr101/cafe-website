import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

export default function ColumnsContainer() {
    return (
        <Container className='mt-4'>
            <Row className='text-center'>
                <Col>
                    <h2>Our Specialities</h2>
                </Col>
            </Row>
            <Row className='mt-3 text-left h-auto mb-4'>
                <Col className='mx-auto' md={5}>
                    <p>A plate full of peri peri french fries with special mexican whopper with a pinch of chilli.</p>
                </Col>

                <Col className='mx-auto' md={5}>
                    <p>Our mouth sweetning pancacke is the best in town.
                    </p>
                </Col>

                <Col className='mx-auto' md={5}>
                    <p>Surprise your taste buds with our chilli garlic noodles.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}