interface InputProps {
    placeholder?: string;
    type?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, disabled,  type, value, onChange }: InputProps) {
  return (
    <input className='border-2 border-black rounded-md p-2' placeholder={placeholder} type={type} disabled={disabled} value={value} onChange={onChange}></input>
  )
}
