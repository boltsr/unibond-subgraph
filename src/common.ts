import {store} from "@graphprotocol/graph-ts/index";

export function removeEmptyEntity(entityName: string, id: string):void {
  store.remove(entityName, id);
}