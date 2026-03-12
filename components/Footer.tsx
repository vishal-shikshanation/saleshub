import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">EN</span>
              </div>
              <span className="text-lg font-bold text-primary">EduNation</span>
            </div>
            <p className="text-foreground/70 text-sm">
              India's premier online learning platform for quality education.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Class 6-8
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Class 9-10
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  JEE Preparation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  NEET Preparation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMail size={16} className="mt-1 text-primary flex-shrink-0" />
                <a href="mailto:support@eduNation.com" className="text-foreground/70 hover:text-primary transition-colors">
                  support@eduNation.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiPhone size={16} className="mt-1 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="text-foreground/70 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin size={16} className="mt-1 text-primary flex-shrink-0" />
                <span className="text-foreground/70">New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/70">
              © 2024 EduNation. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
