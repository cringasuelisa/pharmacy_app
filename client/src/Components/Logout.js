import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout');
      // Șterge token-ul sau alte informații de autentificare din starea ta de autentificare sau din stocarea locală

      // Redirecționează utilizatorul către pagina de autentificare sau către pagina principală
      navigate('/login');
    } catch (error) {
      // Tratează erorile în cazul în care cererea de logout nu a putut fi efectuată
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
