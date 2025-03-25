import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            准备好开始您的中医资格考试之旅了吗？
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            加入我们的学习平台，利用AI技术提高学习效率，轻松应对各类中医资格考试
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
              立即注册
            </Link>
            <Link href="/ai-assistant" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-lg border border-emerald-500 hover:bg-emerald-800 transition-colors shadow-md">
              免费体验AI助手
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            已有超过10,000名学员使用我们的平台成功通过考试
          </p>
        </div>
      </div>
    </section>
  );
} 