export default function ToggleSwitch({ checked, onChange }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`h-9 w-16 rounded-full border transition ${checked
                ? 'border-orange-300 bg-orange-500/10 dark:border-orange-600 dark:bg-orange-900/30'
                : 'border-slate-300 bg-slate-200/70 dark:border-slate-600 dark:bg-slate-700/50'
                }`}
            aria-pressed={checked}
        >
            <span
                className={`block h-8 w-8 rounded-full bg-white shadow-sm transition-all ${checked
                    ? 'translate-x-7 bg-orange-500 dark:bg-orange-500'
                    : 'translate-x-1 bg-slate-100 dark:bg-slate-600'
                    }`}
            />
        </button>
    );
}
