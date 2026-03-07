import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Book } from '@/app/models/Book';
import { getAuthUserId } from '@/app/lib/auth';

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // In Next.js 15, params is a Promise
) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    await connectDB();
    const book = await Book.findOneAndUpdate(
      { _id: id, userId },
      { ...body },
      { new: true, runValidators: true }
    );

    if (!book) return NextResponse.json({ message: 'Book not found' }, { status: 404 });

    return NextResponse.json({ book }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    await connectDB();
    const book = await Book.findOneAndDelete({ _id: id, userId });

    if (!book) return NextResponse.json({ message: 'Book not found' }, { status: 404 });

    return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
