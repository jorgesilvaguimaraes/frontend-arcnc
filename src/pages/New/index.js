import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";
import "./styles.css";
import api from "../../services/api";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const user_id = await localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    const response = await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        className={thumbnail ? "has-thumbnail" : ""}
        style={{ backgroundImage: `url(${preview})` }}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="select img" />
      </label>

      <label htmlFor="company">Empresa *</label>
      <input
        type="text"
        id="company"
        placeholder="sua empresa incrível"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />

      <label htmlFor="tech">
        Tecnologias *<span>(separados por vírgulas)</span>
      </label>
      <input
        type="text"
        id="tech"
        placeholder="Quais tecnologias usam"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

      <label htmlFor="price">
        Valor da diária *<span>(em branco para Gratuito)</span>
      </label>
      <input
        type="text"
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button className="btn">Cadastrar</button>
    </form>
  );
}
