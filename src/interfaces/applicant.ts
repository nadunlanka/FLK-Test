interface Applicant {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobileNumber?: string;
}

export interface IApplicant extends Applicant{
    errors?: Applicant | null;
}

export type IApplicantContext = {
    applicants: IApplicant[];
    setApplicants: React.Dispatch<React.SetStateAction<IApplicant[]>>;
}