import Link from 'next/link';

type ColorType = 'emerald' | 'teal' | 'cyan' | 'blue';

export default function CertificateTypes() {
  const certifications = [
    {
      id: 'pharmacist',
      title: '中药师证书',
      description: '面向从事中药学专业工作的人员，考核中药基础理论、中药鉴定、中药炮制、中药药剂学等知识。',
      icon: '🌿',
      link: '/pharmacist',
      color: 'emerald' as ColorType
    },
    {
      id: 'specialist',
      title: '中医确有专长证书',
      description: '面向师承学习中医或者经多年中医临床实践的人员，考核中医基础理论和临床专长技能。',
      icon: '🧠',
      link: '/specialist',
      color: 'teal' as ColorType
    },
    {
      id: 'assistant',
      title: '中医助理医师资格证书',
      description: '面向中医专业毕业或在职从事中医医疗工作的人员，考核基础医学与中医专业知识。',
      icon: '📝',
      link: '/assistant',
      color: 'cyan' as ColorType
    },
    {
      id: 'physician',
      title: '中医执业医师资格证书',
      description: '面向从事中医医疗工作的专业人士，考核高级中医基础理论与临床医学知识。',
      icon: '⚕️',
      link: '/physician',
      color: 'blue' as ColorType
    }
  ];

  // Map for button colors based on certification type
  const buttonColorClasses: Record<ColorType, string> = {
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    teal: 'bg-teal-600 hover:bg-teal-700',
    cyan: 'bg-cyan-600 hover:bg-cyan-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            专注四大中医资格考试
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            无论您准备哪种中医资格考试，我们都能提供专业的AI辅助学习方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{cert.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800">{cert.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {cert.description}
                </p>
                <Link 
                  href={cert.link} 
                  className={`inline-block ${buttonColorClasses[cert.color]} text-white px-5 py-2 rounded-lg transition-colors`}
                >
                  查看学习内容
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/ai-assistant" 
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            开始AI智能问答
          </Link>
        </div>
      </div>
    </section>
  );
} 