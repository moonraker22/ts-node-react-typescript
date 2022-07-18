import diagnoses from '../../data/diagnoses';
import { Diagnoses } from '../types';

// const diagnoses : Array<Diagnoses> = diagnosesData;

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