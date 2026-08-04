/**
 * Notification manager
 */
export class NotificationManager {
  static isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return "Notification" in window;
  }

  static async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      throw new Error("Desktop notifications not available in your browser");
    }
    return await Notification.requestPermission();
  }

  static notify({
    title,
    body,
    icon = "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
  }: {
    title: string;
    body: string;
    icon?: string;
  }): Notification | null {
    if (!this.isSupported()) {
      console.warn("Desktop notifications not available in your browser");
      return null;
    }

    if (Notification.permission !== "granted") {
      console.warn("Notification permission not granted");
      return null;
    }

    return new Notification(title, {
      icon,
      body,
    });
  }
}
