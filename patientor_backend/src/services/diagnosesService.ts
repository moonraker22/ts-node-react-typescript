import diagnoses from '../../data/diagnoses';
import { Diagnoses } from '../types';


const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses
};