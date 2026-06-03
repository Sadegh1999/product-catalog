import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from './services/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
    setProducts(prods);
    setCategories(cats);
    setLoading(false);
  };

  const handleCreate = async (data) => {
    await createProduct(data);
    await loadData();
    setShowForm(false);
  };

  const handleUpdate = async (data) => {
    await updateProduct(editingProduct.id, data);
    await loadData();
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id);
      await loadData();
    }
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory ? p.categoryId === parseInt(filterCategory) : true;
    return matchSearch && matchCat;
  });

  return (
    <div style={page}>
      {/* Header */}
      <header style={header}>
        <h1 style={logo}>🛍️ Product Catalog</h1>
        <button onClick={() => setShowForm(true)} style={addBtn}>+ Add Product</button>
      </header>

      {/* Filters */}
      <div style={filters}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchInput}
        />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={select}>
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <p style={stats}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {loading ? (
        <p style={{ textAlign:'center', color:'#888', marginTop:60 }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign:'center', color:'#888', marginTop:60 }}>No products found.</p>
      ) : (
        <div style={grid}>
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={setEditingProduct}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <ProductForm
          categories={categories}
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editingProduct && (
        <ProductForm
          categories={categories}
          initial={editingProduct}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

const page = { minHeight:'100vh', background:'#f8f7ff', fontFamily:'system-ui, sans-serif' };
const header = { background:'#4f46e5', padding:'16px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' };
const logo = { color:'#fff', margin:0, fontSize:22, fontWeight:800 };
const addBtn = { background:'#fff', color:'#4f46e5', border:'none', borderRadius:8, padding:'10px 20px', fontWeight:700, cursor:'pointer', fontSize:14 };
const filters = { display:'flex', gap:12, padding:'24px 32px 0' };
const searchInput = { flex:1, padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14 };
const select = { padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, background:'#fff' };
const stats = { padding:'8px 32px', color:'#888', fontSize:13 };
const grid = { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20, padding:'0 32px 40px' };
