import { createContext } from 'react';
import { IApplicantContext } from "./interfaces";

export const Context = createContext<IApplicantContext | null>(null);