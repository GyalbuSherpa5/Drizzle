package com.gyalbu.drizzle_backend.resources.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddItemRequest {

    @JsonProperty("productId")
    private Long productId;

    @JsonProperty("quantity")
    private int quantity;

    @JsonProperty("price")
    private Integer price;
}
