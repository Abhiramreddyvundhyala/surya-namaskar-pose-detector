import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Instructions = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPose, setSelectedPose] = useState(null);

  useEffect(() => {
    // Load complete Surya Namaskar poses data
    import('../utils/suryaNamaskarData').then(({ suryaNamaskarPoses }) => {
      setPoses(suryaNamaskarPoses);
      setLoading(false);
    });
  }, []);

  const fetchPoses = () => {
    // Mock function - data is loaded in useEffect
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-yoga-green bg-green-100';
      case 'intermediate': return 'text-yoga-gold bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBreathingIcon = (breathing) => {
    switch (breathing) {
      case 'inhale': return '🌬️ Inhale';
      case 'exhale': return '💨 Exhale';
      case 'hold': return '⏸️ Hold';
      default: return '🫁 Breathe';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2 text-gray-600">Loading poses...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="yoga-card bg-gradient-to-r from-yoga-purple to-yoga-orange text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Surya Namaskar Instructions</h1>
            <p className="text-white text-opacity-90">
              Learn the traditional 12-step Sun Salutation sequence
            </p>
          </div>
          <div className="text-6xl">🌅</div>
        </div>
      </div>

      {/* Poses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {poses.map((pose, index) => (
          <div key={pose.id} className="yoga-card hover:shadow-lg transition-all duration-300 group">
            {/* Pose Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-yoga-orange">
                {pose.step.toString().padStart(2, '0')}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                Step {pose.step}
              </span>
            </div>

            {/* Pose Image Placeholder */}
            <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center group-hover:from-yoga-orange group-hover:to-yoga-purple group-hover:text-white transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🧘‍♀️</div>
                <div className="text-sm font-medium">{pose.name}</div>
              </div>
            </div>

            {/* Pose Details */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-yoga-orange transition-colors">
                {pose.name}
              </h3>
              
              <p className="text-sm text-gray-600 italic">{pose.englishName}</p>
              
              <p className="text-sm text-gray-700 leading-relaxed">
                {pose.description}
              </p>

              {/* Breathing & Duration */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">{getBreathingIcon(pose.breathing)}</span>
                  <span>{pose.breathing}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {pose.duration}s hold
                </div>
              </div>

              {/* Key Points */}
              <div className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                <div className="font-medium mb-1">Key Points:</div>
                <ul className="list-disc list-inside space-y-1">
                  {pose.keyPoints?.slice(0, 2).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setSelectedPose(pose)}
                  className="flex-1 px-3 py-2 text-sm border border-yoga-orange text-yoga-orange rounded hover:bg-yoga-orange hover:text-white transition-all"
                >
                  Details
                </button>
                <Link
                  to={`/practice/${pose.step - 1}`}
                  className="flex-1 px-3 py-2 text-sm bg-yoga-orange text-white rounded hover:bg-yoga-purple transition-all text-center"
                >
                  Practice
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="yoga-card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits of Surya Namaskar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💪</div>
            <div>
              <h3 className="font-semibold text-gray-800">Physical Strength</h3>
              <p className="text-sm text-gray-600">Improves muscle tone and flexibility</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🫁</div>
            <div>
              <h3 className="font-semibold text-gray-800">Better Breathing</h3>
              <p className="text-sm text-gray-600">Enhances lung capacity and oxygen flow</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🧘‍♀️</div>
            <div>
              <h3 className="font-semibold text-gray-800">Mental Clarity</h3>
              <p className="text-sm text-gray-600">Reduces stress and improves focus</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">❤️</div>
            <div>
              <h3 className="font-semibold text-gray-800">Heart Health</h3>
              <p className="text-sm text-gray-600">Improves cardiovascular function</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">⚖️</div>
            <div>
              <h3 className="font-semibold text-gray-800">Better Balance</h3>
              <p className="text-sm text-gray-600">Enhances coordination and stability</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🌟</div>
            <div>
              <h3 className="font-semibold text-gray-800">Energy Boost</h3>
              <p className="text-sm text-gray-600">Increases vitality and alertness</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pose Detail Modal */}
      {selectedPose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedPose.pose_name}</h3>
                <button
                  onClick={() => setSelectedPose(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600 italic">{selectedPose.sanskrit_name}</p>
                <p className="text-gray-700">{selectedPose.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Focus Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPose.key_body_parts.map((part, index) => (
                      <span key={index} className="px-3 py-1 bg-yoga-orange text-white text-xs rounded-full">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Common Mistakes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedPose.common_mistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to={`/practice/${selectedPose.pose_index}`}
                    className="yoga-button w-full text-center"
                    onClick={() => setSelectedPose(null)}
                  >
                    Practice This Pose
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;