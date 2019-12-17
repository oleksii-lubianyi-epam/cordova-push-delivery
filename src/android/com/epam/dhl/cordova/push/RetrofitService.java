package com.epam.dhl.cordova.push;

import com.epam.dhl.cordova.push.api.DHLApi;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitService {
    private static RetrofitService mInstance;
    private static final String BASE_URL = "https://dhle-dev.dhl.com/";
    private Retrofit retrofit;

    private RetrofitService() {
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request newRequest  = chain.request().newBuilder()
                        .addHeader("Authorization", "Bearer AYPe1OMqELUG9ASICBnRKTOQi0B1D1")
                        .build();
                return chain.proceed(newRequest);
            }
        }).build();

        retrofit = new Retrofit.Builder()
                .client(client)
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    public static RetrofitService getInstance() {
        if (mInstance == null) {
            mInstance = new RetrofitService();
        }
        return mInstance;
    }

    public DHLApi getDHLApi() {
        return retrofit.create(DHLApi.class);
    }
}
