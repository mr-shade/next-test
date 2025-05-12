import Image from "next/image";
import Link from "next/link";
import TodoApp from "./components/TodoApp";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <main className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image
            className="dark:invert mb-4"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />

          <h1 className="text-2xl font-bold text-center">Simple Todo App</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Testing MongoDB Connection with Prisma
          </p>
        </div>

        {/* Todo App Component */}
        <TodoApp />

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">API Routes</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/api/todos"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                GET /api/todos - Fetch all todos
              </Link>
            </li>
          </ul>
        </div>
      </main>

      <footer className="mt-12 flex gap-6 text-sm text-gray-500">
        <a
          href="https://www.prisma.io/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          Prisma Docs
        </a>
        <a
          href="https://www.mongodb.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          MongoDB Docs
        </a>
      </footer>
    </div>
  );
}
