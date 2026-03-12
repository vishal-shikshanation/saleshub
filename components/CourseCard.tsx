import Link from 'next/link'
import { Course } from '@/lib/types'
import { FiStar, FiUsers, FiClock } from 'react-icons/fi'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
        {/* Thumbnail */}
        <div className="relative overflow-hidden bg-muted h-40">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {discountPercent}% OFF
            </div>
          )}
          <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
            {course.level}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 flex flex-col h-[calc(100%-10rem)]">
          {/* Category */}
          <span className="inline-flex w-fit text-xs font-medium text-secondary bg-secondary/10 px-2.5 py-1 rounded">
            {course.category}
          </span>

          {/* Title */}
          <h3 className="font-bold text-lg line-clamp-2 text-foreground">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-foreground/70 line-clamp-1">
            {course.instructor}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-foreground/60 py-2 border-t border-border">
            <div className="flex items-center gap-1">
              <FiStar size={14} className="text-yellow-500" fill="currentColor" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-foreground/40">({course.ratingCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers size={14} />
              <span>{(course.studentsCount / 1000).toFixed(1)}K</span>
            </div>
          </div>

          {/* Chapters Info */}
          <div className="flex items-center gap-1 text-xs text-foreground/60">
            <FiClock size={14} />
            <span>{course.chapters.length} chapters</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-lg font-bold text-primary">
              ₹{course.price.toLocaleString()}
            </span>
            {course.originalPrice && (
              <span className="text-sm text-foreground/50 line-through">
                ₹{course.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
