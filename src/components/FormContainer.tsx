import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

interface FormContainerProps {
  children: React.ReactNode;
  formName?: string;
}

const FormContainer = ({ children, formName }: FormContainerProps) => {
  return (
    <>
      <Container className="py-3">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card>
              <Card.Header className="d-flex align-items-center">
                {formName ? <h3 className="my-2">{formName}</h3> : "Form"}
              </Card.Header>
              <Card.Body>{children}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormContainer;
