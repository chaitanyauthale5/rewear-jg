"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, Star, Heart, ArrowUpDown, Leaf, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const items = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    points: 25,
    image: "/placeholder.svg?height=300&width=300",
    user: "Sarah M.",
    rating: 4.8,
    location: "New York",
    tags: ["vintage", "denim", "casual"],
    liked: false,
  },
  {
    id: 2,
    title: "Designer Summer Dress",
    category: "Dresses",
    size: "S",
    condition: "Like New",
    points: 35,
    image: "/placeholder.svg?height=300&width=300",
    user: "Emma K.",
    rating: 4.9,
    location: "Los Angeles",
    tags: ["designer", "summer", "formal"],
    liked: true,
  },
  {
    id: 3,
    title: "Casual Sneakers",
    category: "Footwear",
    size: "9",
    condition: "Good",
    points: 20,
    image: "/placeholder.svg?height=300&width=300",
    user: "Mike R.",
    rating: 4.7,
    location: "Chicago",
    tags: ["casual", "sneakers", "comfortable"],
    liked: false,
  },
  {
    id: 4,
    title: "Wool Winter Coat",
    category: "Outerwear",
    size: "L",
    condition: "Very Good",
    points: 40,
    image: "/placeholder.svg?height=300&width=300",
    user: "Lisa T.",
    rating: 5.0,
    location: "Boston",
    tags: ["wool", "winter", "warm"],
    liked: false,
  },
  {
    id: 5,
    title: "Silk Blouse",
    category: "Tops",
    size: "M",
    condition: "Excellent",
    points: 28,
    image: "/placeholder.svg?height=300&width=300",
    user: "Anna W.",
    rating: 4.6,
    location: "Seattle",
    tags: ["silk", "professional", "elegant"],
    liked: true,
  },
  {
    id: 6,
    title: "Leather Handbag",
    category: "Accessories",
    size: "One Size",
    condition: "Good",
    points: 32,
    image: "/placeholder.svg?height=300&width=300",
    user: "Rachel P.",
    rating: 4.8,
    location: "Miami",
    tags: ["leather", "handbag", "classic"],
    liked: false,
  },
]

const categories = ["All", "Outerwear", "Dresses", "Tops", "Bottoms", "Footwear", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const conditions = ["Like New", "Excellent", "Very Good", "Good", "Fair"]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([2, 5])

  const [currentPage, setCurrentPage] = useState(1)
  const [allItems, setAllItems] = useState(items)
  const itemsPerPage = 8

  // Add more items to simulate loading
  const loadMoreItems = () => {
    const newItems = Array.from({ length: 8 }, (_, i) => ({
      id: allItems.length + i + 1,
      title: `Item ${allItems.length + i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      size: "M",
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      points: Math.floor(Math.random() * 40) + 10,
      image: "/placeholder.svg?height=300&width=300",
      user: `User ${allItems.length + i + 1}`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      location: ["New York", "Los Angeles", "Chicago", "Boston", "Seattle"][Math.floor(Math.random() * 5)],
      tags: ["casual", "vintage", "designer"][Math.floor(Math.random() * 3)],
      liked: false,
    }))
    setAllItems((prev) => [...prev, ...newItems])
  }

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(item.size)
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(item.condition)

    return matchesSearch && matchesCategory && matchesSize && matchesCondition
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/add-item">List an Item</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search items, brands, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="points-low">Points: Low to High</SelectItem>
                  <SelectItem value="points-high">Points: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {(showFilters || window.innerWidth >= 1024) && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Label key={size} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSizes([...selectedSizes, size])
                            } else {
                              setSelectedSizes(selectedSizes.filter((s) => s !== size))
                            }
                          }}
                        />
                        {size}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Condition</h3>
                  <div className="flex flex-wrap gap-2">
                    {conditions.map((condition) => (
                      <Label key={condition} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedConditions([...selectedConditions, condition])
                            } else {
                              setSelectedConditions(selectedConditions.filter((c) => c !== condition))
                            }
                          }}
                        />
                        {condition}
                      </Label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Browse Items ({filteredItems.length} found)</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 right-2 flex justify-between">
                    <Badge className="bg-green-600">{item.points} pts</Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLike(item.id)
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-white/90">
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.category} • Size {item.size}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.location}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">by {item.user}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <ArrowUpDown className="w-3 h-3 mr-1" />
                      Swap
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={loadMoreItems}>
              Load More Items
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Showing {Math.min(filteredItems.length, currentPage * itemsPerPage)} of {filteredItems.length} items
            </p>
          </div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedSizes([])
                setSelectedConditions([])
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
