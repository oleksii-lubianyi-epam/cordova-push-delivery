package com.epam.dhl.cordova.push.api;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface DHLApi {
    @POST("$DELIVERY_PATH$")
    Call<ServiceResponse> postMessage(@Body ServiceBody body);

    @POST("$DELIVERY_PATH$")
    Call<ServiceCheckResponse> checkMessage(@Body ServiceBody body);
}
