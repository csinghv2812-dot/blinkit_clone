import { useState } from 'react'
import { Camera, Save, Plus, X } from 'lucide-react'
import { apiRequest } from '../lib/api'

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    mrp: '',
    stock: '',
    unit: '',
    description: '',
    image: '',
    sku: '',
    brand: '',
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')
  const [images, setImages] = useState([])

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Snacks',
    'Beverages',
    'Bakery',
    'Frozen Foods',
    'Grocery',
    'Personal Care',
    'Household',
  ]

  const units = ['kg', 'g', 'L', 'ml', 'piece', 'pack', 'dozen']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newImages])
  }

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
          category: formData.category,
          image: formData.image,
        }),
      });

    alert('Product added successfully!');
  } catch (err) {
    console.log(err);
    alert('Product add nahi hua');
  }
};

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add New Product</h1>
        <p className="page-subtitle">Add a new product to your inventory</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          {/* Left Column - Product Details */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '24px' }}>Product Details</h3>

            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  className="form-input"
                  placeholder="Enter subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="form-input"
                  placeholder="Enter brand name"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SKU</label>
                <input
                  type="text"
                  name="sku"
                  className="form-input"
                  placeholder="Enter SKU code"
                  value={formData.sku}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                name="image"
                className="form-input"
                placeholder="https://example.com/product.jpg"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <button type="button" className="btn btn-outline" onClick={handleAddTag}>
                  <Plus size={16} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 12px',
                      background: 'var(--bg-primary)',
                      borderRadius: '20px',
                      fontSize: '13px',
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Stock */}
          <div>
            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 className="card-title" style={{ marginBottom: '24px' }}>Pricing & Stock</h3>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Selling Price *</label>
                  <input
                    type="number"
                    name="price"
                    className="form-input"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">MRP</label>
                  <input
                    type="number"
                    name="mrp"
                    className="form-input"
                    placeholder="Enter MRP"
                    value={formData.mrp}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-input"
                    placeholder="Enter stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Unit *</label>
                  <select
                    name="unit"
                    className="form-select"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select unit</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="card">
              <h3 className="card-title" style={{ marginBottom: '24px' }}>Product Images</h3>

              <div
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: '12px',
                  padding: '32px',
                  textAlign: 'center',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
              >
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="images" style={{ cursor: 'pointer' }}>
                  <Camera size={40} style={{ color: 'var(--text-light)', marginBottom: '12px' }} />
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Click to upload images
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                    PNG, JPG up to 5MB each
                  </p>
                </label>
              </div>

              {images.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                  }}
                >
                  {images.map((img, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: 'var(--bg-primary)',
                      }}
                    >
                      <img
                        src={img.preview}
                        alt={`Product ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'var(--error)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
            justifyContent: 'flex-end',
          }}
        >
          <button type="button" className="btn btn-outline" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={18} />
            Save Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
