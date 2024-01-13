export interface CreateProductRequestDTO {
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  quantity: number;
  brand: string;
  color: string;
  size: any;
  imageUrl: string;
  topLevelCategory: string;
  secondLevelCategory: string;
  thirdLevelCategory: string;
}
