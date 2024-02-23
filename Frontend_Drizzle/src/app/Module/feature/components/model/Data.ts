interface AddItemRequest {
  productId: number;
  quantity: number;
  price: number;
}

interface UserAddress {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zipCode: string;
  mobile: string;
}

interface ProductCategory {
  id: number;
  name: string;
  parentCategory: any;
  level: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  quantity: number;
  brand: string;
  color: string;
  imageUrl: string;
  ratings: any[];
  reviews: any[];
  numRatings: number;
  category: ProductCategory;
  createdAt: string;
}

interface AdminProduct {
  id: number;
  title: string;
  category: { name: string };
  price: number;
  quantity: number;
  imageUrl: string;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  discountedPrice: number;
  userId: number;
  deliveryDate: any;
}

interface ShippingAddress {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zipCode: string;
  mobile: string;
}

interface Order {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    mobile: any;
    userStatus: any;
    role: string;
    address: UserAddress[];
    paymentInformation: any[];
    createdAt: string;
  };
  orderItems: OrderItem[];
  orderDate: string;
  deliveryDate: string;
  dueDate: string;
  shippingAddress: ShippingAddress;
  paymentStatus: string;
  fineAmount: number;
  totalPrice: number;
  totalDiscountedPrice: number;
  discount: number;
  orderStatus: string;
  totalItem: number;
  createdDate: string;
}

interface Rating{
 id: number;
 user: any;
 product: any;
 rating: number;
 createdAt: any;
}

interface RatingRequest {
  productId: number;
  rating: number;
}

interface Review{
  id: number;
  review: string;
  product: any;
  user: any;
  createdAt: any;
}

interface ReviewRequest{
  productId: number;
  review: string;
}

