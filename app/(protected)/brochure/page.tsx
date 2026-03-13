'use client'

import { useState } from 'react'
import { FiDownload, FiSearch, FiFileText, FiFilter } from 'react-icons/fi'

const BROCHURES = [
  {
    id: 'brochure-1',
    title: 'Sales Fundamentals Guide',
    description: 'Complete guide to mastering sales basics and building customer relationships.',
    category: 'Sales Training',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    fileSize: '2.4 MB',
    pages: 24,
    downloadUrl: '#',
    updatedAt: '2024-03-01',
  },
  {
    id: 'brochure-2',
    title: 'Product Knowledge Handbook',
    description: 'Detailed information about all Shikshanation products and services.',
    category: 'Product Training',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop',
    fileSize: '4.1 MB',
    pages: 48,
    downloadUrl: '#',
    updatedAt: '2024-02-28',
  },
  {
    id: 'brochure-3',
    title: 'Objection Handling Techniques',
    description: 'Learn how to handle common objections and close more deals effectively.',
    category: 'Sales Training',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    fileSize: '1.8 MB',
    pages: 18,
    downloadUrl: '#',
    updatedAt: '2024-02-25',
  },
  {
    id: 'brochure-4',
    title: 'Customer Success Stories',
    description: 'Real success stories from our customers to use in your sales pitches.',
    category: 'Marketing Material',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    fileSize: '3.2 MB',
    pages: 32,
    downloadUrl: '#',
    updatedAt: '2024-02-20',
  },
  {
    id: 'brochure-5',
    title: 'Pricing & Plans Overview',
    description: 'Complete pricing structure and plan details for all Shikshanation offerings.',
    category: 'Product Training',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    fileSize: '1.5 MB',
    pages: 12,
    downloadUrl: '#',
    updatedAt: '2024-02-15',
  },
  {
    id: 'brochure-6',
    title: 'Digital Marketing Essentials',
    description: 'Understanding digital marketing channels for lead generation.',
    category: 'Marketing Material',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop',
    fileSize: '2.9 MB',
    pages: 28,
    downloadUrl: '#',
    updatedAt: '2024-02-10',
  },
]

const CATEGORIES = ['All', 'Sales Training', 'Product Training', 'Marketing Material']

export default function BrochurePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredBrochures = BROCHURES.filter((brochure) => {
    const matchesSearch = brochure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brochure.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || brochure.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Brochures & Resources</h1>
        <p className="text-muted-foreground">
          Download sales brochures, product guides, and marketing materials
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search brochures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>
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
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredBrochures.length} of {BROCHURES.length} brochures
      </p>

      {/* Brochures Grid */}
      {filteredBrochures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrochures.map((brochure) => (
            <div
              key={brochure.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative h-40 bg-muted overflow-hidden">
                <img
                  src={brochure.thumbnail}
                  alt={brochure.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                  {brochure.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                    {brochure.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {brochure.description}
                  </p>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FiFileText size={14} />
                    {brochure.pages} pages
                  </span>
                  <span>{brochure.fileSize}</span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => alert(`Downloading: ${brochure.title}`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  <FiDownload size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FiFileText size={48} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No Brochures Found</h2>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}
