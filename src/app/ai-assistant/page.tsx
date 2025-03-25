'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { callDeepseekChat, createSystemMessage, type Message } from '@/utils/deepseek';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

// Exam types
export type ExamType = 'pharmacist' | 'specialist' | 'assistant' | 'physician';

export default function AIAssistantPage() {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '您好！我是中医资格考试AI助手，可以为您解答中医药相关知识和考试问题。请问有什么可以帮助您的吗？' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [examType, setExamType] = useState<ExamType>('pharmacist');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Save chat function
  const saveChat = async () => {
    if (chatMessages.length <= 1) return; // Don't save empty chats
    
    try {
      setSaveStatus('saving');
      const response = await fetch('/api/save-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages,
          examType: examType,
        }),
      });
      
      if (!response.ok) throw new Error('保存失败');
      
      setSaveStatus('success');
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Failed to save chat:', err);
      setSaveStatus('error');
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...chatMessages, userMessage];
    setChatMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Prepare messages for API (include system message)
      const apiMessages: Message[] = [
        createSystemMessage(examType), // Add system message with exam type
        ...newMessages,
      ];

      // Call DeepSeek API
      const response = await callDeepseekChat(apiMessages, {
        temperature: 0.7,
        maxTokens: 1000,
      });

      // Add assistant response
      setChatMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (err) {
      console.error('Error getting response:', err);
      setError('获取回答时出错，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  // Reset conversation when exam type changes
  const handleExamTypeChange = (type: ExamType) => {
    setExamType(type);
    setChatMessages([
      { 
        role: 'assistant', 
        content: `您好！我是${getExamTypeName(type)}考试AI助手，可以为您解答相关知识和考试问题。请问有什么可以帮助您的吗？` 
      }
    ]);
  };

  // Get readable name for exam type
  const getExamTypeName = (type: ExamType): string => {
    switch (type) {
      case 'pharmacist': return '中药师';
      case 'specialist': return '中医确有专长';
      case 'assistant': return '中医助理医师';
      case 'physician': return '中医执业医师';
    }
  };

  // Render save status notification
  const renderSaveNotification = () => {
    if (saveStatus === 'idle') return null;
    
    let message = '';
    let bgColor = '';
    
    switch (saveStatus) {
      case 'saving':
        message = '正在保存对话...';
        bgColor = 'bg-blue-100 text-blue-800';
        break;
      case 'success':
        message = '对话已成功保存！';
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'error':
        message = '保存失败，请重试。';
        bgColor = 'bg-red-100 text-red-800';
        break;
    }
    
    return (
      <div className={`fixed top-20 right-4 ${bgColor} px-4 py-2 rounded-md shadow-md transition-all duration-300`}>
        {message}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        {renderSaveNotification()}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-800">中医资格考试AI智能问答</h1>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push('/ai-assistant/exam-practice')}
                      className="text-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1 rounded-md transition-colors"
                    >
                      考试练习
                    </button>
                    <button
                      onClick={() => router.push('/ai-assistant/history')}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md transition-colors"
                    >
                      查看历史
                    </button>
                    <button
                      onClick={saveChat}
                      disabled={saveStatus !== 'idle' || chatMessages.length <= 1}
                      className="text-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
                    >
                      保存对话
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">智能解答中医理论、中药学、经络穴位、考试备考等问题</p>
                
                {/* Exam type selector */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-gray-700">选择考试类型：</span>
                  {(['pharmacist', 'specialist', 'assistant', 'physician'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleExamTypeChange(type)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        examType === type
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {getExamTypeName(type)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6 h-[500px] overflow-y-auto flex flex-col space-y-4">
                {chatMessages.map((message, index) => (
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
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-500 rounded-lg rounded-tl-none p-4 max-w-[80%]">
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-red-50 text-red-500 rounded-lg p-3 max-w-[80%] text-sm">
                      {error}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`输入您的${getExamTypeName(examType)}考试相关问题...`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    发送
                  </button>
                </form>
                <div className="mt-2 text-sm text-gray-500">
                  <p>热门问题：
                    <button 
                      onClick={() => handleQuickQuestion(`${getExamTypeName(examType)}考试重点有哪些？`)}
                      className="text-emerald-600 hover:underline mx-1"
                      disabled={isLoading}
                    >
                      考试重点
                    </button>
                    <button 
                      onClick={() => handleQuickQuestion(`${getExamTypeName(examType)}考试备考建议？`)}
                      className="text-emerald-600 hover:underline mx-1"
                      disabled={isLoading}
                    >
                      备考建议
                    </button>
                    <button 
                      onClick={() => handleQuickQuestion(`${getExamTypeName(examType)}考试难度如何？`)}
                      className="text-emerald-600 hover:underline mx-1"
                      disabled={isLoading}
                    >
                      考试难度
                    </button>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">AI助手使用技巧</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>选择您要准备的特定考试类型，获取更精准的解答</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>提问越具体，得到的回答越精确</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>可以询问特定中医理论、中药知识、经络穴位等考点</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>针对考试题目提问时，可以提供完整题目内容获取详细解析</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>如需深入讨论某一问题，可以基于AI回答继续提问</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>对话完成后可以点击"保存对话"保存重要的问答记录</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 