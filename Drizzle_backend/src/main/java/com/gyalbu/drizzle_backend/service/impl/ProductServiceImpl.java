package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Category;
import com.gyalbu.drizzle_backend.entity.Product;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.repository.CategoryRepository;
import com.gyalbu.drizzle_backend.repository.ProductRepository;
import com.gyalbu.drizzle_backend.resources.request.CreateProductRequest;
import com.gyalbu.drizzle_backend.service.ProductService;
import com.gyalbu.drizzle_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final UserService userService;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Product createProduct(CreateProductRequest request) throws ProductException {
        try {
            log.info("Saving product to database");

            Category topLevel = getCategory(request.getTopLevelCategory(), null, 1);
            Category secondLevel = getCategory(request.getSecondLevelCategory(), topLevel, 2);
            Category thirdLevel = getCategory(request.getThirdLevelCategory(), secondLevel, 3);

            Product product = new Product();
            product.setTitle(request.getTitle());
            product.setColor(request.getColor());
            product.setDescription(request.getDescription());
            product.setDiscountedPrice(request.getDiscountedPrice());
            product.setDiscountPercent(request.getDiscountPercent());
            product.setImageUrl(request.getImageUrl());
            product.setBrand(request.getBrand());
            product.setSizes(request.getSize());
            product.setQuantity(request.getQuantity());
            product.setCategory(thirdLevel);
            product.setCreatedAt(LocalDateTime.now());

            return productRepository.save(product);
        } catch (Exception e) {
            log.error("Error creating product: {}", e.getMessage(), e);
            throw new ProductException("Failed to create product");
        }
    }

    private Category getCategory(String categoryName, Category parent, int level) {
        Category category = categoryRepository.findByNameAndParent(categoryName, (parent != null) ? parent.getName() : null);

        if (category == null) {
            Category newCategory = new Category();
            newCategory.setName(categoryName);
            newCategory.setParentCategory(parent);
            newCategory.setLevel(level);

            return categoryRepository.save(newCategory);
        }

        return category;
    }

    @Override
    public String deleteProduct(Long productId) throws ProductException {

        Product product = findProductById(productId);
        product.getSizes().clear();
        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public Product updateProduct(Long productId, Product request) throws ProductException {
        Product product = findProductById(productId);

        if (request.getQuantity() != 0) {
            product.setQuantity(request.getQuantity());
        }

        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {

        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        }

        throw new ProductException("Product not found with id - " + productId);
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return Collections.emptyList();
    }

    @Override
    public Page<Product> getAllProduct(String category,
                                       List<String> colors,
                                       List<String> sizes,
                                       Integer minPrice,
                                       Integer maxPrice,
                                       Integer minDiscount,
                                       String sort,
                                       String stock,
                                       Integer pageNumber,
                                       Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        List<Product> products = productRepository.filterProduct(category,minPrice,maxPrice,minDiscount,sort);

        if(!colors.isEmpty()){
            products = products.stream()
                    .filter(product -> colors.stream()
                            .anyMatch(color->color.equalsIgnoreCase(product.getColor())))
                    .toList();
        }

        if(stock != null){
            if(stock.equals("in_stock")){
                products = products.stream()
                        .filter(product -> product.getQuantity()>0).toList();
            } else if (stock.equals("out_of_stock")) {
                products = products.stream()
                        .filter(product -> product.getQuantity()<1).toList();
            }
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());

        List<Product> pageContent = products.subList(startIndex, endIndex);

        return new PageImpl<>(pageContent, pageable, products.size());
    }

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
}
