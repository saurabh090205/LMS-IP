import { CurriculumCourse } from '../../types';

export const imageProcessingCourse: CurriculumCourse = {
  id: 'course-image-processing',
  canonicalCode: 'CI4006',
  courseStructureCode: 'CI4006',
  syllabusTemplateCode: 'Image Processing',
  title: 'Image Processing',
  altTitle: 'Image Processing',
  credits: 2,
  teachingScheme: {
    theoryHoursPerWeek: 2,
    labHoursPerWeek: 0,
    tutorialHoursPerWeek: 0,
  },
  category: 'OE: Open Elective',
  nepClassification: 'OE',
  prerequisites: [
    'Digital logic Design',
    'Microprocessor',
    'Computer Organization',
  ],
  objectives: [
    'To describe different color models and image processing techniques.',
    'To analyze image condition and deduce enhancement algorithms.',
    'To apply image segmentation to identify the region of interest',
    'To develop an algorithm to recognize the specified objects in the given image.',
    'To study different image morphological operation.',
    'To learn different image compression techniques.',
  ],
  relevance:
    'Vision sense is the most powerful human sense organ. In the world where intelligent automation is taking place, image processing is a vital domain for research and development. In Industry 4.0, image processing systems built around industrial cameras are an essential component in automated production. Throughout all steps of production, from the inspection of raw materials and production monitoring to final inspections and quality assurance, they are an indispensable part of achieving high efficiency and quality standards.',
  units: [
    {
      id: 'ip-unit-1',
      courseId: 'course-image-processing',
      unitNumber: 'Unit-I',
      title: 'Introduction',
      teachingHours: 4,
      section: 'Section 1',
      orderIndex: 1,
      topics: [
        { id: 'ip-top-1-1', unitId: 'ip-unit-1', title: 'Elements of image processing system, Scenes and Images, Vector Algebra, Human Visual System, color vision color model: RGB, HVS, YUV, CMYK, YCbCr and some basic relationships between pixels, linear and nonlinear operations, Image sampling and quantization', orderIndex: 1 },
      ],
    },
    {
      id: 'ip-unit-2',
      courseId: 'course-image-processing',
      unitNumber: 'Unit-II',
      title: 'Image Enhancements',
      teachingHours: 5,
      section: 'Section 1',
      orderIndex: 2,
      topics: [
        { id: 'ip-top-2-1', unitId: 'ip-unit-2', title: 'Memory-less operations, Spatial domain image enhancements: Denoising filters, Smoothing Operation, Sharpening Operation, and Contrast stretching /enhancement, histogram and histogram equalization', orderIndex: 1 },
      ],
    },
    {
      id: 'ip-unit-3',
      courseId: 'course-image-processing',
      unitNumber: 'Unit-III',
      title: 'Image segmentation',
      teachingHours: 5,
      section: 'Section 1',
      orderIndex: 3,
      topics: [
        { id: 'ip-top-3-1', unitId: 'ip-unit-3', title: 'Classification of image segmentation techniques: Edge-based Segmentation, Region based techniques. Binarization: Global Thresholding, Adaptive thresholding. Types of Edge detector: derivative filters, Sobel, Canny. Edge linking. Feature Extraction', orderIndex: 1 },
      ],
    },
    {
      id: 'ip-unit-4',
      courseId: 'course-image-processing',
      unitNumber: 'Unit-IV',
      title: 'Morphological Operation',
      teachingHours: 4,
      section: 'Section 2',
      orderIndex: 4,
      topics: [
        { id: 'ip-top-4-1', unitId: 'ip-unit-4', title: 'Binary Morphology, Erosion Dilation, Opening and Closing', orderIndex: 1 },
      ],
    },
    {
      id: 'ip-unit-5',
      courseId: 'course-image-processing',
      unitNumber: 'Unit-V',
      title: 'Feature Extraction and Object Recognition',
      teachingHours: 5,
      section: 'Section 2',
      orderIndex: 5,
      topics: [
        { id: 'ip-top-5-1', unitId: 'ip-unit-5', title: 'Feature points and feature detection (Line, circle and corner). Line detection: RANSAC, Hough Transform. Corner detection: Harris Corner Detector. Feature descriptors, Descriptor matching. SIFT, Boundary representation (Chain code), Boundary detection-based techniques', orderIndex: 1 },
      ],
    },
    {
      id: 'ip-unit-6',
      courseId: 'course-image-processing',
      unitNumber: 'Unit-VI',
      title: 'Image Compression',
      teachingHours: 5,
      section: 'Section 2',
      orderIndex: 6,
      topics: [
        { id: 'ip-top-6-1', unitId: 'ip-unit-6', title: 'Introduction and need, Coding redundancy, classification of compression techniques (Lossy and lossless- JPEG, Run Length Coding, Huffman Coding, Shannon Fano coding)', orderIndex: 1 },
      ],
    },
  ],
  projectAreas: [
    { id: 'ip-proj-1', title: 'PCB inspection system defect identification' },
    { id: 'ip-proj-2', title: 'Agricultural crop and fruit segmentation' },
    { id: 'ip-proj-3', title: 'Cam-scanner style document enhancement & flattening' },
    { id: 'ip-proj-4', title: 'Tesseract OCR optical character recognition' },
  ],
  assessmentScheme: {
    heads: [
      { head: 'MCQ Exam (Mid Semester)', name: 'MCQ Exam – Section I - Mid Semester', maxMarks: 30, convertedMarks: 30, weightagePercent: 30 },
      { head: 'Home Assignment (End Semester)', name: 'Home Assignment - End of Semester', maxMarks: 100, convertedMarks: 10, weightagePercent: 10 },
      { head: 'MCQ Exam (End Semester)', name: 'MCQ Exam – Section II - End of Semester', maxMarks: 30, convertedMarks: 30, weightagePercent: 30 },
      { head: 'Comprehensive Viva Voce (End Semester)', name: 'Comprehensive Viva Voce - End of Semester', maxMarks: 100, convertedMarks: 30, weightagePercent: 30 },
    ],
    totalMarks: 100,
  },
  textbooks: [
    { id: 'ip-tb-1', authors: 'Rafael Gonzalez and Richard Woods', title: 'Digital Image Processing', edition: '3rd ed.', publisher: 'Pearson publications', year: 2008, isbn: '0132345633', format: 'PRINT' },
    { id: 'ip-tb-2', authors: 'Anil K. Jain', title: 'Fundamental of Digital Image Processing', edition: '5th ed.', publisher: 'PHI publication', year: 1989, isbn: '9780133361650', format: 'PRINT' },
  ],
  referenceBooks: [
    { id: 'ip-rb-1', authors: 'W. K. Pratt', title: 'Digital Image Processing', edition: '3rd ed.', publisher: 'Wiley Publication', year: 2001, isbn: '0-471-37407-5', format: 'PRINT' },
    { id: 'ip-rb-2', authors: 'K. R. Castleman', title: 'Digital Image Processing', edition: '3rd ed.', publisher: 'Prentice Hall', year: 1996, isbn: '0-13-211467-4', format: 'PRINT' },
  ],
  moocs: [
    { id: 'ip-mooc-1', title: 'Digital Image Processing - NPTEL IIT Kharagpur', platform: 'NPTEL', url: 'https://nptel.ac.in/courses/117/105/117105135/' },
    { id: 'ip-mooc-2', title: 'Computer Vision Basics', platform: 'Coursera', url: 'https://www.coursera.org/learn/computer-vision-basics' },
  ],
  courseOutcomes: [
    { code: 'CO1', description: 'Recognize different color models and image processing techniques.', bloomsLevel: 'L1' },
    { code: 'CO2', description: 'Select image enhancement algorithm to improve the quality of image.', bloomsLevel: 'L2' },
    { code: 'CO3', description: 'Build image segmentation techniques to identify region of interest.', bloomsLevel: 'L4' },
    { code: 'CO4', description: 'Predict image morphological techniques to resize the image.', bloomsLevel: 'L3' },
    { code: 'CO5', description: 'Construct an algorithm to recognize the specified objects in the given image.', bloomsLevel: 'L5' },
    { code: 'CO6', description: 'Identify different image compression techniques to reduce the size of image.', bloomsLevel: 'L3' },
  ],
  futureCourseMapping: ['Augmented Reality', 'Multimedia Processing'],
  jobMapping: ['Augmented Reality Experience Designer', 'Automation Engineer', 'Embedded Software Developer', 'Image Processing Expert'],
};
