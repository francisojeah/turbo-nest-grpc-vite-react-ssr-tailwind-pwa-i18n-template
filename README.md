# Turbo Monorepo Template

This monorepo is designed to demonstrate a comprehensive setup using Turbo, showcasing various modern development techniques and tools across multiple workspaces. Below is a quick overview to get you started.

## A. Monorepo Structure

The monorepo consists of three workspaces:

1. **apps**: 
   - **Routing** with React Router V6
   - **Internationalization** with i18next
   - **Progressive Web Apps (PWA)**
   - **Server-Side Rendering (SSR)**
   - **Code Splitting**
   - **Tailwind CSS** with Flowbite

2. **hms-apps**:
   - **Microservices Architecture** with gRPC
   - **Shadcn/UI** components ([Shadcn UI](https://ui.shadcn.com/docs))
   - **Dark/Light Mode Switching** (see `mode-toggle.tsx` in `/components`)
   - **Data Grid** with useReactTable (see `DisplayUsers.tsx`)
   - **Navigation** ([Shadcn UI Navigation Menu](https://ui.shadcn.com/docs/components/navigation-menu))
   - **React Query** for server state management (see `App.tsx` and `Users.tsx`)

3. **packages**:
   - Shared libraries ([Turbo Handbook](https://turbo.build/repo/docs/handbook/sharing-code))

## B. Installation Guide

Follow these steps to set up the monorepo:

1. **Install Global Dependencies**:
   ```bash
   npm install -g @nestjs/cli turbo copyfiles
   ```

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/piosystems/turbo-nest-grpc-vite-react-ssr-tailwind-pwa-i18n-template.git
   cd turbo-nest-grpc-vite-react-ssr-tailwind-pwa-i18n-template
   ```

3. **Install Local Dependencies**:
   ```bash
   npm install
   ```

4. **Protocol Buffers**:
   To modify `.proto` files and generate corresponding TypeScript files, download Protocol Buffers from the [official releases](https://github.com/protocolbuffers/protobuf/releases). Use the following script for generating TypeScript files:
   ```bash
   "../protoc-25.1-osx-x86_64/bin/protoc --plugin=../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/identity.proto"
   ```

## C. Development, Build, and Deployment

### Development

1. **Start Development Servers**:
   - For the `apps` workspace:
     ```bash
     npm run dev
     ```
   - For the `hms-apps` workspace:
     ```bash
     npm run hms:dev
     ```

### Build

1. **Build Applications**:
   - For the `apps` workspace:
     ```bash
     npm run build
     ```
   - For the `hms-apps` workspace:
     ```bash
     npm run hms:build
     ```

2. **Update Asset Map**:
   If there are changes to the code or CSS before building, update the `main.js` and `styles.css` entries in the `assetMap` located in `apps/demo-backend/src/backend.settings.ts`. Re-run the build after adjustments.

### Production

1. **Start/Stop Production Services**:
   - To start services with PM2:
     ```bash
     npm run hms:start:all
     ```
   - To stop services with PM2:
     ```bash
     npm run hms:stop:all
     ```

2. **Preview Users-Demo Frontend**:
   After building, you can preview the `users-demo-frontend` by running:
   ```bash
   npm run preview
   ```

## D. Application Access

After successfully starting the applications, you can access them via the following URLs:

1. **apps workspace**:
   - [http://localhost:3000/web](http://localhost:3000/web)
   - [http://localhost:3000/v1/web](http://localhost:3000/v1/web)
   - [http://localhost:3000/v2/web](http://localhost:3000/v2/web)

   ![image](https://github.com/piosystems/turbo-nest-grpc-vite-react-ssr-tailwind-pwa-i18n-template/assets/3983248/1fb0746b-4c94-4b92-b1a3-81117221a860)

2. **hms-apps workspace**:
   - [http://localhost:5173/view-users](http://localhost:5173/view-users)
   
   ![image](https://github.com/piosystems/turbo-nest-grpc-vite-react-ssr-tailwind-pwa-i18n-template/assets/3983248/1fb0746b-4c94-4b92-b1a3-81117221a860)
   
   - After building and running the preview:
     - [http://localhost:4173/view-users](http://localhost:4173/view-users)
   
   ![image](https://github.com/piosystems/turbo-nest-grpc-vite-react-ssr-tailwind-pwa-i18n-template/assets/3983248/0c584d59-870e-4bf3-8b03-29f61b6acdc9)

3. **API Gateway**:
   - Accessible via `npm run hms:start:all`:
     - [http://localhost:3002/v1/view-users](http://localhost:3002/v1/view-users)

## E. Implemented Features

The following features have been successfully implemented:

1. **Static Serving**:
   The `users-demo-frontend` is now served statically from the API gateway, eliminating the need for a separate preview process. Access it via [http://localhost:3002/v1/view-users](http://localhost:3002/v1/view-users).

2. **Enhancements**:
   SSR, PWA, Internationalization, and other enhancements have been integrated, following the pattern used in the `apps` template where the `demo-frontend` is served from the `demo-backend` with SSR and other features.

3. **TypeORM Integration**:
   The `hms-apps/identity/src/users` now utilizes TypeORM for entity management, replacing the previous hardcoded array implementation.
