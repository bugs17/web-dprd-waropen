"use client"

const AmberButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.375rem',
        border: 'none',
        fontWeight: 600,
        fontSize: '0.875rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: 'linear-gradient(#fbbf24, #d97706)',
        color: 'white',
        boxShadow: disabled
          ? 'inset 0 1px 2px -1px #fcd34d, 0 1px 2px -1px #0004'
          : 'inset 0 2px 2px -1px #fcd34d, 0 2px 4px -1px #0008',
        borderBottom: disabled ? '1.5pt solid #b45309' : '2pt solid #b45309',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const span = e.currentTarget.querySelector('.btn-inner');
          span.style.transform = 'translateY(-1px)';
          span.style.boxShadow = '0 4px 6px -2px #0008';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const span = e.currentTarget.querySelector('.btn-inner');
          span.style.transform = 'translateY(0)';
          span.style.boxShadow = 'inset 0 2px 2px -1px #fcd34d, 0 2px 4px -1px #0008';
        }
      }}
    >
      <span
        className="btn-inner"
        style={{
          display: 'inline-block',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {children}
      </span>
    </button>
  );
};

export default AmberButton;
