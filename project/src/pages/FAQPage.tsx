import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQPage: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: '家族エンゲージメント診断はどのくらいの頻度で受ければいいですか？',
      answer: '当アプリの診断は、ご家族の状況や課題感を把握するための定点観測としてご利用いただくことをおすすめしています。半年や1年に1回程度をおすすめしておりますが、より頻繁に診断していただいても構いません。家族の状態やライフステージの変化を振り返りたいときに受けていただくと、より効果的です。'
    },
    {
      question: '夫婦のどちらか一方だけが診断に回答しても意味はありますか？',
      answer: 'もちろん、一人で回答した場合でも、自分自身の希望や感じていることを整理するのに役立ちます。ただし、両方（夫婦・パートナー）が回答すると相互のギャップや共通点がより明確になるため、より効果的に家族関係の改善に活かせます。可能であれば二人以上での回答をおすすめします。'
    },
    {
      question: '有料サブスクリプションに加入すると、どんな機能が使えるようになりますか？',
      answer: '無料版では基本的な診断結果と簡単なアドバイスをご覧いただけますが、有料サブスクリプションでは以下のような追加機能をご利用いただけます。\n・過去の診断結果との比較機能（経年変化のグラフ表示など）\n・より詳細なアドバイスや改善プラン、専門家によるアドバイス'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">よくある質問</h1>
          <p className="mb-8 text-xl text-gray-600">
            Family Labに関するよくあるご質問をまとめています
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start space-x-4">
                    <div className="mt-1 flex-shrink-0">
                      <HelpCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="ml-10 text-gray-600">
                    {faq.answer.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};