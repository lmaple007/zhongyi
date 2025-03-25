import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CertificateTypes from '@/components/CertificateTypes';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { Link } from '@/components/ui/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        {/* Exam Practice Feature Highlight */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    考试模拟练习
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    全新上线的考试模拟练习功能，为您提供真实考试场景的模拟训练体验。根据您选择的考试类型，智能生成符合大纲要求的考试题目，并提供专业详细的解析。
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-emerald-500 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>自动生成选择题和简答题，覆盖考试大纲全部内容</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-emerald-500 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>即时评判答案正确性，提供详细的专业解析</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-emerald-500 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>追踪答题正确率，帮助您了解学习进度</span>
          </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-emerald-500 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>支持多种考试类型，为不同人群提供定制化训练</span>
          </li>
                  </ul>
                  <Link 
                    href="/ai-assistant/exam-practice" 
                    className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    立即体验考试练习
                  </Link>
                </div>
                <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-8 shadow-md">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">模拟试题示例：</h3>
                    <div className="mb-4">
                      <p className="font-medium mb-2">问题：</p>
                      <p className="bg-gray-50 p-3 rounded text-gray-800">在中药学中，"君臣佐使"是指什么？</p>
                    </div>
                    <div className="mb-6">
                      <p className="font-medium mb-2">答案：</p>
                      <div className="bg-green-50 p-3 rounded text-gray-800">
                        <p className="mb-2">"君臣佐使"是中医药的组方原则，表示方剂中各药物的地位和作用：</p>
                        <ul className="list-disc pl-5">
                          <li>君药：主治主病的药物，起主导作用</li>
                          <li>臣药：辅助君药加强疗效或治疗兼症</li>
                          <li>佐药：协助君臣药，减轻毒副作用</li>
                          <li>使药：引药直达病处，或调和诸药</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </section>
        
        <Features />
        <CertificateTypes />
        <Testimonials />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
}
