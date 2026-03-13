'use client'

import { useState } from 'react'
import { FiX, FiChevronLeft, FiChevronRight, FiFilter, FiImage, FiZoomIn } from 'react-icons/fi'

const GALLERY_IMAGES = [
  {
    id: 'img-1',
    title: 'Sales Conference 2024',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    date: '2024-03-01',
  },
  {
    id: 'img-2',
    title: 'Team Building Workshop',
    category: 'Team',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    date: '2024-02-28',
  },
  {
    id: 'img-3',
    title: 'Product Launch Event',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
    date: '2024-02-25',
  },
  {
    id: 'img-4',
    title: 'Q1 Sales Meeting',
    category: 'Meetings',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    date: '2024-02-20',
  },
  {
    id: 'img-5',
    title: 'Award Ceremony',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    date: '2024-02-15',
  },
  {
    id: 'img-6',
    title: 'Training Session',
    category: 'Training',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
    date: '2024-02-10',
  },
  {
    id: 'img-7',
    title: 'Office Tour',
    category: 'Office',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    date: '2024-02-05',
  },
  {
    id: 'img-8',
    title: 'Customer Success Story',
    category: 'Customers',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    date: '2024-02-01',
  },
  {
    id: 'img-9',
    title: 'Team Celebration',
    category: 'Team',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
    date: '2024-01-28',
  },
  {
    id: 'img-10',
    title: 'Annual Review Meeting',
    category: 'Meetings',
    url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
    date: '2024-01-25',
  },
  {
    id: 'img-11',
    title: 'New Office Space',
    category: 'Office',
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
    date: '2024-01-20',
  },
  {
    id: 'img-12',
    title: 'Client Workshop',
    category: 'Training',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    date: '2024-01-15',
  },
]

const CATEGORIES = ['All', 'Events', 'Team', 'Meetings', 'Training', 'Office', 'Customers']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = GALLERY_IMAGES.filter((image) => {
    return selectedCategory === 'All' || image.category === selectedCategory
  })

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1)
    }
  }

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightboxIndex === null) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Photo Gallery</h1>
        <p className="text-muted-foreground">
          Browse photos from events, team activities, and training sessions
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <FiFilter className="text-muted-foreground" size={18} />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filteredImages.length} photos
      </p>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-muted aspect-[4/3]"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.thumbnail}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-background">
                  <FiZoomIn size={28} className="mx-auto mb-2" />
                  <p className="font-medium text-sm px-2 line-clamp-1">{image.title}</p>
                </div>
              </div>
              {/* Category badge */}
              <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {image.category}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FiImage size={48} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No Photos Found</h2>
          <p className="text-muted-foreground">
            No photos available in this category.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-background hover:bg-background/20 rounded-lg transition-colors z-10"
          >
            <FiX size={28} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 p-3 text-background hover:bg-background/20 rounded-full transition-colors z-10"
          >
            <FiChevronLeft size={32} />
          </button>

          {/* Image container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-lg">
              <h3 className="text-background font-semibold text-lg">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="text-background/70 text-sm flex items-center gap-2">
                <span className="px-2 py-0.5 bg-primary/80 text-primary-foreground rounded text-xs">
                  {filteredImages[lightboxIndex].category}
                </span>
                <span>{new Date(filteredImages[lightboxIndex].date).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 p-3 text-background hover:bg-background/20 rounded-full transition-colors z-10"
          >
            <FiChevronRight size={32} />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-background text-sm bg-foreground/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
