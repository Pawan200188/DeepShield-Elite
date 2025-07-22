import cv2
import torch
import numpy as np
from fastapi import APIRouter, HTTPException, Query
from utils.model_loader import load_model
from utils.video_processor import extract_frames

router = APIRouter()

# Load the trained deepfake detection model
model = load_model("models/Vidyut.pth")

@router.post("/analyze/")
async def analyze_video(file_path: str = Query(..., description="Path to the uploaded video")):
    try:
        frames = extract_frames(file_path, frame_skip=5)  # Extract frames
        results = []

        for frame in frames:
            # Preprocess frame
            frame_resized = cv2.resize(frame, (224, 224))  # Adjust if necessary
            frame_tensor = torch.tensor(frame_resized).permute(2, 0, 1).unsqueeze(0).float()

            with torch.no_grad():
                output = model(frame_tensor)  # Model outputs two values (real vs deepfake)
                probabilities = torch.softmax(output, dim=1)  # Convert to probabilities
                deepfake_prob = probabilities[0][1].item() * 100  # Convert to %

            results.append({
                "frame_index": len(results),
                "deepfake_confidence": round(deepfake_prob, 2),
                "authentic_confidence": round(100 - deepfake_prob, 2)
            })

        return {"message": "Analysis complete", "results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
