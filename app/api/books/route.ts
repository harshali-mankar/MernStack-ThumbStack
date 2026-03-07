import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Book } from '@/app/models/Book';
import { getAuthUserId } from '@/app/lib/auth';

export async function GET(req: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const tag = url.searchParams.get('tag');

    const query: any = { userId };
    if (status) query.status = status;
    if (tag) query.tags = tag;

    const books = await Book.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ books }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { title, author, tags, status } = await req.json();
    if (!title || !author) {
      return NextResponse.json({ message: 'Title and author are required' }, { status: 400 });
    }

    await connectDB();
    const book = await Book.create({
      userId,
      title,
      author,
      tags: tags || [],
      status: status || 'Want to Read'
    });

    return NextResponse.json({ book }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
