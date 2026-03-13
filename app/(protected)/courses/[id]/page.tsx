'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCourseById } from '@/lib/staticData'
import { FiStar, FiUsers, FiClock, FiCheckCircle, FiAlertCircle, FiLoader, FiBookOpen, FiAward, FiTarget, FiDownload } from 'react-icons/fi'

interface CourseDetailPageProps {
  params: Promise<{ id: string }>
}

export default function CourseDetailPage(props: CourseDetailPageProps) {
  const router = useRouter()
  const params = require('react').use(props.params)
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState(false)
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null)

  const course = getCourseById(params.id)

  if (!course) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Course Not Found</h1>
          <p className="text-foreground/70 mb-4">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="text-primary hover:underline font-semibold">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const handleEnroll = async () => {
    setLoading(true)

    // Check if user is authenticated
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login?redirect=' + window.location.pathname)
      setLoading(false)
      return
    }

    // Simulate enrollment
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setEnrolled(true)
    setLoading(false)
  }

  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  const totalDuration = course.chapters.reduce((sum, ch) => sum + ch.duration, 0)

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/courses" className="text-primary hover:underline font-medium mb-4 inline-flex items-center gap-2">
            ← Back to Courses
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm font-semibold">
                      {course.level}
                    </span>
                    <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded text-sm font-semibold">
                      {course.category}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground">{course.title}</h1>
                </div>
              </div>

              <p className="text-lg text-foreground/70">{course.description}</p>

              {/* Instructor */}
              <div className="flex items-center gap-3 py-4 border-y border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <img
                    src={course.instructorAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + course.instructor}
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Taught by</p>
                  <p className="text-foreground/70">{course.instructor}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FiStar size={18} className="text-yellow-500" fill="currentColor" />
                    <span className="font-bold text-lg">{course.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-foreground/70">{course.ratingCount.toLocaleString()} Ratings</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FiUsers size={18} className="text-primary" />
                    <span className="font-bold text-lg">{(course.studentsCount / 1000).toFixed(0)}K</span>
                  </div>
                  <p className="text-xs text-foreground/70">Students Enrolled</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FiClock size={18} className="text-secondary" />
                    <span className="font-bold text-lg">{totalDuration}</span>
                  </div>
                  <p className="text-xs text-foreground/70">Minutes of Content</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20 space-y-4">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-foreground/50 line-through">
                      ₹{course.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <p className="text-sm text-destructive font-semibold">
                    Save {discountPercent}% ({(course.originalPrice! - course.price).toLocaleString()} rupees)
                  </p>
                )}
              </div>

              {enrolled ? (
                <div className="w-full py-3 px-4 bg-secondary text-secondary-foreground font-semibold rounded-lg flex items-center justify-center gap-2">
                  <FiCheckCircle size={20} />
                  Enrolled Successfully
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <FiLoader size={20} className="animate-spin" />}
                  {loading ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <p className="text-xs text-center text-foreground/50">
                Full lifetime access on all enrolled courses
              </p>

              {/* Course Includes */}
              <div className="pt-4 border-t border-border space-y-2">
                <p className="font-semibold text-foreground text-sm">This course includes:</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-center gap-2">
                    <FiClock size={16} className="text-secondary flex-shrink-0" />
                    <span>{totalDuration} minutes of video</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiBookOpen size={16} className="text-secondary flex-shrink-0" />
                    <span>{course.chapters.length} chapters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiDownload size={16} className="text-secondary flex-shrink-0" />
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiAward size={16} className="text-secondary flex-shrink-0" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {course.description_long && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Course</h2>
                <p className="text-foreground/70 leading-relaxed">{course.description_long}</p>
              </div>
            )}

            {/* What You'll Learn */}
            {course.learnings && course.learnings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learnings.map((learning, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiCheckCircle size={20} className="text-secondary flex-shrink-0 mt-1" />
                      <span className="text-foreground">{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiTarget size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span className="text-foreground/70">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Course Content */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Course Content</h2>
              <div className="space-y-3">
                {course.chapters.map((chapter, idx) => (
                  <button
                    key={chapter.id}
                    onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                    className="w-full bg-card border border-border rounded-lg p-4 text-left hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {idx + 1}. {chapter.title}
                        </h3>
                        <p className="text-sm text-foreground/70 mt-1">{chapter.description}</p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="text-sm text-foreground/70 flex items-center gap-1">
                          <FiClock size={14} />
                          {chapter.duration} min
                        </p>
                      </div>
                    </div>

                    {expandedChapter === chapter.id && (
                      <div className="mt-4 pt-4 border-t border-border space-y-2">
                        {chapter.resources && chapter.resources.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Resources:</p>
                            <ul className="space-y-1">
                              {chapter.resources.map((res, i) => (
                                <li key={i} className="text-sm text-primary hover:underline">
                                  • {res.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-foreground">Course Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-foreground/70">Skill Level</p>
                  <p className="font-semibold text-foreground">{course.level}</p>
                </div>
                <div>
                  <p className="text-foreground/70">Category</p>
                  <p className="font-semibold text-foreground">{course.category}</p>
                </div>
                <div>
                  <p className="text-foreground/70">Duration</p>
                  <p className="font-semibold text-foreground">{totalDuration} minutes</p>
                </div>
                <div>
                  <p className="text-foreground/70">Lessons</p>
                  <p className="font-semibold text-foreground">{course.chapters.length} chapters</p>
                </div>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
              <FiAlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-blue-700 dark:text-blue-200">
                <p className="font-semibold mb-1">Educational Quality Guarantee</p>
                <p>All courses are verified and created by expert educators.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper icon component for Download
function Download({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  )
}
