import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  async function buscarUsuarios() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsuarios(response.data);
    } catch (error) {
      setError("Erro ao buscar usuários. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Auto-Load: carrega usuários quando a página abre
  useEffect(() => {
    buscarUsuarios();
  }, []);

  // Filtragem em tempo real
  const usuariosFiltrados = usuarios.filter((user) =>
    user.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Usuários</h1>

      <button onClick={buscarUsuarios} disabled={loading}>
        {loading ? "Carregando..." : "Buscar Usuários"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Filtrar por nome..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "200px" }}
      />

      <ul style={{ marginTop: "20px" }}>
        {usuariosFiltrados.map((user) => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            <strong>Nome:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Cidade:</strong> {user.address.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;