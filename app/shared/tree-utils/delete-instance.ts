import produce from "immer";
import { type Instance } from "@webstudio-is/sdk";

export const deleteInstanceMutable = (
  instance: Instance,
  instanceId: Instance["id"]
): boolean => {
  if (instance.id === instanceId) return true;

  for (const child of instance.children) {
    if (typeof child === "string") continue;
    const shouldDelete = deleteInstanceMutable(child, instanceId);
    if (shouldDelete === true) {
      const index = instance.children.indexOf(child);
      instance.children.splice(index, 1);
      return false;
    }
  }
  return false;
};

export const deleteInstance = produce(
  (draftInstance: Instance, instanceId: Instance["id"]) => {
    deleteInstanceMutable(draftInstance, instanceId);
  }
);
