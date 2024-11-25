import { useState, useEffect } from 'react'
import MDEditor, { commands } from '@uiw/react-md-editor'
import { dialog, fs } from '@tauri-apps/api'
import './App.css'

function App() {
  const [markdown, setMarkdown] = useState("# Welcome to Markdown Editor\n\nStart typing your markdown here...")
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Save shortcut (Cmd/Ctrl + S)
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
      // Open shortcut (Cmd/Ctrl + O)
      if ((event.metaKey || event.ctrlKey) && event.key === 'o') {
        event.preventDefault();
        handleOpen();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const customCommands = [
    {
      name: 'open',
      keyCommand: 'open',
      buttonProps: { 
        'aria-label': 'Open file',
        'title': 'Open Markdown File (⌘O)'
      },
      icon: (
        <svg viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M3 4h4.5l2-2h5l2 2H21c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1zm18 4h-8.3l-2-2H4v12h17V8z"/>
        </svg>
      ),
      execute: handleOpen,
    },
    {
      name: 'save',
      keyCommand: 'save',
      buttonProps: { 
        'aria-label': 'Save file',
        'title': 'Save Markdown File (⌘S)'
      },
      icon: (
        <svg viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      ),
      execute: handleSave,
    }
  ]

  const editorCommands = [
    ...customCommands,
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.hr,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.checkedListCommand,
    commands.quote,
    commands.code,
    commands.codeBlock,
    commands.codeEdit,
    commands.codeLive,
    commands.codePreview,
  ]

  return (
    <div className="container" data-color-mode="light">
      <div className="editor">
        <MDEditor
          value={markdown}
          onChange={setMarkdown}
          visibleDragbar={false}
          commands={editorCommands}
          hideToolbar={false}
          extraCommands={[]}
          height="100%"
        />
      </div>
    </div>
  )
}

export default App
