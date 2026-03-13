'use client'

import { useState } from 'react'
import { FiPlay, FiSearch, FiFilter, FiClock, FiVideo, FiHeadphones, FiX } from 'react-icons/fi'

const MEDIA_ITEMS = [
  {
    id: 'video-1',
    title: 'Introduction to Sales Excellence',
    description: 'Learn the fundamentals of becoming a top-performing sales professional.',
    type: 'video',
    category: 'Sales Training',
    duration: '12:45',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2024-03-01',
  },
  {
    id: 'video-2',
    title: 'Product Demo Masterclass',
    description: 'How to deliver compelling product demonstrations that convert.',
    type: 'video',
    category: 'Product Training',
    duration: '18:30',
    thumbnail: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2024-02-28',
  },
  {
    id: 'audio-1',
    title: 'Sales Call Scripts - Part 1',
    description: 'Audio guide for effective cold calling and warm outreach.',
    type: 'audio',
    category: 'Sales Training',
    duration: '25:00',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop',
    audioUrl: '#',
    createdAt: '2024-02-25',
  },
  {
    id: 'video-3',
    title: 'Closing Techniques That Work',
    description: 'Proven closing strategies from top performers in the industry.',
    type: 'video',
    category: 'Sales Training',
    duration: '22:15',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2024-02-20',
  },
  {
    id: 'video-4',
    title: 'Understanding Customer Psychology',
    description: 'Deep dive into what motivates customers to make purchasing decisions.',
    type: 'video',
    category: 'Sales Training',
    duration: '15:45',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2024-02-15',
  },
  {
    id: 'audio-2',
    title: 'Motivation Monday - Episode 5',
    description: 'Weekly motivation and tips from our sales leadership team.',
    type: 'audio',
    category: 'Motivation',
    duration: '08:30',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=225&fit=crop',
    audioUrl: '#',
    createdAt: '2024-02-10',
  },
  {
    id: 'video-5',
    title: 'CRM Best Practices',
    description: 'Get the most out of our CRM system for better pipeline management.',
    type: 'video',
    category: 'Tools & Systems',
    duration: '20:00',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2024-02-05',
  },
  {
    id: 'video-6',
    title: 'Handling Price Objections',
    description: 'Strategies to overcome price-related objections with confidence.',
    type: 'video',
    category: 'Sales Training',
    duration: '16:20',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2024-02-01',
  },
]

const CATEGORIES = ['All', 'Sales Training', 'Product Training', 'Motivation', 'Tools & Systems']
const TYPES = ['All', 'video', 'audio']

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedMedia, setSelectedMedia] = useState<typeof MEDIA_ITEMS[0] | null>(null)

  const filteredMedia = MEDIA_ITEMS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesType = selectedType === 'All' || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Training Media</h1>
        <p className="text-muted-foreground">
          Watch training videos and listen to audio resources
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <FiFilter className="text-muted-foreground" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          >
            <option value="All">All Types</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
        <span>Showing {filteredMedia.length} items</span>
        <span>|</span>
        <span className="flex items-center gap-1">
          <FiVideo size={14} />
          {filteredMedia.filter(m => m.type === 'video').length} videos
        </span>
        <span className="flex items-center gap-1">
          <FiHeadphones size={14} />
          {filteredMedia.filter(m => m.type === 'audio').length} audio
        </span>
      </div>

      {/* Media Grid */}
      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedMedia(item)}
            >
              {/* Thumbnail */}
              <div className="relative h-40 bg-muted overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                    <FiPlay size={24} className="text-primary-foreground ml-1" />
                  </div>
                </div>
                {/* Type badge */}
                <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded flex items-center gap-1 ${
                  item.type === 'video' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {item.type === 'video' ? <FiVideo size={12} /> : <FiHeadphones size={12} />}
                  {item.type}
                </span>
                {/* Duration */}
                <span className="absolute bottom-3 right-3 px-2 py-1 bg-foreground/80 text-background text-xs font-medium rounded flex items-center gap-1">
                  <FiClock size={12} />
                  {item.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <span className="text-xs font-medium text-primary">{item.category}</span>
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FiVideo size={48} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No Media Found</h2>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}

      {/* Video/Audio Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">{selectedMedia.title}</h3>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <FiX size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4">
              {selectedMedia.type === 'video' ? (
                <div className="aspect-video bg-foreground rounded-lg overflow-hidden">
                  <iframe
                    src={selectedMedia.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-8 text-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiHeadphones size={32} className="text-secondary-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">Audio player placeholder</p>
                  <button className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2 mx-auto">
                    <FiPlay size={18} />
                    Play Audio
                  </button>
                </div>
              )}
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{selectedMedia.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FiClock size={12} />
                    {selectedMedia.duration}
                  </span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                    {selectedMedia.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
