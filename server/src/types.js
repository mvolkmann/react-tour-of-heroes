// @flow

export type AlertType = {
  id: number,
  instanceId: number,
  name: string,
  priority: number,
  timestamp: number,
  typeId: number
};

export type AlertTypeType = {
  name: string,
  expression: string,
  id: number,
  sticky: boolean,
  typeId: number
};

export const BUILTIN_TYPES = ['boolean', 'number', 'percent', 'text'];

export type EnumMemberMapType = {[id: number]: EnumMemberType};
export type EnumMemberType = {
  id: number,
  enumId: number,
  name: string,
  value: number
};

export type EnumType = {
  id: number,
  name: string,
  memberMap: EnumMemberMapType
};
export type MessageServerType = {
  id: number,
  host: string,
  port: number
};

export type NodeType = {
  id: number,
  children: number[],
  expanded?: boolean,
  messageServerId?: number,
  name: string,
  parentId: number,
  selected?: boolean,
  typeId?: number // for instance nodes
};

export type PrimitiveType = boolean | number | string;
