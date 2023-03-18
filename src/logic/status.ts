/// @unocss-include

export enum Status {
  DRAFT = "draft",
  FINISHED = "finished",
  TBC = "tbc",
  STALE = "stale",
  OUTDATED = "outdated"
}


export const STATUS_META: Record<Status, {
  heading: string,
  icon: string,
  description: string,
}> = {
  [Status.FINISHED]: {
    heading: "Finished",
    icon: "i-mdi-circle",
    description: "",
  }, // not used.
  [Status.DRAFT]: {
    heading: "Draft",
    icon: "i-mdi-circle-slice-1",
    description: "This post is prone to change, thus <strong>not being ready for reading</strong>.",
  },
  [Status.OUTDATED]: {
    heading: "Outdated",
    icon: "i-mdi-clock",
    description: `The information contained in this post is <strong>outdated</strong>. <strong>Read with caution</strong>.`,
  },
  [Status.TBC]: {
    heading: "To Be Continued",
    icon: "i-mdi-circle-slice-5",
    description: "This post might be extended some time later, <s>or stay as-is forever</s>."
  },
  [Status.STALE]: {
    heading: "Stale",
    icon: "i-mdi-close-circle",
    description: "This post is not complete, yet abandoned."
  }
}