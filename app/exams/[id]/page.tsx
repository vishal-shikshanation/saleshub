'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getExamById } from '@/lib/staticData'
import { FiClock, FiCheck, FiX, FiVolume2, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { ExamResult } from '@/lib/types'

interface ExamPageProps {
  params: Promise<{ id: string }>
}

export default function ExamPage(props: ExamPageProps) {
  const router = useRouter()
  const params = require('react').use(props.params)
  const exam = getExamById(params.id)

  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(exam?.questions.length || 0).fill(null))
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 60) * 60)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Timer
  React.useEffect(() => {
    if (!started || submitted) return

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0) {
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [started, submitted])

  if (!exam) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Exam Not Found</h1>
          <Link href="/exams" className="text-primary hover:underline font-semibold">
            Back to Exams
          </Link>
        </div>
      </div>
    )
  }

  const currentQuestion = exam.questions[currentQuestionIndex]
  const selectedAnswer = answers[currentQuestionIndex]

  const handleSelectAnswer = (optionIndex: number) => {
    if (submitted) return
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSubmitted(true)

    // Calculate score
    let correctCount = 0
    exam.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / exam.questions.length) * 100)
    const passed = score >= exam.passingScore

    // Save result (in real app, send to server)
    const result: ExamResult = {
      userId: JSON.parse(localStorage.getItem('user') || '{}').id || 'anonymous',
      examId: exam.id,
      score,
      totalQuestions: exam.questions.length,
      correctAnswers: correctCount,
      timeTaken: (exam.duration * 60 - timeLeft) / 60,
      passed,
      completedAt: new Date(),
    }

    // Store in localStorage (in real app, send to MongoDB)
    const results = JSON.parse(localStorage.getItem('exam_results') || '[]')
    results.push(result)
    localStorage.setItem('exam_results', JSON.stringify(results))

    setLoading(false)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const correctCount = useMemo(() => {
    return answers.reduce((count, answer, idx) => {
      return count + (answer === exam.questions[idx].correctAnswer ? 1 : 0)
    }, 0)
  }, [answers, exam.questions])

  const score = Math.round((correctCount / exam.questions.length) * 100)
  const passed = score >= exam.passingScore

  if (!started) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
        <Link href="/exams" className="text-primary hover:underline font-medium mb-6 inline-flex items-center gap-2">
          ← Back to Exams
        </Link>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-lg p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{exam.title}</h1>
            <p className="text-foreground/70">{exam.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground/70 text-sm mb-1">Duration</p>
              <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FiClock size={24} className="text-primary" />
                {exam.duration} min
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground/70 text-sm mb-1">Questions</p>
              <p className="text-2xl font-bold text-foreground">{exam.questions.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground/70 text-sm mb-1">Difficulty</p>
              <p className="text-2xl font-bold text-foreground">{exam.difficulty}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground/70 text-sm mb-1">Passing Score</p>
              <p className="text-2xl font-bold text-foreground">{exam.passingScore}%</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
            <FiAlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-700 dark:text-blue-200">
              <p className="font-semibold mb-1">Before you start:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure you have uninterrupted time for the exam</li>
                <li>Close all other tabs and applications</li>
                <li>You cannot pause the exam once started</li>
                <li>Your answers are submitted automatically after time expires</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full py-3 px-6 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity text-lg"
          >
            Start Exam Now
          </button>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${passed ? 'bg-secondary/10' : 'bg-destructive/10'}`}>
            {passed ? (
              <FiCheck size={40} className="text-secondary" />
            ) : (
              <FiX size={40} className="text-destructive" />
            )}
          </div>

          <div>
            <p className={`text-lg font-semibold mb-2 ${passed ? 'text-secondary' : 'text-destructive'}`}>
              {passed ? 'Congratulations! You Passed!' : 'You did not pass this exam'}
            </p>
            <h2 className="text-4xl font-bold text-foreground mb-2">Your Score: {score}%</h2>
            <p className="text-foreground/70">
              {correctCount} out of {exam.questions.length} questions answered correctly
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-foreground/70 mb-1">Correct Answers</p>
              <p className="text-2xl font-bold text-secondary">{correctCount}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-foreground/70 mb-1">Incorrect Answers</p>
              <p className="text-2xl font-bold text-destructive">{exam.questions.length - correctCount}</p>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-2">Passing Score Required</p>
            <p className="font-semibold text-primary">{exam.passingScore}%</p>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={() => {
                setStarted(false)
                setSubmitted(false)
                setCurrentQuestionIndex(0)
                setAnswers(new Array(exam.questions.length).fill(null))
                setTimeLeft((exam.duration) * 60)
              }}
              className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Retake Exam
            </button>
            <Link
              href="/exams"
              className="w-full py-3 px-6 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors inline-block text-center"
            >
              Back to Exams
            </Link>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="mt-8 bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Review Your Answers</h3>
          <div className="space-y-4">
            {exam.questions.map((question, idx) => {
              const isCorrect = answers[idx] === question.correctAnswer
              const userAnswer = answers[idx]

              return (
                <div key={question.id} className={`border rounded-lg p-4 ${isCorrect ? 'border-secondary bg-secondary/5' : 'border-destructive bg-destructive/5'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-secondary' : 'bg-destructive'}`}>
                      {isCorrect ? (
                        <FiCheck size={16} className="text-white" />
                      ) : (
                        <FiX size={16} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        Q{idx + 1}. {question.question}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 ml-9">
                    {question.options.map((option, optIdx) => {
                      const isUserAnswer = optIdx === userAnswer
                      const isCorrectAnswer = optIdx === question.correctAnswer

                      return (
                        <div
                          key={optIdx}
                          className={`p-2 rounded flex items-start gap-2 ${
                            isCorrectAnswer
                              ? 'bg-secondary/20 border border-secondary'
                              : isUserAnswer && !isCorrect
                              ? 'bg-destructive/20 border border-destructive'
                              : 'bg-muted/50'
                          }`}
                        >
                          <span className="text-foreground/70 flex-shrink-0">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="text-foreground">{option}</span>
                          {isCorrectAnswer && <FiCheck size={16} className="text-secondary ml-auto flex-shrink-0 mt-0.5" />}
                          {isUserAnswer && !isCorrect && <X size={16} className="text-destructive ml-auto flex-shrink-0 mt-0.5" />}
                        </div>
                      )
                    })}
                  </div>

                  {question.explanation && (
                    <div className="mt-3 ml-9 p-3 bg-muted/50 rounded">
                      <p className="text-sm font-medium text-foreground mb-1">Explanation:</p>
                      <p className="text-sm text-foreground/70">{question.explanation}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">{exam.title}</h1>
            <p className="text-sm text-foreground/70">
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </p>
          </div>

          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg font-bold ${
            timeLeft <= 60
              ? 'bg-destructive/10 text-destructive'
              : 'bg-primary/10 text-primary'
          }`}>
            <FiClock size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="w-full h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Question */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      selectedAnswer === idx
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswer === idx
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border'
                        }`}
                      >
                        {selectedAnswer === idx && <FiCheck size={16} />}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex-1 py-3 px-4 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {currentQuestionIndex === exam.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <FiLoader size={20} className="animate-spin" />}
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Next →
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-32">
            <h3 className="font-bold text-foreground mb-4">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`aspect-square rounded flex items-center justify-center font-semibold text-sm transition-colors ${
                    idx === currentQuestionIndex
                      ? 'bg-primary text-primary-foreground'
                      : answers[idx] !== null
                      ? 'bg-secondary/20 text-secondary hover:bg-secondary/30'
                      : 'bg-muted hover:bg-muted/80 text-foreground/70'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary" />
                <span className="text-foreground/70">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-secondary/20" />
                <span className="text-foreground/70">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted" />
                <span className="text-foreground/70">Unanswered</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-foreground/70 mb-2">Answered</p>
              <p className="text-lg font-bold text-foreground">
                {answers.filter((a) => a !== null).length} / {exam.questions.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
