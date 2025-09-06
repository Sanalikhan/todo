
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all todos
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;

    // Create new todo
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        status: 'pending',// default status
      },
    });

    return res.status(201).json(todo);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
