'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/lib/types'
import { Mail, Phone, MapPin, Edit2, Save, X, Camera, Award, TrendingUp, Book } from 'react-icons/fi'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFormData({
      firstName: parsedUser.firstName || parsedUser.name?.split(' ')[0] || '',
      lastName: parsedUser.lastName || parsedUser.name?.split(' ')[1] || '',
      email: parsedUser.email || '',
      bio: parsedUser.bio || '',
    })
    setLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    if (!user) return

    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      bio: formData.bio,
      name: `${formData.firstName} ${formData.lastName}`,
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 animate-pulse" />
          <p className="text-foreground/70">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-primary hover:underline font-medium mb-4 inline-flex items-center gap-2">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
        {/* Cover Background */}
        <div className="h-32 bg-gradient-to-r from-primary to-secondary opacity-10" />

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar and Edit Button */}
          <div className="flex items-start justify-between -mt-16 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center border-4 border-card shadow-lg">
                <span className="text-5xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                <p className="text-foreground/70">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => (editing ? handleSaveProfile() : setEditing(true))}
              className={`mt-4 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                editing
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {editing ? (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={18} />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-border mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-sm text-foreground/70">Courses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">0</p>
              <p className="text-sm text-foreground/70">Certificates</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">0</p>
              <p className="text-sm text-foreground/70">Hours Studied</p>
            </div>
          </div>

          {/* Edit Form */}
          {editing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-foreground/50 focus:outline-none disabled:cursor-not-allowed"
                />
                <p className="text-xs text-foreground/50 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">
                  Email Address
                </label>
                <p className="text-foreground">{user?.email}</p>
              </div>

              {user?.bio && (
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    Bio
                  </label>
                  <p className="text-foreground">{user.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Learning Progress */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Learning Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-foreground/70">Overall Completion</span>
                <span className="text-sm font-semibold text-foreground">0%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '0%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-foreground/70">Exam Success Rate</span>
                <span className="text-sm font-semibold text-foreground">0%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <Award size={20} className="text-secondary" />
            Achievements
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg opacity-50">
              <div className="text-3xl mb-2">🎓</div>
              <p className="text-xs font-medium text-foreground/70">First Course</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg opacity-50">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-xs font-medium text-foreground/70">Perfect Exam</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg opacity-50">
              <div className="text-3xl mb-2">🔥</div>
              <p className="text-xs font-medium text-foreground/70">7-Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences & Settings */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h3 className="font-bold text-foreground text-lg mb-4">Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-border bg-input accent-primary cursor-pointer"
            />
            <span className="text-foreground">Email notifications for new courses</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-border bg-input accent-primary cursor-pointer"
            />
            <span className="text-foreground">Exam result notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border bg-input accent-primary cursor-pointer"
            />
            <span className="text-foreground">Show profile to other students</span>
          </label>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold text-foreground text-lg mb-4">Account Management</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors text-left">
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 border-2 border-destructive rounded-lg font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
