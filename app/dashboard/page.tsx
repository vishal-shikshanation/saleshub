'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { COURSES, EXAMS } from '@/lib/staticData'
import { User } from '@/lib/types'
import { CourseCard } from '@/components/CourseCard'
import { FiBook, FiTrendingUp, FiAward, FiClock, FiArrowRight, FiTarget, FiZap } from 'react-icons/fi'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState<typeof COURSES>([])
  const [examResults, setExamResults] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Load enrolled courses
    const enrolledIds = parsedUser.enrolledCourses || []
    const enrolled = COURSES.filter((course) => enrolledIds.includes(course.id))
    setEnrolledCourses(enrolled)

    // Load exam results
    const results = JSON.parse(localStorage.getItem('exam_results') || '[]')
    const userResults = results.filter((r: any) => r.userId === parsedUser.id || r.userId === 'anonymous')
    setExamResults(userResults)

    setLoading(false)
  }, [router])

  const handleEnrollCourse = (courseId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      enrolledCourses: [...(user.enrolledCourses || []), courseId],
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))

    const enrolled = COURSES.filter((course) =>
      updatedUser.enrolledCourses.includes(course.id)
    )
    setEnrolledCourses(enrolled)
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <FiZap size={48} className="text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-foreground/70">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const totalEnrolledCourses = enrolledCourses.length
  const totalExamsAttempted = examResults.length
  const passedExams = examResults.filter((r) => r.passed).length
  const totalStudyTime = enrolledCourses.reduce((sum, course) => {
    return sum + course.chapters.reduce((chSum, ch) => chSum + ch.duration, 0)
  }, 0)

  const recentExams = examResults.slice(-3).reverse()
  const suggestedCourses = COURSES.filter(
    (course) => !enrolledCourses.find((c) => c.id === course.id)
  ).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, <span className="text-primary">{user?.name || 'Learner'}</span>
        </h1>
        <p className="text-foreground/70">
          Continue your learning journey and achieve your educational goals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/70 text-sm">Courses Enrolled</p>
              <p className="text-3xl font-bold text-foreground">{totalEnrolledCourses}</p>
            </div>
            <FiBook size={32} className="text-primary opacity-20" />
          </div>
          <Link href="/courses" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1 pt-2">
            Explore more <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/70 text-sm">Exams Attempted</p>
              <p className="text-3xl font-bold text-foreground">{totalExamsAttempted}</p>
            </div>
            <FiTarget size={32} className="text-secondary opacity-20" />
          </div>
          <p className="text-secondary text-sm font-medium pt-2">
            {passedExams} passed
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/70 text-sm">Study Time</p>
              <p className="text-3xl font-bold text-foreground">
                {Math.round(totalStudyTime / 60)}
              </p>
              <p className="text-foreground/50 text-xs">hours</p>
            </div>
            <FiClock size={32} className="text-yellow-500 opacity-20" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/70 text-sm">Success Rate</p>
              <p className="text-3xl font-bold text-foreground">
                {totalExamsAttempted > 0 ? Math.round((passedExams / totalExamsAttempted) * 100) : 0}%
              </p>
            </div>
            <FiAward size={32} className="text-green-500 opacity-20" />
          </div>
          <p className="text-green-600 dark:text-green-400 text-sm font-medium pt-2">
            Great progress!
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
            <Link href="/courses" className="text-primary hover:underline font-medium text-sm">
              View all
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <FiBook size={48} className="text-foreground/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Courses Yet</h3>
              <p className="text-foreground/70 mb-4">
                Start your learning journey by enrolling in a course
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity gap-2"
              >
                Explore Courses <FiArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Exam Results */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground text-lg">Recent Exams</h3>
              <Link href="/exams" className="text-primary text-sm hover:underline">
                View all
              </Link>
            </div>

            {recentExams.length > 0 ? (
              <div className="space-y-3">
                {recentExams.map((result, idx) => {
                  const exam = EXAMS.find((e) => e.id === result.examId)
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {exam?.title || 'Unknown Exam'}
                        </p>
                        <p className="text-xs text-foreground/50">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`text-right px-3 py-1 rounded text-sm font-bold ${result.passed ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'}`}>
                        {result.score}%
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <FiTarget size={32} className="text-foreground/20 mx-auto mb-2" />
                <p className="text-sm text-foreground/70">No exams attempted yet</p>
                <Link href="/exams" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
                  Start practicing
                </Link>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="font-bold text-foreground mb-4">Learning Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">Completion Rate</span>
                <span className="font-bold text-primary">
                  {enrolledCourses.length > 0 ? Math.round((enrolledCourses.length / COURSES.length) * 100) : 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${enrolledCourses.length > 0 ? (enrolledCourses.length / COURSES.length) * 100 : 0}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-primary/20">
                <span className="text-sm text-foreground/70">Success Rate</span>
                <span className="font-bold text-primary">
                  {totalExamsAttempted > 0 ? Math.round((passedExams / totalExamsAttempted) * 100) : 0}%
                </span>
              </div>

              <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all"
                  style={{
                    width: `${totalExamsAttempted > 0 ? (passedExams / totalExamsAttempted) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <Link
            href="/profile"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <h3 className="font-bold text-foreground">{user?.name}</h3>
              <p className="text-sm text-foreground/70 mt-1">{user?.email}</p>
              <button className="mt-4 text-primary font-medium text-sm hover:underline">
                View Profile →
              </button>
            </div>
          </Link>
        </div>
      </div>

      {/* Suggested Courses */}
      {suggestedCourses.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Recommended For You</h2>
              <p className="text-foreground/70 text-sm mt-1">
                Based on your learning journey
              </p>
            </div>
            <Link href="/courses" className="text-primary hover:underline font-medium text-sm">
              Browse all courses
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
