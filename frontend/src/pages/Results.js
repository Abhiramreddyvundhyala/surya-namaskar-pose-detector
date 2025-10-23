import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  // Get results data from navigation state
  const results = location.state || {
    accuracy: 0,
    poseName: 'Unknown Pose',
    duration: 0,
    mistakes: []
  };

  useEffect(() => {
    // If no results data, redirect to dashboard
    if (!location.state) {
      navigate('/dashboard');
    }
  }, [location.state, navigate]);

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-yoga-green';
    if (accuracy >= 70) return 'text-yoga-gold';
    if (accuracy >= 50) return 'text-yoga-orange';
    return 'text-red-500';
  };

  const getAccuracyMessage = (accuracy) => {
    if (accuracy >= 90) return 'Excellent! You\'ve mastered this pose! 🌟';
    if (accuracy >= 70) return 'Great job! You\'re doing well! 👏';
    if (accuracy >= 50) return 'Good effort! Keep practicing! 💪';
    return 'Don\'t worry, practice makes perfect! 🧘‍♀️';
  };

  const getGrade = (accuracy) => {
    if (accuracy >= 90) return 'A+';
    if (accuracy >= 80) return 'A';
    if (accuracy >= 70) return 'B+';
    if (accuracy >= 60) return 'B';
    if (accuracy >= 50) return 'C+';
    return 'C';
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="yoga-card bg-gradient-to-r from-yoga-green to-yoga-orange text-white text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-2">Practice Complete!</h1>
        <p className="text-white text-opacity-90">
          Here's how you did with {results.poseName}
        </p>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Accuracy Score */}
        <div className="yoga-card text-center">
          <div className="text-5xl mb-2">🎯</div>
          <div className={`text-4xl font-bold mb-2 ${getAccuracyColor(results.accuracy)}`}>
            {results.accuracy}%
          </div>
          <div className="text-gray-600">Accuracy Score</div>
          <div className="mt-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold">
            Grade: {getGrade(results.accuracy)}
          </div>
        </div>

        {/* Duration */}
        <div className="yoga-card text-center">
          <div className="text-5xl mb-2">⏱️</div>
          <div className="text-4xl font-bold text-yoga-purple mb-2">
            {formatDuration(results.duration)}
          </div>
          <div className="text-gray-600">Practice Time</div>
          <div className="mt-2 text-sm text-gray-500">
            {results.duration < 60 ? 'Quick session' : 'Good duration'}
          </div>
        </div>

        {/* Pose */}
        <div className="yoga-card text-center">
          <div className="text-5xl mb-2">🧘‍♀️</div>
          <div className="text-lg font-bold text-gray-800 mb-2">
            {results.poseName}
          </div>
          <div className="text-gray-600">Pose Practiced</div>
          <div className="mt-2 text-sm text-yoga-orange">
            {results.mistakes.length} areas to improve
          </div>
        </div>
      </div>

      {/* Feedback Message */}
      <div className="yoga-card text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {getAccuracyMessage(results.accuracy)}
        </h2>
        
        {results.accuracy >= 90 ? (
          <div className="text-gray-700">
            <p className="mb-4">You've achieved excellent form! Your dedication to practice is showing great results.</p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center text-yoga-green">
                <span className="mr-2">✅</span>
                Perfect alignment
              </div>
              <div className="flex items-center text-yoga-green">
                <span className="mr-2">✅</span>
                Great breathing
              </div>
              <div className="flex items-center text-yoga-green">
                <span className="mr-2">✅</span>
                Smooth transitions
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-700">
            <p className="mb-4">Every practice session brings you closer to mastery. Keep up the great work!</p>
          </div>
        )}
      </div>

      {/* Detailed Feedback */}
      <div className="yoga-card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Detailed Feedback</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-yoga-orange hover:text-yoga-purple transition-colors"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {showDetails && (
          <div className="space-y-4">
            {/* Performance Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-yoga-green mb-2">Strengths</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {results.accuracy >= 80 && <li>• Excellent overall alignment</li>}
                  {results.accuracy >= 60 && <li>• Good pose recognition</li>}
                  {results.duration >= 30 && <li>• Appropriate practice duration</li>}
                  <li>• Consistent effort throughout</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-yoga-orange mb-2">Areas for Improvement</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {results.mistakes.slice(0, 4).map((mistake, index) => (
                    <li key={index}>• {mistake}</li>
                  ))}
                  {results.mistakes.length === 0 && (
                    <li>• Continue practicing for muscle memory</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Progress Tips */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-yoga-purple mb-2">💡 Tips for Next Practice</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• Focus on breath synchronization with movement</p>
                <p>• Hold each pose for the recommended duration</p>
                <p>• Practice in front of a mirror to self-correct</p>
                <p>• Warm up properly before starting the sequence</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/practice" className="yoga-card text-center hover:shadow-lg transition-all group">
          <div className="text-4xl mb-2">🔄</div>
          <h3 className="font-semibold text-gray-800 group-hover:text-yoga-orange transition-colors">
            Practice Again
          </h3>
          <p className="text-sm text-gray-600 mt-1">Improve your score</p>
        </Link>

        <Link to="/instructions" className="yoga-card text-center hover:shadow-lg transition-all group">
          <div className="text-4xl mb-2">📚</div>
          <h3 className="font-semibold text-gray-800 group-hover:text-yoga-purple transition-colors">
            Study Poses
          </h3>
          <p className="text-sm text-gray-600 mt-1">Review technique</p>
        </Link>

        <Link to="/progress" className="yoga-card text-center hover:shadow-lg transition-all group">
          <div className="text-4xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-800 group-hover:text-yoga-green transition-colors">
            View Progress
          </h3>
          <p className="text-sm text-gray-600 mt-1">Track improvement</p>
        </Link>
      </div>

      {/* Motivational Quote */}
      <div className="yoga-card bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-center">
        <div className="text-3xl mb-4">🌸</div>
        <blockquote className="text-lg italic text-gray-700 mb-4">
          "Yoga is not about perfection, it's about connection – connection to yourself, your breath, and the present moment."
        </blockquote>
        <cite className="text-sm text-gray-600">- Ancient Yoga Wisdom</cite>
        
        <div className="mt-6">
          <Link 
            to="/dashboard" 
            className="yoga-button"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;