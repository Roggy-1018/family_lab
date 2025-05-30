import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ResultComparison } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ResultChartProps {
  results: ResultComparison[];
}

interface DetailedQuestion {
  id: string;
  text: string;
  expectation: number;
  reality: number;
  partnerExpectation?: number;
  partnerReality?: number;
}

interface CategoryDetails {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
    questions: DetailedQuestion[];
  }[];
}

export const ResultChart: React.FC<ResultChartProps> = ({ results }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const categories = results.map(r => r.categoryName);
  
  const mainData = {
    labels: categories,
    datasets: [
      {
        label: 'あなたの要望',
        data: results.map(r => r.expectationScore),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue
      },
      {
        label: 'あなたの実感',
        data: results.map(r => r.realityScore),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // Green
      },
      {
        label: 'パートナーの要望',
        data: results.map(r => r.partnerExpectationScore || 0),
        backgroundColor: 'rgba(99, 102, 241, 0.7)', // Indigo
      },
      {
        label: 'パートナーの実感',
        data: results.map(r => r.partnerRealityScore || 0),
        backgroundColor: 'rgba(52, 211, 153, 0.7)', // Emerald
      },
    ],
  };
  
  const mainOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
          },
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return [
              {
                text: `■ あなたの要望 / ■ あなたの実感`,
                fillStyle: datasets[0].backgroundColor,
                hidden: datasets[0].hidden,
                lineCap: datasets[0].borderCapStyle,
                lineDash: datasets[0].borderDash,
                lineDashOffset: datasets[0].borderDashOffset,
                lineJoin: datasets[0].borderJoinStyle,
                lineWidth: datasets[0].borderWidth,
                strokeStyle: datasets[0].borderColor,
                pointStyle: 'rect',
                datasetIndex: 0
              },
              {
                text: `■ パートナーの要望 / ■ パートナーの実感`,
                fillStyle: datasets[2].backgroundColor,
                hidden: datasets[2].hidden,
                lineCap: datasets[2].borderCapStyle,
                lineDash: datasets[2].borderDash,
                lineDashOffset: datasets[2].borderDashOffset,
                lineJoin: datasets[2].borderJoinStyle,
                lineWidth: datasets[2].borderWidth,
                strokeStyle: datasets[2].borderColor,
                pointStyle: 'rect',
                datasetIndex: 2
              }
            ];
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          font: {
            size: 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          },
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    onHover: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setHoveredCategory(categories[index]);
      } else {
        setHoveredCategory(null);
      }
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const categoryName = categories[index];
        setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
      }
    }
  };

  // カテゴリー詳細データ
  const getCategoryDetails = (categoryName: string): CategoryDetails => {
    return {
      id: 'cat1',
      name: categoryName,
      subcategories: [
        {
          id: 'sub1',
          name: '情緒的つながり',
          questions: [
            {
              id: 'q1',
              text: 'パートナーに気持ちを理解してほしい',
              expectation: 4.5,
              reality: 3.5,
              partnerExpectation: 4.2,
              partnerReality: 3.8
            },
            {
              id: 'q2',
              text: '日常的な愛情表現を望む',
              expectation: 4.2,
              reality: 3.8,
              partnerExpectation: 4.0,
              partnerReality: 3.5
            }
          ]
        },
        {
          id: 'sub2',
          name: 'コミュニケーション',
          questions: [
            {
              id: 'q3',
              text: 'オープンな対話を望む',
              expectation: 4.0,
              reality: 3.2,
              partnerExpectation: 4.3,
              partnerReality: 3.6
            },
            {
              id: 'q4',
              text: '悩みを正直に話せる関係を望む',
              expectation: 4.3,
              reality: 3.6,
              partnerExpectation: 4.1,
              partnerReality: 3.4
            }
          ]
        }
      ]
    };
  };

  const detailOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="w-full space-y-8">
      <div 
        className="relative cursor-pointer"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="h-[400px] md:h-[300px]">
          <Bar data={mainData} options={mainOptions} />
        </div>
        
        {/* ホバー時のプレビュー */}
        <AnimatePresence>
          {hoveredCategory && !selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900">{hoveredCategory}</h4>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-1 text-sm text-gray-600">クリックして詳細を表示</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border border-gray-200 bg-white"
          >
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedCategory}の詳細分析
                </h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full p-1 hover:bg-gray-100"
                >
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {getCategoryDetails(selectedCategory).subcategories.map((subcategory) => (
                <div key={subcategory.id} className="mb-8 last:mb-0">
                  <h4 className="mb-4 text-lg font-medium text-gray-800">
                    {subcategory.name}
                  </h4>
                  
                  {subcategory.questions.map((question) => (
                    <div key={question.id} className="mb-6 last:mb-0">
                      <p className="mb-2 text-sm text-gray-600">{question.text}</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-blue-50 p-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-blue-700">要望</span>
                            <span className="font-medium text-blue-700">
                              {question.expectation.toFixed(1)}
                            </span>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <span className="text-sm text-blue-700">実感</span>
                            <span className="font-medium text-blue-700">
                              {question.reality.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        
                        {question.partnerExpectation !== undefined && (
                          <div className="rounded-lg bg-purple-50 p-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-purple-700">パートナーの要望</span>
                              <span className="font-medium text-purple-700">
                                {question.partnerExpectation.toFixed(1)}
                              </span>
                            </div>
                            <div className="mt-1 flex justify-between">
                              <span className="text-sm text-purple-700">パートナーの実感</span>
                              <span className="font-medium text-purple-700">
                                {question.partnerReality?.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};