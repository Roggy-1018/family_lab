import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { RadioGroup } from '../components/ui/RadioGroup';
import { useAuthStore } from '../store/authStore';
import { prefectures } from '../data/prefectures';
import { Child } from '../types';
import { Plus, X } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    birthDate: user?.profile.birthDate || '',
    gender: user?.profile.gender || '',
    marriageDate: user?.profile.marriageDate || '',
    occupation: user?.profile.occupation || '',
    prefecture: user?.profile.prefecture || '',
    hasChildren: user?.profile.hasChildren || false,
    children: user?.profile.children || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name: string, value: string | number) => {
    if (name === 'hasChildren') {
      setFormData(prev => ({
        ...prev,
        hasChildren: value === 'true',
        children: value === 'true' ? prev.children : []
      }));
    }
  };

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [
        ...prev.children,
        {
          id: `child-${Date.now()}`,
          birthDate: '',
          gender: ''
        }
      ]
    }));
  };

  const removeChild = (childId: string) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.filter(child => child.id !== childId)
    }));
  };

  const updateChild = (childId: string, field: keyof Child, value: string) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.map(child =>
        child.id === childId ? { ...child, [field]: value } : child
      )
    }));
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateMarriageYears = (marriageDate: string) => {
    if (!marriageDate) return null;
    const today = new Date();
    const marriage = new Date(marriageDate);
    let years = today.getFullYear() - marriage.getFullYear();
    const monthDiff = today.getMonth() - marriage.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < marriage.getDate())) {
      years--;
    }
    return years;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile({
        birthDate: formData.birthDate,
        gender: formData.gender,
        marriageDate: formData.marriageDate,
        occupation: formData.occupation,
        prefecture: formData.prefecture,
        hasChildren: formData.hasChildren,
        children: formData.children
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">プロフィール設定</h1>

          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="生年月日"
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {formData.birthDate && (
                    <div className="text-sm text-gray-500 mt-1">
                      年齢: {calculateAge(formData.birthDate)}歳
                    </div>
                  )}

                  <div>
                    <RadioGroup
                      label="性別"
                      name="gender"
                      value={formData.gender}
                      onChange={(value) => handleChange({
                        target: { name: 'gender', value }
                      } as React.ChangeEvent<HTMLInputElement>)}
                      options={[
                        { label: '男性', value: 'male' },
                        { label: '女性', value: 'female' },
                        { label: 'その他', value: 'other' }
                      ]}
                    />
                  </div>
                </div>

                <Input
                  label="結婚記念日"
                  type="date"
                  name="marriageDate"
                  value={formData.marriageDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {formData.marriageDate && (
                  <div className="text-sm text-gray-500 mt-1">
                    結婚年数: {calculateMarriageYears(formData.marriageDate)}年
                  </div>
                )}

                <Input
                  label="職業"
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />

                <Select
                  label="お住まいの地域"
                  name="prefecture"
                  value={formData.prefecture}
                  onChange={handleChange}
                  options={prefectures.map(pref => ({
                    value: pref.code,
                    label: pref.name
                  }))}
                  fullWidth
                />

                <div>
                  <RadioGroup
                    label="お子様の有無"
                    name="hasChildren"
                    value={formData.hasChildren.toString()}
                    onChange={(value) => handleRadioChange('hasChildren', value)}
                    options={[
                      { label: 'いる', value: 'true' },
                      { label: 'いない', value: 'false' }
                    ]}
                  />
                </div>

                {formData.hasChildren && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">お子様の情報</h3>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addChild}
                        className="flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>追加</span>
                      </Button>
                    </div>

                    {formData.children.map((child, index) => (
                      <div key={child.id} className="rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">お子様 {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeChild(child.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Input
                            label="生年月日"
                            type="date"
                            value={child.birthDate}
                            onChange={(e) => updateChild(child.id, 'birthDate', e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                          />

                          <RadioGroup
                            label="性別"
                            name={`child-${child.id}-gender`}
                            value={child.gender}
                            onChange={(value) => updateChild(child.id, 'gender', value)}
                            options={[
                              { label: '男性', value: 'male' },
                              { label: '女性', value: 'female' }
                            ]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    キャンセル
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    保存する
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};