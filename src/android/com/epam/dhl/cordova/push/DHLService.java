package com.epam.dhl.cordova.push;

import android.provider.Settings;
import android.support.annotation.NonNull;
import android.util.Log;

import com.adobe.phonegap.push.FCMService;
import com.epam.dhl.cordova.push.api.ServiceBody;
import com.epam.dhl.cordova.push.api.ServiceData;
import com.epam.dhl.cordova.push.api.ServiceResponse;
import com.google.firebase.messaging.RemoteMessage;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DHLService extends FCMService {

    private static final String LOG_TAG = "Push_DHLService";

    @Override
    public void onMessageReceived(RemoteMessage message) {

        String id = message.getMessageId();
        Log.d(LOG_TAG, "onMessage - id: " + id);
        RetrofitService.getInstance().getDHLApi().postMessage(createPostMessage(id)).enqueue(new PostCallback(id));
        super.onMessageReceived(message);
    }

    private ServiceBody createPostMessage(String id) {
        ServiceBody body = new ServiceBody();
        body.setService("$SERVICE_NAME$");
        body.setMethod("$METHOD_NAME$");
        ServiceData data = new ServiceData();
        data.setMessageId(id);
		data.setDeviceId(getUuid());
        body.setData(data);
        return body;
    }

    /**
     * Get the device's Universally Unique Identifier (UUID).
     *
     * @return
     */
    public String getUuid() {
        String uuid = Settings.Secure.getString(getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
        return uuid;
    }

    private static class PostCallback implements Callback<ServiceResponse> {
        private String id;

        PostCallback(String id) {
            this.id = id;
        }

        @Override
        public void onResponse(@NonNull Call<ServiceResponse> call, @NonNull Response<ServiceResponse> response) {
            ServiceResponse body = response.body();
            if (body != null && body.getStatusCode() == 200 && "SUCCESS".equals(body.getStatusDesc())) {
                Log.d(LOG_TAG, "Success to acknowledge message with id: " + id);
            } else {
                errorProcessingMessage();
            }
        }

        @Override
        public void onFailure(@NonNull Call<ServiceResponse> call, @NonNull Throwable t) {

            errorProcessingMessage();
        }

        private void errorProcessingMessage() {
            Log.d(LOG_TAG, "Failed to acknowledge message with id: " + id);
        }
    }
}
