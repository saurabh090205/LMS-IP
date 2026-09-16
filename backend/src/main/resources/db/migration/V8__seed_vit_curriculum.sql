-- V8__seed_vit_curriculum.sql: Seed Official VIT Pune B.Tech CSE (AI) AY 2026-27 Curriculum
INSERT INTO institutions (id, tenant_id, name, short_name, trust_name, affiliation, vision, mission)
VALUES (
    'institution-vit',
    'tenant-default',
    'Vishwakarma Institute of Technology',
    'VIT Pune',
    'Bansilal Ramnath Agarwal Charitable Trust''s',
    'An Autonomous Institute affiliated to Savitribai Phule Pune University',
    'To be globally acclaimed Institute in Technical Education and Research for holistic Socio-economic development.',
    'To ensure that 100% students are employable and employed in Industry, Higher Studies, become Entrepreneurs, Civil / Defense Services / Govt. Jobs and other areas like Sports and Theatre.'
);

INSERT INTO programs (id, institution_id, name, degree, department, board_of_studies)
VALUES (
    'program-btech-cse-ai',
    'institution-vit',
    'B.Tech. Computer Science & Engineering (Artificial Intelligence)',
    'B.Tech',
    'Computer Science and Engineering (Artificial Intelligence)',
    'Board of Studies in CSE (Artificial Intelligence)'
);

INSERT INTO academic_years (id, program_id, code, name, effective_from)
VALUES (
    'ay-2026-27',
    'program-btech-cse-ai',
    'AY 2026-27',
    'Academic Year 2026-27',
    '2026-08-01'
);

INSERT INTO academic_modules (id, academic_year_id, year_level, module_code, title, total_credits)
VALUES 
('module-v', 'ay-2026-27', 'T.Y. B.Tech', 'Module V', 'Third Year Module V (T.Y. B.Tech CSE AI)', 24),
('module-vii', 'ay-2026-27', 'Final Year B.Tech', 'Module VII', 'Final Year Module VII (B.Tech CSE AI)', 16),
('module-viii', 'ay-2026-27', 'Final Year B.Tech', 'Module VIII', 'Final Year Module VIII (B.Tech CSE AI)', 16);

-- 1. DEEP LEARNING (CI3001 / CI3201)
INSERT INTO courses (id, academic_module_id, canonical_code, course_structure_code, syllabus_template_code, title, alt_title, credits, theory_hours_per_week, lab_hours_per_week, tutorial_hours_per_week, category, nep_classification, prerequisites, objectives, relevance, status)
VALUES (
    'course-deep-learning',
    'module-v',
    'CI3001',
    'CI3001',
    'CI3201',
    'Deep Learning',
    'CI3201: Deep Learning',
    4, 3, 2, 0,
    'PCC: Program Core Course',
    'PCC',
    'Machine Learning, Python Programming, Linear Algebra, Probability and Statistics, Full Stack Development',
    '1. To introduce fundamental concepts and architectures in deep learning. 2. To develop understanding of neural networks and learning algorithms. 3. To study CNN, RNN, and GRU architectures. 4. To explore CNNs for visual recognition. 5. To learn transfer learning, autoencoders, and transformers. 6. To apply deep learning models for real-world problems.',
    'This course focuses on the design, training, and optimization of deep neural network architectures for learning complex patterns from large-scale data. It equips students with techniques such as CNNs, RNNs, LSTMs, Transformers, and transfer learning for solving advanced AI problems.',
    'PUBLISHED'
);

-- Deep Learning Units
INSERT INTO units (id, course_id, unit_number, title, teaching_hours, section_name, order_index) VALUES
('dl-unit-1', 'course-deep-learning', 'Unit-I', 'Fundamental of Deep Learning', 6, 'Section 1', 1),
('dl-unit-2', 'course-deep-learning', 'Unit-II', 'Perceptron and Neural Network Architecture', 6, 'Section 1', 2),
('dl-unit-3', 'course-deep-learning', 'Unit-III', 'RNN, LSTM and GRU Architectures', 9, 'Section 1', 3),
('dl-unit-4', 'course-deep-learning', 'Unit-IV', 'Convolutional Neural Networks (CNN)', 6, 'Section 2', 4),
('dl-unit-5', 'course-deep-learning', 'Unit-V', 'Advanced Deep Learning Architectures', 7, 'Section 2', 5),
('dl-unit-6', 'course-deep-learning', 'Unit-VI', 'Applications of Deep Learning', 8, 'Section 2', 6);

