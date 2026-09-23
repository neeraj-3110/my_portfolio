// Central place for links and identity. Empty strings render as a clearly
// disabled "coming soon" button, so nothing is ever a fake link.
export const site = {
  name: 'Neeraj Pal',
  email: 'neeraj4630@gmail.com',
  location: 'Vadodara, Gujarat, India',
  resume: {
    href: '/resume/Neeraj_Pal_Resume.pdf',
    filename: 'Neeraj_Pal_Resume.pdf',
  },
  social: {
    github: 'https://github.com/neeraj-3110', // TODO: e.g. 'https://github.com/your-username'
    linkedin: 'https://www.linkedin.com/in/neerajpal3110/', // TODO: e.g. 'https://www.linkedin.com/in/your-profile'
  },
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { index: '01', value: 'B.Tech', label: 'CSE (AI/ML)' },
  { index: '02', value: 7.5, decimals: 1, label: 'CGPA' },
  { index: '03', value: 2028, label: 'Expected Graduation' },
  { index: '04', value: 'AI/ML', label: 'Experience' },
]

export const education = [
  {
    school: 'Parul University, Vadodara',
    degree: 'B.Tech Computer Science Engineering',
    detail: 'Specialization: Artificial Intelligence & Machine Learning',
    period: 'Expected Graduation: 2028',
    score: 'CGPA: 7.5 / 10',
    coursework: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
    ],
  },
  {
    school: 'G.B.S.S.S Paprawat, New Delhi',
    degree: '12th Standard (CBSE)',
    detail: '',
    period: '2023',
    score: '70%',
    coursework: [],
  },
]
