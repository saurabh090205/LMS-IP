import { Assignment } from '../../types/lms';

export const mockAssignments: Assignment[] = [
  {
    id: 'asg-dl-prac-1',
    courseId: 'ci3001',
    courseCode: 'CI3001',
    courseTitle: 'Deep Learning',
    title: 'Practical 1: TensorFlow/Keras Setup, Data Preprocessing & Train-Test Splitting',
    description: 'Install and configure TensorFlow/Keras in Google Colab. Perform data preprocessing, normalization, train-test splitting, and data visualization on a sample dataset.',
    instructions: `### Syllabus Practical Guidelines:
1. Initialize Google Colab environment with GPU accelerator acceleration enabled.
2. Load a standard benchmark dataset (e.g. MNIST / California Housing).
3. Implement Min-Max scaling and Z-score standardization pipelines.
4. Execute 80/10/10 train-validation-test stratified splitting.
5. Generate distribution histograms and correlation heatmaps.`,
    dueDate: 'Sep 05, 2026',
    dueTime: '11:59 PM IST',
    totalMarks: 100,
    weightagePercent: 10,
    status: 'GRADED',
    userSubmission: {
      id: 'sub-dl-101',
      assignmentId: 'asg-dl-prac-1',
      studentId: 'usr_std_101',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@shreenil.edu',
      submittedAt: 'Sep 04, 2026, 7:30 PM',
      status: 'GRADED',
      textResponse: 'Configured TensorFlow 2.16 with CUDA GPU acceleration. Normalization and stratified splitting verified on Colab notebook.',
      attachments: ['aarav_dl_practical_1_colab.ipynb', 'preprocessing_report.pdf'],
      marksAwarded: 96,
      maxMarks: 100,
      feedback: 'Excellent data pipeline and visualization plots. Correct implementation of feature scaling.',
      gradedAt: 'Sep 07, 2026',
      gradedBy: 'Dr. Elena Rostova',
    },
  },
  {
    id: 'asg-dl-prac-2',
    courseId: 'ci3001',
    courseCode: 'CI3001',
    courseTitle: 'Deep Learning',
    title: 'Practical 2: Multilayer Perceptron (MLP) Classification on Iris/Wine Dataset',
    description: 'Design and implement a Multilayer Perceptron (MLP) for classification of the Iris or Wine dataset, and evaluate its performance using accuracy and a confusion matrix.',
    instructions: `### Lab Deliverables:
1. Define neural network architecture with hidden dense layers and ReLU activation functions.
2. Use Softmax output activation for multi-class probability distribution.
3. Train model with categorical cross-entropy loss and Adam optimizer.
4. Plot learning curves (training vs validation loss/accuracy across epochs).
5. Compute precision, recall, F1-score and render a Seaborn confusion matrix.`,
    dueDate: 'Sep 12, 2026',
    dueTime: '11:59 PM IST',
    totalMarks: 100,
    weightagePercent: 10,
    status: 'SUBMITTED',
    userSubmission: {
      id: 'sub-dl-102',
      assignmentId: 'asg-dl-prac-2',
      studentId: 'usr_std_101',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@shreenil.edu',
      submittedAt: 'Sep 11, 2026, 9:15 PM',
      status: 'PENDING',
      textResponse: 'Implemented 3-layer MLP on Wine classification dataset. Achieved 97.2% test accuracy with zero overfitting.',
      attachments: ['mlp_classification_wine.ipynb'],
      maxMarks: 100,
    },
  },
  {
    id: 'asg-dl-prac-3',
    courseId: 'ci3001',
    courseCode: 'CI3001',
    courseTitle: 'Deep Learning',
    title: 'Practical 3: Forward & Backpropagation with Learning Rate Tuning',
    description: 'Implement forward propagation and backpropagation using TensorFlow/Keras. Analyze the effect of different learning rates and the number of epochs on model performance.',
    instructions: `### Objectives:
1. Write custom training loop with \`tf.GradientTape\`.
2. Compute parameter updates using analytical gradient calculations.
3. Compare learning rate schedules: $\\eta \\in [0.1, 0.01, 0.001, 0.0001]$.
4. Document loss oscillations vs steady convergence in tabular format.`,
    dueDate: 'Sep 20, 2026',
    dueTime: '11:59 PM IST',
    totalMarks: 100,
    weightagePercent: 10,
    status: 'UPCOMING',
    rubric: [
      { id: 'rub-1', title: 'Gradient Calculation & Tape Loop', description: 'Accurate forward pass and backward differentiation loop.', maxPoints: 40 },
      { id: 'rub-2', title: 'Learning Rate Comparative Study', description: 'Empirical analysis across multiple learning rate regimes.', maxPoints: 30 },
      { id: 'rub-3', title: 'Report & Discussion', description: 'Detailed observations on vanishing gradients and epoch tuning.', maxPoints: 30 },
    ],
  },
  {
    id: 'asg-os-prac-1',
    courseId: 'ci3202',
    courseCode: 'CI3202',
    courseTitle: 'Operating System',
    title: 'Practical 1: Shell & Awk Programming for Student Database Management',
    description: 'Implement student database using shell and awk programming to perform operations: Create database, View, Insert, Delete, Modify record, and Display result.',
    instructions: 'Write bash script with menu-driven interface using awk and sed utilities. Handle edge cases like duplicate student IDs.',
    dueDate: 'Sep 16, 2026',
    dueTime: '5:00 PM IST',
    totalMarks: 50,
    weightagePercent: 10,
    status: 'UPCOMING',
  },
  {
    id: 'asg-erai-prac-6',
    courseId: 'ci3203a',
    courseCode: 'CI3203A',
    courseTitle: 'Ethical and Responsible AI',
    title: 'Practical 6: Demographic Parity Difference Analysis on UCI Adult Dataset',
    description: 'Load the UCI Adult Income CSV; compute Demographic Parity Difference by gender using pandas; plot a grouped bar chart of positive-prediction rates; state whether bias exists and by how much.',
    instructions: 'Compute statistical parity difference and disparate impact ratio. Suggest pre-processing reweighing or in-processing adversarial debiasing mitigations.',
    dueDate: 'Sep 24, 2026',
    dueTime: '11:59 PM IST',
    totalMarks: 50,
    weightagePercent: 10,
    status: 'UPCOMING',
  },
  {
    id: 'asg-mlops-prac-1',
    courseId: 'ci3003d',
    courseCode: 'CI3003D',
    courseTitle: 'MLOPS',
    title: 'Practical 1: Dataset Versioning & Remote Storage Tracking with DVC',
    description: 'Implement dataset versioning using DVC. Configure local/remote storage and link dataset commits with Git history.',
    instructions: 'Initialize DVC tracking on a multi-gigabyte image dataset. Push metadata pointers to GitHub and verify clean reproducibility.',
    dueDate: 'Sep 28, 2026',
    dueTime: '11:59 PM IST',
    totalMarks: 50,
    weightagePercent: 10,
    status: 'UPCOMING',
  },
];
