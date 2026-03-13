import Link from 'next/link'
import { Course } from '@/lib/types'
import { FiStar, FiUsers, FiClock, FiBookOpen } from 'react-icons/fi'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all h-full cursor-pointer group">
        {/* Thumbnail */}
        <div className="relative overflow-hidden bg-muted h-40">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-2.5 py-1 rounded text-xs font-semibold">
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
          <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground py-2 border-t border-border">
            <div className="flex items-center gap-1">
              <FiStar size={14} className="text-yellow-500" fill="currentColor" />
              <span className="font-medium">{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers size={14} />
              <span>{course.studentsCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiBookOpen size={14} />
              <span>{course.chapters.length} chapters</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2 pt-2">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-primary/10">
              {course.instructorAvatar ? (
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary font-bold text-xs">
                  {course.instructor.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{course.instructor}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
