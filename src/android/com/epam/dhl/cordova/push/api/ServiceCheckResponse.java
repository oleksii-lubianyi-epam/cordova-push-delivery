package com.epam.dhl.cordova.push.api;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ServiceCheckResponse {
    @SerializedName("statusCode")
    @Expose
    private int statusCode;
    @SerializedName("statusDesc")
    @Expose
    private String statusDesc;
    @SerializedName("AcknowledgementStatus")
    @Expose
    private String AcknowledgementStatus;

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

    public String getAcknowledgementStatus() {
        return AcknowledgementStatus;
    }

    public void setAcknowledgementStatus(String acknowledgementStatus) {
        AcknowledgementStatus = acknowledgementStatus;
    }
}
