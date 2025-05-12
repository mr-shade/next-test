import { createClient, generateId } from '@/db';
import { todos } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET /api/todos - Get all todos
export async function GET(request) {
  try {
    // Get Cloudflare env if available
    const env = request.cloudflare?.env;
    const db = createClient(env);

    const allTodos = await db.select().from(todos).orderBy(desc(todos.createdAt));

    return Response.json(allTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return Response.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

// POST /api/todos - Create a new todo
export async function POST(request) {
  try {
    // Get Cloudflare env if available
    const env = request.cloudflare?.env;
    const db = createClient(env);

    const { content } = await request.json();

    if (!content) {
      return Response.json({ error: 'Content is required' }, { status: 400 });
    }

    const newTodo = {
      id: generateId(),
      content,
      completed: 0,
    };

    await db.insert(todos).values(newTodo);

    return Response.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return Response.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}
