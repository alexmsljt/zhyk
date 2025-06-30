import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface Feedback {
  id: string;
  content: string;
  contact: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewer?: string;
}

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('feedbacks');
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    }
  }, []);

  const updateFeedbackStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = feedbacks.map(f => {
      if (f.id === id) {
        return {
          ...f,
          status,
          reviewedAt: new Date().toISOString(),
          reviewer: '管理员'
        };
      }
      return f;
    });
    
    setFeedbacks(updated);
    localStorage.setItem('feedbacks', JSON.stringify(updated));
    toast.success(`反馈已${status === 'approved' ? '通过' : '拒绝'}`);
  };

  const deleteFeedback = (id: string) => {
    const updated = feedbacks.filter(f => f.id !== id);
    setFeedbacks(updated);
    localStorage.setItem('feedbacks', JSON.stringify(updated));
    toast.success('反馈已删除');
  };

  const filteredFeedbacks = feedbacks.filter(f => 
    filter === 'all' ? true : f.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">反馈管理</h1>
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">全部</option>
              <option value="pending">待审核</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              暂无{filter === 'all' ? '' : filter === 'pending' ? '待审核' : filter === 'approved' ? '已通过' : '已拒绝'}反馈
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFeedbacks.map(feedback => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-700">"{feedback.content}"</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {feedback.contact} · {new Date(feedback.createdAt).toLocaleDateString()}
                      </p>
                      {feedback.reviewedAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          审核于: {new Date(feedback.reviewedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {feedback.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'approved')}
                            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                          >
                            通过
                          </button>
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'rejected')}
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                          >
                            拒绝
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteFeedback(feedback.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
