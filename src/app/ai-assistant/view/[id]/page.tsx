'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExamType } from '../../page';
import { Message } from '@/utils/deepseek';
import ReactMarkdown from 'react-markdown';

// Chat type
type Chat = {
  id: string;
  examType: ExamType;
  messages: Message[];
  createdAt: string;
};

export default function ViewChatPage() {
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const chatId = params.id as string;

  // Fetch specific chat on page load
  useEffect(() => {
    const fetchChat = async () => {
      try {
        // First get all chats
        const response = await fetch('/api/save-chat');
        if (!response.ok) throw new Error('Failed to fetch chats');
        
        const data = await response.json();
        const chats = data.chats || [];
        
        // Find the specific chat
        const foundChat = chats.find((c: Chat) => c.id === chatId);
        if (!foundChat) throw new Error('Chat not found');
        
        setChat(foundChat);
      } catch (err) {
        console.error('Error fetching chat:', err);
        setError('无法加载对话数据');
      } finally {
        setIsLoading(false);
      }
    };

    if (chatId) {
      fetchChat();
    } else {
      setError('无效的对话ID');
      setIsLoading(false);
    }
  }, [chatId]);

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">查看对话</h1>
                  {chat && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                        {getExamTypeName(chat.examType)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(chat.createdAt)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push('/ai-assistant/history')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                  >
                    返回列表
                  </button>
                  <button
                    onClick={() => router.push('/ai-assistant')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    新对话
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
                  <p className="mt-2 text-gray-600">加载中...</p>
                </div>
              ) : error ? (
                <div className="p-12 text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : chat ? (
                <div className="p-6 h-[600px] overflow-y-auto flex flex-col space-y-4">
                  {chat.messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'user' 
                            ? 'bg-emerald-600 text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({node, ...props}: {node?: any}) => <p className="mb-2" {...props} />,
                                ul: ({node, ...props}: {node?: any}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                                ol: ({node, ...props}: {node?: any}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                                li: ({node, ...props}: {node?: any}) => <li className="mb-1" {...props} />,
                                h1: ({node, ...props}: {node?: any}) => <h1 className="text-lg font-bold mt-3 mb-2" {...props} />,
                                h2: ({node, ...props}: {node?: any}) => <h2 className="text-md font-bold mt-3 mb-2" {...props} />,
                                h3: ({node, ...props}: {node?: any}) => <h3 className="text-md font-semibold mt-2 mb-1" {...props} />,
                                strong: ({node, ...props}: {node?: any}) => <strong className="font-bold" {...props} />,
                                em: ({node, ...props}: {node?: any}) => <em className="italic" {...props} />,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-500">对话不存在或已被删除</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 