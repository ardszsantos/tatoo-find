import { useState, useEffect, useRef } from 'react';
import './styles/grid.css';

const GridContainer = ({ searchQuery }) => {
  const [items, setItems] = useState([]);  // Armazena URLs das imagens
  const [page, setPage] = useState(1); // Controla a paginação para a API
  const loader = useRef(null);

  // Função para carregar imagens usando a Google Custom Search API
  const loadImages = async (query, pageNumber) => {
    const apiKey = 'AIzaSyD-3Mdk1LXC06wWM0pTP9LcdSUdJqkE3ck';
    const searchEngineId = '97eb2e1f38fd14adf';
    const startIndex = (pageNumber - 1) * 10 + 1; // A paginação da API começa em 1

    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&start=${startIndex}&num=10&searchType=image&key=${apiKey}&cx=${searchEngineId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        const newImages = data.items.map(item => item.link); // Extrai as URLs das imagens
        setItems(prevItems => [...prevItems, ...newImages]);
      }
    } catch (error) {
      console.error("Erro ao carregar as imagens:", error);
    }
  };

  // Carrega novas imagens sempre que a consulta de busca mudar
  useEffect(() => {
    if (searchQuery) {
      setItems([]); // Limpa as imagens ao fazer uma nova busca
      setPage(1);   // Reseta o número da página
      loadImages(searchQuery, 1);
    }
  }, [searchQuery]);

  // Lógica para o carregamento infinito
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && searchQuery) {
        loadImages(searchQuery, page + 1);  // Carrega a próxima página de imagens
        setPage(prevPage => prevPage + 1);
      }
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 1.0
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader.current, page, searchQuery]);

  return (
    <div className="grid-container">
      {items.map((item, index) => (
        <div className="grid-item" key={index}>
          <img src={item} alt={`tattoo ${index}`} className="grid-image" />
        </div>
      ))}
      <div ref={loader} className="loading">Carregando mais imagens...</div>
    </div>
  );
};

export default GridContainer;
