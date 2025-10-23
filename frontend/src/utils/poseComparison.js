// Reference pose data for Surya Namaskar poses
// These are idealized keypoint positions for pose comparison

export const REFERENCE_POSES = {
  0: { // Pranamasana (Prayer Pose)
    name: 'Pranamasana',
    keyAngles: {
      leftElbow: 90,
      rightElbow: 90,
      spine: 180, // Straight
      leftShoulder: 90,
      rightShoulder: 90
    },
    keyPositions: {
      hands: 'center', // Hands at heart center
      feet: 'together',
      spine: 'straight'
    },
    criticalJoints: ['leftWrist', 'rightWrist', 'leftShoulder', 'rightShoulder', 'spine']
  },

  1: { // Hastauttanasana (Raised Arms Pose)
    name: 'Hastauttanasana',
    keyAngles: {
      leftArm: 160, // Arms raised up
      rightArm: 160,
      spine: 165, // Slight backbend
      leftShoulder: 160,
      rightShoulder: 160
    },
    keyPositions: {
      arms: 'raised',
      spine: 'slight_backbend',
      feet: 'together'
    },
    criticalJoints: ['leftWrist', 'rightWrist', 'leftShoulder', 'rightShoulder', 'spine']
  },

  2: { // Hastapadasana (Standing Forward Bend)
    name: 'Hastapadasana',
    keyAngles: {
      hip: 45, // Forward fold
      leftKnee: 180, // Straight legs
      rightKnee: 180,
      spine: 90 // Forward bend
    },
    keyPositions: {
      hands: 'floor',
      spine: 'forward_fold',
      legs: 'straight'
    },
    criticalJoints: ['leftHip', 'rightHip', 'leftKnee', 'rightKnee', 'spine']
  },

  3: { // Ashwa Sanchalanasana (Low Lunge)
    name: 'Ashwa Sanchalanasana',
    keyAngles: {
      leftKnee: 90, // Front leg bent
      rightKnee: 180, // Back leg straight
      leftHip: 90,
      spine: 160 // Slight extension
    },
    keyPositions: {
      frontLeg: 'bent',
      backLeg: 'straight',
      chest: 'open'
    },
    criticalJoints: ['leftKnee', 'rightKnee', 'leftHip', 'rightHip', 'chest']
  },

  4: { // Dandasana (Plank Pose)
    name: 'Dandasana',
    keyAngles: {
      spine: 180, // Straight line
      leftElbow: 180, // Straight arms
      rightElbow: 180,
      leftKnee: 180, // Straight legs
      rightKnee: 180
    },
    keyPositions: {
      body: 'straight_line',
      arms: 'straight',
      core: 'engaged'
    },
    criticalJoints: ['spine', 'leftElbow', 'rightElbow', 'leftKnee', 'rightKnee']
  },

  5: { // Ashtanga Namaskara (Eight-Limbed Pose)
    name: 'Ashtanga Namaskara',
    keyAngles: {
      leftElbow: 90, // Bent elbows
      rightElbow: 90,
      leftKnee: 90, // Knees down
      rightKnee: 90,
      chest: 45 // Chest to floor
    },
    keyPositions: {
      knees: 'ground',
      chest: 'ground',
      chin: 'ground'
    },
    criticalJoints: ['leftElbow', 'rightElbow', 'leftKnee', 'rightKnee', 'chest']
  },

  6: { // Bhujangasana (Cobra Pose)
    name: 'Bhujangasana',
    keyAngles: {
      spine: 145, // Back extension
      leftElbow: 160, // Slightly bent
      rightElbow: 160,
      leftHip: 180 // Hips down
    },
    keyPositions: {
      chest: 'lifted',
      hips: 'ground',
      arms: 'support'
    },
    criticalJoints: ['spine', 'leftElbow', 'rightElbow', 'chest']
  },

  7: { // Adho Mukha Svanasana (Downward-Facing Dog)
    name: 'Adho Mukha Svanasana',
    keyAngles: {
      spine: 120, // V-shape
      leftElbow: 180, // Straight arms
      rightElbow: 180,
      leftKnee: 180, // Straight legs
      rightKnee: 180,
      hip: 60 // Inverted V
    },
    keyPositions: {
      hips: 'up',
      arms: 'straight',
      legs: 'straight'
    },
    criticalJoints: ['spine', 'leftElbow', 'rightElbow', 'leftKnee', 'rightKnee', 'hip']
  },

  8: { // Ashwa Sanchalanasana (Low Lunge - Other Side)
    name: 'Ashwa Sanchalanasana',
    keyAngles: {
      rightKnee: 90, // Front leg bent (opposite side)
      leftKnee: 180, // Back leg straight
      rightHip: 90,
      spine: 160
    },
    keyPositions: {
      frontLeg: 'bent',
      backLeg: 'straight',
      chest: 'open'
    },
    criticalJoints: ['leftKnee', 'rightKnee', 'leftHip', 'rightHip', 'chest']
  },

  9: { // Hastapadasana (Standing Forward Bend)
    name: 'Hastapadasana',
    keyAngles: {
      hip: 45,
      leftKnee: 180,
      rightKnee: 180,
      spine: 90
    },
    keyPositions: {
      hands: 'floor',
      spine: 'forward_fold',
      legs: 'straight'
    },
    criticalJoints: ['leftHip', 'rightHip', 'leftKnee', 'rightKnee', 'spine']
  },

  10: { // Hastauttanasana (Raised Arms Pose)
    name: 'Hastauttanasana',
    keyAngles: {
      leftArm: 160,
      rightArm: 160,
      spine: 165,
      leftShoulder: 160,
      rightShoulder: 160
    },
    keyPositions: {
      arms: 'raised',
      spine: 'slight_backbend',
      feet: 'together'
    },
    criticalJoints: ['leftWrist', 'rightWrist', 'leftShoulder', 'rightShoulder', 'spine']
  },

  11: { // Tadasana (Mountain Pose)
    name: 'Tadasana',
    keyAngles: {
      spine: 180,
      leftElbow: 180,
      rightElbow: 180,
      leftKnee: 180,
      rightKnee: 180
    },
    keyPositions: {
      arms: 'sides',
      spine: 'straight',
      feet: 'together'
    },
    criticalJoints: ['spine', 'leftShoulder', 'rightShoulder', 'leftHip', 'rightHip']
  }
};

