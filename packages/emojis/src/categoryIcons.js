import React from "react";
import {
  IconFlag,
  IconInsertEmoticon,
  IconDirectionsBike,
  IconCommute,
  IconLocalFlorist,
  IconFastfood,
  IconCategory,
  IconBulb,
  IconHistory,
  IconArrange
} from "@happeouikit/icons";

const categoryIcons = {
  categories: {
    recent: () => <IconHistory />,
    people: () => <IconInsertEmoticon />,
    nature: () => <IconLocalFlorist />,
    foods: () => <IconFastfood />,
    activity: () => <IconDirectionsBike />,
    places: () => <IconCommute />,
    objects: () => <IconBulb />,
    symbols: () => <IconCategory />,
    flags: () => <IconFlag />,
    custom: () => <IconArrange />
  }
};

export default categoryIcons;
