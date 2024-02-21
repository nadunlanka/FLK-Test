interface Applicant {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobileNumber?: string;
    isPrimary?: boolean | string;
}

export interface IApplicant extends Applicant{
    errors?: Applicant | null;
}

export type IApplicantContext = {
    applicants: IApplicant[];
    setApplicants: React.Dispatch<React.SetStateAction<IApplicant[]>>;
    primaryApplicant: number | null;
    setPrimaryApplicant: React.Dispatch<React.SetStateAction<number | null>>;

}