-- Deep Learning Topics
INSERT INTO topics (id, unit_id, title, order_index, estimated_minutes) VALUES
('dl-top-1-1', 'dl-unit-1', 'Introduction to Artificial Intelligence, Machine Learning, and Deep Learning', 1, 45),
('dl-top-1-2', 'dl-unit-1', 'Limitations of machine learning, Advantage and challenges of deep learning', 2, 45),
('dl-top-1-3', 'dl-unit-1', 'Evolution and applications of Deep Learning', 3, 45),
('dl-top-1-4', 'dl-unit-1', 'Introduction to TensorFlow, Keras, and PyTorch, GPU and cloud-based platforms (Google Colab)', 4, 45),
('dl-top-1-5', 'dl-unit-1', 'Overfitting and Underfitting, Regularization Techniques, Batch Processing and Epochs', 5, 45),
('dl-top-1-6', 'dl-unit-1', 'Data Preparation for Deep Learning: Dataset collection and preprocessing, Data normalization and scaling, Training, validation, and testing datasets', 6, 45),
('dl-top-2-1', 'dl-unit-2', 'Biological neuron vs artificial neuron, Perceptron model and multilayer perceptron, Weight and Bias', 1, 45),
('dl-top-2-2', 'dl-unit-2', 'Activation functions: Sigmoid, Tanh, ReLU, Softmax', 2, 45),
('dl-top-2-3', 'dl-unit-2', 'Loss functions and optimization basics, Notation, Calculation of Trainable Parameters', 3, 45),
('dl-top-2-4', 'dl-unit-2', 'Backpropagation and Forward propagation', 4, 45),
('dl-top-2-5', 'dl-unit-2', 'XOR Problem and Limitations of Perceptron', 5, 45),
('dl-top-3-1', 'dl-unit-3', 'Introduction to Sequential Data, Need for Recurrent Neural Networks, Applications of RNN in Real-world Problems', 1, 45),
('dl-top-3-2', 'dl-unit-3', 'Architecture of Recurrent Neural Network, Difference Between Feed Forward Network and RNN, Layers in RNN', 2, 45),
('dl-top-3-3', 'dl-unit-3', 'Mathematical Representation of RNN, Forward Propagation, Backpropagation Through Time (BPTT), Training Process', 3, 45),
('dl-top-3-4', 'dl-unit-3', 'Vanishing Gradient Problem, Exploding Gradient Problem, Limitations of Traditional RNN', 4, 45),
('dl-top-3-5', 'dl-unit-3', 'Introduction to Long Short-Term Memory (LSTM), Architecture, Gates in LSTM, Mathematical Equations of LSTM Gates', 5, 45),
('dl-top-3-6', 'dl-unit-3', 'Calculation of Trainable Parameters in RNN and LSTM, Applications of LSTM in NLP and Time Series Forecasting', 6, 45),
('dl-top-3-7', 'dl-unit-3', 'Gated Recurrent Unit (GRU), Need for GRU, Architecture, Limitations of Traditional RNN, Architecture of GRU, Components of GRU, Comparison Between RNN, LSTM, and GRU', 7, 45),
('dl-top-4-1', 'dl-unit-4', 'Introduction to CNN: Need for CNN in image processing, Convolution operation and feature extraction', 1, 45),
('dl-top-4-2', 'dl-unit-4', 'CNN Architecture: Convolution layer, Filters, Kernels, Stride, and Padding', 2, 45),
('dl-top-4-3', 'dl-unit-4', 'Activation Functions in CNN, Pooling Layers (Max Pooling, Average Pooling), Fully Connected Layers', 3, 45),
('dl-top-4-4', 'dl-unit-4', 'Batch Normalization and Dropout, CNN Hyperparameters', 4, 45),
('dl-top-4-5', 'dl-unit-4', 'Popular CNN Models: AlexNet, VGG, ResNet, EfficientNet, Applications of CNN', 5, 45),
('dl-top-5-1', 'dl-unit-5', 'Limitations of Traditional Neural Networks, Transfer Learning: Pre-trained models and fine-tuning', 1, 45),
('dl-top-5-2', 'dl-unit-5', 'Autoencoders and Generative Models: Autoencoders and dimensionality reduction', 2, 45),
('dl-top-5-3', 'dl-unit-5', 'Bidirectional Encoder Representations (BERT), Generative Adversarial Networks (GANs)', 3, 45),
('dl-top-5-4', 'dl-unit-5', 'Graph Neural Networks (GNN), Vision Transformers (ViT)', 4, 45),
('dl-top-6-1', 'dl-unit-6', 'Deep Learning for Image Processing: Image segmentation and enhancement, Disease prediction using medical images', 1, 45),
('dl-top-6-2', 'dl-unit-6', 'Deep Learning for Text Processing: Natural Language Processing (NLP), Chatbots, Text classification and summarization', 2, 45),
('dl-top-6-3', 'dl-unit-6', 'Deep Learning for Audio and Video Processing: Speech-to-text systems, Audio classification, Video analysis', 3, 45),
('dl-top-6-4', 'dl-unit-6', 'Deep Learning for Numerical and Sensor Data: Time-series prediction, financial forecasting, IoT and smart sensor applications', 4, 45);

