# ⚡ Code Typing Trainer

A full-stack application designed to help developers improve their programming typing speed and accuracy through interactive code practice.

## ✨ Features

### Core Features
- **Interactive Code Snippets**: Practice typing actual code from 5 programming languages
- **Real-time Metrics**: Track your WPM (Words Per Minute), accuracy percentage, and character count
- **Multiple Difficulty Levels**: Easy, Medium, and Hard snippets for progressive learning
- **Support for Multiple Languages**: Python, JavaScript, Java, C++, and C
- **Dark Mode UI**: Comfortable interface designed for extended practice sessions
- **Fast Feedback**: Immediate performance metrics after each practice session

### New Features Added
- **Language Selector**: Choose from 5 programming languages to practice
- **Difficulty Selector**: Select easy, medium, or hard code snippets
- **Real-time Timer**: Live countdown display during practice sessions
- **Reset Button**: Quickly reload a new snippet of the same language/difficulty
- **Stats Grid**: Comprehensive statistics display with WPM, accuracy, time, and character count
- **Recent Attempts History**: Track your last 5 attempts with language, difficulty, WPM, and accuracy
- **Difficulty Color Indicators**: Visual color coding for easy/medium/hard levels
- **Responsive Design**: Works seamlessly on mobile and desktop devices

## 🏗️ Project Structure

```
code-typing-trainer/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── snippets.json        # Code snippets database
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── index.html          # HTML entry point
│   ├── vite.config.js      # Vite configuration
│   ├── package.json        # Node dependencies
│   └── src/
│       ├── main.jsx        # React entry point
│       ├── App.jsx         # Main app component with all features
│       ├── api.js          # API client
│       └── styles.css      # Application styles
└── README.md
```

## 🛠️ Tech Stack

**Backend:**
- FastAPI (Python) - Modern, fast web framework
- CORS middleware for cross-origin requests

**Frontend:**
- React 18 - UI library
- Vite - Fast build tool
- CSS3 - Modern styling with gradients and animations

## 📊 Code Snippets Database

The application includes 15 code snippets per language (3 per difficulty level):
- **Python**: Functions, loops, OOP concepts
- **JavaScript**: ES6+ features, arrow functions, classes
- **Java**: Classes, OOP, collections
- **C++**: STL, memory management, algorithms
- **C**: Memory basics, string manipulation, algorithms

## 🚀 Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## 💻 How to Use

1. Open the application in your browser at `http://localhost:5173`
2. **Select a Language**: Choose from Python, JavaScript, Java, C++, or C
3. **Choose Difficulty**: Pick easy, medium, or hard difficulty level
4. A code snippet will be displayed from the selected language/difficulty combo
5. Click **"Start"** to begin timing your practice session
6. Type the code snippet as accurately as possible in the textarea
7. Click **"Stop"** to end the session and see your results
8. Your **WPM**, accuracy, time, and character count will be displayed
9. View your **recent attempts** history at the bottom
10. Click **"Reset"** to load a new snippet of the same language/difficulty

## 📈 Statistics Explained

- **WPM**: Words Per Minute (calculated as characters typed / 5 / minutes)
- **Accuracy**: Percentage of characters typed correctly
- **Time**: Total time spent on the practice session
- **Characters**: Number of correct characters typed out of total characters in the snippet

## 🎨 Design Highlights

- **Gradient Background**: Modern dark theme with subtle gradients
- **Color-Coded Difficulty**: Green (easy), Orange (medium), Red (hard)
- **Responsive Layout**: Automatically adapts to mobile and desktop
- **Smooth Animations**: Hover effects and pulse animations on timer
- **Accessibility**: Clear labels, high contrast colors, disabled state indicators

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] Persistent progress tracking in database
- [ ] User profiles with statistics dashboard
- [ ] Leaderboards
- [ ] More programming languages (Ruby, Go, Rust, etc.)
- [ ] Multiplayer practice mode
- [ ] Custom code snippet uploads
- [ ] Keyboard shortcut hints in-app
- [ ] Practice mode with keyboard guidance
- [ ] Achievement badges and milestones

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs and suggest features
- Add new code snippets for any language
- Improve the UI/UX
- Optimize performance
- Add new programming languages

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Shashwat Pathak  
Data Science Student | Full-Stack Developer

## 📞 Contact

For questions or feedback, please open an issue on GitHub.
