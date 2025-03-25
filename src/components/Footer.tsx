import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">中医资格考试AI助手</h3>
            <p className="text-gray-600">
              智能AI辅助学习平台，助您顺利通过各类中医执业资格考试。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">考试类型</h4>
            <ul className="space-y-2">
              <li><Link href="/pharmacist" className="text-gray-600 hover:text-emerald-600">中药师</Link></li>
              <li><Link href="/specialist" className="text-gray-600 hover:text-emerald-600">中医确有专长</Link></li>
              <li><Link href="/assistant" className="text-gray-600 hover:text-emerald-600">中医助理医师</Link></li>
              <li><Link href="/physician" className="text-gray-600 hover:text-emerald-600">中医执业医师</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">学习资源</h4>
            <ul className="space-y-2">
              <li><Link href="/question-bank" className="text-gray-600 hover:text-emerald-600">题库中心</Link></li>
              <li><Link href="/study-materials" className="text-gray-600 hover:text-emerald-600">学习资料</Link></li>
              <li><Link href="/mock-exams" className="text-gray-600 hover:text-emerald-600">模拟考试</Link></li>
              <li><Link href="/ai-assistant" className="text-gray-600 hover:text-emerald-600">AI问答助手</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">联系我们</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-emerald-600">关于我们</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-emerald-600">隐私政策</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-emerald-600">服务条款</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-emerald-600">联系方式</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} 中医资格考试AI助手 版权所有</p>
        </div>
      </div>
    </footer>
  );
} 