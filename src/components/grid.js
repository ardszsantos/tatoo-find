import { useState, useEffect, useRef } from 'react';
import './styles/grid.css';

const GridContainer = () => {
  const [items, setItems] = useState([...Array(21).keys()]); // Initial 21 grid items
  const loader = useRef(null); // Ref for the last grid item (to observe when it's visible)

  // Function to load more items
  const loadMoreItems = () => {
    setItems(prevItems => [...prevItems, ...Array(21).keys()].map(i => i + prevItems.length));
  };

  // IntersectionObserver to trigger loadMoreItems when the user scrolls near the end
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreItems();
      }
    }, {
      root: null, // relative to the viewport
      rootMargin: '100px', // load 100px before reaching the end
      threshold: 1.0 // when 100% of the target is visible
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader.current]);

  return (
    <div className="grid-container">
      {items.map((item, index) => (
        <div className="grid-item" key={index}>
          Image {item + 1}
        </div>
      ))}
      {/* This div will be observed and trigger the loading of more items */}
      <div ref={loader} className="loading">
        Loading more images...
      </div>
    </div>
  );
}

export default GridContainer;
