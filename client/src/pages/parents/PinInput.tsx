import { useState, useRef, FC, useEffect } from 'react';

interface PinInputProps {
  onAuthorize: (pin: string) => void;
}

export const PinInput: FC<PinInputProps> = ({ onAuthorize }) => {
  const [pin, setPin] = useState<string[]>(Array(4).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!pin.includes('')) {
      onAuthorize(pin.join(''));
      setPin(Array(4).fill(''))
      inputsRef.current[0]?.focus();
    }
  }, [pin, onAuthorize])

  const focusNextInput = (index: number): void => {
    if (index < 3 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleChange = (index: number, value: string): void => {
    const newPin = [...pin];
    newPin[index] = value.slice(0, 1);
    setPin(newPin);
    if (value) focusNextInput(index);
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Enter Parental PIN</h1>
      <div className="d-flex justify-content-center align-items-center">
        {pin.map((_, index) => (
          <input
            autoFocus={index === 0}
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            className="form-control mx-1 fs-1"
            style={{ width: '60px' }}
            maxLength={1}
            value={pin[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};
