export const typeDefs = `#graphql
  type Product {
    id: ID!
    description: String
    name: String!
    price: Float!
    CategoryId: ID!
    category: Category!
  }
  type Category {
    id: ID!
    name: String!
    products: [Product!]
  }

  type Query {
    categories: [Category!]!
    products: [Product]!
    category(id: ID!): Category
    product(id: ID!): Product
  }
`