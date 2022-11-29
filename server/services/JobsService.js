import { dbContext } from "../db/DbContext.js"

class JobsService {
    async getAll(query) {
        const jobs = dbContext.Jobs.find(query).sort('jobTitle')
        return jobs
    }

    async create(jobData) {
        const newJob = dbContext.Jobs.create(jobData)
        return newJob
    }

    async remove(jobId) {
        const job = await dbContext.Jobs.findById(jobId)
        if (!job) throw new BadRequest('no job at id: ' + jobId)
        await job.remove()
        return `deleted ${job.jobTitle}`
    }

    async update(jobId, jobData) {
        const original = await dbContext.Jobs.findById(jobId)
        if (!original) throw new BadRequest('no job at id: ' + jobId)

        original.jobTitle = jobData.jobTitle ? jobData.jobTitle : original.jobTitle
        original.company = jobData.company ? jobData.company : original.company
        original.rate = jobData.rate !== undefined ? jobData.rate : original.rate
        original.hours = jobData.hours !== undefined ? jobData.hours : original.hours
        original.description = jobData.description ? jobData.description : original.description

        await original.save()
        return original
    }
}

export const jobsService = new JobsService()