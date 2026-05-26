import { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // <-- DODANE: Stan na imię użytkownika

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Błąd logowania: ' + error.message);
    } else {
      navigate('/catalog');
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ZMIENIONE: Przekazujemy imię w obiekcie 'options.data'
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: name, // <-- Tutaj Supabase zapisze imię
        }
      }
    });

    if (error) {
      alert('Błąd rejestracji: ' + error.message);
    } else {
      alert('Konto stworzone pomyślnie!');
      navigate('/catalog');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Logowanie / Rejestracja</h2>
      <form>
        {/* DODANE: Nowe pole na Imię */}
        <div style={{ marginBottom: '15px' }}>
          <label>Imię (tylko do rejestracji):</label>
          <input
            type="text"
            placeholder="Twoje imię"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Twój email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Hasło:</label>
          <input
            type="password"
            placeholder="Twoje hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <button type="button" onClick={handleLogin} disabled={loading} style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
        
        <button type="button" onClick={handleSignUp} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}