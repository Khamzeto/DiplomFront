import React from 'react';

const CheckboxDiplom = ({ label, isChecked, onChange }) => {
  return (
    <div className="flex items-center mx-4 my-5">
      <div
        className="custom-checkbox"
        style={{
          minWidth: '20px',
          height: '20px',
          borderRadius: '100%',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: isChecked ? '#007bff' : 'transparent',
          borderColor: isChecked ? '#007bff' : '#ccc',
        }}
        onClick={onChange}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="9"
            viewBox="0 0 9 7"
            fill="none"
          >
            <path
              d="M3.37503 4.66661L1.125 2.33331L0 3.49996L3.37503 7L9 1.16666L7.87501 0L3.37503 4.66661Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <span className="mx-3">{label}</span>
    </div>
  );
};

export default CheckboxDiplom;
