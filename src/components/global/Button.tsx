

interface ButtonProps {
    label: string;
    onClick: () => void;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    disabled?: boolean;
}

export default function Button({ label, onClick, secondary, fullWidth, large, disabled}: ButtonProps) {
    return (
        <button type="button" onClick={onClick} disabled={disabled} className={`flex justify-center mt-2 border-black border-2 items-center gap-2 text-white font-semibold rounded-lg ${fullWidth ? 'w-full' : ''} ${large ? 'h-12' : 'h-10'} ${secondary ? 'bg-neutral-600 hover:bg-black' : 'bg-neutral-600 hover:bg-black'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} duration-500`}>
            {label}
        </button>
    )
}