// Pose comparison logic
export class PoseComparator {
  constructor() {
    this.toleranceAngle = 15; // Degrees of tolerance for angle comparison
    this.tolerancePosition = 0.1; // Normalized position tolerance
  }

  // Compare current pose with reference pose
  comparePose(currentLandmarks, referenceIndex) {
    if (!currentLandmarks || !REFERENCE_POSES[referenceIndex]) {
      return {
        accuracy: 0,
        correctJoints: [],
        incorrectJoints: [],
        feedback: ['Unable to detect pose']
      };
    }

    const referencePose = REFERENCE_POSES[referenceIndex];
    const results = {
      accuracy: 0,
      correctJoints: [],
      incorrectJoints: [],
      feedback: []
    };

    let totalChecks = 0;
    let correctChecks = 0;

    // Check critical joints
    referencePose.criticalJoints.forEach(joint => {
      totalChecks++;
      
      if (this.isJointCorrect(currentLandmarks, joint, referencePose)) {
        correctChecks++;
        results.correctJoints.push(joint);
      } else {
        results.incorrectJoints.push(joint);
        results.feedback.push(this.getJointFeedback(joint, referencePose));
      }
    });

    // Calculate accuracy percentage
    results.accuracy = totalChecks > 0 ? Math.round((correctChecks / totalChecks) * 100) : 0;

    // Add overall feedback
    if (results.accuracy >= 90) {
      results.feedback.unshift('Excellent pose! Great alignment.');
    } else if (results.accuracy >= 70) {
      results.feedback.unshift('Good pose! Minor adjustments needed.');
    } else if (results.accuracy >= 50) {
      results.feedback.unshift('Getting there! Focus on the highlighted areas.');
    } else {
      results.feedback.unshift('Keep practicing! Check your form.');
    }

    return results;
  }

  // Check if a specific joint is in correct position
  isJointCorrect(landmarks, joint, referencePose) {
    // This is a simplified check - in a real implementation,
    // you'd need more sophisticated angle and position calculations
    const landmark = this.getLandmarkByName(landmarks, joint);
    
    if (!landmark || landmark.visibility < 0.5) {
      return false;
    }

    // Basic position checks (can be expanded with actual angle calculations)
    switch (joint) {
      case 'spine':
        return this.checkSpineAlignment(landmarks, referencePose);
      case 'leftShoulder':
      case 'rightShoulder':
        return this.checkShoulderPosition(landmarks, joint, referencePose);
      default:
        return true; // Placeholder - implement specific joint checks
    }
  }

  // Get landmark by joint name
  getLandmarkByName(landmarks, jointName) {
    const jointMap = {
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

    const index = jointMap[jointName];
    return index !== undefined ? landmarks[index] : null;
  }

  // Check spine alignment
  checkSpineAlignment(landmarks, referencePose) {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
      return false;
    }

    // Calculate spine angle (simplified)
    const shoulderMidpoint = {
      x: (leftShoulder.x + rightShoulder.x) / 2,
      y: (leftShoulder.y + rightShoulder.y) / 2
    };

    const hipMidpoint = {
      x: (leftHip.x + rightHip.x) / 2,
      y: (leftHip.y + rightHip.y) / 2
    };

    // Check if spine is relatively straight (for poses requiring straight spine)
    const spineAngle = Math.abs(shoulderMidpoint.x - hipMidpoint.x);
    return spineAngle < 0.1; // Normalized threshold
  }

  // Check shoulder position
  checkShoulderPosition(landmarks, joint, referencePose) {
    const landmark = this.getLandmarkByName(landmarks, joint);
    return landmark && landmark.visibility > 0.5;
  }

  // Get feedback for incorrect joints
  getJointFeedback(joint, referencePose) {
    const feedbackMap = {
      spine: 'Keep your spine straight and aligned',
      leftShoulder: 'Adjust your left shoulder position',
      rightShoulder: 'Adjust your right shoulder position',
      leftElbow: 'Check your left elbow alignment',
      rightElbow: 'Check your right elbow alignment',
      leftWrist: 'Position your left wrist correctly',
      rightWrist: 'Position your right wrist correctly',
      leftHip: 'Align your left hip properly',
      rightHip: 'Align your right hip properly',
      leftKnee: 'Adjust your left knee position',
      rightKnee: 'Adjust your right knee position'
    };

    return feedbackMap[joint] || `Adjust your ${joint} position`;
  }

  // Calculate overall pose accuracy
  calculatePoseAccuracy(comparison) {
    return comparison.accuracy;
  }

  // Get color for skeleton based on accuracy
  getSkeletonColor(accuracy) {
    if (accuracy >= 80) return '#4CAF50'; // Green
    if (accuracy >= 60) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  }
}

export default PoseComparator;