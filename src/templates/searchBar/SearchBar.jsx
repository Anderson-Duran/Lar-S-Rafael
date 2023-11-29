import React, { useState, useRef, useEffect } from "react";
import "./style.css";

export default function SearchBar({
  selectFunction,
  objectSelected,
  data,
  placeholder,
  keyField,
  searchField,
  value,
}) {
  // Referência para o input de pesquisa
  const inputRef = useRef();

  // Estado para o termo de pesquisa e dados recebidos
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [receivedData, setReceivedData] = useState(data);
  const [selectedItem, setSelectedItem] = useState(false);

  // Função para desmarcar um item selecionado
  function unselectItem() {
    setSearchTerm("");
    selectFunction({});
    filterField();
    setSelectedItem(false);
    document.querySelector('[data-valuelist]').style.display = 'none';
    // Configurar atributos ARIA e mensagem de erro
    inputRef.current.setAttribute("aria-invalid", true);
    inputRef.current.setCustomValidity("erro");
  }

  useEffect(() => { 
    document.querySelector('ul').style.display = 'none';
  }, [])

  // Função para filtrar os dados com base no termo de pesquisa
  function filterField() {
    setReceivedData(
      data.filter(
        (item) =>
          searchTerm.length > 0
            ? item[searchField].toLowerCase().includes(searchTerm.toLowerCase())
            : false
      )
    );

    

    let dataList = document.querySelector("[data-valuelist]");
    let field = document.querySelector("#searchBar");

    if (field.value !== "" && field.value.length > 1) {
      dataList.style.display = "inline-block";
      document.querySelector("[data-valuelist]").classList.add("modal");
    } else {
      dataList.style.display = "none";
      document.querySelector("[data-valuelist]").classList.remove("modal");
      console.log(field.value);
    }
  }

  return (
    <div className="container-searchBar">
      <div className="searchBar">
        {/* Ícone de pesquisa */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        {/* Campo de pesquisa */}
        <input
          id="searchBar"
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            filterField();

            // Configurar atributos ARIA e mensagem de erro com base no objeto selecionado
            if (!objectSelected) {
              e.currentTarget.setAttribute("aria-invalid", true);
              inputRef.current.setCustomValidity("erro");
            } else {
              e.currentTarget.removeAttribute("aria-invalid");
              inputRef.current.setCustomValidity("");
            }
          }}
          value={searchTerm}
          required
        />
        {/* Ícone para limpar o campo de pesquisa */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          onClick={unselectItem}
          id="clearSearchField"
          fill="currentColor"
          className="bi bi-x-square"
          viewBox="0 0 16 16"
        >
          <path
            id="X-border"
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            id="X"
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>

      <div className="result">
        <ul data-valuelist>
          {/* Mapeamento dos resultados */}
          {receivedData.map((item) => {
            if (searchTerm.length > 0) {
              return (
                <li
                  key={item[keyField]}
                  onClick={() => {
                    setSearchTerm(item[searchField]);
                    selectFunction(item);
                    setSelectedItem(true);
                    inputRef.current.setCustomValidity("");
                    document.querySelector("[data-valuelist]").style.display =
                      "none";
                  }}
                >
                  {item[searchField]}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
