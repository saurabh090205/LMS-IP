package com.shreenil.ai.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.ai.dto.AiChatRequest;
import com.shreenil.ai.dto.AiChatResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MockAiMentorService implements AiMentorService {
    private static final Logger log = LoggerFactory.getLogger(MockAiMentorService.class);


    @Override
    public AiChatResponse chat(AiChatRequest request, String studentProfileId) {
        String msg = request.getMessage().toLowerCase();
        String context = request.getCourseCode() != null ? request.getCourseCode() : "VIT CSE (AI)";

        String reply;
        List<String> suggestedActions;
        List<String> references;

        if (msg.contains("backprop") || msg.contains("gradient") || msg.contains("deep learning") || msg.contains("perceptron")) {
            reply = "In Deep Learning (CI3001 Unit II), Backpropagation computes the gradient of the loss function with respect to each weight via the Chain Rule of calculus. It flows backward from the output layer through hidden layers to update weights using optimizers like Adam or SGD.";
            suggestedActions = List.of(
                    "Review Unit II: Multi-layer Perceptron & Gradient Descent",
                    "Try Code Exercise: Implementing Backpropagation in PyTorch",
                    "Take 3-question Quiz on Activation Functions"
            );
            references = List.of("CI3001 Unit II: Perceptron and Neural Network Architecture", "Goodfellow Deep Learning Ch. 6");
        } else if (msg.contains("exam") || msg.contains("prepare") || msg.contains("syllabus") || msg.contains("test")) {
            reply = "Your upcoming assessment includes In-Semester Evaluation 1 for Deep Learning (CI3001) covering Units I & II. You currently have a 68% progress score in Deep Learning and an 8.92 CGPA.";
            suggestedActions = List.of(
                    "Open Deep Learning Unit I Topics",
                    "Check Timetable for Revision Slots",
                    "Review Assignment 1 Feedback"
            );
            references = List.of("VIT B.Tech CSE(AI) AY 2026-27 Assessment Guidelines");
        } else if (msg.contains("homework") || msg.contains("assignment")) {
            reply = "You have 1 pending assignment: 'CIFAR-10 Classification with ResNet' for Deep Learning due soon. Your previous submission for 'MLOps Pipeline Deployment' is graded (92/100).";
            suggestedActions = List.of(
                    "Open Homework Portal",
                    "Submit ResNet Notebook",
                    "Ask for code debugging assistance"
            );
            references = List.of("CI3001 Assignment #1", "CI3003D Assignment #2");
        } else {
            reply = "Hello Aarav! I am your Shreenil AI Learning Mentor. I am synced with your VIT B.Tech CSE (AI) curriculum, timetable, and study streak. How can I help you master your coursework today?";
            suggestedActions = List.of(
                    "Explain CNN Architectures (ResNet & VGG)",
                    "Help with today's Timetable",
                    "Review my Report Card & Progress"
            );
            references = List.of("VIT B.Tech CSE (AI) Semester V");
        }

        return AiChatResponse.builder()
                .message(reply)
                .context(context)
                .suggestedActions(suggestedActions)
                .referenceTopics(references)
                .modelProvider("Shreenil-Ai-Mentor-Mock-v1")
                .build();
    }
}
