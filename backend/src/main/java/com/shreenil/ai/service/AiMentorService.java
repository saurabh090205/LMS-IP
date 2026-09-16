package com.shreenil.ai.service;

import com.shreenil.ai.dto.AiChatRequest;
import com.shreenil.ai.dto.AiChatResponse;

public interface AiMentorService {
    AiChatResponse chat(AiChatRequest request, String studentProfileId);
}
