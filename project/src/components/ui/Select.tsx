import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  const baseStyles = 'rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${baseStyles} ${errorStyles} ${widthClass} ${className}`}
        {...props}
      >
        <option value="">選択してください</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};