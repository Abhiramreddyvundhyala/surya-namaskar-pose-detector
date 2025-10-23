import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePoseDetection from '../hooks/usePoseDetection';
import { PoseComparator } from '../utils/poseComparison';

const Practice = () => {
  const { poseIndex } = useParams();
  const navigate = useNavigate();
  
  // State
  const [poses, setPoses] = useState([]);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(parseInt(poseIndex) || 0);
  const [sessionData, setSessionData] = useState({
    startTime: null,
    accuracy: 0,
    mistakes: [],
    duration: 0,
  });
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [poseComparison, setPoseComparison] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [isFullSequence, setIsFullSequence] = useState(!poseIndex);
  const [autoProgress, setAutoProgress] = useState(false);
  const [currentPoseTimer, setCurrentPoseTimer] = useState(0);
  const [isHoldingPose, setIsHoldingPose] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [poseCompleted, setPoseCompleted] = useState(false);
  const [isDetectingPose, setIsDetectingPose] = useState(false);
  const [poseValidationThreshold, setPoseValidationThreshold] = useState(0.8); // 80% accuracy required
  const [consecutiveCorrectFrames, setConsecutiveCorrectFrames] = useState(0);
  const [requiredCorrectFrames, setRequiredCorrectFrames] = useState(30); // Need 30 consecutive correct frames (~1 second at 30fps)
  
  // Pose detection hook
  const {
    videoRef,
    canvasRef,
    isLoading,
    isActive,
    error,
    landmarks,
    startDetection,
    stopDetection,
  } = usePoseDetection();

  // Pose comparator
  const poseComparator = new PoseComparator();



  // Load poses data
  useEffect(() => {
    const loadPoses = () => {
      // Import the complete 12 Surya Namaskar poses
      import('../utils/suryaNamaskarData').then(({ suryaNamaskarPoses }) => {
        setPoses(suryaNamaskarPoses);
      });
    };
    loadPoses();
  }, []);

  // Start session timer
  useEffect(() => {
    let interval = null;
    if (isSessionActive && sessionData.startTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const duration = Math.floor((now - sessionData.startTime) / 1000);
        setSessionData(prev => ({ ...prev, duration }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive, sessionData.startTime]);

  // Function to progress to next pose/cycle/set
  const progressToNextPose = useCallback(() => {
    if (currentPoseIndex < poses.length - 1) {
      // Move to next pose in current cycle
      setCurrentPoseIndex(prev => prev + 1);
      setPoseCompleted(false);
      setConsecutiveCorrectFrames(0);
      setCurrentPoseTimer(0);
    } else {
      // Completed one cycle, check if we need to do another
      if (currentCycle < 2) {
        // Start second cycle of this set
        setCurrentCycle(2);
        setCurrentPoseIndex(0);
        setPoseCompleted(false);
        setConsecutiveCorrectFrames(0);
        setCurrentPoseTimer(0);
      } else {
        // Start new set - continuous flow
        setCurrentSet(prev => prev + 1);
        setCurrentCycle(1);
        setCurrentPoseIndex(0);
        setPoseCompleted(false);
        setConsecutiveCorrectFrames(0);
        setCurrentPoseTimer(0);
      }
    }
  }, [currentPoseIndex, poses.length, currentCycle, currentSet, stopDetection]);

  // ML-based pose validation with frame-based detection
  useEffect(() => {
    let validationInterval = null;
    
    if (isSessionActive && poseComparison && !poseCompleted) {
      validationInterval = setInterval(() => {
        const currentAccuracy = poseComparison.overallAccuracy;
        
        if (currentAccuracy >= poseValidationThreshold) {
          setConsecutiveCorrectFrames(prev => {
            const newCount = prev + 1;
            
            // If we've maintained correct pose for required frames, mark as complete
            if (newCount >= requiredCorrectFrames) {
              setPoseCompleted(true);
              setIsDetectingPose(false);
              
              // Auto-progress to next pose after a brief delay
              setTimeout(() => {
                progressToNextPose();
              }, 1500); // 1.5 second delay to show completion
              
              return 0; // Reset counter
            }
            
            return newCount;
          });
          setIsDetectingPose(true);
        } else {
          // Reset counter if pose is not accurate
          setConsecutiveCorrectFrames(0);
          setIsDetectingPose(false);
        }
        
        // Keep timer running for session duration
        setCurrentPoseTimer(prev => prev + 1);
      }, 100); // Check 10 times per second for responsive feedback
    }
    
    return () => {
      if (validationInterval) clearInterval(validationInterval);
    };
  }, [isSessionActive, poseComparison, poseCompleted, poseValidationThreshold, requiredCorrectFrames, progressToNextPose]);

  // Reset pose state when pose changes
  useEffect(() => {
    setCurrentPoseTimer(0);
    setIsHoldingPose(false);
    setPoseCompleted(false);
    setConsecutiveCorrectFrames(0);
    setIsDetectingPose(false);
  }, [currentPoseIndex]);

  // Compare poses when landmarks change
  useEffect(() => {
    if (landmarks && poses.length > 0 && isSessionActive) {
      const comparison = poseComparator.comparePose(landmarks, currentPoseIndex);
      setPoseComparison(comparison);
      
      // Check if pose is held correctly (accuracy >= 75%)
      if (comparison.accuracy >= 75 && autoProgress) {
        setIsHoldingPose(true);
      } else if (comparison.accuracy < 65 && autoProgress) {
        setIsHoldingPose(false);
      }
      
      // Update session accuracy
      setSessionData(prev => ({
        ...prev,
        accuracy: comparison.accuracy,
        mistakes: [...new Set([...prev.mistakes, ...comparison.feedback])]
      }));
    }
  }, [landmarks, currentPoseIndex, poses, isSessionActive]);

  // Start practice session
  const startSession = useCallback(async () => {
    try {
      await startDetection();
      setSessionData({
        startTime: new Date().getTime(),
        accuracy: 0,
        mistakes: [],
        duration: 0,
      });
      setIsSessionActive(true);
      console.log('Practice session started!');
    } catch (error) {
      console.error('Failed to start camera. Please check permissions.');
    }
  }, [startDetection]);

  // End practice session
  const endSession = useCallback(async () => {
    stopDetection();
    setIsSessionActive(false);
    
    // Reset cycle and set counters
    setCurrentCycle(1);
    setCurrentSet(1);
    
    // Reset pose detection state
    setPoseCompleted(false);
    setIsDetectingPose(false);
    setConsecutiveCorrectFrames(0);
    
    // Save session data
    if (sessionData.startTime && poses[currentPoseIndex]) {
      try {
        const sessionPayload = {
          pose_index: currentPoseIndex,
          pose_name: poses[currentPoseIndex].pose_name,
          accuracy_score: sessionData.accuracy,
          mistakes: sessionData.mistakes.slice(0, 5), // Limit mistakes
          session_duration: sessionData.duration,
          user_keypoints: landmarks ? landmarks.map(lm => ({
            x: lm.x,
            y: lm.y,
            z: lm.z,
            visibility: lm.visibility
          })) : []
        };

        // Save to local storage for now
        const sessions = JSON.parse(localStorage.getItem('yogaSessions') || '[]');
        sessions.push(sessionPayload);
        localStorage.setItem('yogaSessions', JSON.stringify(sessions));
        
        // Navigate to results
        navigate('/results', {
          state: {
            accuracy: sessionData.accuracy,
            poseName: poses[currentPoseIndex].pose_name,
            duration: sessionData.duration,
            mistakes: sessionData.mistakes
          }
        });
      } catch (error) {
        console.error('Failed to save session');
      }
    }
  }, [stopDetection, sessionData, currentPoseIndex, poses, landmarks, navigate]);

  // Navigate to next pose
  const nextPose = () => {
    if (isFullSequence && currentPoseIndex < poses.length - 1) {
      setCurrentPoseIndex(prev => prev + 1);
    }
  };

  // Navigate to previous pose
  const previousPose = () => {
    if (isFullSequence && currentPoseIndex > 0) {
      setCurrentPoseIndex(prev => prev - 1);
    }
  };

  // Format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current pose
  const currentPose = poses[currentPoseIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2 text-gray-600">Loading pose detection...</span>
      </div>
    );
  }

  // Practice completion screen
  if (practiceComplete) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="yoga-card bg-gradient-to-r from-green-500 to-blue-600 text-white mb-6">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-xl mb-4">You've completed your Surya Namaskar practice!</p>
            <div className="text-lg opacity-90">
              ✨ {currentSet} sets completed ({currentSet * 2} cycles)
            </div>
            <div className="text-lg opacity-90">
              ⏱️ Total practice time: {formatDuration(sessionData.duration)}
            </div>
            <div className="text-lg opacity-90">
              🤖 ML-guided practice with {Math.round(poseValidationThreshold * 100)}% accuracy threshold
            </div>
          </div>
        </div>
        
        <div className="yoga-card text-center">
          <h2 className="text-xl font-semibold mb-4">🌅 Benefits You've Gained</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl mb-2">💪</div>
              <div className="font-semibold text-gray-800">Physical Strength</div>
              <div className="text-sm text-gray-600">Enhanced muscle tone and flexibility</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🧘‍♀️</div>
              <div className="font-semibold text-gray-800">Mental Focus</div>
              <div className="text-sm text-gray-600">Improved concentration and mindfulness</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">❤️</div>
              <div className="font-semibold text-gray-800">Heart Health</div>
              <div className="text-sm text-gray-600">Better circulation and cardiovascular fitness</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🌞</div>
              <div className="font-semibold text-gray-800">Energy Boost</div>
              <div className="text-sm text-gray-600">Increased vitality and reduced stress</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => {
                setPracticeComplete(false);
                setCurrentCycle(1);
                setCurrentSet(1);
                setCurrentPoseIndex(0);
                setCurrentPoseTimer(0);
                setPoseCompleted(false);
                setIsDetectingPose(false);
                setConsecutiveCorrectFrames(0);
                setSessionData(prev => ({ ...prev, startTime: null, duration: 0 }));
              }}
              className="yoga-button"
            >
              Practice Again
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 py-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yoga-orange to-yoga-purple text-white p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold">🌅 Surya Namaskar</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-xs opacity-80">Time</div>
              <div className="text-base font-bold">{formatDuration(sessionData.duration)}</div>
            </div>
            
            <div>
              {!isSessionActive ? (
                <button 
                  onClick={startSession} 
                  className="bg-white text-yoga-orange px-3 py-1 text-sm rounded font-semibold hover:bg-gray-100 transition-colors"
                >
                  ▶️ Start
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPracticeComplete(true);
                    setIsSessionActive(false);
                    stopDetection();
                  }}
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded font-semibold hover:bg-red-600 transition-colors"
                >
                  ⏹️ Stop
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sequence Progress */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">📋 Progress</h3>
        
        {/* Progress Bar with Poses */}
        <div className="relative mb-2">
          {/* Connecting Progress Line */}
          <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-200 rounded">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-yoga-orange rounded transition-all duration-500"
              style={{
                width: `${Math.max(0, ((poses.filter((_, index) => index < currentPoseIndex).length + (poseCompleted ? 1 : 0)) / poses.length) * 100)}%`
              }}
            />
          </div>
          
          {/* Pose Circles */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
            {poses.map((pose, index) => {
              const isCompleted = index < currentPoseIndex || (index === currentPoseIndex && poseCompleted);
              const isCurrent = index === currentPoseIndex;
              const poseNames = [
                'Pranamasana', 'Hasta', 'Pada', 'Ashwa', 'Parvatasana', 
                'Ashtanga', 'Bhujangasana', 'Parvatasana', 'Ashwa', 'Pada', 'Hasta', 'Pranamasana'
              ];
              
              return (
                <div key={index} className="text-center relative z-10">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative
                    ${isCurrent ? 'bg-yoga-orange text-white ring-2 ring-yoga-orange ring-offset-1 scale-110' : 
                      isCompleted ? 'bg-green-500 text-white shadow-lg' : 'bg-white border-2 border-gray-300 text-gray-600'}
                  `}>
                    {isCompleted && !isCurrent ? (
                      <span className="text-white">✓</span>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className={`text-xs font-medium truncate mt-1 ${
                    isCurrent ? 'text-yoga-orange font-bold' : 
                    isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`} style={{fontSize: '9px'}}>
                    {poseNames[index] ? poseNames[index].slice(0, 5) : pose.name.split(' ')[0].slice(0, 5)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Progress Stats */}
        <div className="text-center text-xs text-gray-600">
          <span>{poses.filter((_, index) => index < currentPoseIndex).length + (poseCompleted ? 1 : 0)}/{poses.length} completed</span>
        </div>
      </div>

      {/* Practice Interface - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Reference Pose */}
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yoga-orange">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-gray-800 flex items-center">
              <span className="mr-1">📖</span>Reference
            </h3>
            <div className="bg-yoga-orange text-white px-1 py-0.5 rounded text-xs font-bold">
              {(currentPoseIndex + 1).toString().padStart(2, '0')}
            </div>
          </div>
          
          {currentPose && (
            <div className="flex-1 flex flex-col space-y-1">
              {/* Pose Names */}
              <div className="text-center bg-gradient-to-r from-orange-50 to-purple-50 p-1 rounded">
                <h4 className="text-sm font-bold text-gray-800">{currentPose.name}</h4>
                <p className="text-xs text-gray-600 italic">{currentPose.englishName}</p>
              </div>

              {/* Pose Image */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                {/* This will be replaced with actual pose images */}
                <img 
                  src={currentPose.imageUrl || `/images/poses/pose-${currentPose.step}.jpg`}
                  alt={currentPose.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-center" style={{display: 'none'}}>
                  <div>
                    <div className="text-4xl mb-2 text-gray-400">🧘‍♀️</div>
                    <div className="text-sm text-gray-500 font-medium">{currentPose.name}</div>
                  </div>
                </div>
              </div>

              {/* Pose Description */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">About this pose:</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentPose.description || "Stand tall with feet together, palms pressed in prayer position at chest center. This is the starting pose of Surya Namaskar, focusing on centering and preparing the mind for the sequence ahead."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Camera Feed */}
        <div className="bg-white rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="p-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 flex items-center">
              <span className="mr-2">📹</span>Live Camera
            </h3>
          </div>
          <div className="relative" style={{height: '600px', maxHeight: '60vh'}}>
            {/* Video Element - Full Card Size */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              style={{ transform: 'scaleX(-1)' }} // Mirror effect
            />
            
            {/* Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: 'scaleX(-1)' }}
            />

            {/* Error Message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                <div className="text-center">
                  <div className="text-4xl mb-2">⚠️</div>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Camera Not Active */}
            {!isActive && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-4xl mb-4">📹</div>
                  <p className="text-gray-600 mb-4">Camera not active</p>
                  
                  <button onClick={startSession} className="yoga-button">
                    Start Practice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
    
export default Practice;