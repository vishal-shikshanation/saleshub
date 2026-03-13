import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SH</span>
            </div>
            <div>
              <span className="text-sm font-bold text-primary">Shikshanation</span>
              <span className="text-sm font-semibold text-secondary ml-1">SalesHub</span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:support@shikshanation.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <FiMail size={14} className="text-primary" />
              support@shikshanation.com
            </a>
            <span className="flex items-center gap-2">
              <FiMapPin size={14} className="text-primary" />
              Internal Training Platform
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-6 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shikshanation. Internal use only.
          </p>
        </div>
      </div>
    </footer>
  )
}
