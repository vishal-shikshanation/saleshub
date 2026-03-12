# EduNation Platform - Test Credentials & Guide

## Test Account Credentials

Use the following credentials to log in and explore the full platform:

```
Email:    test@eduNation.com
Password: Test@123
```

These credentials are displayed on the login page for easy access.

---

## Platform Features to Test

### 1. **Landing Page**
- Navigate to `/` to see the hero section, statistics, and features
- Try the "Get Started Free" and "Explore Courses" buttons
- View featured stats: 50K+ Students, 200+ Courses, 98% Success Rate, Expert Instructors

### 2. **Authentication**
- Visit `/login` to test the login flow
- Test credentials are shown on the page
- After login, you'll be redirected to the dashboard
- Click logout from the navbar to test logout functionality

### 3. **Courses**
- Navigate to `/courses` to see all available courses
- Filter by category (Class 9-10, JEE, NEET, Class 11-12)
- Filter by level (Beginner, Intermediate, Advanced)
- Filter by price range
- Click on any course to view details

### 4. **Course Details**
- From the courses page, click on any course (e.g., "Mathematics Class 10")
- View course description, instructor info, chapters, and learning outcomes
- Click "Enroll Now" button to enroll (simulated with localStorage)
- View course requirements and what you'll learn

### 5. **Exams**
- Navigate to `/exams` to see available practice exams
- Filter by category and difficulty level
- Click on an exam to start taking it

### 6. **Exam Taking Interface**
- Click "Start Exam" to begin
- Features:
  - Question navigation sidebar
  - Real-time timer (counts down)
  - Option highlighting (click to mark answers)
  - Question review before submission
  - Score calculation on submission
  - Detailed results with explanations

### 7. **Dashboard**
- After login, you'll see personalized dashboard
- View learning statistics (courses enrolled, success rate, etc.)
- See "My Courses" section with enrolled courses
- View recent exam results
- See recommended courses

### 8. **User Profile**
- Click on your profile in the navbar
- View and edit profile information
- Check learning progress for each course
- View achievements/badges earned
- See account settings and privacy options

---

## Sample Data Available

### Courses (5 Total)
1. **Mathematics Class 10** - CBSE curriculum
2. **Science Class 10** - Physics, Chemistry, Biology
3. **JEE Main Mathematics** - Advanced preparation
4. **NEET Biology** - Medical entrance prep
5. **English Language Skills** - Grammar & communication

### Exams (3 Total)
1. **Class 10 Mathematics Mock Test** - 10 questions, Medium difficulty
2. **JEE Main Mathematics Practice Test** - 5 questions, Hard difficulty
3. **NEET Biology Chapter Test** - 8 questions, Hard difficulty

### Pre-loaded User Data
- **Enrolled Courses**: All 5 courses (for testing My Courses section)
- **Course Progress**: Various completion percentages
- **Exam Results**: 3 sample exam attempts with different scores
- **Achievements**: 3 unlocked badges

---

## Testing Scenarios

### Scenario 1: New User Journey
1. Go to `/` (landing page)
2. Click "Get Started Free" or "Explore Courses"
3. Sign up with any email/password
4. Login with test credentials
5. Browse and enroll in courses
6. Take practice exams
7. View results on dashboard

### Scenario 2: Course Exploration
1. Login with test credentials
2. Go to `/courses`
3. Filter courses by category/level/price
4. Click on each course to view details
5. Enroll in courses of interest
6. View enrolled courses on dashboard

### Scenario 3: Exam Preparation
1. Login and go to `/exams`
2. Select an exam by difficulty level
3. Take the full practice test with timer
4. Submit answers and view results
5. Review detailed explanations for each question
6. Check score on dashboard

### Scenario 4: Profile Management
1. Login and go to `/profile`
2. View learning progress for enrolled courses
3. Check achievements unlocked
4. Update profile information (name, bio, avatar URL)
5. View exam history and statistics

---

## Browser Features Tested

- **Responsive Design**: Test on different screen sizes (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle theme in navbar
- **Navigation**: Test all navbar links and mobile menu
- **Forms**: Test input validation in login/signup and profile pages
- **Pagination**: Course listing supports filtering and sorting
- **Timer Functionality**: Exam timer counts down in real-time

---

## Color Theme

- **Primary Color**: #016AB7 (Professional Blue)
- **Secondary Color**: #6CB84D (Vibrant Green)
- **White Theme**: Light background with dark text
- **Dark Theme**: Dark background with light text (toggle in navbar)

---

## Mock Data Storage

All user data (enrollments, exam results, progress) is stored in browser localStorage for this demo version. This means:
- Data persists across page refreshes
- Each browser/device has separate data
- Clearing browser cache will reset all progress
- Real MongoDB integration will replace this when configured

---

## Next Steps for Production

1. **Connect Auth0**: Replace form-based auth with Auth0
2. **Connect MongoDB**: Update API routes to use real database
3. **Add Video Content**: Link actual course videos in chapters
4. **Payment Integration**: Add Stripe for course purchases
5. **Email Notifications**: Set up email notifications for course updates
6. **Analytics**: Track user engagement and course completion

---

## Troubleshooting

### Login Not Working
- Ensure cookies are enabled
- Clear browser cache and try again
- Use exact credentials: `test@eduNation.com` / `Test@123`

### Exams Not Loading
- Check browser console for errors
- Ensure JavaScript is enabled
- Try in a different browser

### Courses Not Showing
- Refresh the page
- Clear localStorage and login again
- Check network tab in DevTools

### Timer Issues in Exams
- Ensure system clock is accurate
- Close other heavy applications
- Use modern browsers (Chrome, Firefox, Safari, Edge)

---

**Happy Learning! 🎓**
