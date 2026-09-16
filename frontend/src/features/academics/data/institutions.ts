import { Institution } from '../types';
import { btechCseAiProgram } from './programs';

export const vishwakarmaInstituteOfTechnology: Institution = {
  id: 'institution-vishwakarma',
  name: 'Vishwakarma Institute of Technology',
  shortName: 'VIT Pune',
  trustName: "Bansilal Ramnath Agarwal Charitable Trust's",
  affiliation: 'An Autonomous Institute affiliated to Savitribai Phule Pune University',
  vision: 'To be globally acclaimed Institute in Technical Education and Research for holistic Socio-economic development.',
  mission: [
    'To ensure that 100% students are employable and employed in Industry, Higher Studies, become Entrepreneurs, Civil / Defense Services / Govt. Jobs and other areas like Sports and Theatre.',
    'To strengthen Academic Practices in terms of Curriculum, Pedagogy, Assessment and Faculty Competence.',
    'Promote Research Culture among Students and Faculty through Projects and Consultancy.',
    'To make students Socially Responsible Citizen.',
  ],
  programs: [btechCseAiProgram],
};

export const allInstitutions: Institution[] = [vishwakarmaInstituteOfTechnology];
