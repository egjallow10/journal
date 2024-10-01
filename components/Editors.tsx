'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const { mood, summary, color, subject, negative } = analysis

  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-2 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
            <span className="ml-3 text-gray-700 text-lg">Saving...</span>
          </div>
        )}
        <textarea
          className="w-full h-full p-8 text-xl outline-none rounded-lg shadow-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none bg-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start writing your thoughts..."
        />
      </div>

      <div className="border-l border-gray-200 bg-gray-50 rounded-lg shadow-md">
        <div className="px-6 py-6" style={{ backgroundColor: color }}>
          <h2 className="text-2xl font-bold text-white">Analysis</h2>
        </div>
        <div className="p-6">
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="py-4 flex items-center justify-between border-b last:border-b-0 border-gray-200"
              >
                <span className="text-lg font-semibold text-gray-700">{item.name}</span>
                <span className="text-gray-500">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
