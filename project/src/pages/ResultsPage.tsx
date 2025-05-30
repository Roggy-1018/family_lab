import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSurveyStore } from '../store/surveyStore';
import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ResultChart } from '../components/results/ResultChart';
import { Info, ArrowRight } from 'lucide-react';

type SurveyType = 'family' | 'couple';

export const ResultsPage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const { fetchResults, results, isLoading, surveys, userResponses } = useSurveyStore();
  const { user } = useAuthStore();
  const [surveyType, setSurveyType] = useState<SurveyType>('family');

  const completedSurveys = userResponses.map(response => 
    surveys.find(survey => survey.id === response.surveyId)
  ).filter(Boolean);

  const familySurvey = completedSurveys.find(survey => survey?.title === '夫婦・家族関係診断');
  const coupleSurvey = completedSurveys.find(survey => survey?.title === 'カップル関係診断');
  
  useEffect(() => {
    if (surveyId) {
      fetchResults(surveyId);
      const survey = surveys.find(s => s.id === surveyId);
      if (survey?.title === 'カップル関係診断') {
        setSurveyType('couple');
      } else {
        setSurveyType('family');
      }
    }
  }, [surveyId, fetchResults, surveys]);

  const switchSurveyType = (type: SurveyType) => {
    const targetSurvey = type === 'family' ? familySurvey : coupleSurvey;
    if (targetSurvey) {
      navigate(`/results/${targetSurvey.id}`);
      setSurveyType(type);
    }
  };

  // Add mock partner data for visualization
  const resultsWithPartner = results.map(result => ({
    ...result,
    partnerExpectationScore: result.expectationScore - 0.3,
    partnerRealityScore: result.realityScore - 0.2,
    partnerGap: result.gap - 0.1
  }));
  
  const hasPartnerResults = true; // Always show partner results section

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-lg text-gray-600">結果を読み込んでいます...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {surveyType === 'family' ? '夫婦・家族関係診断' : 'カップル関係診断'}の結果
              </h1>
              <p className="text-xl text-gray-600">
                あなたの回答から見えてきた関係性の分析結果です
              </p>
            </div>
            
            {familySurvey && coupleSurvey && (
              <div className="flex space-x-2">
                <Button
                  variant={surveyType === 'family' ? 'primary' : 'outline'}
                  onClick={() => switchSurveyType('family')}
                >
                  夫婦・家族関係
                </Button>
                <Button
                  variant={surveyType === 'couple' ? 'primary' : 'outline'}
                  onClick={() => switchSurveyType('couple')}
                >
                  カップル関係
                </Button>
              </div>
            )}
          </div>
          
          {!hasPartnerResults && (
            <Card variant="outline" className="mb-8 border-blue-200 bg-blue-50">
              <CardContent className="flex items-start space-x-4 p-4">
                <Info className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-medium text-blue-800">パートナーの回答がまだありません</h3>
                  <p className="text-blue-700">
                    パートナーが診断を完了すると、双方の視点を比較した、より詳しい分析が可能になります。
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle>診断結果の概要</CardTitle>
            </CardHeader>
            
            <CardContent>
              <ResultChart results={resultsWithPartner} />
            </CardContent>
          </Card>
          
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>今後に向けて</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <Link 
                  to="/relationship-tips"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <span>関係改善のヒントを見る</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-medium text-blue-800">結果について話し合ってみましょう</h3>
                  <p className="text-blue-700">
                    この分析結果をパートナーと共有し、お互いの期待や感じていることについて話し合ってみましょう。
                  </p>
                </div>
                
                <div className="rounded-lg bg-green-50 p-4">
                  <h3 className="mb-2 font-medium text-green-800">ギャップの大きい項目に注目</h3>
                  <p className="text-green-700">
                    期待と実感の差が大きい項目は、改善の余地が大きい部分です。優先的に取り組むことで、関係性の向上が期待できます。
                  </p>
                </div>
                
                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-2 font-medium text-purple-800">専門家のサポート</h3>
                  <p className="text-purple-700">
                    複数の項目で大きなギャップがある場合は、カウンセラーや専門家に相談することも検討してみましょう。
                  </p>
                </div>
                
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-medium text-amber-800">定期的な診断</h3>
                  <p className="text-amber-700">
                    3-6ヶ月後に再度診断を行い、改善の進捗を確認することをおすすめします。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};