-- Deep Learning Practicals
INSERT INTO practicals (id, course_id, practical_number, title, description) VALUES
('dl-prac-1', 'course-deep-learning', 1, 'Install and configure TensorFlow/Keras in Google Colab. Perform data preprocessing, normalization, train-test splitting, and data visualization on a sample dataset.', 'Google Colab setup, NumPy/Pandas pipelines, and train-test splits.'),
('dl-prac-2', 'course-deep-learning', 2, 'Design and implement a Multilayer Perceptron (MLP) for classification of the Iris or Wine dataset, and evaluate its performance using accuracy and a confusion matrix.', 'MLP architecture, softmax activation, and evaluation.'),
('dl-prac-3', 'course-deep-learning', 3, 'Implement forward propagation and backpropagation using TensorFlow/Keras. Analyze the effect of different learning rates and the number of epochs on model performance.', 'Gradient tape loops and hyperparameter comparison.'),
('dl-prac-4', 'course-deep-learning', 4, 'Develop an LSTM-based model for time-series forecasting using stock price, weather, or sales datasets.', 'Sequence windowing, LSTM cells, and loss curves.'),
('dl-prac-5', 'course-deep-learning', 5, 'Implement and compare RNN, LSTM, and GRU models for sequence classification, and analyze their performance using appropriate evaluation metrics.', 'Benchmarking recurrent units.'),
('dl-prac-6', 'course-deep-learning', 6, 'Design and implement a Convolutional Neural Network (CNN) for image classification using the Tomato or Soybean disease dataset.', 'Conv2D, MaxPooling, and disease categorization.'),
('dl-prac-7', 'course-deep-learning', 7, 'Implement transfer learning using pre-trained AlexNet, VGG16, ResNet50, and EfficientNetB0 models for image classification, and compare their performance.', 'Fine-tuning bottleneck layers.'),
('dl-prac-8', 'course-deep-learning', 8, 'Implement a pre-trained BERT model for sentiment analysis or text classification on a sample dataset.', 'Hugging Face Transformers and fine-tuning BERT.'),
('dl-prac-9', 'course-deep-learning', 9, 'Perform image classification using a pre-trained Vision Transformer (ViT) model and compare its performance with a CNN model.', 'Patch embeddings vs spatial convolutions.'),
('dl-prac-10', 'course-deep-learning', 10, 'Design and implement a deep learning application for audio classification that incorporates Speech-to-Text (STT) and Text-to-Speech (TTS) using an appropriate deep learning architecture.', 'Speech analytics and audio preprocessing.');

-- Deep Learning Project Areas
INSERT INTO project_areas (id, course_id, order_index, title, domain) VALUES
('dl-proj-1', 'course-deep-learning', 1, 'Plant Disease Detection and Severity Assessment System', 'Agriculture AI'),
('dl-proj-2', 'course-deep-learning', 2, 'AI-Based Brain Tumor Classification Using MRI Images', 'Healthcare AI'),
('dl-proj-3', 'course-deep-learning', 3, 'Fake News Detection Using Deep Learning and NLP', 'Cyber Security / Media'),
('dl-proj-4', 'course-deep-learning', 4, 'Deepfake Image and Video Detection Framework', 'Computer Vision / Security'),
('dl-proj-5', 'course-deep-learning', 5, 'Speech Emotion Recognition System', 'Audio / Speech Analytics'),
('dl-proj-6', 'course-deep-learning', 6, 'Image Caption Generation Using CNN and LSTM', 'Multimodal AI'),
('dl-proj-7', 'course-deep-learning', 7, 'Intelligent Traffic Density Estimation and Signal Optimization', 'Smart Cities'),
('dl-proj-8', 'course-deep-learning', 8, 'Human Activity Recognition Using Wearable Sensor Data', 'IoT & Edge AI'),
('dl-proj-9', 'course-deep-learning', 9, 'Sign Language Recognition Using Deep Learning', 'Accessibility'),
('dl-proj-10', 'course-deep-learning', 10, 'Multilingual Chatbot Using Transformer Models', 'NLP & LLMs'),
('dl-proj-11', 'course-deep-learning', 11, 'Audio-Based Bird Species Classification System', 'Bioacoustics'),
('dl-proj-12', 'course-deep-learning', 12, 'Network Intrusion Detection Using Deep Neural Networks', 'Cybersecurity'),
('dl-proj-13', 'course-deep-learning', 13, 'Automatic Medical Report Classification and Summarization', 'Clinical NLP'),
('dl-proj-14', 'course-deep-learning', 14, 'Financial Fraud Detection Using Deep Learning', 'FinTech'),
('dl-proj-15', 'course-deep-learning', 15, 'AI-Based Resume Screening and Candidate Ranking System', 'HR Tech'),
('dl-proj-16', 'course-deep-learning', 16, 'Image Forgery Detection Using CNN and Attention Mechanisms', 'Forensics'),
('dl-proj-17', 'course-deep-learning', 17, 'Automatic Waste Classification for Smart Cities', 'Environmental AI'),
('dl-proj-18', 'course-deep-learning', 18, 'Cervical Cancer Cell Classification Using Transfer Learning', 'Oncology AI');

