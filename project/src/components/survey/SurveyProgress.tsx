import React from 'react';
import { motion } from 'framer-motion';

interface SurveyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const SurveyProgress: React.FC<SurveyProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-medium text-gray-700">
          ページ {currentStep} / {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(progress)}% 完了
        </span>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index !== totalSteps - 1 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                index + 1 <= currentStep
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            {index !== totalSteps - 1 && (
              <div className="flex-1 h-1 mx-2">
                <div className="h-full bg-gray-200 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        index + 1 < currentStep
                          ? '100%'
                          : index + 1 === currentStep
                          ? '50%'
                          : '0%',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-blue-600 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Category Labels */}
      <div className="flex justify-between mt-2">
        <div className="text-[10px] text-gray-600 text-center w-1/4 leading-tight">
          感情・<br />コミュニケーション
        </div>
        <div className="text-[10px] text-gray-600 text-center w-1/4 leading-tight">
          協力・<br />衝突解決
        </div>
        <div className="text-[10px] text-gray-600 text-center w-1/4 leading-tight">
          価値観・<br />社会的つながり
        </div>
        <div className="text-[10px] text-gray-600 text-center w-1/4 leading-tight">
          親密感・<br />子育て
        </div>
      </div>
    </div>
  );
};