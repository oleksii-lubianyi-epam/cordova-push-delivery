package com.epam.dhl.cordova.push.api;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface DHLApi {
    @POST("access/access/com.dhl.exp.dhlmobile")
    Call<ServiceResponse> postMessage(@Body ServiceBody body);

    @POST("access/access/com.dhl.exp.dhlmobile")
    Call<ServiceCheckResponse> checkMessage(@Body ServiceBody body);
}
