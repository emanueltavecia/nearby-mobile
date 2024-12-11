export interface Category {
  id: string
  name: string
}

export interface CategoriesProps {
  data: Category[]
  selectedCategory: string
  onSelectCategory: React.Dispatch<React.SetStateAction<string>>
}
