import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from 'prismjs'

const Message = ({message}) => {


  useEffect(() => {
    Prism.highlightAll()
  },[message.content])


  return (
    <div>
      {message.role === 'user' ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <span className='group flex'>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <IconButton disableRipple>
                <EditIcon fontSize='small' sx={{color : "#4B0082"}}/>
              </IconButton>
            </span>
            <div className='flex flex-col p-4 px-6 rounded-4xl max-w-2xl bg-[#4B0082] text-sky-100'>
              <p>{message.content}</p>
            </div>
          </span>
        </div>
      ) : (
        <>
        <div className="group inline-flex flex-col items-start gap-1 my-4">
          <div className='group inline-flex flex-col gap-2 p-2 px-2 max-w-4xl rounded-md my-2'>
            {message.isImage ? (
              <img src={message.content} alt="" className='w-full max-w-md mt-2 rounded-md'/>
            ) : (
              <div className=' reset-tw text-[#4B0082]'>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <IconButton disableRipple sx={{color : "#4B0082",}}>
              <ThumbUpOutlinedIcon sx={{fontSize : "16px"}} />
            </IconButton>
            <IconButton disableRipple sx={{color : "#4B0082",}}>
              <ThumbDownOutlinedIcon sx={{fontSize : "16px"}} />
            </IconButton>
            <IconButton disableRipple sx={{color : "#4B0082",}}>
              <ReplayIcon sx={{fontSize : "16px"}} />
            </IconButton>
            <IconButton disableRipple sx={{color : "#4B0082",}}>
              <ContentCopyIcon sx={{fontSize : "16px"}} />
            </IconButton>
            <IconButton disableRipple sx={{color : "#4B0082",}}>
              <ShareIcon sx={{fontSize : "16px"}} />
            </IconButton>
            <IconButton disableRipple sx={{color : "#4B0082",}}>
              <MoreVertIcon sx={{fontSize : "16px"}} />
            </IconButton>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default Message
