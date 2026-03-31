import { useEffect } from 'react';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Cookies from '../pages/Cookies';

function LegalModal({ type, onClose }) {
  const isOpen = Boolean(type);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = type === 'terms' ? 'Käyttöehdot' : type === 'privacy' ? 'Tietosuojaseloste' : 'Evästekäytäntö';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
        aria-label="Sulje"
      />

      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-xl leading-none"
            aria-label="Sulje"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(92vh-64px)] bg-gray-50">
          {type === 'terms' ? <Terms embedded /> : null}
          {type === 'privacy' ? <Privacy embedded /> : null}
          {type === 'cookies' ? <Cookies embedded /> : null}
        </div>
      </div>
    </div>
  );
}

export default LegalModal;
