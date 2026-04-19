# Extract Kobo Bookmark

If like me you're reading mangas on a Kobo Reader and wanted to export manga pages to share funny pics with your friends, welcome on this page! It's sad that it is not a native function of our readers :(

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/Electron-30+-blue.svg)](https://electronjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18+-cyan.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![DaisyUI](https://img.shields.io/badge/Bulma-1.0+-209178.svg)](https://daisyui.com/)

# How to use

Later, there will be releases already built to download right from GitHub but right now:
- clone the repository
- run `npm install` from the projectroot folder
- then `npm run dev`

If you want to build the app: `npm run build` and you'll get an install and a portable version of the application.

# Contributing

It's too soon to contribute to this repository, sorry :3 Feel free to fork!

# Screenshot

(Be warned, this is not the final style at all, it is only the current appearance of the app, the design will be done *later*)

## Kobo device check
This actually checks if the KoboReader.sqlite is found on the selected device.

![Screenshot of the running application](docs/screenshot-2.png)

## Extracted files
Once the files are extracted, you get the path to the destination folder that should anyway be opened automatically. You can also click on the button to open the folder again!

![Screenshot of the running application](docs/screenshot-1.png)

# AI Usage
For transparency purpose: this project has **not** been vibe coded >:(

I did use LM Studio and Qwen 3.5 on my own computer to help me with some Electron questions but everything was double checked and everything is done manually anyway, not even a single copy-paste from any LLM or Stack Overflow answer.

# Notes

This project is based on this boilerplate: https://github.com/kethakav/electron-vite-react-boilerplate

Thanks for this template <3
