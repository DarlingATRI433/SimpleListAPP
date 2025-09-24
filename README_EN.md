# SimpleList (极简打卡)

A simple and elegant goal tracking and check-in application that supports multi-platform operation.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20Windows%20%7C%20Linux%20%7C%20Web-lightgrey.svg)
![Language](https://img.shields.io/badge/language-JavaScript%20%7C%20Rust-orange.svg)

## 🌟 Features

### Core Features
- ✅ **Goal Management** - Create, edit, and delete personal goals
- ✅ **Daily Check-in** - Simply click to complete daily goals
- ✅ **Progress Tracking** - Real-time display of goal completion progress
- ✅ **Data Statistics** - View check-in records and statistical information
- ✅ **Calendar View** - Intuitively view daily check-in status
- ✅ **Data Export/Import** - Support JSON format data backup

### Interface Features
- 🎨 **Responsive Design** - Perfectly adapted for desktop and mobile devices
- 🌓 **Theme Switching** - Support light/dark/auto switching themes
- 🌍 **Multi-language Support** - Simplified Chinese, Traditional Chinese, English
- 📱 **Modern UI** - Simple and elegant user interface
- ⚡ **Smooth Interaction** - Silky smooth user experience

### Technical Features
- 🔧 **Cross-platform** - Based on Tauri framework, supports Android, Windows, Linux, Web
- 🚀 **High Performance** - Extremely small installation package, efficient performance
- 🔒 **Privacy Protection** - Data is completely stored locally, no login required
- 📱 **PWA Support** - Can be installed as a web application

## 🎯 Quick Start

### Use as Web Application
1. Clone the project locally
```bash
git clone https://github.com/your-username/simplelist.git
cd simplelist
```

2. Start local server
```bash
# Using Python
python -m http.server 8080

# Or using Node.js
npx http-server -p 8080
```

3. Open browser and visit `http://localhost:8080/src/`

### Use as Desktop Application

#### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Rust](https://rustup.rs/) (latest stable version)

#### Installation Steps
1. Clone the project
```bash
git clone https://github.com/your-username/simplelist.git
cd simplelist
```

2. Install dependencies
```bash
npm install
```

3. Build desktop application
```bash
# Development mode
npm run tauri dev

# Build release version
npm run tauri build
```

## 📖 Usage Instructions

### Create Goals
1. Click the "+ Add Goal" button in the top right corner of the main interface
2. Fill in the goal name (maximum 10 characters)
3. Set daily target count (1-100 times)
4. Select start date
5. (Optional) Set end date
6. Click the "Create Goal" button

### Daily Check-in
1. Find the goal you want to check in on the main interface
2. Click the "+" button on the goal card
3. Each click increases the check-in count by one
4. Completion status is displayed when the target count is reached

### View Records
1. Click the "Features" button in the bottom navigation
2. Select "Check-in Records" to view detailed records
3. Select "Goal Management" to manage all goals

### Data Management
- **Export Data**: Settings → Data Management → Export Data
- **Import Data**: Settings → Data Management → Import Data

## 🛠️ Development Guide

### Project Structure
```
simplelist/
├── src/                    # Frontend source code
│   ├── index.html         # Main page
│   ├── main.js             # Main logic
│   ├── styles.css          # Style file
│   ├── languages.js        # Multi-language support
│   └── assets/             # Static resources
├── src-tauri/              # Tauri backend code
│   ├── src/                # Rust source code
│   ├── icons/              # Application icons
│   └── tauri.conf.json     # Tauri configuration
├── tests/                  # Test files
└── README.md              # Project documentation
```

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: None
- **Build Tool**: Tauri CLI
- **Testing**: Trae+Kimi K2+Puppeteer

### Development Commands
```bash
# Start development server
npm run tauri dev

# Build application
npm run tauri build

# Run tests
npm run test
```

## 🌍 Internationalization

Supports the following languages:
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW) 
- English (en)

## 📱 Screenshots

### Main Interface
*Simple goal list interface, clearly displaying the progress of each goal*
![Main Interface](https://img.kookapp.cn/assets/2025-09/23/j2ExjJJeKl1hc0so.png)
### Add Goal
*Intuitive goal creation form, supporting custom goal parameters*
![Add Goal](https://img.kookapp.cn/assets/2025-09/23/KFg06Hxyng1hc0so.png)
### Check-in Records
*Weekly check-in records, clearly showing the completion status of each goal*
![Check-in Records](https://img.kookapp.cn/assets/2025-09/23/mMRmNpQuQ41hc0so.png)
### Goal Management
*Goal list displays all goals, supporting editing, deletion, and sorting*
![Goal Management](https://img.kookapp.cn/assets/2025-09/23/q13qKkWqTr1hc0so.png)
### Theme Switching
*Support light and dark themes, adapting to different usage scenarios*
![Theme Switching](https://img.kookapp.cn/assets/2025-09/23/Nuzv6BVo6C1hc0so.png)

Welcome to submit Issues and Pull Requests to improve this project!

### Development Contribution Process
1. Fork this project on GitHub
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Use semantic HTML tags
- CSS adopts BEM naming convention
- JavaScript follows ESLint rules
- Please run tests before submitting

## 📝 License

This project uses the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - Cross-platform application framework
- All contributors and supporters
---

⭐ If this project is helpful to you, please give it a Star to support!