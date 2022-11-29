import { dbContext } from "../db/DbContext.js"

class HousesService {


    async getAll(query) {
        const houses = dbContext.Houses.find(query).sort('year')
        return houses
    }

    async create(houseData) {
        const newHouse = dbContext.Houses.create(houseData)
        return newHouse
    }

    async remove(houseId) {
        const house = await dbContext.Houses.findById(houseId)
        if (!house) throw new BadRequest('no house at id: ' + houseId)
        await house.remove()
        return `deleted ${house.description}`
    }

    async update(houseId, houseData) {
        const original = await dbContext.Houses.findById(houseId)
        if (!original) throw new BadRequest('no house at id: ' + houseId)

        original.bedrooms = houseData.bedrooms !== undefined ? houseData.bedrooms : original.bedrooms
        original.bathrooms = houseData.bathrooms !== undefined ? houseData.bathrooms : original.bathrooms
        original.levels = houseData.levels !== undefined ? houseData.levels : original.levels
        original.year = houseData.year !== undefined ? houseData.year : original.year
        original.imgUrl = houseData.imgUrl ? houseData.imgUrl : original.imgUrl
        original.price = houseData.price !== undefined ? houseData.price : original.price

        await original.save()
        return updated
    }
}

export const housesService = new HousesService()