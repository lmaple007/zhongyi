'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { ExamType } from '../page';
import { generateExamQuestion, evaluateAnswer, getExamTypeName } from '@/utils/examQuestions';
import ReactMarkdown from 'react-markdown';

export default function ExamPracticePage() {
  const [examType, setExamType] = useState<ExamType>('pharmacist');
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    options?: string[];
    questionType: 'multiple-choice' | 'short-answer';
    correctAnswer: string;
  } | null>(null);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'available' | 'limited' | 'unavailable'>('available');
  
  const [evaluation, setEvaluation] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctAnswer?: string;
  } | null>(null);
  
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  
  const router = useRouter();
  const answerInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Generate a new question when exam type changes or first load
  useEffect(() => {
    fetchNewQuestion();
  }, [examType]);
  
  // Function to fetch a new question
  const fetchNewQuestion = async () => {
    setIsLoading(true);
    setError(null);
    setCurrentQuestion(null);
    setUserAnswer('');
    setSelectedOption(null);
    setEvaluation(null);
    
    try {
      const question = await generateExamQuestion(examType);
      setCurrentQuestion(question);
      
      // Check if we're getting fallback questions (API is likely down)
      // This is a heuristic - if we get one of the preconfigured questions, 
      // we assume the API is in fallback mode
      if (
        question.question.includes('黄连') || 
        question.question.includes('针刺补法') || 
        question.question.includes('阴平阳秘') || 
        question.question.includes('中风病的病机')
      ) {
        setApiStatus('limited');
      } else {
        setApiStatus('available');
      }
      
    } catch (err) {
      console.error('Error fetching question:', err);
      setError('获取题目失败，请重试。可能是网络连接问题或服务暂时不可用。');
      setApiStatus('unavailable');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to handle submitting an answer
  const handleSubmitAnswer = async () => {
    if (!currentQuestion) return;
    
    // For multiple choice, use selected option as answer
    const answer = currentQuestion.questionType === 'multiple-choice' 
      ? selectedOption || ''
      : userAnswer.trim();
      
    if (!answer) {
      setError('请输入答案或选择选项');
      return;
    }
    
    setIsEvaluating(true);
    setError(null);
    
    try {
      const result = await evaluateAnswer(
        examType,
        currentQuestion.question,
        answer,
        currentQuestion.correctAnswer,
        currentQuestion.options
      );
      
      setEvaluation(result);
      setQuestionCount(prev => prev + 1);
      if (result.isCorrect) {
        setCorrectCount(prev => prev + 1);
      }
      
      // Check if we're getting simplified evaluations (API may be in fallback mode)
      if (result.explanation.includes('AI评估服务暂时不可用') || 
          result.explanation === "评估过程中出现错误，无法提供详细解析。请参考标准答案。") {
        setApiStatus('limited');
      }
      
    } catch (err) {
      console.error('Error evaluating answer:', err);
      setError('评估答案失败，请重试。如果问题持续存在，可能是服务暂时不可用。');
      setApiStatus('unavailable');
    } finally {
      setIsEvaluating(false);
    }
  };
  
  // Function to move to next question
  const handleNextQuestion = () => {
    fetchNewQuestion();
  };
  
  // Handle exam type change
  const handleExamTypeChange = (type: ExamType) => {
    if (type !== examType) {
      setExamType(type);
      setQuestionCount(0);
      setCorrectCount(0);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-800">考试模拟练习</h1>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push('/ai-assistant')}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md transition-colors"
                    >
                      返回AI助手
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">模拟真实考试场景，训练考试能力</p>
                
                {/* API Status Indicator */}
                {apiStatus !== 'available' && (
                  <div className={`mt-3 px-4 py-2 rounded-md text-sm ${
                    apiStatus === 'limited' 
                      ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      {apiStatus === 'limited' 
                        ? '系统处于有限服务模式，使用备用题库和答案评估。某些功能可能受限。'
                        : 'AI服务目前不可用，请稍后再试。'}
                    </div>
                  </div>
                )}
                
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
                
                {/* Score display */}
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    已答: <span className="font-semibold">{questionCount}</span> 题
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    正确: <span className="font-semibold">{correctCount}</span> 题
                  </div>
                  {questionCount > 0 && (
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      正确率: <span className="font-semibold">{Math.round((correctCount / questionCount) * 100)}%</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
                    <span className="ml-3 text-gray-600">正在生成题目...</span>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-500 mb-4">{error}</p>
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={fetchNewQuestion}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        重试
                      </button>
                      <button
                        onClick={() => router.push('/ai-assistant')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                      >
                        返回主页
                      </button>
                    </div>
                  </div>
                ) : currentQuestion ? (
                  <div>
                    {/* Question display */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">题目：</h2>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800">{currentQuestion.question}</p>
                      </div>
                      
                      {/* Multiple choice options */}
                      {currentQuestion.questionType === 'multiple-choice' && currentQuestion.options && (
                        <div className="mt-4 space-y-2">
                          {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                <input
                                  type="radio"
                                  id={`option-${index}`}
                                  name="answer-option"
                                  className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                  checked={selectedOption === option.charAt(0)}
                                  onChange={() => setSelectedOption(option.charAt(0))}
                                  disabled={!!evaluation}
                                />
                              </div>
                              <label htmlFor={`option-${index}`} className="ml-2 block text-gray-700">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Short answer input */}
                      {currentQuestion.questionType === 'short-answer' && (
                        <div className="mt-4">
                          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                            您的答案:
                          </label>
                          <textarea
                            id="answer"
                            rows={4}
                            className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="请在此输入您的答案..."
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={!!evaluation}
                            ref={answerInputRef}
                          ></textarea>
                        </div>
                      )}
                    </div>
                    
                    {/* Evaluation display */}
                    {evaluation && (
                      <div className={`mb-6 p-4 rounded-lg ${evaluation.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                        <h3 className={`text-lg font-semibold mb-2 ${evaluation.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {evaluation.isCorrect ? '✓ 回答正确！' : '✗ 回答错误'}
                        </h3>
                        
                        {!evaluation.isCorrect && (
                          <div className="mb-3">
                            <p className="font-medium text-gray-700">正确答案:</p>
                            <p className="text-gray-800">
                              {currentQuestion?.questionType === 'multiple-choice' 
                                ? evaluation.correctAnswer
                                : evaluation.correctAnswer}
                            </p>
                          </div>
                        )}
                        
                        <div>
                          <p className="font-medium text-gray-700">解析:</p>
                          <div className="prose prose-sm max-w-none mt-1">
                            <ReactMarkdown
                              components={{
                                p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                              }}
                            >
                              {evaluation.explanation}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div className="flex justify-end space-x-4">
                      {!evaluation ? (
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={isEvaluating || (currentQuestion.questionType === 'multiple-choice' ? !selectedOption : !userAnswer.trim())}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {isEvaluating ? (
                            <span className="flex items-center">
                              <span className="w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                              评估中...
                            </span>
                          ) : '提交答案'}
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          下一题
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">准备开始练习{getExamTypeName(examType)}考试题目</p>
                    <button
                      onClick={fetchNewQuestion}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      开始练习
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">考试练习说明</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>根据您选择的考试类型，系统会生成相应的考试题目</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>题目类型包括选择题和简答题，模拟真实考试场景</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>提交答案后，系统会立即评判正误并给出专业解析</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>系统会记录您的答题数和正确率，帮助您了解学习进度</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>建议完成至少20道题目，以全面评估您的备考情况</span>
                </li>
                {apiStatus !== 'available' && (
                  <li className="flex items-start mt-2 text-yellow-700">
                    <span className="text-yellow-500 mr-2">⚠</span>
                    <span>系统目前处于{apiStatus === 'limited' ? '有限服务' : '离线'} 模式，使用预设题库。服务恢复后将自动切换至完整功能。</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 