import { FormEvent, useState } from "react"
import { Page } from "../../components/templates/Page"
import { DropBoxFile } from "../../components/UI/molecules/DropBoxFile"

import { Worker } from "@react-pdf-viewer/core"
import { Viewer } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

export function Home() {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfFileError, setPdfFileError] = useState("")
  const [viewPdf, setViewPdf] = useState(null)

  const fileType = ["application/pdf"]
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const handleFileChange = (e: any): void => {
    let selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = (e: any) => {
          setPdfFile(e.target.result)
          setPdfFileError("")
        }
      } else {
        setPdfFile(null)
        setPdfFileError("Please select valid pdf file")
      }
    } else {
      console.log("select your file")
    }
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (pdfFile !== null) {
      setViewPdf(pdfFile)
    } else {
      setViewPdf(null)
    }
  }

  const handleFileClear = () => {
    setViewPdf(null)
  }

  return (
    <Page>
      {!viewPdf && (
        <>
          <h1>Renderizar PDF em formato HTML</h1>
          <h3>Basta arrastar seu arquivo e clicar em 'GO'</h3>
          <form onSubmit={handleFormSubmit} className="mt-16 flex flex-col gap-4">
            <DropBoxFile handleChange={handleFileChange} />

            {pdfFileError && <div className="font-fredoka text-red-500 text-center">{pdfFileError}</div>}

            <button type="submit" className="btn btn-primary"> GO </button>
          </form>
        </>
      )}

      {/* show pdf conditionally (if we have one)  */}
      {viewPdf && (
        <>
          <div className="h-1/12 w-full flex justify-start px-14">
            <button onClick={handleFileClear} type="submit" className="btn btn-primary"> VOLTAR </button>
          </div>
          <div className="h-11/12 w-full">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js">
              <Viewer
                fileUrl={viewPdf}
              // plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        </>
      )}
    </Page>
  )
}