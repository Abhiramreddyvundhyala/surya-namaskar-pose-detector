import { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

const usePoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);
  const [currentPose, setCurrentPose] = useState(null);
  const [landmarks, setLandmarks] = useState(null);

  // Initialize MediaPipe Pose
  useEffect(() => {
    const initializePose = async () => {
      try {
        const pose = new Pose({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
          }
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        pose.onResults((results) => {
          if (results.poseLandmarks) {
            setLandmarks(results.poseLandmarks);
            drawPose(results);
          }
        });

        poseRef.current = pose;
        setIsLoading(false);
      } catch (err) {
        setError('Failed to initialize pose detection');
        setIsLoading(false);
      }
    };

    initializePose();

    return () => {
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, []);

  // Start camera and pose detection
  const startDetection = async () => {
    if (!videoRef.current || !poseRef.current) {
      setError('Pose detection not initialized');
      return;
    }

    try {
      setIsActive(true);
      setError(null);

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (poseRef.current && videoRef.current) {
            await poseRef.current.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });

      await camera.start();
      cameraRef.current = camera;
    } catch (err) {
      setError('Failed to access camera. Please check permissions.');
      setIsActive(false);
    }
  };

  // Stop pose detection
  const stopDetection = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    setIsActive(false);
    setLandmarks(null);
  };

  // Draw pose landmarks on canvas
  const drawPose = (results) => {
    if (!canvasRef.current || !results.poseLandmarks) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    drawConnections(ctx, results.poseLandmarks);
    
    // Draw landmarks
    drawLandmarks(ctx, results.poseLandmarks);
  };

  // Draw pose connections
  const drawConnections = (ctx, landmarks) => {
    const connections = [
      // Face
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
      // Body
      [11, 23], [12, 24], [23, 24],
      // Arms
      [11, 13], [13, 15], [12, 14], [14, 16],
      // Legs  
      [23, 25], [25, 27], [27, 29], [29, 31], [24, 26], [26, 28], [28, 30], [30, 32],
      // Feet
      [27, 31], [28, 32]
    ];

    ctx.strokeStyle = '#00FF00'; // Green for correct pose
    ctx.lineWidth = 2;

    connections.forEach(([start, end]) => {
      const startPoint = landmarks[start];
      const endPoint = landmarks[end];
      
      if (startPoint && endPoint && startPoint.visibility > 0.5 && endPoint.visibility > 0.5) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x * ctx.canvas.width, startPoint.y * ctx.canvas.height);
        ctx.lineTo(endPoint.x * ctx.canvas.width, endPoint.y * ctx.canvas.height);
        ctx.stroke();
      }
    });
  };

  // Draw pose landmarks
  const drawLandmarks = (ctx, landmarks) => {
    ctx.fillStyle = '#FF0000'; // Red for landmarks
    
    landmarks.forEach((landmark, index) => {
      if (landmark.visibility > 0.5) {
        ctx.beginPath();
        ctx.arc(
          landmark.x * ctx.canvas.width,
          landmark.y * ctx.canvas.height,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    });
  };

  // Get specific landmark by name
  const getLandmark = (landmarkName) => {
    if (!landmarks) return null;
    
    const landmarkIndices = {
      nose: 0,
      leftEye: 1,
      rightEye: 2,
      leftEar: 3,
      rightEar: 4,
      leftShoulder: 11,
      rightShoulder: 12,
      leftElbow: 13,
      rightElbow: 14,
      leftWrist: 15,
      rightWrist: 16,
      leftHip: 23,
      rightHip: 24,
      leftKnee: 25,
      rightKnee: 26,
      leftAnkle: 27,
      rightAnkle: 28
    };

    const index = landmarkIndices[landmarkName];
    return index !== undefined ? landmarks[index] : null;
  };

  // Calculate angle between three points
  const calculateAngle = (point1, point2, point3) => {
    if (!point1 || !point2 || !point3) return null;

    const radians = Math.atan2(point3.y - point2.y, point3.x - point2.x) - 
                    Math.atan2(point1.y - point2.y, point1.x - point2.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    
    return angle;
  };

  return {
    videoRef,
    canvasRef,
    isLoading,
    isActive,
    error,
    landmarks,
    currentPose,
    startDetection,
    stopDetection,
    getLandmark,
    calculateAngle
  };
};

export default usePoseDetection;