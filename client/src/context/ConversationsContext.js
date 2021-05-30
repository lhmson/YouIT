import React, { createContext, useMemo, useContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ConversationsContext = createContext();

function conversationReducer(state, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_ID": {
      return { ...state, currentId: action.payload.newCurrentId };
    }
    case "UPDATE_LIST_CONVERSATIONS": {
      return {
        ...state,
        listConversations: action.payload.newListConversations,
      };
    }
    case "ADD_CONVERSATION":
      const newArr = [
        action.payload.newConversation,
        ...state.listConversations,
      ];
      return { ...state, listConversations: newArr };
    case "ADD_SENDING": {
      const clone = new Set(state.conversationsSending);
      clone.add(action.payload.conversationId);
      return { ...state, conversationsSending: clone }
    }
    case "REMOVE_SENDING": {
      const clone = new Set(state.conversationsSending);
      clone.delete(action.payload.conversationId);
      return { ...state, conversationsSending: clone };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function ConversationsProvider(props) {
  const [user] = useLocalStorage("user");

  const [state, dispatch] = useReducer(conversationReducer, {
    listConversations: [],
    currentId: null,
    conversationsSending: new Set(),
  });
  const value = useMemo(() => [state, dispatch], [state]);
  return <ConversationsContext.Provider value={value} {...props} />;
}

function useConversations() {
  const context = useContext(ConversationsContext);
  // console.log("conversation", context);
  if (!context) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider"
    );
  }

  const [state, dispatch] = context;
  const updateCurrentId = (newCurrentId) =>
    dispatch({ type: "UPDATE_CURRENT_ID", payload: { newCurrentId } });

  const updateListConversations = (newListConversations) => {
    dispatch({
      type: "UPDATE_LIST_CONVERSATIONS",
      payload: { newListConversations },
    });
  };

  const addConversation = (newConversation) => {
    dispatch({
      type: "ADD_CONVERSATION",
      payload: { newConversation },
    });
  };

  const addSending = (conversationId) => {
    dispatch({
      type: "ADD_SENDING",
      payload: { conversationId },
    });
  };

  const removeSending = (conversationId) => {
    dispatch({
      type: "REMOVE_SENDING",
      payload: { conversationId },
    });
  };

  const checkSending = (conversationId) => state.conversationsSending.has(conversationId);

  return {
    state,
    updateCurrentId,
    updateListConversations,
    addConversation,
    addSending,
    checkSending,
    removeSending
  };
}

export { ConversationsProvider, useConversations };

// export default ConversationsContext;
