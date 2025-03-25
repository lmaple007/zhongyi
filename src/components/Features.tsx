'use client';

import { Link } from '@/components/ui/link';

export default function Features() {
  return (
    <section id="features" className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">三大高效备考功能</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            我们提供全面的备考资源和工具，帮助您高效备战中医药资格考试
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">考试大纲解析</h3>
            <p className="text-gray-600 mb-4">
              根据最新考试大纲，提供详细的知识点整理和重点难点分析，帮助您把握考试方向
            </p>
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">查看详情 →</a>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">精选试题库</h3>
            <p className="text-gray-600 mb-4">
              涵盖历年真题和模拟题，按知识点分类，配有详细解析，支持自测和错题收集功能
            </p>
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">开始练习 →</a>
          </div>
          
          {/* Feature 3 - AI Question Answering */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI智能问答</h3>
            <p className="text-gray-600 mb-4">
              智能解答中医理论、中药学、经络穴位、考试备考等问题，随时随地获取专业指导
            </p>
            <div className="flex space-x-4">
              <Link 
                href="/ai-assistant" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                开始对话 →
              </Link>
              <Link 
                href="/ai-assistant/exam-practice" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                考试练习 →
              </Link>
              <Link 
                href="/ai-assistant/history" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                查看历史 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 