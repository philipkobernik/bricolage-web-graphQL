# MAT Bricolage Web

This repo is for the UCSB MAT Bricolage front-end, a gallery for the virtual 2020 EoYS. Find it live [here](https://bricolage-mat.ucsb.edu).

Students will use our [CMS backend](https://bricolage-admin.mat.ucsb.edu) to create projects and upload media.

The public-facing site will showcase projects and allow for navigation based on project metadata.

## Setup for local development
* we recommend using [NVM](https://github.com/nvm-sh/nvm) for managing your node.js versions. use this to install latest node.js
    * if you are a homebrew user, `brew uninstall node` will remove any and all versions of node from your system
* clone this repo: `git clone git@github.com:philipkobernik/bricolage-web-graphQL.git` (or use https)
* cd into the folder: `cd bricolage-web-graphQL`
* run: `npm install`
* contact Philip to get the `.env` environment file that holds our secret keys
* run: `npm run dev`
* the application should now be running locally-- visit https://localhost:3000 in your browser
