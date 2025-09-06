
import prisma from '../../../lib/prisma' 

export default async function handler(req, res) {
  const { id } = req.query;// dynamic route

  if (req.method === 'GET') {
    const todo = await prisma.todo.findUnique({
      where: { id: String(id) },
    });
    return res.status(200).json(todo);
  }

  if (req.method === 'PUT') {
    const { status, title, description } = req.body;
    const todo = await prisma.todo.update({
      where: { id: String(id) },
      data: {
        ...(status && { status }),
        ...(title && { title }),
        ...(description && { description }),
        updatedAt: new Date(),
      },
    });
    return res.status(200).json(todo);
  }

  if (req.method === 'DELETE') {
    await prisma.todo.delete({ where: { id: String(id) } });
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
