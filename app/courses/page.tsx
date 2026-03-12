'use client'

import { useState, useMemo } from 'react'
import { COURSES } from '@/lib/staticData'
import { CourseCard } from '@/components/CourseCard'
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi'

const CATEGORIES = ['All', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'JEE', 'NEET']
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced']
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = COURSES.filter((course) => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesLevel && matchesSearch
    })

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.studentsCount - a.studentsCount)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [selectedCategory, selectedLevel, searchQuery, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Courses</h1>
        <p className="text-foreground/70">
          Choose from {COURSES.length}+ courses across all subjects and prepare for your goals
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <FiSearch className="absolute left-4 top-3.5 text-foreground/40" size={20} />
        <input
          type="text"
          placeholder="Search courses, instructors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-card border border-border rounded-lg p-6 space-y-6 sticky top-20">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Category</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-foreground/70">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Level</h3>
              <div className="space-y-2">
                {LEVELS.map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      checked={selectedLevel === level}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-foreground/70">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Sort by</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedLevel('All')
                  setSearchQuery('')
                }}
                className="w-full py-2 px-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card text-foreground hover:bg-muted transition-colors"
          >
            <FiFilter size={20} />
            <span>Filters</span>
            <FiChevronDown size={20} className={showFilters ? 'rotate-180' : ''} />
          </button>

          {showFilters && (
            <div className="mt-4 bg-card border border-border rounded-lg p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-foreground/70">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Level</h3>
                <div className="space-y-2">
                  {LEVELS.map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={selectedLevel === level}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-foreground/70">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Sort by</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className="flex-1">
          {filteredAndSortedCourses.length > 0 ? (
            <>
              <p className="text-sm text-foreground/70 mb-4">
                Showing {filteredAndSortedCourses.length} of {COURSES.length} courses
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No Courses Found</h2>
              <p className="text-foreground/70 max-w-md">
                Try adjusting your filters or search query to find the courses you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
