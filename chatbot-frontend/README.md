# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## running this on runpod
1. pull repo `git clone https://github.com/bobby-tan/chatbot_project`
2. navigate to directory `cd chatbot_project/chatbot-frontend/`
3. install node `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
4. install node `sudo apt install -y nodejs`
5. run `npm install` to install all required packages
6. run host command `npm run dev -- --host 0.0.0.0 --port 5173`

Remember to expose 5173 as a http port on runpod
Navigate to link https://<pod-id>-5173.proxy.runpod.net/

This was ran tested on Runpod Ubuntu 20.04

## Rolling out instructions
1. Update code and build docker image: `docker buildx build --platform linux/amd64,linux/arm64 -t tanliangwei/chatbot-backend:v3 .` Remember to update version number
2. Push to docker hub: `docker push tanliangwei/chatbot-backend:v2` Remember to use updated version number
3. Set # of active workers to 1 to ensure that there is 1 worker still handling request 
4. Deploy new version by clicking "manage". Then, "new release". 
5. Wait for all the workers, except the active 1 to update to new version. 
6. Set # of active workers to 1 to force one of the workers running new release to become an active worker
7. Wait a few minutes for the other active worker to warm up. I'm not sure how much this helps
8. Kill the outdated worker 
9. Set # of active worker back to 1 if want to save cost. 
