import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createConversation,
  fetchConversations,
  fetchMessages,
  sendMessage,
  setSelectedConversation,
} from "../../redux/Slices/chatSlice";
import "../../style/chat/chat.scss";

const Chat = () => {
  const dispatch = useDispatch();
  const { conversations, selectedConversation, messages } = useSelector(
    (state) => state.chat
  );
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedConversation) {
      dispatch(fetchMessages(selectedConversation.id));
    }
  }, [selectedConversation, dispatch]);

  const user = JSON.parse(useSelector((state)=>state.auth.user))

  const handleSend = () => {
    if (!newMessage.trim()) return;
    dispatch(
      sendMessage({
        idConversation: selectedConversation.id,
        idDestinataire: selectedConversation.autreUserId,
        expediteurType: user.role == 'client' ? 'client' : 'artisan',
        message: newMessage,
      })
    );
    setNewMessage("");
  };

  return (
    <div className="chat">
      <div className="right">
        {selectedConversation ? (
          <div className="conversation">
            <div className="header">
              <img src="/imgs/images.jpeg" alt="user" />
              <h1>{selectedConversation.nomAutreUtilisateur}</h1>
            </div>

            <div className="content">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.expediteurType === "artisan" ? "received" : "sent"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>

            <div className="send-box">
              <input
                type="text"
                className="form-control"
                placeholder="اكتب رسالتك هنا..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="btn" onClick={handleSend}>إرسال</button>
            </div>
          </div>
        ) : (
          <div className="no-chat">
            <p>اختر محادثة لعرض الرسائل</p>
          </div>
        )}
      </div>
      <div className="left">
        <div className="slider">
          <div className="slider">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`persone ${
                  selectedConversation?.id === conv.id ? "active" : ""
                }`}
                onClick={() => dispatch(setSelectedConversation(conv))}
              >
                <img src="/imgs/images.jpeg" alt="user" />
                <p>{conv.nomAutreUtilisateur}</p>{" "}
                {/* À récupérer côté backend */}
                <span className="offre-title">عرض رقم {conv.idOffre}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
