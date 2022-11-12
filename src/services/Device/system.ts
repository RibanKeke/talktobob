async function onNetWorkStatusChanged<T extends { connected: boolean }>(
  callback: (status: T) => void
) {
  const { Network } = await import("@capacitor/network");
  return await Network.addListener("networkStatusChange", (status) => {
    callback(status as unknown as T);
  });
}

async function getNetworkStatus() {
  const { Network } = await import("@capacitor/network");
  return await Network.getStatus();
}

export { onNetWorkStatusChanged, getNetworkStatus };
