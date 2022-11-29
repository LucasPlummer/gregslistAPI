import { Schema } from "mongoose";


export const JobSchema = new Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    rate: { type: Number, required: true },
    hours: { type: Number, required: true },
    description: { type: String, required: true },
})