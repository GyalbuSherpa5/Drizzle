package com.gyalbu.drizzle_backend.resources.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRatingResponse {
    private int averageRatingCount;
    private int totalRatingCount;
    private int oneCount;
    private int twoCount;
    private int threeCount;
    private int fourCount;
    private int fiveCount;
}
