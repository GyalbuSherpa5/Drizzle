package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.entity.Product;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.resources.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(CreateProductRequest request) throws ProductException;

    String deleteProduct(Long productId) throws ProductException;

    Product updateProduct(Long productId, Product request) throws ProductException;

    Product findProductById(Long productId) throws ProductException;

    List<Product> findProductByCategory(String category);

    Page<Product> getAllProduct(String category,
                                List<String> colors,
                                List<String> sizes,
                                Integer minPrice,
                                Integer maxPrice,
                                Integer minDiscount,
                                String sort,
                                String stock,
                                Integer pageNumber,
                                Integer pageSize);

    List<Product> findAllProducts();
}
