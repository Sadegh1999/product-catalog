export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div style={card}>
      <div style={imageWrap}>
        {product.imageUrl
          ? <img src={product.imageUrl} alt={product.name} style={img} />
          : <div style={placeholder}>No Image</div>
        }
      </div>
      <div style={body}>
        <span style={badge}>{product.categoryName}</span>
        <h3 style={title}>{product.name}</h3>
        <p style={desc}>{product.description}</p>
        <div style={footer}>
          <div>
            <div style={price}>${product.price.toFixed(2)}</div>
            <div style={stock}>Stock: {product.stock}</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => onEdit(product)} style={btnEdit}>Edit</button>
            <button onClick={() => onDelete(product.id)} style={btnDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const card = { background:'#fff', borderRadius:12, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', overflow:'hidden', display:'flex', flexDirection:'column' };
const imageWrap = { height:180, background:'#f3f4f6' };
const img = { width:'100%', height:'100%', objectFit:'cover' };
const placeholder = { height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa', fontSize:14 };
const body = { padding:16, display:'flex', flexDirection:'column', gap:6, flex:1 };
const badge = { display:'inline-block', background:'#ede9fe', color:'#5b21b6', fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20, alignSelf:'flex-start' };
const title = { margin:0, fontSize:16, fontWeight:700, color:'#111' };
const desc = { margin:0, fontSize:13, color:'#666', lineHeight:1.5 };
const footer = { display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'auto', paddingTop:10 };
const price = { fontSize:18, fontWeight:700, color:'#4f46e5' };
const stock = { fontSize:12, color:'#888' };
const btnEdit = { padding:'6px 14px', background:'#f3f4f6', border:'none', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:13 };
const btnDelete = { padding:'6px 14px', background:'#fee2e2', color:'#dc2626', border:'none', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:13 };
