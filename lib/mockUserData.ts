// Mock user progress data for testing
// Replace with actual MongoDB data when integrated

export const mockUserData = {
  id: 'user-test-001',
  email: 'test@eduNation.com',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  bio: 'Passionate learner and JEE aspirant',
  enrolledCourses: ['course-1', 'course-2', 'course-3', 'course-5'],
  completedChapters: {
    'course-1': 2,
    'course-2': 1,
    'course-3': 0,
    'course-5': 3,
  },
  totalChapters: {
    'course-1': 3,
    'course-2': 3,
    'course-3': 3,
    'course-5': 3,
  },
  lastAccessedCourse: 'course-1',
  lastAccessedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
}

export const mockExamResults = [
  {
    id: 'result-1',
    examId: 'exam-1',
    examTitle: 'Class 10 Mathematics - Mock Test 1',
    score: 78,
    totalQuestions: 10,
    correctAnswers: 8,
    timeTaken: 95, // in minutes
    passed: true,
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: 'result-2',
    examId: 'exam-3',
    examTitle: 'NEET Biology - Chapter Test',
    score: 82,
    totalQuestions: 8,
    correctAnswers: 7,
    timeTaken: 110,
    passed: true,
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: 'result-3',
    examId: 'exam-2',
    examTitle: 'JEE Main Mathematics - Practice Test',
    score: 65,
    totalQuestions: 5,
    correctAnswers: 3,
    timeTaken: 145,
    passed: true,
    completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
]

export const mockAchievements = [
  {
    id: 'badge-1',
    title: 'First Steps',
    description: 'Completed your first course',
    icon: '🎓',
    unlockedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'badge-2',
    title: 'Quiz Master',
    description: 'Scored 80+ in 3 exams',
    icon: '🏆',
    unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'badge-3',
    title: 'Consistent Learner',
    description: 'Completed 5 course chapters',
    icon: '⭐',
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function getUserData() {
  const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  if (savedUser) {
    return JSON.parse(savedUser)
  }
  return mockUserData
}

export function getExamResults() {
  return mockExamResults
}

export function getAchievements() {
  return mockAchievements
}

export function getEnrolledCourses(courseList: any[]) {
  const userData = getUserData()
  return courseList.filter((course) => userData.enrolledCourses.includes(course.id))
}

export function getCourseProgress(courseId: string) {
  const userData = getUserData()
  const completed = userData.completedChapters[courseId] || 0
  const total = userData.totalChapters[courseId] || 0
  return {
    completedChapters: completed,
    totalChapters: total,
    progressPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}
