import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Message } from '@/utils/deepseek';

// Directory where chats will be saved
const CHATS_DIR = path.join(process.cwd(), 'data', 'chats');

// Ensure the directory exists
if (!fs.existsSync(CHATS_DIR)) {
  fs.mkdirSync(CHATS_DIR, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate the request
    if (!data.messages || !Array.isArray(data.messages) || !data.examType) {
      return NextResponse.json(
        { error: 'Invalid request. Messages array and examType are required.' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the chat
    const chatId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Create the chat object
    const chat = {
      id: chatId,
      examType: data.examType,
      messages: data.messages,
      createdAt: new Date().toISOString(),
    };

    // Save to file
    const filePath = path.join(CHATS_DIR, `${chatId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(chat, null, 2));

    return NextResponse.json({ success: true, chatId });
  } catch (error) {
    console.error('Error saving chat:', error);
    return NextResponse.json(
      { error: 'Failed to save chat' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get list of all saved chats
    const files = fs.readdirSync(CHATS_DIR).filter(file => file.endsWith('.json'));
    
    const chats = files.map(file => {
      const filePath = path.join(CHATS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ chats });
  } catch (error) {
    console.error('Error listing chats:', error);
    return NextResponse.json(
      { error: 'Failed to list chats' },
      { status: 500 }
    );
  }
} 