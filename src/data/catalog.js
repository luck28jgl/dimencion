const categoryConfig = [
  {
    name: 'Anillos',
    slug: 'anillos',
    folder: 'anillo',
    description: 'Anillos con acabados delicados y formas contemporáneas para cada ocasión.',
  },
  {
    name: 'Pulseras',
    slug: 'pulseras',
    folder: 'pulseras',
    description: 'Pulseras que combinan texturas finas y diseños versátiles para llevar siempre.',
  },
  {
    name: 'Collares',
    slug: 'collares',
    folder: 'collares',
    description: 'Collares con personalidad que elevan cualquier look de día o de noche.',
  },
  {
    name: 'Cadenas',
    slug: 'cadenas',
    folder: 'cadenas',
    description: 'Cadenas con líneas limpias y acabados elegantes para un estilo atemporal.',
  },
  {
    name: 'Colgantes',
    slug: 'colgantes',
    folder: 'colgantes',
    description: 'Colgantes que cuentan historias mediante proporciones refinadas y brillo sutil.',
  },
  {
    name: 'Duo aretes y colgantes',
    slug: 'duo-aretes-colgantes',
    folder: 'duo-aretes-colgantes',
    description: 'Sets de aretes y colgantes que se complementan para un estilo armónico.',
  },
  {
    name: 'Arete broquel',
    slug: 'arete-broquel',
    folder: 'arete-broquel',
    description: 'Aretes broquel pequeños y sofisticados, perfectos para el uso diario.',
  },
  {
    name: 'Arete Huggies/arracadas',
    slug: 'arete-huggies-arracadas',
    folder: 'arete-huggies-arracadas',
    description: 'Huggies y arracadas con estilo compacto y detalles expresivos.',
  },
]

const imageModules = import.meta.glob('../assets/*/*.{jpeg,jpg,png,webp}', { eager: true, as: 'url' })

const categoryFolders = categoryConfig.reduce((map, category) => {
  map[category.folder] = category
  return map
}, {})

const entries = Object.entries(imageModules)
  .map(([filePath, url]) => {
    const match = filePath.match(/\.\.\/assets\/([^\/]+)\/(.+)$/)
    if (!match) return null

    const folder = match[1]
    const category = categoryFolders[folder]
    if (!category) return null

    const fileName = match[2]
    const numberMatch = fileName.match(/(\d+)/)
    const index = numberMatch ? Number(numberMatch[1]) : 0

    return {
      category,
      folder,
      image: url,
      fileName,
      index,
    }
  })
  .filter(Boolean)
  .sort((a, b) => {
    if (a.category.name !== b.category.name) {
      return a.category.name.localeCompare(b.category.name, 'es', { sensitivity: 'base' })
    }
    if (a.index !== b.index) {
      return a.index - b.index
    }
    return a.fileName.localeCompare(b.fileName, 'es', { sensitivity: 'base' })
  })

const products = entries.map((entry, index) => ({
  id: `${entry.category.slug.toUpperCase().slice(0, 3)}-${String(index + 1).padStart(3, '0')}`,
  name: `${entry.category.name.split(' ')[0]} ${String(entry.index || index + 1).padStart(2, '0')}`,
  category: entry.category.name,
  description: `Diseño exclusivo de ${entry.category.name.toLowerCase()}.`,
  image: entry.image,
  featured: entry.index > 0 && entry.index <= 4,
}))

const categories = categoryConfig.map((catalog) => ({
  ...catalog,
  products: products.filter((product) => product.category === catalog.name),
}))

const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

const categoryBySlug = categories.reduce((map, category) => {
  map[category.slug] = category
  return map
}, {})

export { categories, products, featuredProducts, categoryBySlug }
