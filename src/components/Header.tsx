import { Button, Container, Navbar } from "react-bootstrap";
import { ModalForm } from "./ModalForm";
import { useContext, useState } from "react";
import { IApplicant } from "../interfaces";
import { Context } from "../context";

export const Header = () => {
    const [show, setShow] = useState(false);
    const context = useContext(Context);

    const addApplicants = (data: IApplicant[]) => {
        let currentApplicants = context?.applicants;
        let i = 0;
        for (const applicant of data) {
           if(applicant.isPrimary){
            context?.setPrimaryApplicant(i + currentApplicants!.length);
           } 
           i++;

        }

        currentApplicants = [...currentApplicants!, ...data];
        context?.setApplicants(currentApplicants);

    }

    const handleShow = () => setShow(true);
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">FLK - Test</Navbar.Brand>
                <Button variant="primary" onClick={handleShow}>
                    Add Applicants
                </Button>
            </Container>
            <ModalForm setShow={setShow} show={show} title="Add Applicant" setData={addApplicants}/>
        </Navbar>
    )
}