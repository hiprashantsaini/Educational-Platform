import { Send as SendIcon } from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const MessageRoom = ({connectedUsers,user}) => {
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState('')

  let imageUrl='';
  if(activeChat?.sender?._id === user?._id && activeChat?.receiver?._id === user?._id){
     imageUrl=`http://localhost:8080/${activeChat?.sender?.profilePicture}`
  }else if(activeChat?.sender?._id === user?._id){
     imageUrl=`http://localhost:8080/${activeChat?.receiver?.profilePicture}`
  }else if(activeChat?.receiver?._id === user?._id){
     imageUrl=`http://localhost:8080/${activeChat?.sender?.profilePicture}`
   }

  const messages = [
    { id: 1, sender: 'Tom', text: 'Hi there! I\'m interested in learning more about your course.' },
    { id: 2, sender: 'Mohan', text: 'Great! What specific area are you looking to explore?' }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Logic to send message would go here
      setMessage('')
    }
  }

  return (
    <div className='flex w-full h-screen'>
      {/* Contacts Sidebar */}
      <div className='w-1/5 sm:w-1/4 bg-gray-100 border-r overflow-y-auto'>
        <div className='p-1 sm:p-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white'>
          <h2 className='text-custom-xs custom-small:text-sm sm:text-xl font-bold'>Contacts</h2>
        </div>
        <List>
          {connectedUsers && connectedUsers.map((contact) => <ConnectedUser activeChat={activeChat} user={user} setActiveChat={setActiveChat} contact={contact}/>)}
        </List>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col'>
        {/* Chat Header */}
        <div className='bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 flex items-center justify-between'>
          <div className='flex items-center'>
            <Avatar 
              alt={activeChat?.name || 'Chat'} 
              src={imageUrl}
              sx={{
                width: {
                  xs: 34,
                  sm: 48,
                  md:64
                },
                height: {
                  xs: 34,
                  sm: 48,
                  md:64
                },
                mr: 2
              }}
            />
            <div>
              <h2 className='text:lg sm:text-xl font-semibold'>
                {activeChat ? (activeChat?.sender?._id===user?._id ? activeChat?.receiver?.name : activeChat?.sender?.name) : 'Select a Contact'}
              </h2>
              <p className='text:xs sm:text-sm text-indigo-200'>
                {activeChat ? (activeChat?.sender?._id===user?._id ? activeChat?.receiver?.role : activeChat?.sender?.role) : 'Start a conversation'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className='flex-1 overflow-y-auto p-4 bg-gray-50'>
          {activeChat ? (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`
                  mb-4 max-w-md 
                  ${msg.sender === 'Mohan' ? 'ml-auto text-right' : 'mr-auto text-left'}
                `}
              >
                <div 
                  className={`
                    inline-block p-3 rounded-lg text-xs sm:text-sm
                    ${msg.sender === 'Mohan' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-black'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className='text-center text-gray-500 mt-20'>
              Select a contact to start chatting
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className='bg-white p-4 border-t flex items-center'>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='mr-2'
            disabled={!activeChat}
          />
          <IconButton 
            color="primary" 
            onClick={handleSendMessage}
            disabled={!activeChat || !message.trim()}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

function ConnectedUser({contact,activeChat,setActiveChat,user}){
  let imageUrl='';
  if(contact?.sender?._id === user?._id && contact?.receiver?._id === user?._id){
     imageUrl=`http://localhost:8080/${contact?.sender?.profilePicture}`
  }else if(contact?.sender?._id === user?._id){
     imageUrl=`http://localhost:8080/${contact?.receiver?.profilePicture}`
  }else if(contact?.receiver?._id === user?._id){
     imageUrl=`http://localhost:8080/${contact?.sender?.profilePicture}`
   }
  return(
    <ListItem 
    key={contact.id} 
    button 
    onClick={() => setActiveChat(contact)}
    selected={activeChat?.id === contact.id}
    className={`
      hover:bg-indigo-50 
      ${activeChat?.id === contact.id ? 'bg-indigo-100' : ''}
    `}
  >
    <ListItemAvatar>
      <Avatar 
        alt={contact.name} 
        src={imageUrl}
        sx={{
          width: {
            xs: 32,
            sm: 48
          },
          height: {
            xs: 32,
            sm: 48
          }
        }}
      />
    </ListItemAvatar>
    <ListItemText 
      className='hidden sm:block'
      primary={
        <Link 
          to={`/profile/${contact.id}`} 
          className='hover:text-indigo-700 font-semibold'
        >
          {contact?.sender?._id===user?._id ? contact?.receiver?.name : contact?.sender?.name}
        </Link>
      } 
      secondary={contact?.sender?._id===user?._id ? contact?.receiver?.role : contact?.sender?.role} 
    />
  </ListItem>
  )
}

export default MessageRoom