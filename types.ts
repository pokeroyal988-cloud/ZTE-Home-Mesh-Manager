export enum DeviceRole {
  MAIN_ROUTER = 'Main Router (Gateway)',
  MESH_NODE = 'Mesh Node'
}

export interface NetworkDevice {
  id: string;
  name: string;
  role: DeviceRole;
  ip: string;
  username: string;
  password?: string;
  model: string;
}

export interface ConnectivityStatus {
  isOnline: boolean;
  lastChecked: Date;
  latency?: number;
}

export interface DhcpEntry {
  hostname: string;
  ip: string;
  status: string;
}