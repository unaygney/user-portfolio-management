# Project Management Platform

---

## Screenshot

### Dashboard

![Dashboard](./public/Thumbnail.jpg)

---

A modern platform for efficiently managing projects, with features to add,
update, and delete projects. Built using **Next.js** with the **App Router**, it
provides a user-friendly interface and secure functionality.

---

## Features

- **Project Management**: Add, edit, and delete projects seamlessly.
- **Authentication**: Secure login with GitHub OAuth using Better Auth.
- **Image Upload**: Upload and resize images for projects with support for PNG
  and JPEG formats.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Database Integration**: PostgreSQL integration powered by Drizzle ORM.
- **File Upload**: Drag-and-drop file upload with React Dropzone.
- **Real-time API**: tRPC ensures type-safe and real-time API interactions.

---

## Environment Variables

Set up a `.env` file in the root directory with the following variables:

```plaintext
DATABASE_URL=
BETTER_AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
HOTMAIL_EMAIL=
HOTMAIL_PASSWORD=
API_KEY=
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/unaygney/project-management-platform.git
   cd project-management-platform
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables as described above.

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Access the app at [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

- **Framework**: [Next.js (v14)](https://nextjs.org/)
- **TypeScript**: For static typing and improved developer experience.
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/).
- **API**: Type-safe API routes using [tRPC](https://trpc.io/).
- **Styling**: TailwindCSS for modern and responsive UI.
- **Utilities**:
  - `react-hook-form` for form validation.
  - `zod` for schema validation.
  - `lucide-react` for icons.
  - `react-dropzone` for file uploads.
- **Deployment**: Supports deployment to platforms like Vercel.

---

## Contact

- **Author**: [Guney Unay](https://www.linkedin.com/in/guneyunay)
- **Email**: [contact@guneyunay.com](mailto:contact@guneyunay.com)
- **GitHub**: [https://github.com/unaygney](https://github.com/unaygney)
