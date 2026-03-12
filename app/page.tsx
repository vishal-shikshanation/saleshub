import Link from 'next/link'
import { FiArrowRight, FiBook, FiAward, FiUsers, FiZap } from 'react-icons/fi'

export default function LandingPage() {
  const stats = [
    { label: '50K+', description: 'Active Students' },
    { label: '200+', description: 'Expert Courses' },
    { label: '1000+', description: 'Quality Exams' },
    { label: '95%', description: 'Success Rate' },
  ]

  const features = [
    {
      icon: FiBook,
      title: 'Comprehensive Curriculum',
      description: 'From Class 6 to NEET/JEE preparation, all subjects covered by expert instructors.',
    },
    {
      icon: FiAward,
      title: 'Certified Learning',
      description: 'Get recognized certificates upon course completion to boost your career.',
    },
    {
      icon: FiUsers,
      title: 'Expert Community',
      description: 'Learn from experienced educators and interact with thousands of learners.',
    },
    {
      icon: FiZap,
      title: 'Learn at Your Pace',
      description: 'Flexible learning schedules that fit your lifestyle and learning speed.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800 min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                <span className="text-foreground">Learn Better,</span>
                <br />
                <span className="text-primary">Achieve More</span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-md">
                India's most comprehensive online learning platform. Master any subject with expert-led courses, practice exams, and personalized learning paths.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity gap-2"
                >
                  Get Started Free
                  <FiArrowRight size={20} />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors gap-2"
                >
                  Explore Courses
                  <FiArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 rounded-3xl blur-3xl" />
                <div className="relative bg-card rounded-3xl p-8 shadow-lg border border-border">
                  <div className="space-y-4">
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.label}</div>
                <div className="text-primary-foreground/80 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EduNation?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              We provide everything you need to succeed in your educational journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-foreground/70 text-lg mb-8">
            Join thousands of students already learning with EduNation. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity gap-2 text-lg"
          >
            Create Free Account
            <FiArrowRight size={24} />
          </Link>
        </div>
      </section>
    </>
  )
}
