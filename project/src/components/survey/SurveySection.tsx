import React, { useState, useRef, useEffect } from 'react';
import { Survey, UserProfile } from '../../types';
import { SurveyQuestion } from './SurveyQuestion';

interface SurveySectionProps {
  survey: Survey;
  pageNumber: number;
  userProfile: UserProfile;
}

export const SurveySection: React.FC<SurveySectionProps> = ({
  survey,
  pageNumber,
  userProfile
}) => {
  const [comments, setComments] = useState<Record<string, string>>({});
  const category = survey.categories[pageNumber - 1];
  const commentRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const questionRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  
  if (!category) return null;

  const handleCommentChange = (subcategoryId: string, comment: string) => {
    setComments(prev => ({
      ...prev,
      [subcategoryId]: comment
    }));
  };

  const allQuestions = category.subcategories.flatMap(subcategory => {
    return subcategory.questions.filter(q =>
      (userProfile.hasChildren && q.showForParents) ||
      (!userProfile.hasChildren && q.showForChildless)
    );
  });

  allQuestions.forEach(question => {
    if (!questionRefs.current[question.id]) {
      questionRefs.current[question.id] = React.createRef();
    }
  });

  const smoothScroll = (element: HTMLElement) => {
    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    setTimeout(() => {
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }, 50);
  };

  const scrollToComment = (subcategoryId: string) => {
    const commentRef = commentRefs.current[subcategoryId];
    if (commentRef?.current) {
      smoothScroll(commentRef.current);
    }
  };

  const scrollToNextQuestion = (nextQuestionRef: React.RefObject<HTMLDivElement> | null) => {
    if (nextQuestionRef?.current) {
      smoothScroll(nextQuestionRef.current);
    }
  };

  return (
    <div className="space-y-8">
      {category.subcategories.map(subcategory => {
        const applicableQuestions = subcategory.questions.filter(q =>
          (userProfile.hasChildren && q.showForParents) ||
          (!userProfile.hasChildren && q.showForChildless)
        );

        if (applicableQuestions.length === 0) return null;

        if (!commentRefs.current[subcategory.id]) {
          commentRefs.current[subcategory.id] = React.createRef();
        }

        return (
          <div 
            key={subcategory.id}
            className="w-full rounded-lg border border-gray-200 bg-white"
          >
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {subcategory.name}
              </h3>
              <p className="mt-1 text-gray-600">
                {subcategory.description}
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-8">
                {applicableQuestions.map((question, qIndex) => {
                  const currentQuestionIndex = allQuestions.findIndex(q => q.id === question.id);
                  const nextQuestion = allQuestions[currentQuestionIndex + 1];
                  const nextQuestionRef = nextQuestion ? questionRefs.current[nextQuestion.id] : null;
                  const isLastQuestionInSubcategory = qIndex === applicableQuestions.length - 1;

                  return (
                    <div 
                      key={question.id}
                      ref={questionRefs.current[question.id]}
                      className="w-full"
                    >
                      <SurveyQuestion
                        question={question}
                        value={0}
                        onChange={() => {
                          if (isLastQuestionInSubcategory) {
                            scrollToComment(subcategory.id);
                          } else {
                            scrollToNextQuestion(nextQuestionRef);
                          }
                        }}
                        showComment={false}
                        nextQuestionRef={nextQuestionRef}
                      />
                    </div>
                  );
                })}
              </div>
              
              <div 
                ref={commentRefs.current[subcategory.id]}
                className="mt-8 rounded-lg bg-gray-50 p-4"
                id={`comment-${subcategory.id}`}
              >
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  この項目に関する追加コメント（任意）
                </label>
                <textarea
                  value={comments[subcategory.id] || ''}
                  onChange={(e) => handleCommentChange(subcategory.id, e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="この項目に関する追加の考えや感想をお書きください..."
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};