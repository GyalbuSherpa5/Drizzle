package com.gyalbu.drizzle_backend.util;

import org.springframework.util.function.ThrowingSupplier;

public class ObjectUtil {
    public ObjectUtil() {
    }

    public static <R> R getDefaultWhenThrows(ThrowingSupplier<R> supplier, R defaultValue) {
        try {
            return supplier.get();
        } catch (Exception var3) {
            return defaultValue;
        }
    }
}
