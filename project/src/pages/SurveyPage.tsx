import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useSurveyStore } from '../store/surveyStore';
import { useAuthStore } from '../store/authStore';
import { SurveySection } from '../components/survey/SurveySection';
import { SurveyProgress } from '../components/survey/SurveyProgress';
import { motion } from 'framer-motion';

const PAGE_TITLES = {
  1: '感情・コミュニケーション',
  2: '協力・衝突解決',
  3: '価値観・社会的つながり',
  4: '親密感・子育て'
};

export const SurveyPage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const { fetchSurveyById, currentSurvey, isLoading, currentPage, setCurrentPage } = useSurveyStore();
  const { user } = useAuthStore();
  
  useEffect(() => {
    if (surveyId) {
      fetchSurveyById(surveyId);
    }
  }, [surveyId, fetchSurveyById]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    } else {
      navigate(`/results/${surveyId}`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600">アンケートを読み込んでいます...</p>
        </div>
      </div>
    );
  }

  if (!currentSurvey || !user?.profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">アンケートが見つかりませんでした。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <SurveyProgress currentStep={currentPage} totalSteps={4} />

          <Card variant="elevated" className="mb-8">
            <CardHeader className="bg-blue-50 px-6 py-5">
              <CardTitle className="text-2xl text-blue-900">
                ページ {currentPage} / 4
              </CardTitle>
              <p className="mt-2 text-blue-700">
                以下の質問について、あなたの要望と実感を教えてください。
              </p>
            </CardHeader>
            
            <CardContent className="px-6 py-5">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SurveySection
                  survey={currentSurvey}
                  pageNumber={currentPage}
                  userProfile={user.profile}
                />
              </motion.div>
              
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  前のページへ
                </Button>
                
                <Button onClick={handleNext}>
                  {currentPage < 4 ? '次のページへ' : '回答を完了する'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};