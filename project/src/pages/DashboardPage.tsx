import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useSurveyStore } from '../store/surveyStore';
import { BarChart3, Users, ArrowRight, Plus, Heart, MessageSquare, Phone, Video } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FocusedAction {
  actionType: string;
  actionName: string;
  progress: number;
  daysLeft: number;
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { fetchSurveys, surveys, userResponses, results } = useSurveyStore();
  const [focusedActions, setFocusedActions] = useState<FocusedAction[]>([
    {
      actionType: '認識合わせ',
      actionName: '感情1分シェア',
      progress: 70,
      daysLeft: 5
    }
  ]);
  
  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  const calculateProfileProgress = () => {
    if (!user?.profile) return 0;
    
    const requiredFields = [
      'birthDate',
      'gender',
      'marriageDate',
      'occupation',
      'prefecture'
    ];
    
    const completedFields = requiredFields.filter(field => 
      user.profile[field as keyof typeof user.profile]
    );
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const profileProgress = calculateProfileProgress();
  
  const profileChartData = {
    labels: ['完了', '未完了'],
    datasets: [
      {
        data: [profileProgress, 100 - profileProgress],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(229, 231, 235, 0.5)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(229, 231, 235, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    maintainAspectRatio: false
  };

  const handleProgressChange = (index: number, value: number) => {
    setFocusedActions(prev => {
      const newActions = [...prev];
      newActions[index] = { ...newActions[index], progress: value };
      return newActions;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ようこそ、{user?.name}さん</h1>
        </div>
        
        {/* すべてのカードを同じグリッドシステムで配置 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* プロフィール */}
          <Card className="flex h-full flex-col bg-white">
            <CardHeader className="bg-blue-50 px-6 py-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <CardTitle className="text-base font-semibold">プロフィール</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative h-32 w-32">
                  <Doughnut data={profileChartData} options={chartOptions} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">{profileProgress}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t text-center">
                <Link 
                  to="/profile"
                  className="inline-block w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  プロフィールを更新
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 利用可能な診断 */}
          <Card className="flex h-full flex-col bg-white">
            <CardHeader className="bg-green-50 px-6 py-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 flex-shrink-0 text-green-600" />
                <CardTitle className="text-base font-semibold">利用可能な診断</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-6">
              <div className="space-y-4 flex-grow">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <h3 className="font-medium text-gray-900 mb-2">夫婦・家族関係診断</h3>
                  <Link 
                    to="/survey/1"
                    className="inline-block w-full py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-md transition-colors text-center"
                  >
                    回答する
                  </Link>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <h3 className="font-medium text-gray-900 mb-2">カップル関係診断</h3>
                  <Link 
                    to="/survey/2"
                    className="inline-block w-full py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-md transition-colors text-center"
                  >
                    回答する
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 診断結果 */}
          <Card className="flex h-full flex-col bg-white">
            <CardHeader className="bg-purple-50 px-6 py-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 flex-shrink-0 text-purple-600" />
                <CardTitle className="text-base font-semibold">診断結果</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-6">
              <div className="flex items-center justify-center flex-grow">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p className="text-gray-600">診断に回答すると結果が表示されます</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t text-center">
                <Link 
                  to="/results/1"
                  className="inline-block w-full py-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                >
                  すべての結果を見る
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* パートナー連携 */}
          <Card className="flex h-full flex-col bg-white">
            <CardHeader className="bg-blue-50 px-6 py-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <CardTitle className="text-base font-semibold">パートナー連携</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-6">
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">連携状態</span>
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">未連携</span>
                </div>
                <p className="text-gray-600">パートナーと連携すると、より正確な分析が可能になります。</p>
              </div>
              <div className="mt-auto pt-4 border-t text-center">
                <Link 
                  to="/invite-partner"
                  className="inline-block w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  パートナーを招待
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* 関係改善のヒント */}
          <Card className="flex h-full flex-col bg-white">
            <CardHeader className="bg-purple-50 px-6 py-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 flex-shrink-0 text-purple-600" />
                <CardTitle className="text-base font-semibold">関係改善のヒント</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-6">
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-gray-600 mb-4">診断結果をもとに、具体的な改善アクションを提案します。</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>認識合わせ</span>
                    <span>感情1分シェア</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>目標達成まで</span>
                    <span>5日</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">進捗率</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value="70"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-auto pt-4 border-t text-center">
                <Link 
                  to="/relationship-tips"
                  className="inline-block w-full py-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                >
                  改善アクションを追加
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* 専門家のアドバイス */}
          <Card className="flex h-full flex-col bg-white">
            <CardHeader className="bg-amber-50 px-6 py-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 flex-shrink-0 text-amber-600" />
                <CardTitle className="text-base font-semibold">専門家のアドバイス</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-6">
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-gray-600">診断に回答すると結果が表示されます</p>
              </div>
              <div className="mt-auto pt-4 border-t text-center">
                <Link 
                  to="/consult-expert"
                  className="inline-block w-full py-2 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                >
                  相談する
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};