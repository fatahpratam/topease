import { createContext, useContext, useState } from "react";

export const ProductStorageContext = createContext({
  productHistory: [],
  initializeProductHistory: (productId, paymentMethodId, requiredFields) => { },
  handleProductChange: (productId, property, value) => { },
  getValueOf: (productId, property) => { },
  clearHistory: (productId) => { },
});

export function ProductStorageProvider({ children }) {
  const [productHistory, setProductHistory] = useState(
    JSON.parse(sessionStorage.getItem('productHistory')) || []
  );

  function initializeProductHistory(productId, nominalOptionId, paymentMethodId, requiredFields) {
    const history = productHistory.find(
      history => history.productId === productId
    );
    if (history === undefined) {
      setProductHistory(prev => {
        prev.length >= 5 && prev.pop();
        const extraField = requiredFields.reduce((prev, curr) => {
          return { ...prev, [curr.fieldName]: '' }
        }, {});
        prev.unshift({
          productId, nominalOptionId, paymentMethodId, ...extraField
        });
        sessionStorage.setItem('productHistory', JSON.stringify(prev));
        return prev;
      });
    }
  }

  function handleProductChange(productId, property, value) {
    setProductHistory(prev => {
      for (const history of prev) {
        if (history.productId === productId) {
          history[property] = value;
          break;
        }
      }
      sessionStorage.setItem('productHistory', JSON.stringify(prev));
      return [...prev];
    });
  };

  function getValueOf(productId, property) {
    const history = productHistory.find(
      history => history.productId === productId
    );
    return history[property];
  }

  function clearHistory(productId) {
    setProductHistory(prev => {
      const index = prev.findIndex(
        history => history.productId === productId
      );
      index >= 0 && prev.splice(index, 1);
      sessionStorage.setItem('productHistory', JSON.stringify(prev));
      return prev;
    });
  }

  return (
    <ProductStorageContext.Provider value={{ productHistory, initializeProductHistory, handleProductChange, getValueOf, clearHistory }}>
      {children}
    </ProductStorageContext.Provider>
  )
};

export function useProductStorage() {
  return useContext(ProductStorageContext);
}