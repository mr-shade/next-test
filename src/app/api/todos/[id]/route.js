import { createClient } from '@/db';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/todos/[id] - Get a todo by ID
export async function GET(request, { params }) {
  try {
    // Get Cloudflare env if available
    const env = request.cloudflare?.env;
    const db = createClient(env);
    const { id } = params;

    const todo = await db.select().from(todos).where(eq(todos.id, id)).limit(1);

    if (!todo.length) {
      return Response.json({ error: 'Todo not found' }, { status: 404 });
    }

    return Response.json(todo[0]);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return Response.json({ error: 'Failed to fetch todo' }, { status: 500 });
  }
}

// PATCH /api/todos/[id] - Update a todo (toggle completion)
export async function PATCH(request, { params }) {
  try {
    // Get Cloudflare env if available
    const env = request.cloudflare?.env;
    const db = createClient(env);
    const { id } = params;
    const { completed, content } = await request.json();

    const updateData = {};
    if (completed !== undefined) updateData.completed = completed ? 1 : 0;
    if (content !== undefined) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
      return Response.json({ error: 'No update data provided' }, { status: 400 });
    }

    await db.update(todos).set(updateData).where(eq(todos.id, id));

    const updatedTodo = await db.select().from(todos).where(eq(todos.id, id)).limit(1);

    if (!updatedTodo.length) {
      return Response.json({ error: 'Todo not found' }, { status: 404 });
    }

    return Response.json(updatedTodo[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    return Response.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(request, { params }) {
  try {
    // Get Cloudflare env if available
    const env = request.cloudflare?.env;
    const db = createClient(env);
    const { id } = params;

    await db.delete(todos).where(eq(todos.id, id));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return Response.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
