import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { dialog, fs } from '@tauri-apps/api'
import './App.css'

function App() {
  const [markdown, setMarkdown] = useState("# Welcome to Markdown Editor\n\nStart typing your markdown here...")
  
  const handleSave = async () => {
    try {
      const filePath = await dialog.save({
        filters: [{
          name: 'Markdown',
          extensions: ['md']
        }]
      })
      
      if (filePath) {
        await fs.writeFile(filePath, markdown)
      }
    } catch (err) {
      console.error('Error saving file:', err)
    }
  }

  const handleOpen = async () => {
    try {
      const selected = await dialog.open({
        filters: [{
          name: 'Markdown',
          extensions: ['md']
        }]
      })
      
      if (selected) {
        const content = await fs.readTextFile(selected)
        setMarkdown(content)
      }
    } catch (err) {
      console.error('Error opening file:', err)
    }
  }

  return (
    <div className="container">
      <div className="toolbar">
        <button onClick={handleOpen}>Open</button>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="editor">
        <MDEditor
          value={markdown}
          onChange={setMarkdown}
          height={500}
        />
      </div>
    </div>
  )
}

export default App
