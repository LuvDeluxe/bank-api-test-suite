# Bank App E2E & API Test Suite

This repository contains a Cypress-based testing suite for simulating real-world interactions with a banking web application — covering both UI and backend API layers.

---

## 🚀 Why Cypress?

I chose Cypress for this project because:

- 🧠 **Familiarity**: I’ve used it for over 4 years, making development quick and efficient.  
- 🧰 **Feature-rich**: Great for both end-to-end UI testing and direct API testing.  
- 🔁 **Considered Alternatives**: Looked into Puppeteer for simplicity, but Cypress was the best fit for full integration testing.

---

## ⚙️ How to Run the Tests

### Requirements
- [Node.js](https://nodejs.org/) and npm installed

### Steps
```bash
cd e2e
npm install cypress --save-dev
npx cypress open
