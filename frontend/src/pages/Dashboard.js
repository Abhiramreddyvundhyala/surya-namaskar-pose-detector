import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for demo purposes
  const [stats] = useState({
    totalSessions: 15,
    averageAccuracy: 85,
    totalTimeSpent: 450, // in minutes
    currentStreak: 7,
    bestAccuracy: 94,
    totalPoses: 12
  });
  
  const [recentSessions] = useState([
    {
      id: 1,
      pose_name: "Pranamasana (Prayer Pose)",
      accuracy_score: 88,
      created_at: "2025-09-29T10:30:00Z",
      session_duration: 120
    },
    {
      id: 2,
      pose_name: "Hasta Uttanasana (Raised Arms Pose)",
      accuracy_score: 92,
      created_at: "2025-09-28T15:45:00Z",
      session_duration: 95
    },
    {
      id: 3,
      pose_name: "Bhujangasana (Cobra Pose)",
      accuracy_score: 79,
      created_at: "2025-09-27T08:20:00Z",
      session_duration: 110
    },
    {
      id: 4,
      pose_name: "Complete Surya Namaskar Sequence",
      accuracy_score: 85,
      created_at: "2025-09-26T16:15:00Z",
      session_duration: 300
    }
  ]);



  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="yoga-card bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-4xl font-bold mb-3">
                  {getTimeGreeting()}, Yogi! 🙏
                </h1>
                <p className="text-lg text-white text-opacity-95 mb-2">
                  Welcome to your daily Surya Namaskar practice
                </p>
                <p className="text-sm text-white text-opacity-80">
                  Embrace the sun salutation and find your inner peace
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl mb-2">🌅</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/practice" className="group">
          <div className="yoga-card bg-gradient-to-br from-green-400 to-blue-500 text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
            <div className="flex flex-col items-center text-center p-2">
              <div className="text-5xl mb-4 group-hover:animate-pulse">🧘‍♀️</div>
              <h3 className="text-xl font-bold mb-2">Start Practice</h3>
              <p className="text-sm text-white text-opacity-90">
                Begin your Surya Namaskar journey with AI guidance
              </p>
            </div>
          </div>
        </Link>

        <Link to="/instructions" className="group">
          <div className="yoga-card bg-gradient-to-br from-purple-400 to-pink-500 text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
            <div className="flex flex-col items-center text-center p-2">
              <div className="text-5xl mb-4 group-hover:animate-bounce">📖</div>
              <h3 className="text-xl font-bold mb-2">Learn Poses</h3>
              <p className="text-sm text-white text-opacity-90">
                Master all 12 traditional poses step by step
              </p>
            </div>
          </div>
        </Link>

        <Link to="/progress" className="group">
          <div className="yoga-card bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
            <div className="flex flex-col items-center text-center p-2">
              <div className="text-5xl mb-4 group-hover:animate-pulse">📈</div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-sm text-white text-opacity-90">
                Monitor your accuracy and improvements
              </p>
            </div>
          </div>
        </Link>
      </div>



      {/* Recent Sessions & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sessions */}
        <div className="yoga-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">📅</span>Recent Sessions
            </h3>
            <Link 
              to="/progress" 
              className="text-yoga-orange hover:text-yoga-purple text-sm font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          
          {recentSessions.length > 0 ? (
            <div className="space-y-3">
              {recentSessions.slice(0, 4).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yoga-orange bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-yoga-orange">🧘‍♀️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">
                        {session.pose_name.length > 25 ? session.pose_name.substring(0, 25) + '...' : session.pose_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(session.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      session.accuracy_score >= 80 ? 'text-green-500' : 
                      session.accuracy_score >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {session.accuracy_score}%
                    </div>
                    <div className="text-xs text-gray-400">
                      {Math.floor(session.session_duration / 60)}m {session.session_duration % 60}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Start Your Journey</h4>
              <p className="text-gray-500 mb-6">No sessions yet. Begin your first practice today!</p>
              <Link to="/practice" className="yoga-button">
                Begin Practice
              </Link>
            </div>
          )}
        </div>

        {/* Benefits of Surya Namaskar */}
        <div className="yoga-card">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">✨</span>Benefits of Surya Namaskar
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl">💪</div>
              <div>
                <h4 className="font-semibold text-gray-800">Physical Strength</h4>
                <p className="text-sm text-gray-600">Builds muscle tone and flexibility</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="text-2xl">🫁</div>
              <div>
                <h4 className="font-semibold text-gray-800">Better Breathing</h4>
                <p className="text-sm text-gray-600">Improves lung capacity and oxygen flow</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl">🧠</div>
              <div>
                <h4 className="font-semibold text-gray-800">Mental Clarity</h4>
                <p className="text-sm text-gray-600">Reduces stress and increases focus</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-semibold text-gray-800">Energy Boost</h4>
                <p className="text-sm text-gray-600">Increases vitality and reduces fatigue</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Call to Action */}
      {stats?.total_sessions === 0 && (
        <div className="mt-8 yoga-card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div className="text-center">
            <div className="text-5xl mb-4">🌅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Start Your Surya Namaskar Journey
            </h3>
            <p className="text-gray-600 mb-4">
              Begin with the traditional Sun Salutation sequence. Perfect for beginners and experienced practitioners alike.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/instructions" className="px-6 py-2 border border-yoga-orange text-yoga-orange rounded-lg hover:bg-yoga-orange hover:text-white transition-all">
                Learn First
              </Link>
              <Link to="/practice" className="yoga-button">
                Start Practice
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Motivational Footer */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-yoga-orange via-yoga-purple to-yoga-orange p-8 rounded-2xl text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">🌟 Your Yoga Journey Matters</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            "Yoga is a light, which once lit will never dim. The better your practice, the brighter your flame."
          </p>
          <div className="flex justify-center space-x-6 text-sm opacity-80">
            <span>🧘‍♀️ Mindful Practice</span>
            <span>💪 Build Strength</span>
            <span>🌱 Grow Daily</span>
            <span>✨ Find Peace</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;