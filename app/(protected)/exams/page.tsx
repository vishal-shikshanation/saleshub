'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { EXAMS } from '@/lib/staticData'
import { FiClock, FiTarget, FiBookOpen, FiChevronRight, FiFilter, FiSearch } from 'react-icons/fi'

const CATEGORIES = ['All', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'JEE', 'NEET']
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']

export default function ExamsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredExams = useMemo(() => {
    return EXAMS.filter((exam) => {
      const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'All' || exam.difficulty === selectedDifficulty
      const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesDifficulty && matchesSearch
    })
  }, [selectedCategory, selectedDifficulty, searchQuery])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800'
      case 'Hard':
        return 'text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Practice Exams</h1>
        <p className="text-foreground/70">
          Test your knowledge with {EXAMS.length}+ full-length practice exams
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <FiSearch className="absolute left-4 top-3.5 text-foreground/40" size={20} />
        <input
          type="text"
          placeholder="Search exams..."
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

            {/* Difficulty Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Difficulty</h3>
              <div className="space-y-2">
                {DIFFICULTIES.map((difficulty) => (
                  <label key={difficulty} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty}
                      checked={selectedDifficulty === difficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-foreground/70">{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedDifficulty('All')
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
        <div className="lg:hidden mb-4 w-full">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card text-foreground hover:bg-muted transition-colors w-full justify-center"
          >
            <FiFilter size={20} />
            <span>Filters</span>
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

              {/* Difficulty Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Difficulty</h3>
                <div className="space-y-2">
                  {DIFFICULTIES.map((difficulty) => (
                    <label key={difficulty} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        value={difficulty}
                        checked={selectedDifficulty === difficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-foreground/70">{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exams List */}
        <div className="flex-1">
          {filteredExams.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-foreground/70">
                Showing {filteredExams.length} of {EXAMS.length} exams
              </p>

              {filteredExams.map((exam) => (
                <Link key={exam.id} href={`/exams/${exam.id}`}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-1 rounded text-xs font-semibold border ${getDifficultyColor(exam.difficulty)}`}>
                            {exam.difficulty}
                          </span>
                          <span className="inline-block bg-secondary/10 text-secondary px-2.5 py-1 rounded text-xs font-semibold">
                            {exam.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {exam.title}
                        </h3>
                        <p className="text-foreground/70 text-sm mt-1">{exam.description}</p>
                      </div>
                      <FiChevronRight className="text-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" size={24} />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <FiClock size={16} className="text-primary" />
                        <span className="text-sm">{exam.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <FiBookOpen size={16} className="text-secondary" />
                        <span className="text-sm">{exam.totalQuestions} Questions</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <FiTarget size={16} className="text-secondary" />
                        <span className="text-sm">Pass: {exam.passingScore}%</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No Exams Found</h2>
              <p className="text-foreground/70 max-w-md">
                Try adjusting your filters to find the exams you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
