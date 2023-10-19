'use client'
import "./ResetPassword.scss";
import { useState } from 'react';
import { AuthService } from '@/api/authService';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import InputField from '../InputField/InputField';

const ResetPassword = ({ token }: { token: string }) => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const router = useRouter();
  const [responseError, setResponseError] = useState<string>('');

  const [formData, setFormData] = useState({
    password: '',
    repetedPassword: '',
  });

  async function resetPasswordHandler(e: React.SyntheticEvent<EventTarget>) {
    e.preventDefault();

    try {
      if (formData.password.length < 8 || formData.repetedPassword.length < 8) {
        alert('Lozinka mora imati najmanje 8 karaktera.');
        return;
      }

      if (formData.password !== formData.repetedPassword) {
        alert('Unete lozinke se ne podudaraju! Pokušajte ponovo.');
        return;
      }

      /** 
       * To do ... 
       * dodati validaciju na FE za jedan specijalan karakter i jedno veliko slovo 
       * */ 

      await AuthService.resetPassword(token, formData.password);
      
      console.log(token);
      
      router.push('/');


    } catch (error: any) {
      setResponseError(error.response?.data?.errors?.non_field_errors);
    }
  }

  const updateFormData = (fieldValue: string, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const button = (
    <button
      onClick={togglePasswordVisibility}
      aria-label="Toggle password visibility"
      type="button"
    >
      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
    </button>
  );

  return (
    <div className="wrapper">
      <p className="welcome-sentence">Unesite novu lozinku.</p>
      <p className="welcome-sentence">
        Lozinka mora biti minimum osam karaktera, jedan specijalan karakter i jedno veliko slovo.
      </p>
      <form className="reset-password-form">
        <div>
          <InputField
            type={passwordVisible ? 'text' : 'password'}
            label="Nova lozinka:"
            placeholder=""
            onChange={(value) => updateFormData(value, 'password')}
          />
          {button}
        </div>
        <div>
          <InputField
            label="Potvrdi lozinku:"
            placeholder=""
            type={passwordVisible ? 'text' : 'password'}
            onChange={(value) => updateFormData(value, 'repetedPassword')}
          />
          {button}
        </div>

        {responseError && <p className="error-message">{responseError}</p>}
        <button
          className="reset-password-form__button"
          onClick={resetPasswordHandler}
        >
          RESETUJ LOZINKU
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

