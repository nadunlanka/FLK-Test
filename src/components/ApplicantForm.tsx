import { Form } from "react-bootstrap"

export const ApplicantForm = (props: {data: any, setData: Function}) => {
    const setFormData = (event: any, attributeName: string) => {
        const formData = props.data;
        formData[attributeName] = event.target.value;
        props.setData(formData);
    }

    return (
        <div style={{padding: 10, marginTop: 5, background: "#fbf6f6"}}>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={(event) => {setFormData(event,"firstName")}} defaultValue={props.data.firstName}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={(event) => {setFormData(event,"lastName")}} defaultValue={props.data.lastName}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" onChange={(event) => {setFormData(event,"email")}} defaultValue={props.data.email}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" min="10" placeholder="Enter Mobile Number" onChange={(event) => {setFormData(event,"mobileNumber")}} defaultValue={props.data.mobileNumber}/>
            </Form.Group>
        </div>
    )
}