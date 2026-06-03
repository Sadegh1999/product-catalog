import { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, onCancel, categories, initial }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        description: initial.description,
        price: initial.price,
        stock: initial.stock,
        imageUrl: initial.imageUrl || '',
        categoryId: initial.categoryId,
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      categoryId: parseInt(form.categoryId),
    });
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ marginBottom: 20 }}>{initial ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Description', name: 'description', type: 'text' },
            { label: 'Price', name: 'price', type: 'number' },
            { label: 'Stock', name: 'stock', type: 'number' },
            { label: 'Image URL', name: 'imageUrl', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} style={field}>
              <label style={labelStyle}>{label}</label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required={name !== 'imageUrl'}
                style={input}
              />
            </div>
          ))}

          <div style={field}>
            <label style={labelStyle}>Category</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required style={input}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button type="submit" style={btnPrimary}>Save</button>
            <button type="button" onClick={onCancel} style={btnSecondary}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = { position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 };
const modal = { background:'#fff', borderRadius:12, padding:32, width:460, maxHeight:'90vh', overflowY:'auto' };
const field = { marginBottom:14 };
const labelStyle = { display:'block', fontWeight:600, marginBottom:4, fontSize:14 };
const input = { width:'100%', padding:'8px 10px', borderRadius:6, border:'1px solid #ddd', fontSize:14, boxSizing:'border-box' };
const btnPrimary = { flex:1, padding:'10px 0', background:'#4f46e5', color:'#fff', border:'none', borderRadius:8, fontWeight:600, cursor:'pointer', fontSize:15 };
const btnSecondary = { flex:1, padding:'10px 0', background:'#f3f4f6', color:'#333', border:'none', borderRadius:8, fontWeight:600, cursor:'pointer', fontSize:15 };
