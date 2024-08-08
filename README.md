# Welcome to your GPT Engineer project

## Project info

**Project**: auto-diagnose-simplified 

**URL**: https://run.gptengineer.app/projects/25adc576-1984-44fa-80f3-43950a5fa22b/improve

**Description**: Auto Vision Pro is an advanced automotive diagnostic and troubleshooting tool designed to streamline the process of identifying and resolving vehicle issues. Users can create profiles, save their vehicles to a "Garage," and receive intelligent diagnostics by inputting symptoms or DTCs (Diagnostic Trouble Codes). Key features include:

User Profiles: Users create and manage their profiles.
Garage: Users can save multiple vehicles, each displayed on a card view with details such as manufacturer logo, vehicle year, make, model, and an input field for entering symptoms or DTCs.
Diagnostics: Users input the symptoms or DTCs and click the "Diagnosis" button, which sends the query to an OpenAI assistant via API. The response is then displayed to the user.
Plans: There are free and paid "PRO" versions, along with purchasable "Query Packs" for additional diagnostic queries.
Tech Stack
Frontend:

Framework: React (Web)
UI Library: Material-UI
State Management: Redux
Styling: CSS-in-JS (JSS)
Backend:

Firebase:
Firestore (Database for user and vehicle profiles)
Firebase Authentication (User management)
Firebase Cloud Functions (Serverless functions)
Firebase Storage (For storing assets, if needed)
OpenAI API:
GPT-4 (Natural Language Processing for diagnostics)
Tools & Services:

Version Control: Git/GitHub
Deployment: Firebase Hosting (Web)
Testing: Jest (Web)
CI/CD: GitHub Actions
Instructions & Checkpoints
Chapter 1: Initial UI Layout
Objective:

Create the basic UI layout for Auto Vision Pro.
Instructions:

Create a new React project.
Design the main screens including profile creation, garage view, and vehicle detail input.
Use Material-UI components to create a responsive and visually appealing layout.
Ensure the layout includes placeholder elements for user profiles, vehicle cards, and diagnostic input fields.
Save and submit the static UI prototype for review.
Output Expectations:

A static UI prototype with placeholder elements and basic layout structure.
Review Checkpoint:

Pause development and submit the prototype for review.
Provide feedback based on the visual design and structural integrity. 

## Who is the owner of this repository?
By default, GPT Engineer projects are created with public GitHub repositories.

However, you can easily transfer the repository to your own GitHub account by navigating to your [GPT Engineer project](https://run.gptengineer.app/projects/25adc576-1984-44fa-80f3-43950a5fa22b/improve) and selecting Settings -> GitHub. 

## How can I edit this code?
There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://run.gptengineer.app/projects/25adc576-1984-44fa-80f3-43950a5fa22b/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps: 

```sh
git clone https://github.com/GPT-Engineer-App/auto-diagnose-simplified.git
cd auto-diagnose-simplified
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app. 

Simply visit your project at [GPT Engineer](https://run.gptengineer.app/projects/25adc576-1984-44fa-80f3-43950a5fa22b/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain, then we recommend GitHub Pages.

To use GitHub Pages you will need to follow these steps: 
- Deploy your project using GitHub Pages - instructions [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)
- Configure a custom domain for your GitHub Pages site - instructions [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)