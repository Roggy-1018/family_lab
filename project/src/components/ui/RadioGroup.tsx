import React from 'react';

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  name: string;
  label?: string;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  direction = 'horizontal',
  disabled = false,
}) => {
  const directionClass = direction === 'horizontal' ? 'flex space-x-4' : 'flex flex-col space-y-2';

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={directionClass}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`ml-2 block text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};