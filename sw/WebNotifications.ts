class WebNotiofications {
  private static instance: WebNotiofications;

  private constructor() {}

  public static getInstance(): WebNotiofications {
    if (!WebNotiofications.instance) {
      WebNotiofications.instance = new WebNotiofications();
    }
    return WebNotiofications.instance;
  }

  public addNotifications(notifications: Array<unknown>) {
    console.log("Notifications", notifications);
  }
}

export { WebNotiofications };
