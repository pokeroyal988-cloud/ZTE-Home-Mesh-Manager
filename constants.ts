import { NetworkDevice, DeviceRole } from './types';

export const NETWORK_DEVICES: NetworkDevice[] = [
  {
    id: 'dev_1',
    name: 'Nhà Mạng (Internet)',
    role: DeviceRole.MAIN_ROUTER,
    model: 'ZTE F6601P',
    ip: '192.168.1.1',
    username: 'admin',
    password: 'ZTEGD614C03E'
  },
  {
    id: 'dev_2',
    name: 'Mesh Node 1 (Tầng 2)',
    role: DeviceRole.MESH_NODE,
    model: 'ZTE F6601P',
    ip: '192.168.102.1',
    username: 'admin',
    password: 'ZTEGR4903167'
  },
  {
    id: 'dev_3',
    name: 'Mesh Node 2 (Tầng 3)',
    role: DeviceRole.MESH_NODE,
    model: 'ZTE F6601P',
    ip: '192.168.102.10',
    username: 'admin',
    password: 'ZTEGR4P22041'
  }
];