-- Deep Learning Course Outcomes
INSERT INTO course_outcomes (id, course_id, code, description, blooms_level) VALUES
('dl-co-1', 'course-deep-learning', 'CO1', 'Explain the fundamentals of deep learning, data preparation techniques, and deep learning frameworks for building intelligent systems.', 'L2'),
('dl-co-2', 'course-deep-learning', 'CO2', 'Apply perceptron and neural network architectures, activation functions, and backpropagation algorithms for solving classification problems.', 'L3'),
('dl-co-3', 'course-deep-learning', 'CO3', 'Examine sequential data using RNN, LSTM, and GRU architectures for prediction and classification tasks.', 'L4'),
('dl-co-4', 'course-deep-learning', 'CO4', 'Analyze the architecture, components, and performance of convolutional neural network models for image processing and computer vision applications.', 'L4'),
('dl-co-5', 'course-deep-learning', 'CO5', 'Apply advanced deep learning architectures and optimization techniques to solve complex learning problems across diverse application domains.', 'L3'),
('dl-co-6', 'course-deep-learning', 'CO6', 'Implement deep learning solutions for real-world applications involving image, text, audio, video, and numerical data.', 'L3');

-- Deep Learning Textbooks & References
INSERT INTO learning_resources (id, course_id, type, authors, title, edition, publisher, publication_year, isbn, status) VALUES
('dl-lr-1', 'course-deep-learning', 'TEXTBOOK', 'N. Buduma, N. Buduma, and J. Papa', 'Fundamentals of Deep Learning', '2nd ed.', 'O''Reilly Media', '2022', NULL, 'AVAILABLE'),
('dl-lr-2', 'course-deep-learning', 'TEXTBOOK', 'C. C. Aggarwal', 'Neural Networks and Deep Learning', '1st ed.', 'Springer', '2018', NULL, 'AVAILABLE'),
('dl-lr-3', 'course-deep-learning', 'TEXTBOOK', 'F. Chollet', 'Deep Learning with Python', '1st ed.', 'Manning Publications', '2018', NULL, 'AVAILABLE'),
('dl-lr-4', 'course-deep-learning', 'REFERENCE_BOOK', 'A. Géron', 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', '2nd ed.', 'O''Reilly Media', '2019', NULL, 'AVAILABLE'),
('dl-lr-5', 'course-deep-learning', 'MOOC', 'IIT Ropar', 'Deep Learning - IIT Ropar', NULL, 'NPTEL', '2026', NULL, 'AVAILABLE');

-- 2. OPERATING SYSTEM (CI3202)
INSERT INTO courses (id, academic_module_id, canonical_code, course_structure_code, syllabus_template_code, title, alt_title, credits, theory_hours_per_week, lab_hours_per_week, tutorial_hours_per_week, category, nep_classification, prerequisites, objectives, relevance, status)
VALUES (
    'course-operating-system',
    'module-v',
    'CI3202',
    'CI3202',
    'CI3202',
    'Operating System',
    'CI3202: Operating Systems',
    3, 2, 2, 0,
    'PCC: Program Core Course',
    'PCC',
    'C/C++ Programming, Data Structures, Computer Organization and Architecture',
    '1. Learn OS core structure. 2. Examine process scheduling. 3. Examine process synchronization. 4. Study memory management. 5. IO and disk management. 6. Android architecture and Linux kernel.',
    'The Operating System provides fundamental knowledge about how computer systems manage hardware and software resources efficiently.',
    'PUBLISHED'
);

-- 3. MLOPS (CI3003D / CI3203D)
INSERT INTO courses (id, academic_module_id, canonical_code, course_structure_code, syllabus_template_code, title, alt_title, credits, theory_hours_per_week, lab_hours_per_week, tutorial_hours_per_week, category, nep_classification, prerequisites, objectives, relevance, status)
VALUES (
    'course-mlops',
    'module-v',
    'CI3003D',
    'CI3003D',
    'CI3203D',
    'MLOPS',
    'CI3203D: Machine Learning and Operations',
    4, 3, 2, 0,
    'PCC: Program Core Course',
    'PCC',
    'Programming Fundamentals and Python, Basics of Machine Learning, Introduction to Cloud and DevOps Concepts',
    '1. Understand MLOps and ML lifecycle. 2. Data versioning and experiment tracking. 3. Build ML pipelines. 4. Deploy models using APIs and Docker. 5. Monitoring and Explainability. 6. Production-ready ML systems.',
    'Machine Learning Operations bridges the gap between ML model development and real-world deployment.',
    'PUBLISHED'
);

-- 4. DISTRIBUTED AND FEDERATED LEARNING (CI3203B)
INSERT INTO courses (id, academic_module_id, canonical_code, course_structure_code, syllabus_template_code, title, alt_title, credits, theory_hours_per_week, lab_hours_per_week, tutorial_hours_per_week, category, nep_classification, prerequisites, objectives, relevance, status)
VALUES (
    'course-distributed-federated-learning',
    'module-v',
    'CI3203B',
    'CI3203B',
    'CI3203 B',
    'Distributed and Federated Learning',
    'CI3203 B: Distributed and Federated Learning',
    4, 2, 2, 0,
    'PEC: Program Elective Course',
    'PEC',
    'Machine Learning',
    '1. Federated Learning concepts. 2. Federated and Distributed ML models. 3. Optimization techniques in FL. 4. Privacy and Security in FL. 5. FL architectures. 6. Communication strategies in distributed learning.',
    'Provides in-depth understanding of distributed machine learning algorithms, parallel model training, and federated optimization.',
    'PUBLISHED'
);

-- 5. ETHICAL AND RESPONSIBLE AI (CI3203A)
INSERT INTO courses (id, academic_module_id, canonical_code, course_structure_code, syllabus_template_code, title, alt_title, credits, theory_hours_per_week, lab_hours_per_week, tutorial_hours_per_week, category, nep_classification, prerequisites, objectives, relevance, status)
VALUES (
    'course-ethical-responsible-ai',
    'module-v',
    'CI3203A',
    'CI3203A',
    'CI3203 A',
    'Ethical and Responsible AI',
    'CI3203 A: Ethical and Responsible AI',
    4, 2, 2, 0,
    'PEC: Program Elective Course',
    'PEC',
    'Programming Fundamentals and Python, Basics of Machine Learning/Deep Learning/NLP',
    '1. AI ethics principles. 2. Fairness, bias, transparency. 3. Privacy, security, and governance. 4. Responsible AI frameworks. 5. Managing ethical risks. 6. Future of Responsible AI.',
    'Focuses on technical foundations of trustworthy AI, algorithmic fairness, bias mitigation, explainable AI (XAI), and governance.',
    'PUBLISHED'
);

-- 6. INFORMATION SECURITY (CI3203C)
INSERT INTO courses (id, academic_module_id, canonical_code, course_structure_code, syllabus_template_code, title, alt_title, credits, theory_hours_per_week, lab_hours_per_week, tutorial_hours_per_week, category, nep_classification, prerequisites, objectives, relevance, status)
VALUES (
    'course-information-security',
    'module-v',
    'CI3203C',
    'CI3203C',
    'CI3203C',
    'Information Security',
    'CI3203C: Information Security',
    4, 3, 2, 0,
    'PEC: Program Elective Course',
    'PEC',
    'Basic knowledge of Computer Networks, Operating Systems, and Programming concepts',
    '1. Information security and cyber threats. 2. Cryptographic techniques. 3. System and network security. 4. Ethical hacking and vulnerability assessment. 5. Cyber laws. 6. Secure computing solutions.',
    'Provides fundamentals of information security, cryptography, network security, and vulnerability assessment.',
    'PUBLISHED'
);
