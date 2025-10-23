import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for demonstration
  const [stats] = useState({
    totalSessions: 25,
    averageAccuracy: 87,
    totalTimeSpent: 675, // in minutes
    currentStreak: 12,
    bestAccuracy: 96,
    totalPoses: 12,
    improvementRate: 15 // percentage
  });

  const [sessions] = useState([
    { id: 1, pose_name: "Mountain Pose", accuracy_score: 88, session_duration: 120, created_at: "2025-09-29T10:30:00Z" },
    { id: 2, pose_name: "Forward Fold", accuracy_score: 92, session_duration: 95, created_at: "2025-09-28T15:45:00Z" },
    { id: 3, pose_name: "Downward Dog", accuracy_score: 79, session_duration: 110, created_at: "2025-09-27T08:20:00Z" },
    { id: 4, pose_name: "Plank", accuracy_score: 85, session_duration: 135, created_at: "2025-09-26T09:15:00Z" },
    { id: 5, pose_name: "Upward Dog", accuracy_score: 91, session_duration: 100, created_at: "2025-09-25T16:30:00Z" },
    { id: 6, pose_name: "Warrior I", accuracy_score: 83, session_duration: 125, created_at: "2025-09-24T11:45:00Z" },
    { id: 7, pose_name: "Warrior II", accuracy_score: 89, session_duration: 115, created_at: "2025-09-23T14:20:00Z" },
    { id: 8, pose_name: "Triangle", accuracy_score: 87, session_duration: 105, created_at: "2025-09-22T10:10:00Z" },
    { id: 9, pose_name: "Tree Pose", accuracy_score: 94, session_duration: 90, created_at: "2025-09-21T17:25:00Z" },
    { id: 10, pose_name: "Child's Pose", accuracy_score: 96, session_duration: 80, created_at: "2025-09-20T13:40:00Z" }
  ]);

  const [weeklyProgress] = useState([
    { week: "Week 1", averageAccuracy: 75, sessionsCount: 3 },
    { week: "Week 2", averageAccuracy: 82, sessionsCount: 4 },
    { week: "Week 3", averageAccuracy: 87, sessionsCount: 5 },
    { week: "Week 4", averageAccuracy: 89, sessionsCount: 6 }
  ]);

  // Chart configurations
  const accuracyChartData = {
    labels: sessions.slice(0, 10).reverse().map((_, index) => `Session ${index + 1}`),
    datasets: [
      {
        label: 'Accuracy %',
        data: sessions.slice(0, 10).reverse().map(session => session.accuracy_score),
        borderColor: '#ff6b35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const weeklyChartData = {
    labels: weeklyProgress.map(week => 
      new Date(week.week_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Sessions',
        data: weeklyProgress.map(week => week.sessions_count),
        backgroundColor: '#6a4c93',
      },
      {
        label: 'Avg Accuracy %',
        data: weeklyProgress.map(week => week.average_accuracy),
        backgroundColor: '#ff6b35',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  // Calculate pose distribution
  const poseDistribution = sessions.reduce((acc, session) => {
    acc[session.pose_name] = (acc[session.pose_name] || 0) + 1;
    return acc;
  }, {});

  const topPoses = Object.entries(poseDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);



  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="yoga-card bg-gradient-to-r from-yoga-green to-yoga-purple text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
            <p className="text-white text-opacity-90">
              Track your yoga journey and celebrate your improvements
            </p>
          </div>
          <div className="text-6xl">📈</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="yoga-card text-center">
          <div className="text-3xl font-bold text-yoga-orange mb-2">
            {stats?.total_sessions || 0}
          </div>
          <div className="text-gray-600 text-sm">Total Sessions</div>
          <div className="mt-2 text-xs text-gray-500">
            Keep it up! 🔥
          </div>
        </div>

        <div className="yoga-card text-center">
          <div className="text-3xl font-bold text-yoga-purple mb-2">
            {stats?.average_accuracy || 0}%
          </div>
          <div className="text-gray-600 text-sm">Average Accuracy</div>
          <div className="mt-2 text-xs text-gray-500">
            {stats?.improvement_trend > 0 ? '📈 Improving' : '📊 Stable'}
          </div>
        </div>

        <div className="yoga-card text-center">
          <div className="text-3xl font-bold text-yoga-green mb-2">
            {stats?.total_practice_time || 0}m
          </div>
          <div className="text-gray-600 text-sm">Practice Time</div>
          <div className="mt-2 text-xs text-gray-500">
            This month 📅
          </div>
        </div>

        <div className="yoga-card text-center">
          <div className="text-3xl font-bold text-yoga-gold mb-2">
            {stats?.current_streak || 0}
          </div>
          <div className="text-gray-600 text-sm">Day Streak</div>
          <div className="mt-2 text-xs text-gray-500">
            Personal best! ⭐
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="yoga-card mb-8">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', name: 'Overview', icon: '📊' },
            { id: 'accuracy', name: 'Accuracy Trend', icon: '📈' },
            { id: 'sessions', name: 'Session History', icon: '📋' },
            { id: 'poses', name: 'Pose Analysis', icon: '🧘‍♀️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-yoga-orange shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Progress Chart */}
          <div className="yoga-card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Activity</h3>
            {weeklyProgress.length > 0 ? (
              <Bar data={weeklyChartData} options={chartOptions} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">📊</div>
                <p>Start practicing to see weekly trends!</p>
              </div>
            )}
          </div>

          {/* Most Practiced Poses */}
          <div className="yoga-card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Most Practiced Poses</h3>
            {topPoses.length > 0 ? (
              <div className="space-y-3">
                {topPoses.map(([poseName, count], index) => (
                  <div key={poseName} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-yoga-orange to-yoga-purple rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{poseName}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div 
                          className="h-full bg-yoga-orange rounded-full"
                          style={{ width: `${(count / Math.max(...topPoses.map(([,c]) => c))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🧘‍♀️</div>
                <p>Practice poses to see your favorites!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'accuracy' && (
        <div className="yoga-card">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Accuracy Trend</h3>
          {sessions.length > 0 ? (
            <div>
              <Line data={accuracyChartData} options={chartOptions} />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Improvement trend:</span>
                  <span className={`font-semibold ${
                    stats?.improvement_trend > 0 ? 'text-yoga-green' : 
                    stats?.improvement_trend < 0 ? 'text-red-500' : 'text-gray-600'
                  }`}>
                    {stats?.improvement_trend > 0 ? '+' : ''}{stats?.improvement_trend || 0}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📈</div>
              <p>Complete more sessions to see your accuracy trend!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="yoga-card">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Session History</h3>
          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                      session.accuracy_score >= 80 ? 'bg-yoga-green' : 
                      session.accuracy_score >= 60 ? 'bg-yoga-gold' : 'bg-red-500'
                    }`}>
                      {session.accuracy_score}%
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{session.pose_name}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(session.created_at).toLocaleDateString()} • 
                        {Math.floor(session.session_duration / 60)}:{session.session_duration % 60} min
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {session.mistakes.length} improvements
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📋</div>
              <p>Your practice sessions will appear here!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'poses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(poseDistribution).map(([poseName, count]) => {
            const poseAccuracy = sessions
              .filter(s => s.pose_name === poseName)
              .reduce((sum, s) => sum + s.accuracy_score, 0) / count;
            
            return (
              <div key={poseName} className="yoga-card text-center">
                <div className="text-4xl mb-3">🧘‍♀️</div>
                <h4 className="font-semibold text-gray-800 mb-2">{poseName}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sessions:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Accuracy:</span>
                    <span className={`font-medium ${
                      poseAccuracy >= 80 ? 'text-yoga-green' : 
                      poseAccuracy >= 60 ? 'text-yoga-gold' : 'text-red-500'
                    }`}>
                      {Math.round(poseAccuracy)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-yoga-orange rounded-full"
                      style={{ width: `${poseAccuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {Object.keys(poseDistribution).length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🧘‍♀️</div>
              <p>Practice different poses to see detailed analysis!</p>
            </div>
          )}
        </div>
      )}

      {/* Achievements */}
      <div className="yoga-card bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🏆 Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg text-center ${
            (stats?.total_sessions || 0) >= 10 ? 'bg-yoga-green text-white' : 'bg-gray-100'
          }`}>
            <div className="text-2xl mb-2">🔥</div>
            <div className="font-semibold">Dedicated Practitioner</div>
            <div className="text-sm opacity-80">Complete 10 sessions</div>
            <div className="text-xs mt-1">
              {stats?.total_sessions || 0}/10
            </div>
          </div>

          <div className={`p-4 rounded-lg text-center ${
            (stats?.average_accuracy || 0) >= 80 ? 'bg-yoga-purple text-white' : 'bg-gray-100'
          }`}>
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold">Accuracy Master</div>
            <div className="text-sm opacity-80">80%+ average accuracy</div>
            <div className="text-xs mt-1">
              {stats?.average_accuracy || 0}%/80%
            </div>
          </div>

          <div className={`p-4 rounded-lg text-center ${
            (stats?.current_streak || 0) >= 7 ? 'bg-yoga-orange text-white' : 'bg-gray-100'
          }`}>
            <div className="text-2xl mb-2">📅</div>
            <div className="font-semibold">Week Warrior</div>
            <div className="text-sm opacity-80">7-day practice streak</div>
            <div className="text-xs mt-1">
              {stats?.current_streak || 0}/7 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;