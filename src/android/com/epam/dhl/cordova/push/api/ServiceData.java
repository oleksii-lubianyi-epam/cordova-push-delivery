package com.epam.dhl.cordova.push.api;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ServiceData {
    @SerializedName("messageId")
    @Expose
    private String messageId;

    @SerializedName("deviceId")
    @Expose
    private String deviceId;

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
}
