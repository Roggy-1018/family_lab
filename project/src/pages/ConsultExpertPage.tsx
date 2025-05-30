import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calendar, Clock, MessageSquare, Phone, Video, Users } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: string;
  imageUrl: string;
  availableTime: string;
  price: string;
}

export const ConsultExpertPage: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'online' | 'phone' | 'chat' | null>(null);

  const experts: Expert[] = [
    {
      id: '1',
      name: '山田 明子',
      title: '家族関係カウンセラー',
      specialties: ['夫婦関係', '子育て支援', 'コミュニケーション改善'],
      experience: '15年',
      imageUrl: 'https://images.pexels.com/photos/5998034/pexels-photo-5998034.jpeg',
      availableTime: '平日 10:00-18:00',
      price: '¥5,000/30分'
    },
    {
      id: '2',
      name: '佐藤 健一',
      title: '臨床心理士',
      specialties: ['カップルカウンセリング', '関係修復', 'メンタルヘルス'],
      experience: '12年',
      imageUrl: 'https://images.pexels.com/photos/5998252/pexels-photo-5998252.jpeg',
      availableTime: '平日・土曜 13:00-21:00',
      price: '¥6,000/30分'
    },
    {
      id: '3',
      name: '田中 美咲',
      title: '家族療法士',
      specialties: ['家族システム療法', '世代間関係', '育児ストレス'],
      experience: '10年',
      imageUrl: 'https://images.pexels.com/photos/5998478/pexels-photo-5998478.jpeg',
      availableTime: '火・木・土 9:00-17:00',
      price: '¥5,500/30分'
    }
  ];

  const consultationTypes = [
    {
      id: 'online',
      name: 'オンラインビデオ',
      icon: Video,
      description: 'ビデオ通話でカウンセリング'
    },
    {
      id: 'phone',
      name: '電話相談',
      icon: Phone,
      description: '音声通話でカウンセリング'
    },
    {
      id: 'chat',
      name: 'チャット相談',
      icon: MessageSquare,
      description: 'テキストでのカウンセリング'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">専門家に相談</h1>
            <p className="mt-2 text-xl text-gray-600">
              経験豊富な専門家があなたの家族関係をサポートします
            </p>
          </div>

          {/* 相談方法の選択 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>相談方法を選択</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {consultationTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setConsultationType(type.id as any)}
                    className={`flex flex-col items-center rounded-lg border p-4 transition-colors ${
                      consultationType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <type.icon className={`mb-2 h-6 w-6 ${
                      consultationType === type.id ? 'text-blue-500' : 'text-gray-500'
                    }`} />
                    <h3 className="font-medium">{type.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 専門家一覧 */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">専門家を選択</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experts.map(expert => (
                <Card
                  key={expert.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedExpert === expert.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedExpert(expert.id)}
                >
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      src={expert.imageUrl}
                      alt={expert.name}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900">{expert.name}</h3>
                    <p className="text-sm text-blue-600">{expert.title}</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">専門分野:</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {expert.specialties.map(specialty => (
                          <span
                            key={specialty}
                            className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>経験年数: {expert.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{expert.availableTime}</span>
                      </div>
                      <div className="flex items-center font-medium text-gray-900">
                        <span>{expert.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 予約フォーム */}
          {selectedExpert && consultationType && (
            <Card>
              <CardHeader>
                <CardTitle>予約情報を入力</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Input
                        label="希望日"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Input
                        label="希望時間"
                        type="time"
                        step="1800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      相談内容
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="相談したい内容を具体的にお書きください"
                    />
                  </div>

                  <Button type="submit" fullWidth>
                    予約を確定する
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};