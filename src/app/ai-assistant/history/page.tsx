'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExamType } from '../page';
import { Message } from '@/utils/deepseek';

// Chat type
type Chat = {
  id: string;
  examType: ExamType;
  messages: Message[];
  createdAt: string;
};

export default function ChatHistoryPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch chat history on page load
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/save-chat');
        if (!response.ok) throw new Error('Failed to fetch chat history');
        
        const data = await response.json();
        setChats(data.chats || []);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError('无法加载聊天历史记录');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Get readable name for exam type
  const getExamTypeName = (type: ExamType): string => {
    switch (type) {
      case 'pharmacist': return '中药师';
      case 'specialist': return '中医确有专长';
      case 'assistant': return '中医助理医师';
      case 'physician': return '中医执业医师';
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get a preview of the chat
  const getChatPreview = (messages: Message[]): string => {
    // Find first user message
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    if (firstUserMessage) {
      return firstUserMessage.content.length > 50
        ? `${firstUserMessage.content.substring(0, 50)}...`
        : firstUserMessage.content;
    }
    return '无对话内容';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">对话历史记录</h1>
                  <p className="text-gray-600">查看和管理已保存的AI助手对话</p>
                </div>
                <button
                  onClick={() => router.push('/ai-assistant')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  新对话
                </button>
              </div>
              
              <div className="divide-y">
                {isLoading ? (
                  <div className="p-12 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">加载中...</p>
                  </div>
                ) : error ? (
                  <div className="p-12 text-center">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : chats.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">暂无保存的对话</p>
                    <button
                      onClick={() => router.push('/ai-assistant')}
                      className="mt-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg transition-colors"
                    >
                      开始新对话
                    </button>
                  </div>
                ) : (
                  chats.map(chat => (
                    <div key={chat.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                              {getExamTypeName(chat.examType as ExamType)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatDate(chat.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-800 font-medium">{getChatPreview(chat.messages)}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {chat.messages.length} 条消息
                          </p>
                        </div>
                        <button
                          onClick={() => router.push(`/ai-assistant/view/${chat.id}`)}
                          className="text-emerald-600 hover:text-emerald-800 text-sm"
                        >
                          查看详情
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 