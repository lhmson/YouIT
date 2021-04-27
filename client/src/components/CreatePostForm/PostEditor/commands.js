import React, { Component } from "react";
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextApi
} from "@uiw/react-md-editor";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaStrikethrough,
  BsArrowsFullscreen,
} from 'react-icons/all'

const titleCommandsGroup = commands.group([
  commands.title1,
  commands.title2,
  commands.title3,
  commands.title4,
  commands.title5,
  commands.title6,
], {
  name: "title",
  groupName: "title",
  buttonProps: {
    "aria-label": "Insert title",
    title: "Add title"
  },
  icon: <FaHeading />
})

/**
 * overrides some properties of the original command such as name, icon,... 
 * @param {ICommand} originalCommand 
 * @param {ICommand} overridingCommand 
 * @returns {ICommand}
 */
const overrideCommand = (originalCommand, overridingCommand) => {
  return { ...originalCommand, ...overridingCommand }
}

/**
 * @param {*} name 
 * @param {*} keyCommand 
 * @param {Component} icon 
 * @param {*} tooltip 
 * @returns {ICommand}
 */
const createCommand = (name, keyCommand, icon, tooltip, shortcuts) => {
  const overridingCommand = {}

  if (name)
    overrideCommand.name = name;
  if (keyCommand)
    overridingCommand.keyCommand = keyCommand;
  if (shortcuts)
    overrideCommand.shortcuts = shortcuts;
  if (icon)
    overrideCommand.icon = icon;
  if (tooltip)
    overrideCommand.buttonProps = {
      "aria-label": tooltip,
      title: tooltip
    }

  return overrideCommand
}

const bold = overrideCommand(commands.bold, createCommand(null, null, <FaBold />, "Apply bold text (⌘+B)", null));
const italic = overrideCommand(commands.italic, createCommand(null, null, <FaItalic />, "Apply italic text (⌘+I)", null));
const strikethrough = overrideCommand(commands.strikethrough, createCommand(null, null, <FaStrikethrough />, "Apply strikethrough text"), null);
const fullscreen = overrideCommand(commands.fullscreen, createCommand(null, null, <BsArrowsFullscreen />, "Edit in fullscreen"), null);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const postEditorCommands = [
  titleCommandsGroup,
  bold,
  italic,
  strikethrough,
  commands.divider,

  commands.hr,
  commands.code,
  commands.quote,
  commands.link,
  commands.image,
  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.divider,

  commands.codeEdit,
  commands.codeLive,
  commands.codePreview,
  commands.divider,
  fullscreen,
];

export { postEditorCommands }