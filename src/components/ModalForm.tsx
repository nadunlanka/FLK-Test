import { useContext, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { ApplicantForm } from "./ApplicantForm";
import { IApplicant } from "../interfaces";
import { Context } from "../context";

export const ModalForm = (props: { show: boolean; setShow: Function; title: string, setData: Function }) => {
  
  const context = useContext(Context);
  const [newApplicant, setNewApplicant] = useState(false);
  const [primaryApplicant, setPrimaryApplicant] = useState(context!.primaryApplicant);

  const [applicantData, setApplicantData] = useState<IApplicant[]>(
    [{
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      errors : null
    }]
  );

  const setData = (data:IApplicant, index: number) => {
    let allApplicantData = applicantData;
    allApplicantData[index] = data;
    setApplicantData(allApplicantData);
  }

  const addApplicant = () => {
    const data: IApplicant[]  = applicantData;
    data.push({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      errors : null
    })
    setApplicantData(data);
    setNewApplicant(!newApplicant)
  }

  const clearData = async () => {
    setApplicantData([{
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: ""
    }]);
  }

  const handleClose = () => {
    props.setShow(false)
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validate = (applicants: IApplicant[]): boolean => {

    const newApplicants = [];
    let isValid =true;
    let isPrimary = false;
    for (const data of applicants) {
      const errorMessage = {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        isPrimary: ""
      };
      errorMessage.firstName = (data.firstName!.length === 0) ? "Please Enter First Name" : "";
      errorMessage.lastName = (data.lastName!.length === 0) ? "Please Enter last Name" : "";
      errorMessage.email = (data.email!.length === 0) ? "Please Enter Email" : "";
      errorMessage.mobileNumber = (data.mobileNumber!.length === 0) ? "Please Enter Mobile Number" : "";

      if (!errorMessage.mobileNumber) {
        errorMessage.mobileNumber = (data.mobileNumber!.length > 10 || data.mobileNumber!.length < 10) ? "Mobile Phone Number Is Invalid" : "";
      }

      if (!errorMessage.email) {
        errorMessage.email = (!validateEmail(data.email!)) ? "Invalid Email" : "";
      }

      if(data.isPrimary){
        isPrimary = true;
      }

      if (errorMessage.firstName || errorMessage.lastName || errorMessage.email || errorMessage.mobileNumber) {
        data.errors = errorMessage;
        newApplicants.push(data);
        isValid = false
      }else{
        data.errors = null;
        newApplicants.push(data);
      }
    }

    if (!isValid) {
      setApplicantData(newApplicants);
    }

    if(!isPrimary){
      alert("Please select a primary applicant.");
      return false;
    }

    return isValid;

  }

  const submitForm = async (event: any) => {
    if (!validate(applicantData)) {
      return;
    };

    props.setData(applicantData);
    await clearData();
    handleClose();
  }

  return (
    <Form>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            applicantData.map((data, i) => {
              return <div key={i}>
                {i > 0 ? <hr /> : "" }
                <ApplicantForm key={i} data={data} setData={(newData: IApplicant) => setData(newData, i)} selectedPrimaryApplicant={primaryApplicant} setPrimaryApplicant={setPrimaryApplicant} index={i+context!.applicants.length}/>
                {(data.errors) ? <Alert key={"danger"} variant={"danger"} style={{ marginBottom: "10px" }}>
                <div>{data.errors.firstName!}</div>
                <div>{data.errors.lastName!}</div>
                <div>{data.errors.email!}</div>
                <div>{data.errors.mobileNumber!}</div>
                </Alert> : ""}
              </div>
            })
          }
          <div style={{textAlign:"right"}}>
            <Button variant="primary" onClick={addApplicant} style={{borderRadius: 20}}>
              +
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitForm}>
            Add Applicants
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}