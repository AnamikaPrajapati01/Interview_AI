import pdfParse from 'pdf-parse'
import generateInterviewReport from '../services/ai.services'
import interviewReportModel from '../models/interviewReport.model'

async function generateInterviewReportController(req, res) {

 const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body


    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })
    response.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}

async function getInterviewReportByIdController(req, res) {
    const {interviewReportId}= req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)
    if(!interviewReport){
        return res.status(400).json({
            message:"Interview report not found"
        })
    }
    
    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}





export default {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController};