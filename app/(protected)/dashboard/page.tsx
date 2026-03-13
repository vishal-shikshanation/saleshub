'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { COURSES, EXAMS } from '@/lib/staticData'
import { User } from '@/lib/types'
import { CourseCard } from '@/components/CourseCard'
import { FiBook, FiAward, FiClock, FiArrowRight, FiTarget, FiFolder, FiVideo, FiImage } from 'react-icons/fi'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState<typeof COURSES>([])
  const [examResults, setExamResults] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
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
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
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

  const quickLinks = [
    { href: '/courses', icon: FiBook, label: 'Courses', description: 'Browse training courses' },
    { href: '/brochure', icon: FiFolder, label: 'Brochures', description: 'Download materials' },
    { href: '/media', icon: FiVideo, label: 'Media', description: 'Watch training videos' },
    { href: '/gallery', icon: FiImage, label: 'Gallery', description: 'View photo gallery' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, <span className="text-primary">{user?.name || 'Team Member'}</span>
        </h1>
        <p className="text-muted-foreground">
          Continue your training journey and improve your sales skills
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{link.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
            </Link>
          )
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Courses Enrolled</p>
              <p className="text-2xl font-bold text-foreground mt-1">{totalEnrolledCourses}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FiBook size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Exams Completed</p>
              <p className="text-2xl font-bold text-foreground mt-1">{totalExamsAttempted}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <FiTarget size={24} className="text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Study Time</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {Math.round(totalStudyTime / 60)}h
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FiClock size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Pass Rate</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {totalExamsAttempted > 0 ? Math.round((passedExams / totalExamsAttempted) * 100) : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <FiAward size={24} className="text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">My Courses</h2>
            <Link href="/courses" className="text-primary hover:underline font-medium text-sm flex items-center gap-1">
              View all <FiArrowRight size={14} />
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <FiBook size={48} className="text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Courses Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your training by enrolling in a course
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors gap-2"
              >
                Browse Courses <FiArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Exam Results */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Recent Exams</h3>
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
                        <p className="text-xs text-muted-foreground">
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
                <FiTarget size={32} className="text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No exams attempted yet</p>
                <Link href="/exams" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
                  Start an exam
                </Link>
              </div>
            )}
          </div>

          {/* Learning Progress */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-4">Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Course Completion</span>
                  <span className="font-bold text-primary">
                    {COURSES.length > 0 ? Math.round((enrolledCourses.length / COURSES.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${COURSES.length > 0 ? (enrolledCourses.length / COURSES.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Exam Success Rate</span>
                  <span className="font-bold text-secondary">
                    {totalExamsAttempted > 0 ? Math.round((passedExams / totalExamsAttempted) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all"
                    style={{
                      width: `${totalExamsAttempted > 0 ? (passedExams / totalExamsAttempted) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <Link
            href="/profile"
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow block"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <h3 className="font-bold text-foreground">{user?.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
              <span className="mt-4 text-primary font-medium text-sm inline-flex items-center gap-1">
                View Profile <FiArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Suggested Courses */}
      {suggestedCourses.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Recommended Courses</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Continue your learning journey
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
