import { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Import

export default function Auth() {
  const { t } = useTranslation(); // 2. Hook
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(t('auth.loginError') + error.message);
    } else {
      navigate('/catalog');
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { display_name: name } }
    });

    if (error) {
      alert(t('auth.registerError') + error.message);
    } else {
      alert(t('auth.success'));
      navigate('/catalog');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{t('auth.title')}</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label>{t('auth.name')}</label>
          <input type="text" placeholder={t('auth.namePlaceholder')} value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>{t('auth.email')}</label>
          <input type="email" placeholder={t('auth.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>{t('auth.password')}</label>
          <input type="password" placeholder={t('auth.passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        
        <button type="button" onClick={handleLogin} disabled={loading} style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? t('auth.loggingIn') : t('auth.login')}
        </button>
        
        <button type="button" onClick={handleSignUp} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          {t('auth.register')}
        </button>
      </form>
    </div>
  );
}