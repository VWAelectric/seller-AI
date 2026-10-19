// ================================
// PRODUTOS
// ================================

export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

export const saveProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const addProduct = (product) => {
  const products = getProducts();

  products.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...product,
  });

  saveProducts(products);
};

export const deleteProduct = (id) => {
  const products = getProducts().filter(
    (product) => product.id !== id
  );

  saveProducts(products);
};

// ================================
// GERAÇÕES IA
// ================================

export const getGenerations = () => {
  return JSON.parse(localStorage.getItem("generations")) || [];
};

export const saveGenerations = (generations) => {
  localStorage.setItem(
    "generations",
    JSON.stringify(generations)
  );
};

export const addGeneration = (generation) => {
  const generations = getGenerations();

  generations.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...generation,
  });

  saveGenerations(generations);
};

export const deleteGeneration = (id) => {
  const generations = getGenerations().filter(
    (generation) => generation.id !== id
  );

  saveGenerations(generations);
};

// ================================
// DASHBOARD
// ================================

export const getDashboardStats = () => {
  const products = getProducts();
  const generations = getGenerations();

  return {
    products: products.length,
    generations: generations.length,
    hoursSaved: (
      (generations.length * 5) /
      60
    ).toFixed(1),
  };
};