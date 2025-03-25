import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-800">
            智能AI助你顺利通过<br className="hidden md:block" />
            中医资格考试
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            针对中药师、中医确有专长、中医助理医师和中医执业医师资格考试，
            提供智能题库、知识点解析和个性化学习方案
          </p>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md max-w-2xl mx-auto mb-8">
            <div className="flex flex-col">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="输入您的问题，例如：中药学基础知识点..." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    搜索
                  </span>
                </button>
              </div>
              <div className="text-sm text-gray-500 flex justify-center space-x-4">
                <span>热门搜索:</span>
                <a href="#" className="hover:text-emerald-600">中药配伍禁忌</a>
                <a href="#" className="hover:text-emerald-600">经络走向</a>
                <a href="#" className="hover:text-emerald-600">辨证论治</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ai-assistant" className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
              AI智能问答
            </Link>
            <Link href="/ai-assistant/exam-practice" className="px-6 py-3 bg-white text-emerald-700 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors shadow-sm">
              考试模拟练习
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 