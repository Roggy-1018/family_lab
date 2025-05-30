import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

interface Reference {
  id: string;
  citation: string;
  description: string;
  category: string;
}

export const ReferencesPage: React.FC = () => {
  const references: Reference[] = [
    {
      id: 'gottman1993',
      citation: 'Gottman, J. M. (1993). The roles of conflict engagement, escalation, and avoidance in marital interaction. Journal of Consulting and Clinical Psychology, 61(1), 6–15.',
      description: '夫婦間のコミュニケーションや衝突解決に関する研究。感情の交換や解決プロセスの質が夫婦満足度と強く関連することを示しています。',
      category: 'コミュニケーション'
    },
    {
      id: 'gottman1999',
      citation: 'Gottman, J. M. (1999). The Seven Principles for Making Marriage Work. Three Rivers Press.',
      description: '「健全な夫婦関係を続けるための七つの原則」を提唱。コミュニケーションや感情的つながりの重要性を説いています。',
      category: '関係性の原則'
    },
    {
      id: 'olson2003',
      citation: 'Olson, D. H., & Gorall, D. M. (2003). Circumplex Model of Marital and Family Systems. In F. Walsh (Ed.), Normal Family Processes (3rd ed., pp. 514–547). Guilford Press.',
      description: '家族機能を「連結性（Cohesion）」と「適応性（Adaptability）」の2軸で捉えたサーカムプレックス・モデルを提示しています。',
      category: '家族システム'
    },
    {
      id: 'bowen1978',
      citation: 'Bowen, M. (1978). Family Therapy in Clinical Practice. Jason Aronson.',
      description: '家族システム理論の基礎。家族の情緒的分化や相互作用パターンなどを重視する理論を展開しています。',
      category: '家族システム'
    },
    {
      id: 'minuchin1974',
      citation: 'Minuchin, S. (1974). Families and Family Therapy. Harvard University Press.',
      description: '構造派家族療法を提唱。家族内の境界やサブシステム、規則性に注目した理論を展開しています。',
      category: '家族療法'
    },
    {
      id: 'belsky1984',
      citation: 'Belsky, J. (1984). The determinants of parenting: A process model. Child Development, 55(1), 83–96.',
      description: '子育てにおける夫婦関係や社会的サポートが与える影響を示すモデルを提示しています。',
      category: '子育て'
    },
    {
      id: 'zabriskie2001',
      citation: 'Zabriskie, R. B., & McCormick, B. P. (2001). The influences of family leisure patterns on perceptions of family functioning. Family Relations, 50(3), 281–289.',
      description: '家族レジャー活動と家族機能（満足度・コミュニケーション）の関連を示した研究です。',
      category: '家族活動'
    }
  ];

  const categories = Array.from(new Set(references.map(ref => ref.category)));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">参考文献</h1>
          <p className="mb-8 text-xl text-gray-600">
            FamilyPulseの理論的基盤となる主要な研究論文と書籍
          </p>

          {categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">{category}</h2>
              <div className="space-y-4">
                {references
                  .filter(ref => ref.category === category)
                  .map(reference => (
                    <Card key={reference.id} variant="outline">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium">
                          <div className="font-mono text-sm text-gray-600">
                            {reference.citation}
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">
                          {reference.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};