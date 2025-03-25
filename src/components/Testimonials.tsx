export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: '王医生',
      role: '中医执业医师考试通过者',
      image: '/testimonials/avatar1.png',
      quote: '这个AI问答系统比我想象的要智能很多，特别是在解答中医理论知识和辨证施治方面的问题上，给了我很大帮助。',
    },
    {
      id: 2,
      name: '李同学',
      role: '中药师考试备考者',
      image: '/testimonials/avatar2.png',
      quote: '题库非常全面，每道题都有详细的解析。AI助手能够根据我的薄弱环节推荐相应的学习内容，真的很贴心。',
    },
    {
      id: 3,
      name: '张教授',
      role: '中医院校教师',
      image: '/testimonials/avatar3.png',
      quote: '我推荐学生使用这个平台辅助备考，平台内容紧跟考试大纲，AI问答功能也能解答大多数专业问题。',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            学员反馈
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            来自不同背景的考生对我们平台的真实评价
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mr-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="relative">
                <svg className="absolute top-0 left-0 w-8 h-8 text-emerald-200 transform -translate-x-4 -translate-y-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-600 italic pl-4">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 