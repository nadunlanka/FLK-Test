import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { TableRow } from "./TableRow";
import { Context } from '../context';


export const ApplicantTable = () => {

    const context = useContext(Context);
    const [selectedSwitchId, setSelectedSwitchId] = useState<number | null>(context!.primaryApplicant);

    const deleteRow = async (index: number) => {
        let currentApplicants = context!.applicants;
        currentApplicants.splice(index, 1);
        context!.setApplicants(currentApplicants);

        //rerender the table after updating the selectedSwitchId
        if (selectedSwitchId === index) {
            setSelectedSwitchId(null);
        }
    }

    const setSwitch = (id: number, index: number) => {
        if(selectedSwitchId === id){
            setSelectedSwitchId(null);
            context!.setPrimaryApplicant(null);
        }else{
            setSelectedSwitchId(id);
            context!.setPrimaryApplicant(id);
        }
    }

    useEffect(() => {
        setSelectedSwitchId(context!.primaryApplicant);
    }, [context, selectedSwitchId])

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Primary Applicant</th>
                        <th>Email</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {(context!.applicants.length === 0) ? <tr><td colSpan={7}>No Data Available</td></tr> :
                        context!.applicants.map((item: any, i: number) => {
                            return <TableRow key={i} number={i} firstName={item.firstName} lastName={item.lastName} mobileNumber={item.mobileNumber} email={item.email} primaryApplicant={selectedSwitchId} setSwitchId={setSwitch} switchId={selectedSwitchId} deleteFunction={() => deleteRow(i)} />
                        })}
                </tbody>
            </Table>
        </>

    )
}