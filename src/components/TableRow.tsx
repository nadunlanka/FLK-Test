import { Button, Form } from "react-bootstrap"

export const TableRow = (props: {
    number: number; firstName: string; lastName: string, primaryApplicant: number | null, mobileNumber:string, email: string, setSwitchId:Function, switchId: number | null, deleteFunction: Function
}) => {
    return (
        <tr id={props.number.toString()}>
            <td>{props.number}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.mobileNumber}</td>
            <td>
                <Form.Check
                    disabled = {(props.switchId === null) ? false : props.primaryApplicant !== props.number}
                    type="checkbox"
                    checked={props.primaryApplicant === props.number}
                    id={`switch_${props.number}`}
                    onClick={() => (props.switchId === null) ? props.setSwitchId(props.number) : props.setSwitchId(null)}
                />
            </td>
            <td>{props.email}</td>
            <td><Button variant="danger" onClick={(event) => {props.deleteFunction(props.number)}}>Delete</Button></td>
        </tr>
    )
}