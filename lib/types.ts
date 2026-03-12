export interface Chapter {
  id: string
  title: string
  description: string
  duration: number // in minutes
  videoUrl?: string
  resources?: {
    title: string
    url: string
    type: 'pdf' | 'doc' | 'link'
  }[]
}

export interface Course {
  id: string
  title: string
  description: string
  category: 'Class 6-8' | 'Class 9-10' | 'Class 11-12' | 'JEE' | 'NEET'
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  instructor: string
  instructorAvatar?: string
  thumbnail: string
  rating: number
  ratingCount: number
  studentsCount: number
  price: number
  originalPrice?: number
  chapters: Chapter[]
  description_long?: string
  learnings?: string[]
  requirements?: string[]
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Exam {
  id: string
  title: string
  description: string
  category: 'Class 6-8' | 'Class 9-10' | 'Class 11-12' | 'JEE' | 'NEET'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  duration: number // in minutes
  totalQuestions: number
  questions: Question[]
  passingScore: number
  maxScore: number
  createdAt: string
  updatedAt: string
}

export interface UserProgress {
  _id?: string
  userId: string
  courseId: string
  completedChapters: number
  totalChapters: number
  lastAccessed: Date
  certificateIssued: boolean
  completionPercentage: number
}

export interface ExamResult {
  _id?: string
  userId: string
  examId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeTaken: number
  passed: boolean
  completedAt: Date
}

export interface User {
  _id?: string
  id?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  avatar?: string
  bio?: string
  enrolledCourses: string[]
  createdAt?: Date
  updatedAt?: Date
}
