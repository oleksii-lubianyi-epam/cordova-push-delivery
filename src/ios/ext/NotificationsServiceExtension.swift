//
//  NotificationService.swift
//  notificationExtension
//
//  Created by Oleksii Lubianyi on 18.12.2019.
//

import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    private var contentHandler: ((UNNotificationContent) -> Void)?
    private var bestAttemptContent: UNNotificationContent = UNNotificationContent()

    private let endpoint = "$DELIVERY_HOST_URL$$DELIVERY_PATH$"
    private let token = "$DELIVERY_AUTH_TOKEN$"

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {

        self.contentHandler = contentHandler
        self.bestAttemptContent = request.content

        if let messageId = self.bestAttemptContent.userInfo["gcm.message_id"] as? String,
            let deviceId = UIDevice.current.identifierForVendor?.description {
                let jsonString = self.generateJSON(messageId: messageId, deviceId: deviceId)
                self.sendRequest(with: jsonString)
        }

        contentHandler(self.bestAttemptContent)
    }

    override func serviceExtensionTimeWillExpire() {
        contentHandler?(self.bestAttemptContent)
    }

    private func generateJSON(messageId: String, deviceId: String) -> String {
        
        let json = """
        {
            "service": "$SERVICE_NAME$",
            "method": "$METHOD_NAME$",
            "data": {
                "messageId": "\(messageId)",
                "deviceId": "\(deviceId)"
            }
        }
        """

        return json
    }

    private func sendRequest(with jsonString: String) {
        guard let url = URL(string: self.endpoint) else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = jsonString.data(using: .utf8)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue( "Bearer \(self.token)", forHTTPHeaderField: "Authorization")

        URLSession.shared.dataTask(with: request).resume()
    }
}
