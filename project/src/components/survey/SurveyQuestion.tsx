import React, { useRef } from 'react';
import { Card, CardContent } from '../ui/Card';
import { SurveyQuestion as QuestionType } from '../../types';
import { motion } from 'framer-motion';
import { ratingOptions } from '../../data/surveyOptions';
import { useSurveyStore } from '../../store/surveyStore';

interface SurveyQuestionProps {
  question: QuestionType;
  value: number;
  onChange: (value: number) => void;
  showComment?: boolean;
  onCommentChange?: (comment: string) => void;
  nextQuestionRef?: React.RefObject<HTMLDivElement>;
}

export const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  question,
  value,
  onChange,
  nextQuestionRef,
}) => {
  const { answers, setAnswer } = useSurveyStore();
  const questionRef = useRef<HTMLDivElement>(null);

  const handleChange = (newValue: number) => {
    setAnswer(question.id, newValue);
    onChange(newValue);

    if (nextQuestionRef?.current) {
      requestAnimationFrame(() => {
        const yOffset = -100;
        const y = nextQuestionRef.current!.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      });
    }
  };

  const selectedValue = answers[question.id] || value;

  return (
    <motion.div
      ref={questionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="w-full">
        <div className="w-full bg-blue-50 p-4">
          <div className="w-full">
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-medium text-blue-900">
                {question.text}
              </h3>
              <p className="text-xs text-blue-700">
                {question.type === 'expectation' ? '要望' : '実感'}について、あてはまるものを選んでください
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full p-4">
          <div className="flex w-full items-start justify-between">
            {ratingOptions.map((option) => (
              <div 
                key={option.value}
                className="flex flex-1 flex-col items-center"
              >
                <div className="h-10 flex items-center">
                  <button
                    onClick={() => handleChange(option.value)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all
                      ${selectedValue === option.value
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                  >
                    <span className="text-sm font-medium">
                      {option.value}
                    </span>
                  </button>
                </div>
                <span className={`mt-1 text-center text-[10px] leading-tight whitespace-pre-line px-1
                  ${selectedValue === option.value ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {question.type === 'expectation' 
                    ? option.expectationLabel 
                    : option.realityLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};