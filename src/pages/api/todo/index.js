
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } else if (req.method === 'POST') {
      const { title, description } = req.body;
      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          status: 'pending',
        },
      });
      res.status(201).json(todo);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Görevler alınamadı' });
  }
}
