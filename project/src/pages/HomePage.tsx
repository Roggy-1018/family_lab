import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, BarChart3, Users, CheckCircle, ArrowRight, BookOpen, Lightbulb, Target, Puzzle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-16 lg:py-24"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                家族の絆を深める<br />
                新しいアプローチ
              </h1>
            </motion.div>
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-base text-white">
                「期待」と「実感」を可視化することで、<br />
                より良い関係づくりをサポートします。
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/register">
                <Button size="lg" className="text-white bg-blue-600 hover:bg-blue-700">
                  はじめる
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Family Labの使い方</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              シンプルなステップで、<br />
              家族関係の理解と改善をサポートします。
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="elevated">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>1. プロフィール作成</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  まずは、ご自身のプロフィールを設定してください。<br />
                  また、パートナーを招待して、グループを作成してください。
                </p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle>2. アンケート回答</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  関係性を構成する要素である<br />
                  「期待」と「実感」について、質問に答えていきます。
                </p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle>3. 結果の確認</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  「期待」と「実感」のギャップを確認し、改善のヒントを得ます。
                </p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>4. 関係性の向上</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  得られたヒントやアドバイスを活用して、<br />
                  より良い関係を築いていきます。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Family Labの特徴</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              学術的根拠に基づく診断とサポートで、<br />
              より良い関係づくりをお手伝いします。
            </p>
          </div>

          {/* Diagnosis Features */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">診断領域について</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card variant="elevated" className="bg-white/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">感情・コミュニケーション</h4>
                  </div>
                  <p className="text-gray-600">情緒的なつながりとコミュニケーションの質を評価します。</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="bg-white/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Puzzle className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">協力・課題解決</h4>
                  </div>
                  <p className="text-gray-600">日常生活における協力体制と問題解決能力を評価します。</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="bg-white/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">価値観・社会的つながり</h4>
                  </div>
                  <p className="text-gray-600">共有する価値観と社会との関わり方を評価します。</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="bg-white/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="rounded-full bg-red-100 p-2">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">親密感・子育て</h4>
                  </div>
                  <p className="text-gray-600">情緒的な親密さと子育ての協力体制を評価します。</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Features */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">診断後のサポート</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <Card variant="elevated" className="bg-white/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Lightbulb className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">改善のヒント</h4>
                  </div>
                  <p className="text-gray-600">個々人の診断結果とプロフィールに基づいた<br />具体的な改善アドバイスを提供します。</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="bg-white/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="rounded-full bg-indigo-100 p-2">
                      <Users className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">専門家のサポート</h4>
                  </div>
                  <p className="text-gray-600">必要に応じて、経験豊富な専門家による<br />オンラインカウンセリングなども提供します。</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="bg-white/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="rounded-full bg-teal-100 p-2">
                      <BarChart3 className="h-6 w-6 text-teal-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">進捗管理</h4>
                  </div>
                  <p className="text-gray-600">定期的な診断により、改善の進捗を可視化し、<br />継続的な関係向上をサポートします。</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">より良い家族関係への<br />第一歩を踏み出しましょう</h2>
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100"
              >
                <span className="text-blue-600">今すぐ始める</span>
                <ArrowRight className="ml-2 h-5 w-5 text-blue-600" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};