package com.epam.dhl.cordova.push.api;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ServiceBody {
    @SerializedName("service")
    @Expose
    private String service;
    @SerializedName("method")
    @Expose
    private String method;
    @SerializedName("data")
    @Expose
    private ServiceData data;

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public ServiceData getData() {
        return data;
    }

    public void setData(ServiceData data) {
        this.data = data;
    }
}
