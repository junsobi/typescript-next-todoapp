import React from 'react';

type CheckboxProps = {
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <div
          className="block w-6 h-6 rounded-full border border-gray-300"
          data-testid="checkbox-visible"
        ></div>
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-3 h-3 fill-current text-blue-500"
              data-testid="checkbox-svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </div>
        )}
      </div>
    </label>
  );
};

export default Checkbox;
